/**
 * @fileoverview 개발 서버를 실행하는 루트 파일
 *
 * draft 상태의 글도 볼 수 있고, 파일 변경 시 자동으로 재빌드
 * - fs.watch 사용해서 파일 변경 감지
 */

/* eslint-disable no-console */
import { createServer } from 'http';
import { readFile, cp, rm } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { existsSync, mkdirSync, writeFileSync, watch } from 'fs';
import * as esbuild from 'esbuild';
import listUpMarkdownFiles from './listUpMarkdownFiles/listUpMarkdownFiles';
import listUpImageFiles from './listUpImageFiles/listUpImageFiles';
import readMarkdownFile from './readMarkdownFile/readMarkdownFile';
import processMarkdownFile, { PostNavigation } from './processMarkdownFile/processMarkdownFile';
import processMetaData from './processMetaData/processMetaData';
import { splitMetadataAndContent } from './utils/splitMetadataAndContent';
import writeHtmlFile from './writeHtmlFile/writeHtmlFile';
import { render } from './utils/templateEngine';
import { Metadata } from './types';
import { findBrokenImageLinks, reportBrokenImageLinks, BrokenImageLink } from './utils/imageValidator';
import { chromium, type BrowserType } from 'playwright';

const PORT = 3000;

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// 전역 상태 (템플릿 캐싱)
let appTemplate: string;
let postTemplate: string;
let mainTemplate: string;
let searchTemplate: string;
let metaJson: Metadata[] = [];
let searchHtml: string;

const blogsDir = join(process.cwd(), 'blogs');

/**
 * 템플릿 파일들을 로드하는 함수
 */
const loadTemplates = async () => {
  appTemplate = await readFile(join(process.cwd(), 'app', 'templates', 'app.html'), 'utf8');
  postTemplate = await readFile(join(process.cwd(), 'app', 'templates', 'post.html'), 'utf8');
  mainTemplate = await readFile(join(process.cwd(), 'app', 'templates', 'main.html'), 'utf8');
  searchTemplate = await readFile(join(process.cwd(), 'app', 'templates', 'search.html'), 'utf8');
};

/**
 * 초기 빌드 함수 - draft 포함
 * build.ts와 유사하지만 draft 필터링을 하지 않음
 * @param reusableBrowserType - Mermaid 렌더링에 사용할 BrowserType (브라우저 재사용 래퍼)
 */
