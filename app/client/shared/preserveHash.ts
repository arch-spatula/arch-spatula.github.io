/**
 * 링크 클릭 시 URL 해시를 유지하는 기능
 * 같은 origin일 때만 해시를 유지하고, 외부 링크는 해시를 유지하지 않음
 */
export const initHashPreserver = (): void => {
  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (!window.location.hash) return;

      const url = new URL(link.href);
      const isSameOrigin = url.origin === window.location.origin;

      if (isSameOrigin) {
        e.preventDefault();
        url.hash = window.location.hash;
        window.location.href = url.toString();
      }
      // 외부 링크는 기본 동작 유지 (해시 없이 이동)
    });
  });
};
