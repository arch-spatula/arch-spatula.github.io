import { describe, it, expect } from 'vitest';
import processMarkdownFile, { parseMetadata, splitMetadataAndContent } from './processMarkdownFile';

describe('splitMetadataAndContent', () => {
  it('should return the metadata and markdown content', () => {
    const content = `---
title: Test Title
date: 2021-01-01
---
# Test Content`;

    const { metadata, markdownContent } = splitMetadataAndContent(content);

    expect(metadata).toBe('title: Test Title\ndate: 2021-01-01');
    expect(markdownContent).toBe('# Test Content');
  });
});

describe('parseMetadata', () => {
  it('should return the metadata object', () => {
    const metadata = `title: Test Title
date: 2021-01-01
tags: [blog, wanted]
description: Test Description`;
    const metadataObject = parseMetadata(metadata);
    expect(metadataObject).toEqual({
      title: 'Test Title',
      date: '2021-01-01',
      tags: ['blog', 'wanted'],
      description: 'Test Description',
    });
  });

  it('should return the metadata object with multiple tags', () => {
    const metadata = `title: 원티드 프리온보딩 과제 - 6일차
authors: [arch-spatula]
tags:
  [
    'blog',
    'wanted',
    'pre-on-boarding',
    'Cannot use import statement outside a module',
    'Jest Mocking',
    'jest',
    'try-catch error type',
  ]
description: 원티드 과제 진행과정
date: 2023-04-15`;
    const metadataObject = parseMetadata(metadata);
    expect(metadataObject).toEqual({
      title: '원티드 프리온보딩 과제 - 6일차',
      authors: ['arch-spatula'],
      tags: [
        'blog',
        'wanted',
        'pre-on-boarding',
        'Cannot use import statement outside a module',
        'Jest Mocking',
        'jest',
        'try-catch error type',
      ],
      description: '원티드 과제 진행과정',
      date: '2023-04-15',
    });
  });
});

describe('processMarkdownFile', () => {
  it('should generate HTML file path from markdown file path', async () => {
    const content = `---
title: Test Post
description: Test description
tags: [test, blog]
---
# Test Content

This is a test.`;
    const filePath = '/path/to/blogs/2023-04-12.md';

    const { metadata } = await processMarkdownFile(content, filePath, '', '');

    expect(metadata.filePath).toBe('/2023-04-12.html');
  });

  it('should generate HTML file path for nested directories', async () => {
    const content = `---
title: Test Post
---
# Content`;
    const filePath = '/Users/user/project/blogs/2024-01-15/2024-01-15-post.md';

    const { metadata } = await processMarkdownFile(content, filePath, '', '');

    expect(metadata.filePath).toBe('/2024-01-15-post.html');
  });

  it('should extract date from filename when metadata has no date', async () => {
    const content = `---
title: Post without date
---
# Content`;
    const filePath = '/path/to/2023-12-25-christmas.md';

    const { metadata } = await processMarkdownFile(content, filePath, '', '');

    expect(metadata.date).toBe('2023-12-25');
    expect(metadata.filePath).toBe('/2023-12-25-christmas.html');
  });

  it('should use metadata date when provided', async () => {
    const content = `---
title: Post with date
date: 2023-11-11
---
# Content`;
    const filePath = '/path/to/some-file.md';

    const { metadata } = await processMarkdownFile(content, filePath, '', '');

    expect(metadata.date).toBe('2023-11-11');
  });

  it('should extract title from h1 when metadata has no title', async () => {
    const content = `---
description: Description only
---
# This is the Title

Content here.`;
    const filePath = '/path/to/test.md';

    const { metadata } = await processMarkdownFile(content, filePath, '', '');

    expect(metadata.title).toBe('This is the Title');
    expect(metadata.filePath).toBe('/test.html');
  });

  it('should convert markdown content to HTML', async () => {
    const content = `---
title: Test
---
# Heading 1

## Heading 2

- List item 1
- List item 2

**Bold text**`;
    const filePath = '/path/to/test.md';

    // 간단한 템플릿을 사용하여 변환된 HTML 콘텐츠를 확인
    const postTemplate = '{{content}}';
    const appTemplate = '{{body}}';

    const { htmlContent } = await processMarkdownFile(content, filePath, appTemplate, postTemplate);

    expect(htmlContent).toContain('<h1>Heading 1</h1>');
    expect(htmlContent).toContain('<h2>Heading 2</h2>');
    expect(htmlContent).toContain('<li>List item 1</li>');
    expect(htmlContent).toContain('<strong>Bold text</strong>');
  });

  it('should handle complete blog post structure', async () => {
    const content = `---
title: 원티드 프리온보딩 과제 - 3일차
authors: [arch-spatula]
tags: ['blog', 'wanted', 'pre-on-boarding']
description: 원티드 과제 진행과정
date: 2023-04-12
---

# 원티드 프리온보딩 과제 - 3일차

This is the content.`;
    const filePath = '/path/to/blogs/2023-04-12.md';

    // 간단한 템플릿을 사용하여 변환된 HTML 콘텐츠를 확인
    const postTemplate = '{{content}}';
    const appTemplate = '{{body}}';

    const { metadata, htmlContent } = await processMarkdownFile(content, filePath, appTemplate, postTemplate);

    expect(metadata.title).toBe('원티드 프리온보딩 과제 - 3일차');
    expect(metadata.authors).toEqual(['arch-spatula']);
    expect(metadata.tags).toEqual(['blog', 'wanted', 'pre-on-boarding']);
    expect(metadata.description).toBe('원티드 과제 진행과정');
    expect(metadata.date).toBe('2023-04-12');
    expect(metadata.filePath).toBe('/2023-04-12.html');
    expect(htmlContent).toContain('<h1>원티드 프리온보딩 과제 - 3일차</h1>');
  });
});
