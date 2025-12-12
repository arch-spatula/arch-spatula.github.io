/**
 * 링크 클릭 시 URL 해시를 유지하는 기능
 */
export const initHashPreserver = (): void => {
  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.location.hash) {
        e.preventDefault();
        const url = new URL(link.href);
        url.hash = window.location.hash;
        window.location.href = url.toString();
      }
    });
  });
};
