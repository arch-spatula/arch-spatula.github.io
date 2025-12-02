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
    const isOpen = window.location.hash === '#search=open';
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

  // 팝업 버튼 클릭 - 해시 변경
  popupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#search=open';
  });

  // 오버레이 클릭 시 닫기 - 해시 제거
  overlay.addEventListener('click', () => {
    history.pushState('', document.title, window.location.pathname);
    checkHash();
  });

  // ESC 키로 닫기 - 해시 제거
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.location.hash === '#search=open') {
      history.pushState('', document.title, window.location.pathname);
      checkHash();
    }
  });

  // Ctrl+K 또는 Cmd+K로 열기 - 해시 변경
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      window.location.hash = '#search=open';
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
