import { describe, it, expect } from 'vitest';
import { getSelectedTags, toggleTag, updateTagsInHash, hasMatchingTag } from './tagUtils';

describe('getSelectedTags', () => {
  it('should return empty array when no tags in hash', () => {
    expect(getSelectedTags('')).toEqual([]);
    expect(getSelectedTags('#search=open')).toEqual([]);
  });

  it('should parse single tag', () => {
    expect(getSelectedTags('#tags=blog')).toEqual(['blog']);
  });

  it('should parse multiple tags', () => {
    expect(getSelectedTags('#tags=blog,wanted,test')).toEqual(['blog', 'wanted', 'test']);
  });

  it('should filter empty strings', () => {
    expect(getSelectedTags('#tags=blog,,wanted')).toEqual(['blog', 'wanted']);
  });
});

describe('toggleTag', () => {
  it('should add tag when not present', () => {
    expect(toggleTag(['blog'], 'wanted')).toEqual(['blog', 'wanted']);
  });

  it('should remove tag when present', () => {
    expect(toggleTag(['blog', 'wanted'], 'blog')).toEqual(['wanted']);
  });

  it('should add tag to empty array', () => {
    expect(toggleTag([], 'blog')).toEqual(['blog']);
  });

  it('should return empty array when removing last tag', () => {
    expect(toggleTag(['blog'], 'blog')).toEqual([]);
  });
});

describe('updateTagsInHash', () => {
  it('should set tags in empty hash', () => {
    expect(updateTagsInHash('', ['blog', 'wanted'])).toBe('tags=blog%2Cwanted');
  });

  it('should update existing tags', () => {
    const result = updateTagsInHash('#tags=old', ['blog', 'wanted']);
    expect(result).toBe('tags=blog%2Cwanted');
  });

  it('should remove tags param when array is empty', () => {
    expect(updateTagsInHash('#tags=blog', [])).toBe('');
  });

  it('should preserve other params', () => {
    const result = updateTagsInHash('#search=open&tags=old', ['blog']);
    expect(result).toContain('search=open');
    expect(result).toContain('tags=blog');
  });
});

describe('hasMatchingTag', () => {
  it('should return true when no tags selected', () => {
    expect(hasMatchingTag(['blog', 'wanted'], [])).toBe(true);
  });

  it('should return true when post has matching tag', () => {
    expect(hasMatchingTag(['blog', 'wanted'], ['blog'])).toBe(true);
  });

  it('should return true when post has any matching tag', () => {
    expect(hasMatchingTag(['blog', 'wanted'], ['test', 'wanted'])).toBe(true);
  });

  it('should return false when no matching tags', () => {
    expect(hasMatchingTag(['blog', 'wanted'], ['test', 'other'])).toBe(false);
  });

  it('should return false for empty post tags', () => {
    expect(hasMatchingTag([], ['blog'])).toBe(false);
  });
});
