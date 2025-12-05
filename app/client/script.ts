/**
 * @fileoverview 클라이언트 스크립트
 *
 * @todo 태그를 누르면 url에 태그 정보를 추가하는 로직 구현
 *   - url은 해시로 처리해서 클라이언트로만 처리하기
 * @todo 검색 텍스트를 확인하고 검색 결과를 추천하는 로직 구현
 */

/**
 * 검색 팝업 관련 함수들
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

  // 현재 선택된 인덱스 (보이는 항목 기준)
  let currentFocusIndex = 0;

  /**
   * 원본 제목을 data-title 속성에 저장
   */
  const storeOriginalTitles = (): void => {
    const links = searchBlogList.querySelectorAll('.search-item-link');
    links.forEach((link) => {
      const htmlLink = link as HTMLAnchorElement;
      if (!htmlLink.dataset.title) {
        htmlLink.dataset.title = htmlLink.textContent || '';
      }
    });
  };

  /**
   * 검색어와 일치하는 부분을 하이라이트하여 HTML 생성
   * @param text - 원본 텍스트
   * @param query - 검색어 (대소문자 구분 없음)
   * @returns 하이라이트된 HTML 문자열
   */
  const highlightText = (text: string, query: string): string => {
    if (!query) {
      return `<span>${text}</span>`;
    }

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const result: string[] = [];
    let lastIndex = 0;

    let index = lowerText.indexOf(lowerQuery, lastIndex);
    while (index !== -1) {
      // 일치 전 부분
      if (index > lastIndex) {
        result.push(`<span>${text.slice(lastIndex, index)}</span>`);
      }
      // 일치하는 부분 (원본 대소문자 유지)
      result.push(`<span class="search-highlight">${text.slice(index, index + query.length)}</span>`);
      lastIndex = index + query.length;
      index = lowerText.indexOf(lowerQuery, lastIndex);
    }

    // 나머지 부분
    if (lastIndex < text.length) {
      result.push(`<span>${text.slice(lastIndex)}</span>`);
    }

    return result.join('');
  };

  /**
   * 보이는 항목 목록 반환
   */
  const getVisibleItems = (): HTMLLIElement[] => {
    const items = searchBlogList.querySelectorAll('.search-item');
    return Array.from(items).filter((item) => !(item as HTMLElement).classList.contains('hidden')) as HTMLLIElement[];
  };

  /**
   * 포커스 클래스 업데이트 및 스크롤
   */
  const updateFocusClass = (): void => {
    const allLinks = searchBlogList.querySelectorAll('.search-item-link');
    allLinks.forEach((link) => link.classList.remove('search-item-focus'));

    const visibleItems = getVisibleItems();
    if (visibleItems.length > 0 && currentFocusIndex >= 0 && currentFocusIndex < visibleItems.length) {
      const focusedItem = visibleItems[currentFocusIndex];
      const focusedLink = focusedItem.querySelector('.search-item-link');
      focusedLink?.classList.add('search-item-focus');

      // 선택된 항목이 보이도록 스크롤
      focusedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  };

  /**
   * 검색 기능 - 필터링 및 하이라이트
   */
  const handleSearch = (query: string): void => {
    const trimmedQuery = query.trim();
    const lowerQuery = trimmedQuery.toLowerCase();
    const items = searchBlogList.querySelectorAll('.search-item');

    items.forEach((item) => {
      const htmlItem = item as HTMLLIElement;
      const link = htmlItem.querySelector('.search-item-link') as HTMLAnchorElement;
      if (link) {
        const originalTitle = link.dataset.title || '';
        const lowerTitle = originalTitle.toLowerCase();

        // 일치 여부 확인 (대소문자 구분 없음)
        const isMatch = !trimmedQuery || lowerTitle.includes(lowerQuery);
        htmlItem.classList.toggle('hidden', !isMatch);

        // 하이라이트 적용
        link.innerHTML = highlightText(originalTitle, trimmedQuery);
      }
    });

    // 검색어 변경 시 첫 번째 보이는 항목으로 선택 초기화
    currentFocusIndex = 0;
    updateFocusClass();
  };

  /**
   * 검색 결과 및 상태 초기화
   */
  const resetSearch = (): void => {
    const items = searchBlogList.querySelectorAll('.search-item');
    items.forEach((item) => {
      const htmlItem = item as HTMLLIElement;
      htmlItem.classList.remove('hidden');
      const link = htmlItem.querySelector('.search-item-link') as HTMLAnchorElement;
      if (link) {
        const originalTitle = link.dataset.title || '';
        link.innerHTML = `<span>${originalTitle}</span>`;
        link.classList.remove('search-item-focus');
      }
    });
    currentFocusIndex = 0;
  };

  /**
   * 해시 확인 및 팝업 상태 업데이트
   */
  const checkHash = (): void => {
    const isOpen = window.location.hash.includes('search=open');
    if (isOpen) {
      searchElement.classList.remove('hidden');
      searchInput.focus();
      // 팝업 열릴 때 첫 번째 항목 선택
      currentFocusIndex = 0;
      updateFocusClass();
    } else {
      searchElement.classList.add('hidden');
      searchInput.value = '';
      resetSearch();
    }
  };

  // 원본 제목 저장 (초기화)
  storeOriginalTitles();

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

  // 키보드 이벤트 처리 (ESC, Ctrl+K, 위/아래/Enter)
  document.addEventListener('keydown', (e) => {
    const isPopupOpen = window.location.hash.includes('search=open');

    // ESC 키로 닫기
    if (e.key === 'Escape' && isPopupOpen) {
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      hashParams.set('search', 'close');
      window.location.hash = hashParams.toString();
      return;
    }

    // Ctrl+K 또는 Cmd+K로 열기/닫기
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      if (!isPopupOpen) {
        hashParams.set('search', 'open');
      } else {
        hashParams.set('search', 'close');
      }
      window.location.hash = hashParams.toString();
      return;
    }

    // 팝업이 열려있을 때만 키보드 네비게이션
    if (!isPopupOpen) return;

    const visibleItems = getVisibleItems();
    if (visibleItems.length === 0) return;

    // 위 화살표
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentFocusIndex = currentFocusIndex > 0 ? currentFocusIndex - 1 : visibleItems.length - 1;
      updateFocusClass();
      return;
    }

    // 아래 화살표
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentFocusIndex = currentFocusIndex < visibleItems.length - 1 ? currentFocusIndex + 1 : 0;
      updateFocusClass();
      return;
    }

    // Enter 키 - 선택된 항목으로 이동
    if (e.key === 'Enter') {
      e.preventDefault();
      const focusedItem = visibleItems[currentFocusIndex];
      if (focusedItem) {
        const link = focusedItem.querySelector('.search-item-link') as HTMLAnchorElement;
        if (link?.href) {
          window.location.href = link.href;
        }
      }
      return;
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

/**
 * 태그 클릭 이벤트 처리 (document 레벨에서 data-tag 속성을 가진 모든 요소에 적용)
 * MPA 스타일: URL 해시 변경 후 페이지 새로고침
 */
const initTagClick = (): void => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const tagElement = target.closest('[data-tag]') as HTMLElement;
    if (!tagElement) {
      return;
    }
    e.preventDefault();
    const clickedTag = tagElement.dataset.tag;
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

    // MPA 스타일: URL 해시 변경 후 페이지 새로고침
    const newHash = hashParams.toString();
    window.location.hash = newHash;
    window.location.reload();
  });
};