const buildAll = async (reusableBrowserType: BrowserType) => {
  console.log('🔨 Building all files (including drafts)...');

  metaJson = [];

  // 템플릿 로드
  await loadTemplates();

  // /blogs의 모든 마크다운 파일 가져오기
  const markdownfiles = await listUpMarkdownFiles(blogsDir);

  // dist 폴더 내용 초기화하기
  await rm(join(process.cwd(), 'dist'), { recursive: true, force: true });
  mkdirSync(join(process.cwd(), 'dist'), { recursive: true });

  // asset 폴더 내용 복사하기
  await cp(join(process.cwd(), 'app', 'asset'), join(process.cwd(), 'dist'), { recursive: true });

  // blogs 폴더의 이미지 파일들을 dist로 복사 (폴더 구조 유지)
  const imageFiles = await listUpImageFiles(blogsDir);
  for (const imagePath of imageFiles) {
    // blogs/ 기준 상대 경로 유지
    const relativePath = imagePath.replace(`${blogsDir}/`, '');
    const destPath = join(process.cwd(), 'dist', relativePath);
    mkdirSync(dirname(destPath), { recursive: true });
    await cp(imagePath, destPath);
  }

  // client TypeScript를 JavaScript로 빌드하기
  await esbuild.build({
    entryPoints: [join(process.cwd(), 'app', 'client', 'index.ts')],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: join(process.cwd(), 'dist', 'script.js'),
    target: 'es2020',
    platform: 'browser',
  });

  // 메타 정보와 마크다운 콘텐츠를 저장할 맵 (파일 경로 기준)
  const contentMap = new Map<string, string>();

  // 깨진 이미지 링크 수집용 배열
  const allBrokenImageLinks: BrokenImageLink[] = [];
  const assetDir = join(process.cwd(), 'app', 'asset');

  // 메타 정보 처리하기 (draft 필터링 없음!)
  for (const file of markdownfiles) {
    const content = await readMarkdownFile(file.filePath);
    const { metadata } = processMetaData(content, file.filePath, blogsDir);
    // draft 여부와 관계없이 모두 처리
    const { markdownContent } = splitMetadataAndContent(content);
    contentMap.set(file.filePath, markdownContent);
    metaJson.push(metadata);

    // 이미지 유효성 검사 (빌드 후 dist에 복사될 이미지 기준)
    const brokenLinks = findBrokenImageLinks(markdownContent, file.filePath, blogsDir, assetDir);
    allBrokenImageLinks.push(...brokenLinks);
  }

  // 깨진 이미지 링크 출력
  reportBrokenImageLinks(allBrokenImageLinks);

  // 태그 정보 수집 (태그별 개수 포함)
  const tagMap = new Map<string, number>();
  metaJson.forEach((meta) => {
    if (meta.tags) {
      meta.tags.forEach((tag) => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    }
  });

  // 태그를 배열로 변환 (count 포함)
  const tags = Array.from(tagMap.entries())
    .map(([tag, count]) => ({ name: tag, count }))
    .sort((a, b) => a.name.localeCompare(b.name)); // 알파벳 순으로 정렬

  // meta.json 파일 쓰기
  writeFileSync(join(process.cwd(), 'dist', 'meta.json'), JSON.stringify(metaJson.reverse(), null, 2), 'utf8');

  // 검색 템플릿 렌더링
  searchHtml = render(searchTemplate, { tags, posts: metaJson });

  // 마크다운 파일 쓰기
  for (const file of markdownfiles) {
    const markdownContent = contentMap.get(file.filePath);
    if (!markdownContent) {
      continue;
    }
    // 파일 경로에서 HTML 파일 경로 생성하여 메타데이터 찾기 (폴더 구조 유지)
    const relativePath = file.filePath.replace(`${blogsDir}/`, '').replace('.md', '.html');
    const htmlFilePath = `/${relativePath}`;
    const targetMetaIndex = metaJson.findIndex((meta) => meta.filePath === htmlFilePath);
    if (targetMetaIndex === -1) {
      continue;
    }
    const targetMeta = metaJson[targetMetaIndex];

    // 이전/다음 글 정보 계산 (metaJson은 최신순으로 정렬되어 있음)
    let previousPost: PostNavigation | undefined;
    let nextPost: PostNavigation | undefined;

    // 이전 글 (더 오래된 글 = 인덱스가 더 큼)
    if (targetMetaIndex < metaJson.length - 1) {
      const prevMeta = metaJson[targetMetaIndex + 1];
      previousPost = {
        filePath: prevMeta.filePath,
        title: prevMeta.title,
      };
    }

    // 다음 글 (더 최신 글 = 인덱스가 더 작음)
    if (targetMetaIndex > 0) {
      const nextMeta = metaJson[targetMetaIndex - 1];
      nextPost = {
        filePath: nextMeta.filePath,
        title: nextMeta.title,
      };
    }

    const htmlContent = await processMarkdownFile(
      markdownContent,
      targetMeta,
      appTemplate,
      postTemplate,
      searchHtml,
      previousPost,
      nextPost,
      reusableBrowserType,
    );
    await writeHtmlFile(file.filePath, htmlContent, blogsDir);
    file.isProcessed = true;
  }

  // 블로그 글 목록 index.html 파일로 쓰기
  const MainHtml = render(mainTemplate, { posts: metaJson });
  const AppHtml = render(appTemplate, { body: MainHtml, search: searchHtml });
  writeFileSync(join(process.cwd(), 'dist', 'index.html'), AppHtml, 'utf8');

  const NotFoundHtml = render(appTemplate, {
    body: '<h1 style="text-align: center; margin-top: 100px; color: #D1D7E0;">404 - Page Not Found</h1>',
    search: searchHtml,
  });
  writeFileSync(join(process.cwd(), 'dist', '404.html'), NotFoundHtml, 'utf8');

  console.log('✅ Build completed!');
};

/**
 * 단일 파일 재빌드 함수
 * 파일 변경 시 해당 파일만 재빌드
 * @param filePath - 재빌드할 마크다운 파일 경로
 * @param reusableBrowserType - Mermaid 렌더링에 사용할 BrowserType (브라우저 재사용 래퍼)
 */
const rebuildFile = async (filePath: string, reusableBrowserType: BrowserType) => {
  try {
    // 파일이 존재하는지 확인
    if (!existsSync(filePath)) {
      console.log(`⚠️ File not found: ${filePath}`);
      return;
    }

    console.log(`🔄 Rebuilding: ${filePath}`);

    // 마크다운 파일 읽기
    const content = await readMarkdownFile(filePath);
    const { metadata } = processMetaData(content, filePath, blogsDir);
    const { markdownContent } = splitMetadataAndContent(content);

    // 이미지 유효성 검사 (빌드 후 dist에 복사될 이미지 기준)
    const assetDir = join(process.cwd(), 'app', 'asset');
    const brokenLinks = findBrokenImageLinks(markdownContent, filePath, blogsDir, assetDir);
    reportBrokenImageLinks(brokenLinks);

    // 파일 경로에서 HTML 파일 경로 생성 (폴더 구조 유지)
    const relativePath = filePath.replace(`${blogsDir}/`, '').replace('.md', '.html');
    const htmlFilePath = `/${relativePath}`;

    // 메타데이터 업데이트
    const existingIndex = metaJson.findIndex((meta) => meta.filePath === htmlFilePath);
    if (existingIndex !== -1) {
      metaJson[existingIndex] = metadata;
    } else {
      metaJson.push(metadata);
    }

    // 이전/다음 글 정보 계산
    const targetMetaIndex = metaJson.findIndex((meta) => meta.filePath === htmlFilePath);
    let previousPost: PostNavigation | undefined;
    let nextPost: PostNavigation | undefined;

    if (targetMetaIndex < metaJson.length - 1) {
      const prevMeta = metaJson[targetMetaIndex + 1];
      previousPost = {
        filePath: prevMeta.filePath,
        title: prevMeta.title,
      };
    }

    if (targetMetaIndex > 0) {
      const nextMeta = metaJson[targetMetaIndex - 1];
      nextPost = {
        filePath: nextMeta.filePath,
        title: nextMeta.title,
      };
    }

    // HTML 변환 및 파일 쓰기
    const htmlContent = await processMarkdownFile(
      markdownContent,
      metadata,
      appTemplate,
      postTemplate,
      searchHtml,
      previousPost,
      nextPost,
      reusableBrowserType,
    );
    await writeHtmlFile(filePath, htmlContent, blogsDir);

    console.log(`✅ Rebuilt: ${relativePath}`);
  } catch (error) {
    console.error(`❌ Error rebuilding ${filePath}:`, error);
  }
};

/**
 * 파일 변경 감시 설정
 * @param reusableBrowserType - Mermaid 렌더링에 사용할 BrowserType (브라우저 재사용 래퍼)
 */
const watchFiles = (reusableBrowserType: BrowserType) => {
  console.log(`👀 Watching for changes in: ${blogsDir}`);

  watch(blogsDir, { recursive: true }, async (eventType, filename) => {
    if (filename && filename.endsWith('.md')) {
      // 경로 정규화 (하위 디렉토리의 경우 처리)
      const fullPath = join(blogsDir, filename);
      // 디바운스: 짧은 시간 내 여러 이벤트 무시
      setTimeout(async () => {
        await rebuildFile(fullPath, reusableBrowserType);
      }, 100);
    }
  });
};

/**
 * HTTP 서버 시작
 */
const startServer = () => {
  const server = createServer(async (req, res) => {
    try {
      // URL에서 경로 추출 및 디코딩 (한글 파일명 지원)
      let filePath = req.url || '/';
      try {
        filePath = decodeURIComponent(filePath);
      } catch {
        // 이미 디코딩된 경로이거나 잘못된 인코딩인 경우 그대로 사용
      }

      // 루트 경로는 index.html로
      if (filePath === '/') {
        filePath = '/index.html';
      }

      // dist 디렉토리 기준으로 파일 경로 생성
      const fullPath = join(process.cwd(), 'dist', filePath);

      // 파일이 존재하는지 확인
      if (!existsSync(fullPath)) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
        console.log(`❌ 404: ${filePath}`);
        return;
      }

      // 파일 읽기
      const content = await readFile(fullPath);

      // MIME 타입 결정
      const ext = extname(filePath);
      const mimeType = MIME_TYPES[ext] || 'text/plain';

      // 개발 환경에 적합한 캐시 헤더 설정
      const headers: Record<string, string> = {
        'Content-Type': mimeType,
        // 캐시 무효화: 항상 최신 버전 확인
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      };

      // 응답
      res.writeHead(200, headers);
      res.end(content);

      console.log(`✅ Served: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error serving ${req.url}:`, error);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 - Internal Server Error</h1>');
    }
  });

  server.listen(PORT, () => {
    console.log(`\n🚀 Dev server running at:`);
    console.log(`   http://localhost:${PORT}\n`);
    console.log(`📝 Draft posts are included!`);
    console.log(`Press Ctrl+C to stop\n`);
  });
};

