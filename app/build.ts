/**
 * @fileoverview 빌드를 처리하는 루트 파일
 *
 * @todo 쓰기 로직 구현
 * @todo meta.json 파일 쓰기
 * @todo index.html 파일 쓰기
 * @todo html 템플릿 활용해서 처리된 내용을 파일로 쓰기
 */

import { join } from 'path';
import listUpMarkdownFiles from './listUpMarkdownFiles/listUpMarkdownFiles';
import readMarkdownFile from './readMarkdownFile/readMarkdownFile';
import processMarkdownFile from './processMarkdownFile/processMarkdownFile';
import { Metadata } from './types';
import writeHtmlFile from './writeHtmlFile/writeHtmlFile';
import { cp, readFile, rm } from 'fs/promises';
import { mkdirSync, writeFileSync } from 'fs';
import { render } from './utils/templateEngine';

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

  // content/blogs의 모든 마크다운 파일 가져오기
  const blogsDir = join(process.cwd(), 'blogs');
  const markdownfiles = await listUpMarkdownFiles(blogsDir);

  // dist 폴더 내용 초기화하기
  await rm(join(process.cwd(), 'dist'), { recursive: true, force: true });
  mkdirSync(join(process.cwd(), 'dist'), { recursive: true });

  // asset 폴더 내용 복사하기
  await cp(join(process.cwd(), 'app', 'asset'), join(process.cwd(), 'dist'), { recursive: true });

  // 마크다운 파일들 처리하기
  for (const file of markdownfiles) {
    const content = await readMarkdownFile(file.filePath);
    const { metadata, htmlContent } = await processMarkdownFile(content, file.filePath, appTemplate, postTemplate);
    if (metadata.draft) {
      file.isProcessed = true;
      continue;
    }

    metaJson.push(metadata);
    await writeHtmlFile(file.filePath, htmlContent);
    file.isProcessed = true;
  }

  // @todo dist/meta.json 파일로 쓰기
  // @todo 블로그 글 목록 index.html 파일로 쓰기
  const MainHtml = render(mainTemplate, { posts: metaJson.reverse() });
  const AppHtml = render(appTemplate, { body: MainHtml });
  writeFileSync(join(process.cwd(), 'dist', 'index.html'), AppHtml, 'utf8');
};

build();
