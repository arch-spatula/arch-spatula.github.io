import { describe, it, expect } from 'vitest';
import {
  parseHashParams,
  toHashString,
  getHashParam,
  setHashParam,
  deleteHashParam,
  hashParamIncludes,
} from './hashParams';

describe('parseHashParams', () => {
  it('should parse empty hash', () => {
    const params = parseHashParams('');
    expect(params.toString()).toBe('');
  });

  it('should parse hash with single param', () => {
    const params = parseHashParams('#search=open');
    expect(params.get('search')).toBe('open');
  });

  it('should parse hash with multiple params', () => {
    const params = parseHashParams('#search=open&tags=blog,wanted');
    expect(params.get('search')).toBe('open');
    expect(params.get('tags')).toBe('blog,wanted');
  });
});

describe('toHashString', () => {
  it('should return empty string for empty params', () => {
    const params = new URLSearchParams();
    expect(toHashString(params)).toBe('');
  });

  it('should return hash string with #', () => {
    const params = new URLSearchParams();
    params.set('search', 'open');
    expect(toHashString(params)).toBe('#search=open');
  });
});

describe('getHashParam', () => {
  it('should return null for non-existent key', () => {
    expect(getHashParam('#search=open', 'tags')).toBeNull();
  });

  it('should return value for existing key', () => {
    expect(getHashParam('#search=open', 'search')).toBe('open');
  });
});

describe('setHashParam', () => {
  it('should set param on empty hash', () => {
    expect(setHashParam('', 'search', 'open')).toBe('search=open');
  });

  it('should add param to existing hash', () => {
    expect(setHashParam('#search=open', 'tags', 'blog')).toBe('search=open&tags=blog');
  });

  it('should update existing param', () => {
    expect(setHashParam('#search=open', 'search', 'close')).toBe('search=close');
  });
});

describe('deleteHashParam', () => {
  it('should remove param from hash', () => {
    expect(deleteHashParam('#search=open&tags=blog', 'search')).toBe('tags=blog');
  });

  it('should return empty string when removing last param', () => {
    expect(deleteHashParam('#search=open', 'search')).toBe('');
  });
});

describe('hashParamIncludes', () => {
  it('should return true when param matches', () => {
    expect(hashParamIncludes('#search=open', 'search', 'open')).toBe(true);
  });

  it('should return false when param does not match', () => {
    expect(hashParamIncludes('#search=open', 'search', 'close')).toBe(false);
  });

  it('should return false when param does not exist', () => {
    expect(hashParamIncludes('#search=open', 'tags', 'blog')).toBe(false);
  });
});
