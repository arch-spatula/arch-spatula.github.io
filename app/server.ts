/**
 * @fileoverview 개발 서버를 실행하는 루트 파일
 *
 * draft 상태의 글도 볼 수 있고, 파일 변경 시 자동으로 재빌드
 * - fs.watch 사용해서 파일 변경 감지
 */

/* eslint-disable no-console */
import { createServer } from 'http';
import { readFile, cp, rm } from 'fs/promises';
import { join, basename, extname } from 'path';
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
 */
const buildAll = async () => {
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

  // blogs 폴더의 이미지 파일들을 dist로 복사
  const imageFiles = await listUpImageFiles(blogsDir);
  for (const imagePath of imageFiles) {
    const fileName = basename(imagePath);
    await cp(imagePath, join(process.cwd(), 'dist', fileName));
  }

  // client TypeScript를 JavaScript로 빌드하기
  await esbuild.build({
    entryPoints: [join(process.cwd(), 'app', 'client', 'index.ts')],
    bundle: true,
    minify: true,
    outfile: join(process.cwd(), 'dist', 'script.js'),
    target: 'es2020',
    platform: 'browser',
  });

  // 메타 정보와 마크다운 콘텐츠를 저장할 맵 (파일 경로 기준)
  const contentMap = new Map<string, string>();

  // 메타 정보 처리하기 (draft 필터링 없음!)
  for (const file of markdownfiles) {
    const content = await readMarkdownFile(file.filePath);
    const { metadata } = processMetaData(content, file.filePath);
    // draft 여부와 관계없이 모두 처리
    const { markdownContent } = splitMetadataAndContent(content);
    contentMap.set(file.filePath, markdownContent);
    metaJson.push(metadata);
  }

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
    .sort((a, b) => b.count - a.count);

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
    // 파일 경로에서 HTML 파일 경로 생성하여 메타데이터 찾기
    const fileName = file.filePath.split('/').pop()?.replace('.md', '.html') ?? '';
    const htmlFilePath = `/${fileName}`;
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
    );
    await writeHtmlFile(file.filePath, htmlContent);
    file.isProcessed = true;
  }

  // 블로그 글 목록 index.html 파일로 쓰기
  const MainHtml = render(mainTemplate, { posts: metaJson });
  const AppHtml = render(appTemplate, { body: MainHtml, search: searchHtml });
  writeFileSync(join(process.cwd(), 'dist', 'index.html'), AppHtml, 'utf8');

  console.log('✅ Build completed!');
};

/**
 * 단일 파일 재빌드 함수
 * 파일 변경 시 해당 파일만 재빌드
 */
const rebuildFile = async (filePath: string) => {
  try {
    // 파일이 존재하는지 확인
    if (!existsSync(filePath)) {
      console.log(`⚠️ File not found: ${filePath}`);
      return;
    }

    console.log(`🔄 Rebuilding: ${filePath}`);

    // 마크다운 파일 읽기
    const content = await readMarkdownFile(filePath);
    const { metadata } = processMetaData(content, filePath);
    const { markdownContent } = splitMetadataAndContent(content);

    // 파일명에서 HTML 파일 경로 생성
    const fileName = filePath.split('/').pop()?.replace('.md', '.html') ?? '';
    const htmlFilePath = `/${fileName}`;

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
    );
    await writeHtmlFile(filePath, htmlContent);

    console.log(`✅ Rebuilt: ${fileName}`);
  } catch (error) {
    console.error(`❌ Error rebuilding ${filePath}:`, error);
  }
};

/**
 * 파일 변경 감시 설정
 */
const watchFiles = () => {
  console.log(`👀 Watching for changes in: ${blogsDir}`);

  watch(blogsDir, { recursive: true }, async (eventType, filename) => {
    if (filename && filename.endsWith('.md')) {
      // 경로 정규화 (하위 디렉토리의 경우 처리)
      const fullPath = join(blogsDir, filename);
      // 디바운스: 짧은 시간 내 여러 이벤트 무시
      setTimeout(async () => {
        await rebuildFile(fullPath);
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
      // URL에서 경로 추출
      let filePath = req.url || '/';

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
  // 1. 초기 빌드 (draft 포함)
  await buildAll();

  // 2. 파일 변경 감시 시작
  watchFiles();

  // 3. HTTP 서버 시작
  startServer();
};

serve();