/**
 * 서버를 실행하는 메인 함수
 */
const serve = async () => {
  /**
   * Mermaid는 D3.js를 사용해 SVG를 렌더링하며, D3.js는 DOM API에 의존합니다.
   * Node.js에는 DOM이 없으므로, Playwright로 헤드리스 Chromium 브라우저를 실행하여
   * Mermaid가 SVG를 생성할 수 있는 브라우저 환경을 제공합니다.
   * 개발 서버 실행 시 브라우저를 한 번만 실행하여 초기 빌드와 파일 변경 감지 재빌드에 재사용합니다.
   *
   * 브라우저 실행이 실패하면 Chromium이 설치되지 않은 것입니다:
   * npx playwright install chromium
   */
  const browser = await chromium.launch();

  /**
   * mermaid-isomorphic은 내부적으로 browserType.launch()를 호출하여 브라우저를 생성합니다.
   * 이 래퍼는 이미 실행된 브라우저를 재사용하도록 하여 브라우저가 1번만 실행되게 합니다.
   * 래퍼의 launch()는 기존 브라우저의 newContext만 위임하고, close()는 무시합니다.
   * 실제 브라우저는 개발 서버 프로세스가 종료될 때 함께 종료됩니다.
   */
  const reusableBrowserType = {
    launch: async () => ({
      newContext: (options: object) => browser.newContext(options),
      close: async () => {},
    }),
  } as unknown as BrowserType;

  // 1. 초기 빌드 (draft 포함)
  await buildAll(reusableBrowserType);

  // 2. 파일 변경 감시 시작
  watchFiles(reusableBrowserType);

  // 3. HTTP 서버 시작
  startServer();
};

serve();
