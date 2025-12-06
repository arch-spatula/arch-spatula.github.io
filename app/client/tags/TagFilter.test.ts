import { describe, it, expect, beforeEach } from 'vitest';
import { TagFilter } from './TagFilter';

describe('TagFilter', () => {
  beforeEach(() => {
    // DOM 초기화
    document.body.innerHTML = `
      <ul class="blog-list">
        <li class="blog-item">
          <a href="/post1.html">Post 1</a>
          <ul class="tag-list">
            <li class="tag-item" data-id="blog">
              <a class="tag-text" data-tag="blog">#blog</a>
            </li>
            <li class="tag-item" data-id="wanted">
              <a class="tag-text" data-tag="wanted">#wanted</a>
            </li>
          </ul>
        </li>
        <li class="blog-item">
          <a href="/post2.html">Post 2</a>
          <ul class="tag-list">
            <li class="tag-item" data-id="test">
              <a class="tag-text" data-tag="test">#test</a>
            </li>
          </ul>
        </li>
        <li class="blog-item">
          <a href="/post3.html">Post 3</a>
          <ul class="tag-list">
            <li class="tag-item" data-id="blog">
              <a class="tag-text" data-tag="blog">#blog</a>
            </li>
            <li class="tag-item" data-id="typescript">
              <a class="tag-text" data-tag="typescript">#typescript</a>
            </li>
          </ul>
        </li>
      </ul>
      <ul id="search-tag-list">
        <li class="search-tag-item">
          <a class="tag-link" data-tag="blog">#blog</a>
        </li>
        <li class="search-tag-item">
          <a class="tag-link" data-tag="wanted">#wanted</a>
        </li>
        <li class="search-tag-item">
          <a class="tag-link" data-tag="test">#test</a>
        </li>
      </ul>
    `;
    window.location.hash = '';
  });

  describe('filterPostsByTags', () => {
    it('should show all posts when no tags selected', () => {
      const tagFilter = new TagFilter();
      tagFilter.filterPostsByTags();

      const posts = document.querySelectorAll('.blog-item');
      posts.forEach((post) => {
        expect((post as HTMLElement).classList.contains('hidden')).toBe(false);
      });
    });

    it('should filter posts by single tag', () => {
      window.location.hash = '#tags=blog';
      const tagFilter = new TagFilter();
      tagFilter.filterPostsByTags();

      const posts = document.querySelectorAll('.blog-item');
      // Post 1 has blog tag - visible
      expect((posts[0] as HTMLElement).classList.contains('hidden')).toBe(false);
      // Post 2 has test tag only - hidden
      expect((posts[1] as HTMLElement).classList.contains('hidden')).toBe(true);
      // Post 3 has blog tag - visible
      expect((posts[2] as HTMLElement).classList.contains('hidden')).toBe(false);
    });

    it('should show posts with any matching tag', () => {
      window.location.hash = '#tags=blog,test';
      const tagFilter = new TagFilter();
      tagFilter.filterPostsByTags();

      const posts = document.querySelectorAll('.blog-item');
      // All posts should be visible (blog or test)
      posts.forEach((post) => {
        expect((post as HTMLElement).classList.contains('hidden')).toBe(false);
      });
    });

    it('should add selected-tag-item class to matching tag items', () => {
      window.location.hash = '#tags=blog';
      const tagFilter = new TagFilter();
      tagFilter.filterPostsByTags();

      const blogTags = document.querySelectorAll('[data-id="blog"]');
      blogTags.forEach((tag) => {
        expect(tag.classList.contains('selected-tag-item')).toBe(true);
      });

      const testTags = document.querySelectorAll('[data-id="test"]');
      testTags.forEach((tag) => {
        expect(tag.classList.contains('selected-tag-item')).toBe(false);
      });
    });

    it('should add selected class to matching tag links', () => {
      window.location.hash = '#tags=blog';
      const tagFilter = new TagFilter();
      tagFilter.filterPostsByTags();

      const blogLink = document.querySelector('.tag-link[data-tag="blog"]');
      expect(blogLink?.classList.contains('selected')).toBe(true);

      const testLink = document.querySelector('.tag-link[data-tag="test"]');
      expect(testLink?.classList.contains('selected')).toBe(false);
    });

    it('should remove selected classes when no tags selected', () => {
      // First, set some tags
      window.location.hash = '#tags=blog';
      const tagFilter = new TagFilter();
      tagFilter.filterPostsByTags();

      // Then clear tags
      window.location.hash = '';
      tagFilter.filterPostsByTags();

      const selectedTagItems = document.querySelectorAll('.selected-tag-item');
      expect(selectedTagItems.length).toBe(0);

      const selectedTagLinks = document.querySelectorAll('.tag-link.selected');
      expect(selectedTagLinks.length).toBe(0);
    });

    it('should hide post when it has no matching tags', () => {
      window.location.hash = '#tags=typescript';
      const tagFilter = new TagFilter();
      tagFilter.filterPostsByTags();

      const posts = document.querySelectorAll('.blog-item');
      // Post 1 - no typescript tag - hidden
      expect((posts[0] as HTMLElement).classList.contains('hidden')).toBe(true);
      // Post 2 - no typescript tag - hidden
      expect((posts[1] as HTMLElement).classList.contains('hidden')).toBe(true);
      // Post 3 - has typescript tag - visible
      expect((posts[2] as HTMLElement).classList.contains('hidden')).toBe(false);
    });
  });

  describe('initTagClick', () => {
    it('should bind click event to document', () => {
      const tagFilter = new TagFilter();
      tagFilter.initTagClick();

      // 이벤트가 등록되었는지 확인하는 것은 어렵지만,
      // 최소한 에러 없이 실행되는지 확인
      expect(() => tagFilter.initTagClick()).not.toThrow();
    });
  });
});
