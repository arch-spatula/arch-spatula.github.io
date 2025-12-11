import type { Root, Element } from 'hast';
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';

export type TocItem = {
  id: string;
  heading: string;
  level: number;
};

const HEADING_TAGS = ['h2', 'h3', 'h4', 'h5', 'h6'];

/**
 * rehype 플러그인: HAST에서 h2~h6 헤딩을 추출하여 TOC 데이터를 생성합니다.
 * rehype-slug 이후에 사용해야 id가 보장됩니다.
 *
 * @param options - TOC 항목을 저장할 배열을 포함한 옵션 객체
 * @returns rehype 플러그인 함수
 *
 * @example
 * const toc: TocItem[] = [];
 * unified()
 *   .use(rehypeSlug)
 *   .use(rehypeExtractToc, { toc })
 *   .use(html)
 *   .process(content);
 * // toc 배열에 헤딩 정보가 채워짐
 */
export const rehypeExtractToc = (options: { toc: TocItem[] }) => (tree: Root) => {
  visit(tree, 'element', (node: Element) => {
    if (HEADING_TAGS.includes(node.tagName)) {
      const id = node.properties?.id;
      const heading = toString(node);

      if (typeof id === 'string' && heading) {
        options.toc.push({
          id,
          heading,
          level: parseInt(node.tagName[1], 10),
        });
      }
    }
  });
};
