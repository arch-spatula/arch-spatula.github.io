import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SearchPopup } from './SearchPopup';

describe('SearchPopup', () => {
  beforeEach(() => {
    // DOM 초기화
    document.body.innerHTML = `
      <button id="popup-btn">Search</button>
      <div id="search" class="hidden">
        <form id="search-form">
          <input id="search-input" type="search" />
        </form>
        <ul id="search-blog-list">
          <li class="search-item">
            <a href="/post1.html" class="search-item-link">Hello World</a>
          </li>
          <li class="search-item">
            <a href="/post2.html" class="search-item-link">TypeScript Tutorial</a>
          </li>
          <li class="search-item">
            <a href="/post3.html" class="search-item-link">React Testing</a>
          </li>
        </ul>
      </div>
      <div id="overlay"></div>
    `;
    window.location.hash = '';
  });

  const createSearchPopup = () =>
    new SearchPopup({
      popupBtn: document.getElementById('popup-btn')!,
      searchElement: document.getElementById('search')!,
      overlay: document.getElementById('overlay')!,
      searchInput: document.getElementById('search-input') as HTMLInputElement,
      searchBlogList: document.getElementById('search-blog-list')!,
      searchForm: document.getElementById('search-form'),
    });

  describe('storeOriginalTitles', () => {
    it('should store original titles in data-title attribute', () => {
      createSearchPopup();

      const links = document.querySelectorAll('.search-item-link');
      expect((links[0] as HTMLAnchorElement).dataset.title).toBe('Hello World');
      expect((links[1] as HTMLAnchorElement).dataset.title).toBe('TypeScript Tutorial');
      expect((links[2] as HTMLAnchorElement).dataset.title).toBe('React Testing');
    });
  });

  describe('handleSearch', () => {
    it('should filter items by query (case insensitive)', () => {
      const popup = createSearchPopup();

      popup.handleSearch('type');

      const items = document.querySelectorAll('.search-item');
      expect((items[0] as HTMLElement).classList.contains('hidden')).toBe(true);
      expect((items[1] as HTMLElement).classList.contains('hidden')).toBe(false);
      expect((items[2] as HTMLElement).classList.contains('hidden')).toBe(true);
    });

    it('should show all items when query is empty', () => {
      const popup = createSearchPopup();

      popup.handleSearch('type');
      popup.handleSearch('');

      const items = document.querySelectorAll('.search-item');
      items.forEach((item) => {
        expect((item as HTMLElement).classList.contains('hidden')).toBe(false);
      });
    });

    it('should highlight matching text', () => {
      const popup = createSearchPopup();

      popup.handleSearch('type');

      const link = document.querySelectorAll('.search-item-link')[1] as HTMLAnchorElement;
      expect(link.innerHTML).toContain('search-highlight');
      expect(link.innerHTML).toContain('Type');
    });

    it('should reset focus index when searching', () => {
      const popup = createSearchPopup();

      popup.handleKeyNavigation('down');
      popup.handleKeyNavigation('down');
      popup.handleSearch('test');

      const focusedLink = document.querySelector('.search-item-focus');
      expect(focusedLink).toBeTruthy();
      // 첫 번째 보이는 항목이 포커스되어야 함
    });
  });

  describe('getVisibleItems', () => {
    it('should return only visible items', () => {
      const popup = createSearchPopup();

      popup.handleSearch('type');
      const visibleItems = popup.getVisibleItems();

      expect(visibleItems.length).toBe(1);
    });

    it('should return all items when no filter applied', () => {
      const popup = createSearchPopup();

      const visibleItems = popup.getVisibleItems();

      expect(visibleItems.length).toBe(3);
    });
  });

  describe('handleKeyNavigation', () => {
    it('should move focus down', () => {
      const popup = createSearchPopup();

      popup.updateFocusClass();
      popup.handleKeyNavigation('down');

      const links = document.querySelectorAll('.search-item-link');
      expect(links[1].classList.contains('search-item-focus')).toBe(true);
    });

    it('should move focus up', () => {
      const popup = createSearchPopup();

      popup.handleKeyNavigation('down');
      popup.handleKeyNavigation('up');

      const links = document.querySelectorAll('.search-item-link');
      expect(links[0].classList.contains('search-item-focus')).toBe(true);
    });

    it('should wrap around from last to first', () => {
      const popup = createSearchPopup();

      popup.handleKeyNavigation('down');
      popup.handleKeyNavigation('down');
      popup.handleKeyNavigation('down');

      const links = document.querySelectorAll('.search-item-link');
      expect(links[0].classList.contains('search-item-focus')).toBe(true);
    });

    it('should wrap around from first to last', () => {
      const popup = createSearchPopup();

      popup.updateFocusClass();
      popup.handleKeyNavigation('up');

      const links = document.querySelectorAll('.search-item-link');
      expect(links[2].classList.contains('search-item-focus')).toBe(true);
    });
  });

  describe('resetSearch', () => {
    it('should restore original titles', () => {
      const popup = createSearchPopup();

      popup.handleSearch('type');
      popup.resetSearch();

      const link = document.querySelectorAll('.search-item-link')[1] as HTMLAnchorElement;
      expect(link.innerHTML).toBe('<span>TypeScript Tutorial</span>');
    });

    it('should show all items', () => {
      const popup = createSearchPopup();

      popup.handleSearch('type');
      popup.resetSearch();

      const items = document.querySelectorAll('.search-item');
      items.forEach((item) => {
        expect((item as HTMLElement).classList.contains('hidden')).toBe(false);
      });
    });

    it('should remove focus class from all items', () => {
      const popup = createSearchPopup();

      popup.updateFocusClass();
      popup.resetSearch();

      const focusedItems = document.querySelectorAll('.search-item-focus');
      expect(focusedItems.length).toBe(0);
    });
  });

  describe('checkHash', () => {
    it('should open popup when hash contains search=open', () => {
      window.location.hash = '#search=open';
      const popup = createSearchPopup();

      popup.checkHash();

      const searchElement = document.getElementById('search');
      expect(searchElement?.classList.contains('hidden')).toBe(false);
    });

    it('should close popup when hash does not contain search=open', () => {
      const popup = createSearchPopup();
      window.location.hash = '#search=close';

      popup.checkHash();

      const searchElement = document.getElementById('search');
      expect(searchElement?.classList.contains('hidden')).toBe(true);
    });
  });
});
