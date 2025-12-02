/**
 * @fileoverview 클라이언트 스크립트
 *
 * @todo 태그를 누르면 url에 태그 정보를 추가하는 로직 구현
 *   - url은 해시로 처리해서 클라이언트로만 처리하기
 * @todo 검색 텍스트를 확인하고 검색 결과를 추천하는 로직 구현
 */

/**
 * 검색 팝업 관련 함수들
 * @returns
 */
const initSearchPopup = (): void => {
  const popupBtn = document.getElementById('popup-btn');
  const searchElement = document.getElementById('search');
  const overlay = document.getElementById('overlay');
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const searchBlogList = document.getElementById('search-blog-list');

  if (!popupBtn || !searchElement || !overlay || !searchInput || !searchBlogList) {
    console.warn('Search elements not found');
    return;
  }

  // 검색 기능
  const handleSearch = (query: string): void => {
    const lowerQuery = query.toLowerCase().trim();
    const items = searchBlogList.querySelectorAll('.search-item');

    items.forEach((item) => {
      const htmlItem = item as HTMLLIElement;
      const link = htmlItem.querySelector('.search-item-link');
      if (link) {
        const text = link.textContent?.toLowerCase() || '';
        htmlItem.classList.toggle('hidden', !text.includes(lowerQuery));
      }
    });
  };

  // 해시 확인 함수
  const checkHash = (): void => {
    const isOpen = window.location.hash.startsWith('#search=open');
    if (isOpen) {
      searchElement.classList.remove('hidden');
      searchInput.focus();
    } else {
      searchElement.classList.add('hidden');
      searchInput.value = '';
      // 검색 결과 초기화
      const items = searchBlogList.querySelectorAll('.search-item');
      items.forEach((item) => {
        const htmlItem = item as HTMLLIElement;
        htmlItem.classList.remove('hidden');
      });
    }
  };

  // 팝업 버튼 클릭 - search=open으로 변경하고 tags 유지
  popupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    hashParams.set('search', 'open');
    window.location.hash = hashParams.toString();
  });

  // 오버레이 클릭 시 닫기 - search=close로 변경하고 tags 유지
  overlay.addEventListener('click', () => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    hashParams.set('search', 'close');
    window.location.hash = hashParams.toString();
  });

  // ESC 키로 닫기 - search=close로 변경하고 tags 유지
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.location.hash.includes('#search=open')) {
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      hashParams.set('search', 'close');
      window.location.hash = hashParams.toString();
    }
  });

  // Ctrl+K 또는 Cmd+K로 열기 - search=open으로 변경하고 tags 유지
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (!window.location.hash.includes('#search=open')) {
        // 열려있지 않으면 열기
        const hashParams = new URLSearchParams(window.location.hash.slice(1));
        hashParams.set('search', 'open');
        window.location.hash = hashParams.toString();
      } else {
        // 이미 열려있으면 닫기
        const hashParams = new URLSearchParams(window.location.hash.slice(1));
        hashParams.set('search', 'close');
        window.location.hash = hashParams.toString();
      }
    }
  });

  // hashchange 이벤트 리스너
  window.addEventListener('hashchange', checkHash);

  // 검색 입력 이벤트
  searchInput.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    handleSearch(target.value);
  });

  // 검색 폼 제출 방지
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  // 초기 로드 시 해시 확인
  checkHash();

  // 태그 클릭 이벤트 처리
  const searchTagList = document.getElementById('search-tag-list');
  if (!searchTagList) {
    console.warn('Search tag list not found');
    return;
  }
  searchTagList.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const tagLink = target.closest('.tag-link') as HTMLAnchorElement;
    if (!tagLink) {
      return;
    }
    e.preventDefault();
    const clickedTag = tagLink.dataset.tag;
    if (!clickedTag) return;

    // 태그 토글 로직
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const currentTags = hashParams.get('tags')?.split(',').filter(Boolean) || [];

    if (currentTags.includes(clickedTag)) {
      // 이미 있으면 제거
      const newTags = currentTags.filter((t) => t !== clickedTag);
      if (newTags.length > 0) {
        hashParams.set('tags', newTags.join(','));
      } else {
        hashParams.delete('tags');
      }
    } else {
      // 없으면 추가
      currentTags.push(clickedTag);
      hashParams.set('tags', currentTags.join(','));
    }

    window.location.hash = hashParams.toString();
  });
};

document.addEventListener('DOMContentLoaded', (): void => {
  console.log('DOM이 로드되었습니다!');

  // 검색 팝업 초기화
  initSearchPopup();

  const app: HTMLElement | null = document.getElementById('app');
  if (app) {
    console.log('App element found:', app);
  }
});
