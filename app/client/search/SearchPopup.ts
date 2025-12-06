import { highlightText } from './highlightText';
import { setHashParam } from '../shared/hashParams';

interface SearchElements {
  popupBtn: HTMLElement;
  searchElement: HTMLElement;
  overlay: HTMLElement;
  searchInput: HTMLInputElement;
  searchBlogList: HTMLElement;
  searchForm?: HTMLElement | null;
}

/**
 * 검색 팝업 클래스
 */
export class SearchPopup {
  private currentFocusIndex = 0;
  private elements: SearchElements;

  constructor(elements: SearchElements) {
    this.elements = elements;
    this.storeOriginalTitles();
    this.bindEvents();
    this.checkHash();
  }

  /**
   * 원본 제목을 data-title 속성에 저장
   */
  private storeOriginalTitles(): void {
    const links = this.elements.searchBlogList.querySelectorAll('.search-item-link');
    links.forEach((link) => {
      const htmlLink = link as HTMLAnchorElement;
      if (!htmlLink.dataset.title) {
        htmlLink.dataset.title = htmlLink.textContent || '';
      }
    });
  }

  /**
   * 보이는 항목 목록 반환
   */
  getVisibleItems(): HTMLLIElement[] {
    const items = this.elements.searchBlogList.querySelectorAll('.search-item');
    return Array.from(items).filter((item) => !(item as HTMLElement).classList.contains('hidden')) as HTMLLIElement[];
  }

  /**
   * 포커스 클래스 업데이트 및 스크롤
   */
  updateFocusClass(): void {
    const allLinks = this.elements.searchBlogList.querySelectorAll('.search-item-link');
    allLinks.forEach((link) => link.classList.remove('search-item-focus'));

    const visibleItems = this.getVisibleItems();
    if (visibleItems.length > 0 && this.currentFocusIndex >= 0 && this.currentFocusIndex < visibleItems.length) {
      const focusedItem = visibleItems[this.currentFocusIndex];
      const focusedLink = focusedItem.querySelector('.search-item-link');
      focusedLink?.classList.add('search-item-focus');

      // 선택된 항목이 보이도록 스크롤
      focusedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  /**
   * 검색 기능 - 필터링 및 하이라이트
   */
  handleSearch(query: string): void {
    const trimmedQuery = query.trim();
    const lowerQuery = trimmedQuery.toLowerCase();
    const items = this.elements.searchBlogList.querySelectorAll('.search-item');

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
    this.currentFocusIndex = 0;
    this.updateFocusClass();
  }

  /**
   * 검색 결과 및 상태 초기화
   */
  resetSearch(): void {
    const items = this.elements.searchBlogList.querySelectorAll('.search-item');
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
    this.currentFocusIndex = 0;
  }

  /**
   * 해시 확인 및 팝업 상태 업데이트
   */
  checkHash(): void {
    const isOpen = window.location.hash.includes('search=open');
    if (isOpen) {
      this.elements.searchElement.classList.remove('hidden');
      this.elements.searchInput.focus();
      this.currentFocusIndex = 0;
      this.updateFocusClass();
    } else {
      this.elements.searchElement.classList.add('hidden');
      this.elements.searchInput.value = '';
      this.resetSearch();
    }
  }

  /**
   * 키보드 네비게이션 처리
   */
  handleKeyNavigation(direction: 'up' | 'down'): void {
    const visibleItems = this.getVisibleItems();
    if (visibleItems.length === 0) return;

    if (direction === 'up') {
      this.currentFocusIndex = this.currentFocusIndex > 0 ? this.currentFocusIndex - 1 : visibleItems.length - 1;
    } else {
      this.currentFocusIndex = this.currentFocusIndex < visibleItems.length - 1 ? this.currentFocusIndex + 1 : 0;
    }
    this.updateFocusClass();
  }

  /**
   * Enter 키로 선택된 항목 이동
   */
  navigateToSelected(): void {
    const visibleItems = this.getVisibleItems();
    const focusedItem = visibleItems[this.currentFocusIndex];
    if (focusedItem) {
      const link = focusedItem.querySelector('.search-item-link') as HTMLAnchorElement;
      if (link?.href) {
        window.location.href = link.href;
      }
    }
  }

  /**
   * 이벤트 바인딩
   */
  private bindEvents(): void {
    const { popupBtn, overlay, searchInput, searchForm } = this.elements;

    // 팝업 버튼 클릭
    popupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const newHash = setHashParam(window.location.hash, 'search', 'open');
      window.location.hash = newHash;
    });

    // 오버레이 클릭 시 닫기
    overlay.addEventListener('click', () => {
      const newHash = setHashParam(window.location.hash, 'search', 'close');
      window.location.hash = newHash;
    });

    // 키보드 이벤트
    document.addEventListener('keydown', (e) => {
      const isPopupOpen = window.location.hash.includes('search=open');

      // ESC 키로 닫기
      if (e.key === 'Escape' && isPopupOpen) {
        const newHash = setHashParam(window.location.hash, 'search', 'close');
        window.location.hash = newHash;
        return;
      }

      // Ctrl+K 또는 Cmd+K로 열기/닫기
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const newHash = setHashParam(window.location.hash, 'search', isPopupOpen ? 'close' : 'open');
        window.location.hash = newHash;
        return;
      }

      // 팝업이 열려있을 때만 키보드 네비게이션
      if (!isPopupOpen) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.handleKeyNavigation('up');
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.handleKeyNavigation('down');
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        this.navigateToSelected();
        return;
      }
    });

    // hashchange 이벤트
    window.addEventListener('hashchange', () => this.checkHash());

    // 검색 입력 이벤트
    searchInput.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      this.handleSearch(target.value);
    });

    // 검색 폼 제출 방지
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
      });
    }
  }
}

/**
 * 검색 팝업 초기화 함수
 */
export const initSearchPopup = (): SearchPopup | null => {
  const popupBtn = document.getElementById('popup-btn');
  const searchElement = document.getElementById('search');
  const overlay = document.getElementById('overlay');
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const searchBlogList = document.getElementById('search-blog-list');
  const searchForm = document.getElementById('search-form');

  if (!popupBtn || !searchElement || !overlay || !searchInput || !searchBlogList) {
    console.warn('Search elements not found');
    return null;
  }

  return new SearchPopup({
    popupBtn,
    searchElement,
    overlay,
    searchInput,
    searchBlogList,
    searchForm,
  });
};
