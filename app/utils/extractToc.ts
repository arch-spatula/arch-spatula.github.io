export type TocItem = {
  id: string;
  heading: string;
  level: number;
};

/**
 * HTML 문자열에서 h2~h6 헤딩을 추출하여 TOC 데이터를 생성합니다.
 *
 * @param html - HTML 문자열
 * @returns TOC 항목 배열 (id, heading, level)
 *
 * @example
 * const html = '<h2 id="intro">Introduction</h2><h3 id="sub">Subsection</h3>';
 * const toc = extractToc(html);
 * // [{ id: 'intro', heading: 'Introduction', level: 2 }, { id: 'sub', heading: 'Subsection', level: 3 }]
 */
export const extractToc = (html: string): TocItem[] => {
  const toc: TocItem[] = [];

  // h2~h6 태그에서 id와 텍스트 콘텐츠 추출
  // 패턴: <h2 id="xxx">텍스트</h2> ~ <h6 id="xxx">텍스트</h6>
  const headingRegex = /<h([2-6])\s+id="([^"]+)"[^>]*>([^<]*(?:<[^/h][^>]*>[^<]*)*)<\/h\1>/gi;

  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    // HTML 태그 제거하여 순수 텍스트만 추출
    const heading = match[3].replace(/<[^>]*>/g, '').trim();

    if (id && heading) {
      toc.push({ id, heading, level });
    }
  }

  return toc;
};
