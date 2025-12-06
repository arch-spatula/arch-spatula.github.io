import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import clipboard from './clipboard';

describe('clipboard', () => {
  const mockWriteText = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    // DOM 초기화
    document.body.innerHTML = `
      <div id="content">
        <pre><code>const hello = 'world';</code></pre>
        <pre><code>function test() { return 42; }</code></pre>
      </div>
    `;

    // navigator.clipboard.writeText 모킹
    mockWriteText.mockClear();
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: mockWriteText,
      },
    });

    // 타이머 모킹
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  describe('wrap 기능', () => {
    it('pre 요소를 code-block-wraper div로 감싸야 함', () => {
      clipboard();

      const wrappers = document.querySelectorAll('.code-block-wraper');
      expect(wrappers.length).toBe(2);

      wrappers.forEach((wrapper) => {
        expect(wrapper.querySelector('pre')).toBeTruthy();
      });
    });
  });

  describe('addBtn 기능', () => {
    it('각 pre 요소에 복사 버튼을 추가해야 함', () => {
      clipboard();

      const copyBtns = document.querySelectorAll('.copy-btn');
      expect(copyBtns.length).toBe(2);
    });

    it('복사 버튼에 올바른 클래스들이 있어야 함', () => {
      clipboard();

      const copyBtn = document.querySelector('.copy-btn');
      expect(copyBtn?.classList.contains('btn')).toBe(true);
    });

    it('복사 버튼에 aria-label이 있어야 함', () => {
      clipboard();

      const copyBtn = document.querySelector('.copy-btn') as HTMLButtonElement;
      expect(copyBtn?.ariaLabel).toBe('copy button');
    });

    it('copy-warrper div가 생성되어야 함', () => {
      clipboard();

      const wrappers = document.querySelectorAll('.copy-warrper');
      expect(wrappers.length).toBe(2);
    });

    it('이미 div 자식이 있는 pre 요소에는 버튼을 추가하지 않아야 함', () => {
      document.body.innerHTML = `
        <div id="content">
          <pre><div>existing div</div><code>const x = 1;</code></pre>
        </div>
      `;

      clipboard();

      const copyBtns = document.querySelectorAll('.copy-btn');
      expect(copyBtns.length).toBe(0);
    });
  });

  describe('복사 버튼 클릭 동작', () => {
    it('버튼 클릭 시 클립보드에 pre 내용이 복사되어야 함', () => {
      clipboard();

      const copyBtn = document.querySelector('.copy-btn') as HTMLButtonElement;
      copyBtn.click();

      expect(mockWriteText).toHaveBeenCalledWith("const hello = 'world';");
    });

    it('버튼 클릭 시 copy-btn 클래스가 clicked-copy-btn으로 변경되어야 함', () => {
      clipboard();

      const copyBtn = document.querySelector('.copy-btn') as HTMLButtonElement;
      copyBtn.click();

      expect(copyBtn.classList.contains('clicked-copy-btn')).toBe(true);
      expect(copyBtn.classList.contains('copy-btn')).toBe(false);
    });

    it('2초 후 클래스가 copy-btn으로 원복되어야 함', () => {
      clipboard();

      const copyBtn = document.querySelector('.copy-btn') as HTMLButtonElement;
      copyBtn.click();

      expect(copyBtn.classList.contains('clicked-copy-btn')).toBe(true);

      vi.advanceTimersByTime(2000);

      expect(copyBtn.classList.contains('copy-btn')).toBe(true);
      expect(copyBtn.classList.contains('clicked-copy-btn')).toBe(false);
    });

    it('2초 전에는 클래스가 복구되지 않아야 함', () => {
      clipboard();

      const copyBtn = document.querySelector('.copy-btn') as HTMLButtonElement;
      copyBtn.click();

      vi.advanceTimersByTime(1999);

      expect(copyBtn.classList.contains('clicked-copy-btn')).toBe(true);
      expect(copyBtn.classList.contains('copy-btn')).toBe(false);
    });
  });

  describe('content ID가 없는 경우', () => {
    it('content 요소가 없으면 에러 없이 실행되어야 함', () => {
      document.body.innerHTML = '<div id="other"></div>';

      expect(() => clipboard()).not.toThrow();
    });
  });

  describe('pre 요소가 없는 경우', () => {
    it('pre 요소가 없으면 에러 없이 실행되어야 함', () => {
      document.body.innerHTML = '<div id="content"><p>No pre here</p></div>';

      expect(() => clipboard()).not.toThrow();

      const copyBtns = document.querySelectorAll('.copy-btn');
      expect(copyBtns.length).toBe(0);
    });
  });

  describe('빈 pre 요소', () => {
    it('빈 pre 요소의 경우 빈 문자열이 복사되어야 함', () => {
      document.body.innerHTML = `
        <div id="content">
          <pre></pre>
        </div>
      `;

      clipboard();

      const copyBtn = document.querySelector('.copy-btn') as HTMLButtonElement;
      copyBtn.click();

      expect(mockWriteText).toHaveBeenCalledWith('');
    });
  });
});
