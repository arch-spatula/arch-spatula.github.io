/**
 * 링크 클릭 시 URL 해시를 유지하는 기능
 * 같은 origin일 때만 해시를 유지하고, 외부 링크는 해시를 유지하지 않음
 *
 * @todo 사이드바를 클릭하면 첫번째는 이동하고 두번째는 이동하지 않는 버그가 있음
 *   - `2024-09-20-nuxt-content.html#가로스크롤-엣지-케이스-처리`으로 url이 변경된 이후 다른 사이드바를 클릭하면 이동하지 않는 버그가 있음
 *   - 해시를 보존하는 로직이 보존하지 말아야 할 부분을 보존하고 있음
 *   - tags, search 파라미터만 보존해야 하고 그 외에는 제거해야 함
 *   - scroll 위치 저장
 *     - url에서 사이드바를 클릭해서 해시가 비워지면 스크롤 최상단으로 이동하는 버그가 있음
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
