import { describe, it, expect } from 'vitest';
import processMetaData, { parseMetadata, extractTitleFromMarkdown } from './processMetaData';

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

describe('extractTitleFromMarkdown', () => {
  it('should extract title from first h1 tag', () => {
    const markdownContent = `
# Hello World

This is the content.
    `;

    const title = extractTitleFromMarkdown(markdownContent);

    expect(title).toBe('Hello World');
  });

  it('should handle content without h1 tag', () => {
    const markdownContent = `
## This is h2

Some content here.
    `;

    const title = extractTitleFromMarkdown(markdownContent);

    expect(title).toBeUndefined();
  });

  it('should use first h1 when multiple h1 tags exist', () => {
    const markdownContent = `
# First Title

Some content.

# Second Title

More content.
    `;

    const title = extractTitleFromMarkdown(markdownContent);

    expect(title).toBe('First Title');
  });

  it('should strip markdown formatting from title', () => {
    const markdownContent = `# Title with **bold** and *italic*`;

    const title = extractTitleFromMarkdown(markdownContent);

    expect(title).toBe('Title with bold and italic');
  });

  it('should trim whitespace from extracted title', () => {
    const markdownContent = `#   Title with spaces   `;

    const title = extractTitleFromMarkdown(markdownContent);

    expect(title).toBe('Title with spaces');
  });
});

describe('processMetaData', () => {
  describe('date extraction from filepath', () => {
    it('should extract date from filename in YYYY-MM-DD format', () => {
      const content = `
# Test Title

This is content without frontmatter.
      `;
      const filePath = '/path/to/blogs/2023-04-12.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.date).toBe('2023-04-12');
    });

    it('should extract date from filename with additional text', () => {
      const content = `# Test Post`;
      const filePath = '/path/to/blogs/2023-12-25-christmas.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.date).toBe('2023-12-25');
    });

    it('should not override existing date in frontmatter', () => {
      const content = `
---
date: 2024-01-01
---

# Test Title
      `;
      const filePath = '/path/to/blogs/2023-04-12.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.date).toBe('2024-01-01');
    });

    it('should handle filepath without date', () => {
      const content = `# Test Title`;
      const filePath = '/path/to/blogs/random-post.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.date).toBeUndefined();
    });

    it('should extract date from path with year only first', () => {
      const content = `# Test`;
      const filePath = '/path/2024-02-29/blog-post.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.date).toBe('2024-02-29');
    });
  });

  describe('title extraction from markdown', () => {
    it('should extract title from first h1 tag', () => {
      const content = `
# Hello World

This is the content.
      `;
      const filePath = '/path/to/post.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.title).toBe('Hello World');
    });

    it('should not override existing title in frontmatter', () => {
      const content = `
---
title: Frontmatter Title
---

# Markdown Title
      `;
      const filePath = '/path/to/post.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.title).toBe('Frontmatter Title');
    });

    it('should handle content without h1 tag', () => {
      const content = `
## This is h2

Some content here.
      `;
      const filePath = '/path/to/post.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.title).toBeUndefined();
    });

    it('should use first h1 when multiple h1 tags exist', () => {
      const content = `
# First Title

Some content.

# Second Title

More content.
      `;
      const filePath = '/path/to/post.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.title).toBe('First Title');
    });
  });

  describe('filePath generation', () => {
    it('should generate HTML file path from markdown file path', () => {
      const content = `---
title: Test Post
description: Test description
tags: [test, blog]
---
# Test Content

This is a test.`;
      const filePath = '/path/to/blogs/2023-04-12.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.filePath).toBe('/2023-04-12.html');
    });

    it('should generate HTML file path for nested directories', () => {
      const content = `---
title: Test Post
---
# Content`;
      const filePath = '/Users/user/project/blogs/2024-01-15/2024-01-15-post.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.filePath).toBe('/2024-01-15-post.html');
    });
  });

  describe('combined date and title extraction', () => {
    it('should extract both date and title when both are missing', () => {
      const content = `
# My Blog Post

Content goes here.
      `;
      const filePath = '/path/to/2023-06-15-my-post.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.date).toBe('2023-06-15');
      expect(result.metadata.title).toBe('My Blog Post');
    });

    it('should only extract missing metadata', () => {
      const content = `
---
title: Custom Title
---

# Markdown Title

Content.
      `;
      const filePath = '/path/to/2023-06-15.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.date).toBe('2023-06-15');
      expect(result.metadata.title).toBe('Custom Title');
    });

    it('should handle complete frontmatter without extraction', () => {
      const content = `
---
title: Complete Post
date: 2024-01-01
tags: [test, blog]
---

# Different Title

Content here.
      `;
      const filePath = '/path/to/2023-12-31-ignored.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.title).toBe('Complete Post');
      expect(result.metadata.date).toBe('2024-01-01');
      expect(result.metadata.tags).toEqual(['test', 'blog']);
    });
  });

  describe('edge cases', () => {
    it('should handle empty content', () => {
      const content = '';
      const filePath = '/path/to/2023-01-01.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.date).toBe('2023-01-01');
    });

    it('should handle content with only frontmatter', () => {
      const content = `
---
title: Only Frontmatter
date: 2023-01-01
---
      `;
      const filePath = '/path/to/post.md';

      const result = processMetaData(content, filePath);

      expect(result.metadata.title).toBe('Only Frontmatter');
      expect(result.metadata.date).toBe('2023-01-01');
    });

    it('should handle malformed date in filename', () => {
      const content = `# Test`;
      const filePath = '/path/to/2023-13-45-invalid.md'; // Invalid date

      const result = processMetaData(content, filePath);

      // Still extracts the pattern even if invalid date
      expect(result.metadata.date).toBe('2023-13-45');
    });
  });

  describe('complete blog post structure', () => {
    it('should handle complete blog post with all metadata', () => {
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

      const result = processMetaData(content, filePath);

      expect(result.metadata.title).toBe('원티드 프리온보딩 과제 - 3일차');
      expect(result.metadata.authors).toEqual(['arch-spatula']);
      expect(result.metadata.tags).toEqual(['blog', 'wanted', 'pre-on-boarding']);
      expect(result.metadata.description).toBe('원티드 과제 진행과정');
      expect(result.metadata.date).toBe('2023-04-12');
      expect(result.metadata.filePath).toBe('/2023-04-12.html');
    });
  });
});
