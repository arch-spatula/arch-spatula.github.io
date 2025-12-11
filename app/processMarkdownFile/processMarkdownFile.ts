import { unified } from 'unified';
import markdown from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import rehypeShiki from '@shikijs/rehype';
import rehypeSlug from 'rehype-slug';
import type { Metadata } from '../types';
import { render } from '../utils/templateEngine';
import type { Root } from 'mdast';
import { extractToc } from '../utils/extractToc';

// Callout 타입 정의
const CALLOUT_TYPES = ['info', 'caution', 'warning', 'tip', 'note', 'danger'];

/**
 * directive를 HTML callout 요소로 변환하는 플러그인
 * :::info, :::caution, :::warning 등의 문법을 지원
 */
function remarkCallout() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' && CALLOUT_TYPES.includes((node as { name: string }).name)) {
        const directiveNode = node as { name: string; data?: Record<string, unknown> };
        const data = directiveNode.data || (directiveNode.data = {});
        data.hName = 'div';
        data.hProperties = {
          className: ['callout', `callout-${directiveNode.name}`],
        };
      }
    });
  };
}

/**
 * 마크다운 콘텐츠를 HTML로 변환 (shiki 코드 하이라이팅 적용)
 */
export const convertMarkdownToHtml = async (markdownSource: string) => {
  const htmlText = await unified()
    .use(markdown)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkCallout)
    .use(remark2rehype)
    .use(rehypeSlug)
    .use(rehypeShiki, {
      theme: 'catppuccin-mocha',
    })
    .use(html)
    .process(markdownSource);

  if (typeof htmlText.value === 'string') {
    return htmlText.value;
  }

  return '';
};

export type PostNavigation = {
  filePath?: string;
  title?: string;
};

/**
 * 마크다운 콘텐츠를 HTML로 변환하고 템플릿에 렌더링하는 함수
 *
 * @param markdownContent - 마크다운 콘텐츠 (frontmatter 제외)
 * @param metadata - 이미 파싱된 메타데이터
 * @param appTemplate - 앱 템플릿
 * @param postTemplate - 포스트 템플릿
 * @param searchTemplate - 검색 템플릿
 * @param previousPost - 이전 글 정보
 * @param nextPost - 다음 글 정보
 * @returns 렌더링된 HTML 콘텐츠
 *
 * @example
 * const markdownContent = `# Test Title\n\nThis is content.`;
 * const metadata = { title: 'Test Title', date: '2021-01-01' };
 * const htmlContent = await processMarkdownFile(markdownContent, metadata, appTemplate, postTemplate, searchTemplate, previousPost, nextPost);
 */
const processMarkdownFile = async (
  markdownContent: string,
  metadata: Metadata,
  appTemplate: string,
  postTemplate: string,
  searchTemplate: string,
  previousPost?: PostNavigation,
  nextPost?: PostNavigation,
) => {
  const htmlContent = await convertMarkdownToHtml(markdownContent);
  const toc = extractToc(htmlContent);

  const bodyHtml = render(postTemplate, {
    content: htmlContent,
    tags: metadata.tags ?? [],
    toc,
    previousPost: !!previousPost,
    previousPostFilePath: previousPost?.filePath ?? '',
    previousPostTitle: previousPost?.title ?? '',
    nextPost: !!nextPost,
    nextPostFilePath: nextPost?.filePath ?? '',
    nextPostTitle: nextPost?.title ?? '',
  });
  const appHtml = render(appTemplate, {
    body: bodyHtml,
    title: ` - ${metadata.title ?? ''}`,
    description: metadata.description ?? '',
    tags: metadata.tags?.join(', ') ?? '',
    authors: metadata.authors?.join(', ') ?? '',
    date: metadata.date ?? '',
    search: searchTemplate,
  });

  return appHtml;
};

export default processMarkdownFile;
