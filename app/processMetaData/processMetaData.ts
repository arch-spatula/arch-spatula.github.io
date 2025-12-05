import { Metadata } from '../types';
import { splitMetadataAndContent } from '../utils/splitMetadataAndContent';

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
 * 마크다운 콘텐츠에서 첫 번째 h1 헤딩(# 제목)을 추출
 * @param markdownContent - 마크다운 콘텐츠
 * @returns 첫 번째 h1 헤딩 텍스트 또는 undefined
 */
export const extractTitleFromMarkdown = (markdownContent: string): string | undefined => {
  // # 으로 시작하는 첫 번째 줄을 찾음 (## 제외)
  const lines = markdownContent.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    // # 으로 시작하고 ## 이 아닌 경우
    if (trimmedLine.startsWith('# ') && !trimmedLine.startsWith('## ')) {
      // # 제거하고 앞뒤 공백 제거
      const title = trimmedLine.slice(2).trim();
      // 마크다운 문법 제거 (bold, italic, code 등)
      const cleanTitle = title
        .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
        .replace(/\*([^*]+)\*/g, '$1') // italic
        .replace(/`([^`]+)`/g, '$1') // inline code
        .replace(/<[^>]+>/g, '') // HTML tags
        .trim();
      if (cleanTitle) {
        return cleanTitle;
      }
    }
  }
  return undefined;
};

/**
 * 마크다운 파일의 메타데이터를 처리하는 함수
 * @param content - 마크다운 파일 전체 내용
 * @param filePath - 마크다운 파일 경로
 * @returns 파싱된 메타데이터와 마크다운 콘텐츠
 */
const processMetaData = (content: string, filePath: string) => {
  const { metadata, markdownContent } = splitMetadataAndContent(content);
  const parsedMetadata = parseMetadata(metadata);

  // 날짜가 없으면 파일 경로에서 추출함
  if (!parsedMetadata.date) {
    // 파일명에서 YYYY-MM-DD 패턴 찾기
    const dateMatch = filePath.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      parsedMetadata.date = dateMatch[1];
    }
  }

  // 타이틀이 없으면 마크다운 콘텐츠에서 첫 번째 h1 헤딩을 추출
  if (!parsedMetadata.title) {
    const extractedTitle = extractTitleFromMarkdown(markdownContent);
    if (extractedTitle) {
      parsedMetadata.title = extractedTitle;
    }
  }

  // HTML 파일 경로 생성 (파일명에서 .md를 .html로 변경)
  const fileName = filePath.split('/').pop()?.replace('.md', '.html') ?? '';
  parsedMetadata.filePath = `/${fileName}`;

  return { metadata: parsedMetadata };
};

export default processMetaData;