/**
 * URL 해시에서 선택된 태그를 파싱
 */
const getSelectedTags = (): string[] => {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  return hashParams.get('tags')?.split(',').filter(Boolean) || [];
};

/**
 * URL을 확인하고 태그에 따라 게시글을 필터링하고 선택된 태그를 강조
 */
const filterPostsByTags = (): void => {
  const selectedTags = getSelectedTags();
  const posts = document.querySelectorAll('.blog-item');
  const allTagItems = document.querySelectorAll('.tag-item');
  const allTagLinks = document.querySelectorAll('.tag-link');

  // 선택된 태그가 없으면 모든 글 표시 및 강조 해제
  if (selectedTags.length === 0) {
    posts.forEach((post) => {
      (post as HTMLElement).classList.remove('hidden');
    });
    allTagItems.forEach((tagItem) => {
      tagItem.classList.remove('selected-tag-item');
    });
    allTagLinks.forEach((tagLink) => {
      tagLink.classList.remove('selected');
    });
    return;
  }

  // 각 블로그 글을 순회하며 필터링
  posts.forEach((post) => {
    const postTagItems = post.querySelectorAll('.tag-item');
    const postTags: string[] = [];

    // 글의 태그 목록 추출
    postTagItems.forEach((tagItem) => {
      const tagId = (tagItem as HTMLElement).dataset.id;
      if (tagId) {
        postTags.push(tagId);
      }
    });

    // 선택된 태그 중 하나라도 포함되면 표시, 아니면 숨김
    const hasMatchingTag = selectedTags.some((tag) => postTags.includes(tag));
    (post as HTMLElement).classList.toggle('hidden', !hasMatchingTag);
  });

  // 블로그 글 목록의 태그 강조 (.tag-item)
  allTagItems.forEach((tagItem) => {
    const tagId = (tagItem as HTMLElement).dataset.id;
    if (tagId && selectedTags.includes(tagId)) {
      tagItem.classList.add('selected-tag-item');
    } else {
      tagItem.classList.remove('selected-tag-item');
    }
  });

  // 검색 팝업의 태그 강조 (.tag-link)
  allTagLinks.forEach((tagLink) => {
    const tagName = (tagLink as HTMLElement).dataset.tag;
    if (tagName && selectedTags.includes(tagName)) {
      tagLink.classList.add('selected');
    } else {
      tagLink.classList.remove('selected');
    }
  });
};

document.addEventListener('DOMContentLoaded', (): void => {
  console.log('DOM이 로드되었습니다!');

  // 검색 팝업 초기화
  initSearchPopup();

  // 태그 클릭 초기화
  initTagClick();

  filterPostsByTags();

  const app: HTMLElement | null = document.getElementById('app');
  if (app) {
    console.log('App element found:', app);
  }
});
