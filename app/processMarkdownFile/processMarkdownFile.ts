import { unified } from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import type { Metadata } from '../types';

const convertMarkdownToHtml = (markdownSource: string) => {
  const htmlText = unified().use(markdown).use(remark2rehype).use(html).processSync(markdownSource);

  if (typeof htmlText.value === 'string') {
    return htmlText.value;
  }

  return '';
};

/**
 * ---으로 시작하고 ---으로 끝나는 부분을 찾아서 분리
 * 메타정보를 입력하지 않은 경우 빈 문자열을 반환
 * 파일이 ---으로 시작하면 2번째 ---으로 끝나는 부분을 찾아서 분리
 */
export const splitMetadataAndContent = (content: string) => {
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
export const parseMetadata = (metadata: string) => {
  const metadataObject: Metadata = {};
  const metadataLines = metadata.split('\n');

  let i = 0;
  while (i < metadataLines.length) {
    const line = metadataLines[i].trim();

    // 빈 줄 스킵
    if (!line) {
      i++;
      continue;
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) {
      i++;
      continue;
    }

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // 배열 처리
    // 1. value가 빈 문자열이고 다음 줄이 [로 시작하는 경우
    if (value === '' && i + 1 < metadataLines.length) {
      const nextLine = metadataLines[i + 1].trim();
      if (nextLine.startsWith('[')) {
        i++; // 다음 줄로 이동
        value = nextLine;
      }
    }

    if (value.startsWith('[')) {
      // 한 줄에 배열이 완성된 경우
      if (value.endsWith(']')) {
        const arrayString = value.slice(1, -1); // [ ] 제거
        const items = arrayString.split(',').map((item) => {
          const trimmed = item.trim();
          // 작은따옴표 제거
          if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
            return trimmed.slice(1, -1);
          }
          return trimmed;
        });
        metadataObject[key] = items;
        i++;
        continue;
      }

      // 여러 줄에 걸쳐 있는 배열
      let arrayString = value.slice(1); // [ 제거
      i++;
      while (i < metadataLines.length) {
        const nextLine = metadataLines[i].trim();
        arrayString += ` ${nextLine}`;
        if (nextLine.includes(']')) {
          break;
        }
        i++;
      }

      // 배열 파싱
      const closingBracketIndex = arrayString.indexOf(']');
      if (closingBracketIndex !== -1) {
        const arrayContent = arrayString.slice(0, closingBracketIndex);
        const items = arrayContent
          .split(',')
          .map((item) => {
            const trimmed = item.trim();
            // 작은따옴표 제거
            if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
              return trimmed.slice(1, -1);
            }
            return trimmed;
          })
          .filter((item) => item !== '');
        metadataObject[key] = items;
      }
      i++;
      continue;
    }

    // 일반 문자열 값
    metadataObject[key] = value;
    i++;
  }

  return metadataObject;
};

/**
 *
 * @param content - 마크다운 파일 내용
 * @example
 * const content = `
 * ---
 * title: Test Title
 * date: 2021-01-01
 * tags: [blog, wanted]
 * description: Test Description
 * `;
 * const { htmlContent, metadata } = processMarkdownFile(content);
 * console.log('htmlContent: ', htmlContent);
 * console.log('metadata: ', metadata);
 */
const processMarkdownFile = async (content: string) => {
  const { metadata, markdownContent } = splitMetadataAndContent(content);
  const htmlContent = convertMarkdownToHtml(markdownContent);
  // TODO: parsedMetadata를 사용할지 결정 필요
  const parsedMetadata = parseMetadata(metadata);
  return { htmlContent, metadata: parsedMetadata };
};

export default processMarkdownFile;
