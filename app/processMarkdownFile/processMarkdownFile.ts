import { unified } from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import rehypeShiki from '@shikijs/rehype';
import type { Metadata } from '../types';
import { render } from '../utils/templateEngine';

/**
 * 마크다운 콘텐츠를 HTML로 변환 (shiki 코드 하이라이팅 적용)
 */
export const convertMarkdownToHtml = async (markdownSource: string) => {
  const htmlText = await unified()
    .use(markdown)
    .use(remark2rehype)
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

/**
 * 마크다운 콘텐츠를 HTML로 변환하고 템플릿에 렌더링하는 함수
 *
 * @param markdownContent - 마크다운 콘텐츠 (frontmatter 제외)
 * @param metadata - 이미 파싱된 메타데이터
 * @param appTemplate - 앱 템플릿
 * @param postTemplate - 포스트 템플릿
 * @returns 렌더링된 HTML 콘텐츠
 *
 * @example
 * const markdownContent = `# Test Title\n\nThis is content.`;
 * const metadata = { title: 'Test Title', date: '2021-01-01' };
 * const htmlContent = await processMarkdownFile(markdownContent, metadata, appTemplate, postTemplate);
 */
const processMarkdownFile = async (
  markdownContent: string,
  metadata: Metadata,
  appTemplate: string,
  postTemplate: string,
  searchTemplate: string,
) => {
  const htmlContent = await convertMarkdownToHtml(markdownContent);

  const bodyHtml = render(postTemplate, { content: htmlContent, tags: metadata.tags ?? [] });
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
