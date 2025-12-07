/**
 * @fileoverview 빌드를 처리하는 루트 파일
 *
 */

import { join, basename } from 'path';
import listUpMarkdownFiles from './listUpMarkdownFiles/listUpMarkdownFiles';
import listUpImageFiles from './listUpImageFiles/listUpImageFiles';
import readMarkdownFile from './readMarkdownFile/readMarkdownFile';
import processMarkdownFile from './processMarkdownFile/processMarkdownFile';
import { Metadata } from './types';
import writeHtmlFile from './writeHtmlFile/writeHtmlFile';
import { cp, readFile, rm } from 'fs/promises';
import { mkdirSync, writeFileSync } from 'fs';
import { render } from './utils/templateEngine';
import * as esbuild from 'esbuild';
import processMetaData from './processMetaData/processMetaData';
import { splitMetadataAndContent } from './utils/splitMetadataAndContent';

/**
 * 모든 빌드 로직의 호출을 처리하는 함수
 *
 * 2단계 빌드 로직
 * 1. 마크다운 파일들 리스트업하기
 * 2. 리스트업된 파일들 읽고, 처리하고, html로 파일 쓰기
 *
 * 3계층 구조를 유지하고자 함
 * 1. 마크다운 파일 읽기 계층:
 *   - 마크 다운 파일들을 찾고 처리할 대상들을 기록함
 * 2. 마크다운 처리 및 html 변환 계층:
 *   - 마크다운 파일을 처리하고 html로 변환함
 * 3. html dist로 파일에 쓰기 계층:
 *   - 처리된 html 파일을 dist 폴더에 쓰기
 */
const build = async () => {
  const metaJson: Metadata[] = [];

  const appTemplate = await readFile(join(process.cwd(), 'app', 'templates', 'app.html'), 'utf8');
  const postTemplate = await readFile(join(process.cwd(), 'app', 'templates', 'post.html'), 'utf8');
  const mainTemplate = await readFile(join(process.cwd(), 'app', 'templates', 'main.html'), 'utf8');
  const searchTemplate = await readFile(join(process.cwd(), 'app', 'templates', 'search.html'), 'utf8');

  // /blogs의 모든 마크다운 파일 가져오기
  const blogsDir = join(process.cwd(), 'blogs');
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

  // 메타 정보 처리하기
  for (const file of markdownfiles) {
    const content = await readMarkdownFile(file.filePath);
    const { metadata } = processMetaData(content, file.filePath);
    if (metadata.draft) {
      file.isProcessed = true;
      continue;
    }
    // 마크다운 콘텐츠도 함께 저장
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
    .sort((a, b) => b.count - a.count); // 많이 사용된 태그 순으로 정렬

  // @todo dist/meta.json 파일로 쓰기
  writeFileSync(join(process.cwd(), 'dist', 'meta.json'), JSON.stringify(metaJson.reverse(), null, 2), 'utf8');

  // 검색 템플릿 렌더링
  const SearchHtml = render(searchTemplate, { tags, posts: metaJson });

  // 마크다운 파일 쓰기
  for (const file of markdownfiles) {
    const markdownContent = contentMap.get(file.filePath);
    if (!markdownContent) {
      continue; // draft이거나 콘텐츠가 없는 경우 스킵
    }
    // 파일 경로에서 HTML 파일 경로 생성하여 메타데이터 찾기
    const fileName = file.filePath.split('/').pop()?.replace('.md', '.html') ?? '';
    const htmlFilePath = `/${fileName}`;
    const targetMeta = metaJson.find((meta) => meta.filePath === htmlFilePath);
    if (!targetMeta) {
      continue;
    }
    const htmlContent = await processMarkdownFile(markdownContent, targetMeta, appTemplate, postTemplate, SearchHtml);
    await writeHtmlFile(file.filePath, htmlContent);
    file.isProcessed = true;
  }

  // @todo 블로그 글 목록 index.html 파일로 쓰기
  const MainHtml = render(mainTemplate, { posts: metaJson });
  const AppHtml = render(appTemplate, { body: MainHtml, search: SearchHtml });
  writeFileSync(join(process.cwd(), 'dist', 'index.html'), AppHtml, 'utf8');
};

build();
