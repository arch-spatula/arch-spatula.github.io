import { describe, it, expect } from 'vitest';
import { highlightText } from './highlightText';

describe('highlightText', () => {
  it('should wrap text in span when no query', () => {
    expect(highlightText('Hello World', '')).toBe('<span>Hello World</span>');
  });

  it('should highlight matching text (case insensitive)', () => {
    const result = highlightText('OK LGTM', 't');
    expect(result).toBe('<span>OK LG</span><span class="search-highlight">T</span><span>M</span>');
  });

  it('should preserve original case in highlighted text', () => {
    const result = highlightText('TypeScript', 'type');
    expect(result).toBe('<span class="search-highlight">Type</span><span>Script</span>');
  });

  it('should highlight multiple occurrences', () => {
    const result = highlightText('test testing tested', 'test');
    expect(result).toBe(
      '<span class="search-highlight">test</span><span> </span><span class="search-highlight">test</span><span>ing </span><span class="search-highlight">test</span><span>ed</span>',
    );
  });

  it('should handle query at the beginning', () => {
    const result = highlightText('Hello World', 'hello');
    expect(result).toBe('<span class="search-highlight">Hello</span><span> World</span>');
  });

  it('should handle query at the end', () => {
    const result = highlightText('Hello World', 'world');
    expect(result).toBe('<span>Hello </span><span class="search-highlight">World</span>');
  });

  it('should handle no match', () => {
    const result = highlightText('Hello World', 'xyz');
    expect(result).toBe('<span>Hello World</span>');
  });

  it('should handle empty text', () => {
    expect(highlightText('', 'test')).toBe('');
  });

  it('should handle special characters in text', () => {
    const result = highlightText('Hello (World)', 'world');
    expect(result).toBe('<span>Hello (</span><span class="search-highlight">World</span><span>)</span>');
  });

  it('should handle Korean text', () => {
    const result = highlightText('안녕하세요 세계', '세계');
    expect(result).toBe('<span>안녕하세요 </span><span class="search-highlight">세계</span>');
  });
});
