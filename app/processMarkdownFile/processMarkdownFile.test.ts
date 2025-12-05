import { describe, it, expect } from 'vitest';
import processMarkdownFile, { convertMarkdownToHtml } from './processMarkdownFile';

describe('convertMarkdownToHtml', () => {
  it('should convert markdown heading to HTML', () => {
    const markdown = '# Heading 1';
    const html = convertMarkdownToHtml(markdown);
    expect(html).toBe('<h1>Heading 1</h1>');
  });

  it('should convert markdown list to HTML', () => {
    const markdown = `- List item 1
- List item 2`;
    const html = convertMarkdownToHtml(markdown);
    expect(html).toContain('<li>List item 1</li>');
    expect(html).toContain('<li>List item 2</li>');
  });

  it('should convert markdown bold to HTML', () => {
    const markdown = '**Bold text**';
    const html = convertMarkdownToHtml(markdown);
    expect(html).toContain('<strong>Bold text</strong>');
  });

  it('should handle empty content', () => {
    const markdown = '';
    const html = convertMarkdownToHtml(markdown);
    expect(html).toBe('');
  });
});

describe('processMarkdownFile', () => {
  it('should convert markdown content to HTML with templates', () => {
    const markdownContent = `# Heading 1

## Heading 2

- List item 1
- List item 2

**Bold text**`;
    const metadata = { title: 'Test', date: '2023-01-01' };
    const postTemplate = '{{content}}';
    const appTemplate = '{{body}}';
    const searchTemplate = '{{search}}';

    const htmlContent = processMarkdownFile(markdownContent, metadata, appTemplate, postTemplate, searchTemplate);

    expect(htmlContent).toContain('<h1>Heading 1</h1>');
    expect(htmlContent).toContain('<h2>Heading 2</h2>');
    expect(htmlContent).toContain('<li>List item 1</li>');
    expect(htmlContent).toContain('<strong>Bold text</strong>');
  });

  it('should render metadata into template', () => {
    const markdownContent = '# Test Content';
    const metadata = {
      title: 'My Title',
      description: 'My Description',
      tags: ['tag1', 'tag2'],
      authors: ['author1'],
      date: '2023-04-12',
    };
    const postTemplate = '<article>{{content}}</article>';
    const appTemplate = `<html>
<head>
  <title>{{title}}</title>
  <meta name="description" content="{{description}}">
</head>
<body>{{body}}</body>
</html>`;
    const searchTemplate = '{{search}}';
    const htmlContent = processMarkdownFile(markdownContent, metadata, appTemplate, postTemplate, searchTemplate);

    expect(htmlContent).toContain('<title> - My Title</title>');
    expect(htmlContent).toContain('content="My Description"');
    expect(htmlContent).toContain('<article>');
    expect(htmlContent).toContain('<h1>Test Content</h1>');
  });

  it('should handle empty metadata fields', () => {
    const markdownContent = '# Content';
    const metadata = {};
    const postTemplate = '{{content}}';
    const appTemplate = '<title>{{title}}</title>{{body}}';
    const searchTemplate = '{{search}}';

    const htmlContent = processMarkdownFile(markdownContent, metadata, appTemplate, postTemplate, searchTemplate);

    expect(htmlContent).toContain('<title> - </title>');
    expect(htmlContent).toContain('<h1>Content</h1>');
  });

  it('should join tags with comma', () => {
    const markdownContent = '# Content';
    const metadata = { tags: ['blog', 'test', 'typescript'] };
    const postTemplate = '{{content}}';
    const appTemplate = '<meta name="keywords" content="{{tags}}">{{body}}';
    const searchTemplate = '{{search}}';

    const htmlContent = processMarkdownFile(markdownContent, metadata, appTemplate, postTemplate, searchTemplate);

    expect(htmlContent).toContain('content="blog, test, typescript"');
  });

  it('should join authors with comma', () => {
    const markdownContent = '# Content';
    const metadata = { authors: ['author1', 'author2'] };
    const postTemplate = '{{content}}';
    const appTemplate = '<meta name="authors" content="{{authors}}">{{body}}';
    const searchTemplate = '{{search}}';

    const htmlContent = processMarkdownFile(markdownContent, metadata, appTemplate, postTemplate, searchTemplate);

    expect(htmlContent).toContain('content="author1, author2"');
  });

  it('should handle complete blog post rendering', () => {
    const markdownContent = `# 원티드 프리온보딩 과제 - 3일차

This is the content.`;
    const metadata = {
      title: '원티드 프리온보딩 과제 - 3일차',
      authors: ['arch-spatula'],
      tags: ['blog', 'wanted', 'pre-on-boarding'],
      description: '원티드 과제 진행과정',
      date: '2023-04-12',
      filePath: '/2023-04-12.html',
    };
    const postTemplate = '<main>{{content}}</main>';
    const appTemplate = '<!DOCTYPE html><html><body>{{body}}</body></html>';
    const searchTemplate = '{{search}}';

    const htmlContent = processMarkdownFile(markdownContent, metadata, appTemplate, postTemplate, searchTemplate);

    expect(htmlContent).toContain('<h1>원티드 프리온보딩 과제 - 3일차</h1>');
    expect(htmlContent).toContain('<main>');
    expect(htmlContent).toContain('<!DOCTYPE html>');
  });
});
