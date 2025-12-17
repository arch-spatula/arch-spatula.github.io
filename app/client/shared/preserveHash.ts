import { parseHashParams, toHashString } from './hashParams';

/**
 * 해시가 순수 앵커인지 확인 (파라미터가 아닌 경우)
 * 앵커: #section-name (= 포함하지 않음)
 * 파라미터: #tags=blog (= 포함)
 */
const isAnchorHash = (hash: string): boolean => {
  if (!hash || hash === '#') return false;
  return !hash.includes('=');
};

/**
 * 링크 클릭 시 URL 해시의 tags, search 파라미터를 유지하는 기능
 * - 같은 origin일 때만 파라미터를 유지
 * - 같은 페이지 내 앵커 링크 클릭 시: 앵커로 스크롤 + 파라미터 유지
 * - 다른 페이지 링크 클릭 시: 파라미터만 유지
 */
export const initHashPreserver = (): void => {
  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      const currentParams = parseHashParams(window.location.hash);
      const tagsParam = currentParams.get('tags');
      const searchParam = currentParams.get('search');

      // 보존할 파라미터(tags, search)가 없으면 기본 동작 유지
      if (!tagsParam && !searchParam) return;

      const url = new URL(link.href);
      const isSameOrigin = url.origin === window.location.origin;

      if (!isSameOrigin) return;

      const isSamePage = url.pathname === window.location.pathname;
      const hasAnchorHash = isAnchorHash(url.hash);

      if (isSamePage && hasAnchorHash) {
        // 같은 페이지 내 앵커 링크 (TOC 등)
        e.preventDefault();

        // # 제거 + 디코딩 (한글 앵커 이중 인코딩 방지)
        const anchorId = decodeURIComponent(url.hash.slice(1));
        const newParams = new URLSearchParams();
        newParams.set('anchor', anchorId);
        if (tagsParam) newParams.set('tags', tagsParam);
        if (searchParam) newParams.set('search', searchParam);

        // URL 변경 (페이지 리로드 없이)
        history.pushState(null, '', window.location.pathname + toHashString(newParams));

        // 앵커로 스크롤
        const targetElement = document.getElementById(anchorId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'instant' });
        }
      } else {
        // 다른 페이지로 이동
        e.preventDefault();

        const linkParams = parseHashParams(url.hash);
        if (tagsParam) linkParams.set('tags', tagsParam);
        if (searchParam) linkParams.set('search', searchParam);

        url.hash = toHashString(linkParams);
        window.location.href = url.toString();
      }
    });
  });
};
