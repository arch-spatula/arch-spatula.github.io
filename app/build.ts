/**
 * @fileoverview 빌드를 처리하는 루트 파일
 *
 * @todo 읽기 로직 구현
 * @todo 처리 로직 구현
 * @todo 쓰기 로직 구현
 */

import { readFileSync } from 'fs';
import { readdir } from 'fs/promises';
import { unified } from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import path, { join } from 'path';

type BlogPost = {
  slug: string;
  filePath: string;
  dirPath: string | null;
  isInFolder: boolean;
  isProcessed: boolean;
};

/**
 * @param dirPath 디렉토리 경로
 * @param baseDir 기본 디렉토리 경로
 * @returns 블로그 포스트 목록을 반환함
 *   - 파일 내 정보는 다른 함수에서 처리함
 */
const findMarkdownFiles = async (dirPath: string, baseDir: string = dirPath) => {
  const posts: BlogPost[] = [];

  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // 재귀적으로 하위 디렉토리 탐색
      const subPosts = await findMarkdownFiles(fullPath, baseDir);
      posts.push(...subPosts);
    } else if (entry.isFile() && path.extname(entry.name) === '.md') {
      const isInFolder = dirPath !== baseDir;
      const slug = isInFolder ? path.basename(dirPath) : path.basename(entry.name, '.md');

      posts.push({
        slug,
        filePath: fullPath,
        dirPath: isInFolder ? dirPath : null,
        isInFolder,
        isProcessed: false,
      });
    }
  }

  return posts;
};

const readMarkdownFile = async (dirPath: string) => {
  const content = await readFileSync(dirPath, 'utf8');
  return content;
};

const markdownToHtml = (markdownSource: string) => {
  const html_text = unified().use(markdown).use(remark2rehype).use(html).processSync(markdownSource);

  if (typeof html_text.value === 'string') {
    return html_text.value;
  }

  return '';
};

/**
 * ---으로 시작하고 ---으로 끝나는 부분을 찾아서 분리
 * 메타정보를 입력하지 않은 경우 빈 문자열을 반환
 * 파일이 ---으로 시작하면 2번째 ---으로 끝나는 부분을 찾아서 분리
 */
const splitMetadataAndContent = (content: string) => {
  const start = content.indexOf('---');
  if (start === -1 || start !== 0) {
    return { metadata: '', markdownContent: content };
  }
  // 2번째 ---으로 끝나는 부분을 찾아서 분리
  const end = content.indexOf('---', start + 4);
  if (end === -1) {
    return { metadata: '', markdownContent: content };
  }
  const metadata = content.slice(start + 4, end).trim();
  const markdownContent = content.slice(end + 4).trim();
  return { metadata, markdownContent };
};

/**
 * metadata 파싱
 * 허용하지 않은 키가 있으면 에러를 발생시킴
 * 필수키가 없으면 에러를 발생시킴
 */
const parseMetadata = (metadata: string) => {
  const metadataObject = {};
  const metadataLines = metadata.split('\n');
  for (const line of metadataLines) {
    const [key, value] = line.split(':');
    metadataObject[key] = value;
  }
  return metadataObject;
};

const processMarkdownFile = async (content: string) => {
  const { metadata, markdownContent } = splitMetadataAndContent(content);
  const htmlContent = markdownToHtml(markdownContent);
  const parsedMetadata = parseMetadata(metadata);
  return { htmlContent, metadata };
};

const writeHtmlFiles = async () => {
  //
};

const listUpMarkdownFiles = async (dirPath: string, baseDir: string = dirPath) => {
  const posts: { filePath: string; isProcessed: boolean }[] = [];

  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // 재귀적으로 하위 디렉토리 탐색
      const subPosts = await listUpMarkdownFiles(fullPath, baseDir);
      posts.push(...subPosts);
    } else if (entry.isFile() && path.extname(entry.name) === '.md') {
      posts.push({
        filePath: fullPath,
        isProcessed: false,
      });
    }
  }
  return posts;
};

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
  // content/blogs의 모든 마크다운 파일 가져오기
  const blogsDir = join(process.cwd(), 'blogs');
  const markdownfiles = await listUpMarkdownFiles(blogsDir);
  for (const file of markdownfiles) {
    const content = await readMarkdownFile(file.filePath);
    const processedContent = await processMarkdownFile(content);
    // @todo 처리된 내용을 파일로 쓰기
    file.isProcessed = true;
  }
};

build();
