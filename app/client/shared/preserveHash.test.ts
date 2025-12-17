import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initHashPreserver } from './preserveHash';

describe('initHashPreserver', () => {
  let mockLocationHref: string;
  let mockLocationHash: string;
  let mockLocationPathname: string;
  const mockOrigin = 'http://localhost:3000';
  let pushStateSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // window.location 모킹
    mockLocationHref = '';
    mockLocationHash = '';
    mockLocationPathname = '/current-page.html';

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
        get pathname() {
          return mockLocationPathname;
        },
      },
      writable: true,
      configurable: true,
    });

    // history.pushState 모킹
    pushStateSpy = vi.spyOn(history, 'pushState').mockImplementation(() => {});

    // DOM 초기화
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('should preserve tags param when clicking link', () => {
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

  it('should not prevent default when no tags or search param is present', () => {
    window.location.hash = '';
    document.body.innerHTML = `<a href="${mockOrigin}/page1.html">Link 1</a>`;

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    link.dispatchEvent(clickEvent);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not preserve anchor hash (non-param hash)', () => {
    // 앵커 해시만 있고 tags/search 파라미터가 없는 경우 보존하지 않음
    window.location.hash = '#section-anchor';
    document.body.innerHTML = `<a href="${mockOrigin}/page1.html">Link 1</a>`;

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    link.dispatchEvent(clickEvent);

    // 앵커 해시만 있을 때는 기본 동작 유지
    expect(preventDefaultSpy).not.toHaveBeenCalled();
    expect(mockLocationHref).toBe('');
  });

  it('should merge tags param when navigating to different page with anchor', () => {
    window.location.hash = '#tags=blog';
    mockLocationPathname = '/current-page.html';
    document.body.innerHTML = `<a href="${mockOrigin}/page1.html#section-anchor">Link 1</a>`;

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

    link.dispatchEvent(clickEvent);

    const resultUrl = new URL(mockLocationHref);
    expect(resultUrl.pathname).toBe('/page1.html');
    // tags 파라미터가 추가되어야 함
    expect(resultUrl.hash).toContain('tags=blog');
  });

  it('should scroll to anchor and preserve tags when clicking same-page anchor link', () => {
    window.location.hash = '#tags=blog';
    mockLocationPathname = '/current-page.html';

    // 앵커 타겟 요소 생성
    const targetElement = document.createElement('div');
    targetElement.id = 'section-anchor';
    const scrollIntoViewSpy = vi.fn();
    targetElement.scrollIntoView = scrollIntoViewSpy;

    document.body.innerHTML = `<a href="${mockOrigin}/current-page.html#section-anchor">TOC Link</a>`;
    document.body.appendChild(targetElement);

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    link.dispatchEvent(clickEvent);

    // preventDefault가 호출되어야 함
    expect(preventDefaultSpy).toHaveBeenCalled();

    // history.pushState가 호출되어야 함 (페이지 리로드 없이 URL 변경)
    expect(pushStateSpy).toHaveBeenCalled();
    const pushedUrl = pushStateSpy.mock.calls[0][2] as string;
    expect(pushedUrl).toContain('anchor=section-anchor');
    expect(pushedUrl).toContain('tags=blog');

    // scrollIntoView가 호출되어야 함
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should preserve both tags and search when clicking same-page anchor link', () => {
    window.location.hash = '#tags=blog&search=keyword';
    mockLocationPathname = '/current-page.html';

    const targetElement = document.createElement('div');
    targetElement.id = 'heading-1';
    targetElement.scrollIntoView = vi.fn();

    document.body.innerHTML = `<a href="${mockOrigin}/current-page.html#heading-1">Heading</a>`;
    document.body.appendChild(targetElement);

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

    link.dispatchEvent(clickEvent);

    expect(pushStateSpy).toHaveBeenCalled();
    const pushedUrl = pushStateSpy.mock.calls[0][2] as string;
    expect(pushedUrl).toContain('anchor=heading-1');
    expect(pushedUrl).toContain('tags=blog');
    expect(pushedUrl).toContain('search=keyword');
  });

  it('should handle Korean anchor without double encoding', () => {
    window.location.hash = '#tags=blog&search=close';
    mockLocationPathname = '/current-page.html';

    // 한글 앵커 ID
    const koreanAnchorId = '개발-전에-실험';
    const encodedAnchorId = encodeURIComponent(koreanAnchorId);

    const targetElement = document.createElement('div');
    targetElement.id = koreanAnchorId; // DOM에는 디코딩된 한글 ID
    const scrollIntoViewSpy = vi.fn();
    targetElement.scrollIntoView = scrollIntoViewSpy;

    // 링크의 href는 인코딩된 형태
    document.body.innerHTML = `<a href="${mockOrigin}/current-page.html#${encodedAnchorId}">한글 앵커</a>`;
    document.body.appendChild(targetElement);

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

    link.dispatchEvent(clickEvent);

    // scrollIntoView가 호출되어야 함 (한글 앵커 요소를 찾아야 함)
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });

    // URL에는 인코딩된 앵커가 저장되어야 함 (이중 인코딩 아님)
    expect(pushStateSpy).toHaveBeenCalled();
    const pushedUrl = pushStateSpy.mock.calls[0][2] as string;
    // 이중 인코딩(%25)이 없어야 함
    expect(pushedUrl).not.toContain('%25');
    expect(pushedUrl).toContain('tags=blog');
    expect(pushedUrl).toContain('search=close');
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

  it('should prevent default when tags param is present and same origin', () => {
    window.location.hash = '#tags=blog';
    document.body.innerHTML = `<a href="${mockOrigin}/page1.html">Link 1</a>`;

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    link.dispatchEvent(clickEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should preserve search param when clicking link', () => {
    window.location.hash = '#search=keyword';
    document.body.innerHTML = `<a href="${mockOrigin}/page1.html">Link 1</a>`;

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

    link.dispatchEvent(clickEvent);

    const resultUrl = new URL(mockLocationHref);
    expect(resultUrl.pathname).toBe('/page1.html');
    expect(resultUrl.hash).toBe('#search=keyword');
  });

  it('should preserve both tags and search params', () => {
    window.location.hash = '#tags=blog&search=keyword';
    document.body.innerHTML = `<a href="${mockOrigin}/page1.html">Link 1</a>`;

    initHashPreserver();

    const link = document.querySelector('a') as HTMLAnchorElement;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

    link.dispatchEvent(clickEvent);

    const resultUrl = new URL(mockLocationHref);
    expect(resultUrl.pathname).toBe('/page1.html');
    expect(resultUrl.hash).toContain('tags=blog');
    expect(resultUrl.hash).toContain('search=keyword');
  });

  it('should preserve tags for same origin absolute URL', () => {
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
