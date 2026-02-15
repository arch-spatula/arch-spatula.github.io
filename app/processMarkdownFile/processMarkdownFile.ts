import { unified } from 'unified';
import markdown from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import rehypeShiki from '@shikijs/rehype';
import rehypeSlug from 'rehype-slug';
import rehypeMermaid from 'rehype-mermaid';
import type { BrowserType } from 'playwright';
import type { Metadata } from '../types';
import { render } from '../utils/templateEngine';
import type { Root } from 'mdast';
import { rehypeExtractToc, type TocItem } from '../utils/extractToc';

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
 * 템플릿 문법을 HTML 엔티티로 이스케이프
 * 마크다운에서 변환된 HTML 내의 {{ }}가 템플릿 엔진에서 처리되지 않도록 함
 * 브라우저에서는 {{ }}로 정상 표시됨
 * @param str - 이스케이프할 문자열
 * @returns 이스케이프된 문자열
 */
export const escapeTemplateSyntax = (str: string): string =>
  str.replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;');

/**
 * 마크다운 콘텐츠를 HTML로 변환 (shiki 코드 하이라이팅 적용)
 * @param markdownSource - 마크다운 소스 문자열
 * @param browserType - Mermaid 다이어그램 렌더링에 사용할 Playwright BrowserType
 * @returns HTML 문자열과 TOC 데이터를 포함한 객체
 */
export const convertMarkdownToHtml = async (
  markdownSource: string,
  browserType?: BrowserType,
): Promise<{ html: string; toc: TocItem[] }> => {
  const toc: TocItem[] = [];

  const htmlText = await unified()
    .use(markdown)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkCallout)
    .use(remark2rehype)
    .use(rehypeSlug)
    .use(rehypeExtractToc, { toc })
    .use(rehypeMermaid, {
      strategy: 'inline-svg',
      browserType,
    })
    .use(rehypeShiki, {
      theme: 'catppuccin-mocha',
    })
    .use(html)
    .process(markdownSource);

  if (typeof htmlText.value === 'string') {
    // 템플릿 문법을 이스케이프하여 템플릿 엔진에서 처리되지 않도록 함
    return { html: escapeTemplateSyntax(htmlText.value), toc };
  }

  return { html: '', toc: [] };
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
 * @param browserType - Mermaid 다이어그램 렌더링에 사용할 Playwright BrowserType
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
  browserType?: BrowserType,
) => {
  const { html: htmlContent, toc } = await convertMarkdownToHtml(markdownContent, browserType);

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
