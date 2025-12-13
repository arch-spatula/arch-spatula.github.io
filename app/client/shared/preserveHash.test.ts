import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initHashPreserver } from './preserveHash';

describe('initHashPreserver', () => {
  let mockLocationHref: string;
  let mockLocationHash: string;
  const mockOrigin = 'http://localhost:3000';

  beforeEach(() => {
    // window.location 모킹
    mockLocationHref = '';
    mockLocationHash = '';

    Object.defineProperty(window, 'location', {
      value: {
        get href() {
          return mockLocationHref;
        },
        set href(value: string) {
          mockLocationHref = value;
        },
        get hash() {
          return mockLocationHash;
        },
        set hash(value: string) {
          mockLocationHash = value;
        },
        get origin() {
          return mockOrigin;
        },
      },
      writable: true,
      configurable: true,
    });

    // DOM 초기화
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should preserve hash when clicking link with hash present', () => {
    window.location.hash = '#tags=blog';
    document.body.innerHTML = `<a href="${mockOrigin}/page1.html">Link 1</a>`;

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

    link.dispatchEvent(clickEvent);

    const resultUrl = new URL(mockLocationHref);
    expect(resultUrl.pathname).toBe('/page1.html');
    expect(resultUrl.hash).toBe('#tags=blog');
  });

  it('should not prevent default when no hash is present', () => {
    window.location.hash = '';
    document.body.innerHTML = `<a href="${mockOrigin}/page1.html">Link 1</a>`;

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    link.dispatchEvent(clickEvent);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should replace existing hash in link with current hash', () => {
    window.location.hash = '#tags=blog';
    document.body.innerHTML = `<a href="${mockOrigin}/page1.html#oldHash">Link 1</a>`;

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

    link.dispatchEvent(clickEvent);

    const resultUrl = new URL(mockLocationHref);
    expect(resultUrl.pathname).toBe('/page1.html');
    expect(resultUrl.hash).toBe('#tags=blog');
    expect(mockLocationHref).not.toContain('oldHash');
  });

  it('should not preserve hash for external links (different origin)', () => {
    window.location.hash = '#tags=blog,test';
    document.body.innerHTML = '<a href="https://example.com/page.html">External Link</a>';

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    link.dispatchEvent(clickEvent);

    // 외부 링크는 preventDefault가 호출되지 않음 (기본 동작 유지)
    expect(preventDefaultSpy).not.toHaveBeenCalled();
    // href가 변경되지 않음
    expect(mockLocationHref).toBe('');
  });

  it('should handle multiple links', () => {
    window.location.hash = '#tags=blog';
    document.body.innerHTML = `
      <a href="${mockOrigin}/page1.html">Link 1</a>
      <a href="${mockOrigin}/page2.html">Link 2</a>
    `;

    initHashPreserver();

    const links = document.querySelectorAll('a');
    const clickEvent1 = new MouseEvent('click', { bubbles: true, cancelable: true });
    const clickEvent2 = new MouseEvent('click', { bubbles: true, cancelable: true });

    links[0].dispatchEvent(clickEvent1);
    let resultUrl = new URL(mockLocationHref);
    expect(resultUrl.pathname).toBe('/page1.html');
    expect(resultUrl.hash).toBe('#tags=blog');

    links[1].dispatchEvent(clickEvent2);
    resultUrl = new URL(mockLocationHref);
    expect(resultUrl.pathname).toBe('/page2.html');
    expect(resultUrl.hash).toBe('#tags=blog');
  });

  it('should prevent default when hash is present and same origin', () => {
    window.location.hash = '#tags=blog';
    document.body.innerHTML = `<a href="${mockOrigin}/page1.html">Link 1</a>`;

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    link.dispatchEvent(clickEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should preserve hash for same origin absolute URL', () => {
    window.location.hash = '#tags=blog';
    document.body.innerHTML = `<a href="${mockOrigin}/page1.html">Same Origin Link</a>`;

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    link.dispatchEvent(clickEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
    const resultUrl = new URL(mockLocationHref);
    expect(resultUrl.pathname).toBe('/page1.html');
    expect(resultUrl.hash).toBe('#tags=blog');
  });
});
