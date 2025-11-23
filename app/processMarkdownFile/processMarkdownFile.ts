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
 * 앞뒤 공백은 무시
 */
export const splitMetadataAndContent = (content: string) => {
  // 앞뒤 공백 제거
  const trimmedContent = content.trim();

  const start = trimmedContent.indexOf('---');
  if (start === -1 || start !== 0) {
    return { metadata: '', markdownContent: content };
  }
  // 2번째 ---으로 끝나는 부분을 찾아서 분리
  const end = trimmedContent.indexOf('---', start + 4);
  if (end === -1) {
    return { metadata: '', markdownContent: content };
  }
  const metadata = trimmedContent.slice(start + 4, end).trim();
  const markdownContent = trimmedContent.slice(end + 4).trim();
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
    // 따옴표로 감싸진 경우 제거
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      metadataObject[key] = value.slice(1, -1);
    } else {
      metadataObject[key] = value;
    }
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
const processMarkdownFile = async (content: string, filePath: string) => {
  const { metadata, markdownContent } = splitMetadataAndContent(content);
  const htmlContent = convertMarkdownToHtml(markdownContent);
  const parsedMetadata = parseMetadata(metadata);

  // 날짜가 없으면 파일 경로에서 추출함
  if (!parsedMetadata.date) {
    // 파일명에서 YYYY-MM-DD 패턴 찾기
    const dateMatch = filePath.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      parsedMetadata.date = dateMatch[1];
    }
  }

  // 메타 정보의 title이 없으면 content의 가장 먼저 오는 h1 태그를 제목으로 간주함
  if (!parsedMetadata.title) {
    // HTML에서 첫 번째 h1 태그의 내용 추출
    const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) {
      // HTML 태그 제거하고 텍스트만 추출
      const titleText = h1Match[1].replace(/<[^>]+>/g, '').trim();
      if (titleText) {
        parsedMetadata.title = titleText;
      }
    }
  }

  // HTML 파일 경로 생성 (상대 경로)
  // 파일 경로에서 파일명만 추출하고 .md를 .html로 변경
  const fileName = filePath.split('/').pop()?.replace('.md', '.html') ?? '';
  parsedMetadata.filePath = `/${fileName}`;

  return { htmlContent, metadata: parsedMetadata };
};

export default processMarkdownFile;
