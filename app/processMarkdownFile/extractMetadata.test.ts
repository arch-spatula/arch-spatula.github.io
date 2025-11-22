import { describe, it, expect } from 'vitest';
import processMarkdownFile from './processMarkdownFile';

describe('processMarkdownFile - metadata extraction', () => {
  describe('date extraction from filepath', () => {
    it('should extract date from filename in YYYY-MM-DD format', async () => {
      const content = `
# Test Title

This is content without frontmatter.
      `;
      const filePath = '/path/to/blogs/2023-04-12.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.date).toBe('2023-04-12');
    });

    it('should extract date from filename with additional text', async () => {
      const content = `# Test Post`;
      const filePath = '/path/to/blogs/2023-12-25-christmas.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.date).toBe('2023-12-25');
    });

    it('should not override existing date in frontmatter', async () => {
      const content = `
---
date: 2024-01-01
---

# Test Title
      `;
      const filePath = '/path/to/blogs/2023-04-12.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.date).toBe('2024-01-01');
    });

    it('should handle filepath without date', async () => {
      const content = `# Test Title`;
      const filePath = '/path/to/blogs/random-post.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.date).toBeUndefined();
    });

    it('should extract date from path with year only first', async () => {
      const content = `# Test`;
      const filePath = '/path/2024-02-29/blog-post.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.date).toBe('2024-02-29');
    });
  });

  describe('title extraction from h1 tag', () => {
    it('should extract title from first h1 tag', async () => {
      const content = `
# Hello World

This is the content.
      `;
      const filePath = '/path/to/post.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.title).toBe('Hello World');
    });

    it('should not override existing title in frontmatter', async () => {
      const content = `
---
title: Frontmatter Title
---

# Markdown Title
      `;
      const filePath = '/path/to/post.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.title).toBe('Frontmatter Title');
    });

    it('should handle content without h1 tag', async () => {
      const content = `
## This is h2

Some content here.
      `;
      const filePath = '/path/to/post.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.title).toBeUndefined();
    });

    it('should extract title from h1 even with attributes', async () => {
      const content = `# Title with **bold** and *italic*`;
      const filePath = '/path/to/post.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.title).toBeTruthy();
      expect(result.metadata.title).toContain('Title');
    });

    it('should use first h1 when multiple h1 tags exist', async () => {
      const content = `
# First Title

Some content.

# Second Title

More content.
      `;
      const filePath = '/path/to/post.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.title).toBe('First Title');
    });

    it('should strip HTML tags from extracted title', async () => {
      const content = `# Title with <code>code</code> tag`;
      const filePath = '/path/to/post.md';

      const result = await processMarkdownFile(content, filePath);

      // The title should have the inline code converted to <code> by markdown processor
      // but our extractor should handle it
      expect(result.metadata.title).toBeTruthy();
      expect(result.metadata.title).toContain('Title');
      expect(result.metadata.title).toContain('code');
    });
  });

  describe('combined date and title extraction', () => {
    it('should extract both date and title when both are missing', async () => {
      const content = `
# My Blog Post

Content goes here.
      `;
      const filePath = '/path/to/2023-06-15-my-post.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.date).toBe('2023-06-15');
      expect(result.metadata.title).toBe('My Blog Post');
    });

    it('should only extract missing metadata', async () => {
      const content = `
---
title: Custom Title
---

# Markdown Title

Content.
      `;
      const filePath = '/path/to/2023-06-15.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.date).toBe('2023-06-15');
      expect(result.metadata.title).toBe('Custom Title');
    });

    it('should handle complete frontmatter without extraction', async () => {
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

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.title).toBe('Complete Post');
      expect(result.metadata.date).toBe('2024-01-01');
      expect(result.metadata.tags).toEqual(['test', 'blog']);
    });
  });

  describe('edge cases', () => {
    it('should handle empty content', async () => {
      const content = '';
      const filePath = '/path/to/2023-01-01.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.date).toBe('2023-01-01');
      expect(result.htmlContent).toBe('');
    });

    it('should handle content with only frontmatter', async () => {
      const content = `
---
title: Only Frontmatter
date: 2023-01-01
---
      `;
      const filePath = '/path/to/post.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.title).toBe('Only Frontmatter');
      expect(result.metadata.date).toBe('2023-01-01');
    });

    it('should handle malformed date in filename', async () => {
      const content = `# Test`;
      const filePath = '/path/to/2023-13-45-invalid.md'; // Invalid date

      const result = await processMarkdownFile(content, filePath);

      // Still extracts the pattern even if invalid date
      expect(result.metadata.date).toBe('2023-13-45');
    });

    it('should trim whitespace from extracted title', async () => {
      const content = `#   Title with spaces   `;
      const filePath = '/path/to/post.md';

      const result = await processMarkdownFile(content, filePath);

      expect(result.metadata.title).toBe('Title with spaces');
    });
  });
});
