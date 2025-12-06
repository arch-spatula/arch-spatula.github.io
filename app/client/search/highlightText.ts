/**
 * 검색어와 일치하는 부분을 하이라이트하여 HTML 생성
 * @param text - 원본 텍스트
 * @param query - 검색어 (대소문자 구분 없음)
 * @returns 하이라이트된 HTML 문자열
 */
export const highlightText = (text: string, query: string): string => {
  if (!query) {
    return `<span>${text}</span>`;
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const result: string[] = [];
  let lastIndex = 0;

  let index = lowerText.indexOf(lowerQuery, lastIndex);
  while (index !== -1) {
    // 일치 전 부분
    if (index > lastIndex) {
      result.push(`<span>${text.slice(lastIndex, index)}</span>`);
    }
    // 일치하는 부분 (원본 대소문자 유지)
    result.push(`<span class="search-highlight">${text.slice(index, index + query.length)}</span>`);
    lastIndex = index + query.length;
    index = lowerText.indexOf(lowerQuery, lastIndex);
  }

  // 나머지 부분
  if (lastIndex < text.length) {
    result.push(`<span>${text.slice(lastIndex)}</span>`);
  }

  return result.join('');
};

