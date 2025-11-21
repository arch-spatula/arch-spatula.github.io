import { describe, it, expect } from 'vitest';
import { parseMetadata, splitMetadataAndContent } from './processMarkdownFile';

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
