import { describe, it, expect } from 'vitest';
import { splitMetadataAndContent } from './splitMetadataAndContent';

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
