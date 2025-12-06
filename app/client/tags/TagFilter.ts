import { getSelectedTags, toggleTag, updateTagsInHash, hasMatchingTag } from './tagUtils';

/**
 * 태그 필터링 클래스
 */
export class TagFilter {
  /**
   * 태그 클릭 이벤트 초기화
   * MPA 스타일: URL 해시 변경 후 페이지 새로고침
   */
  initTagClick(): void {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const tagElement = target.closest('[data-tag]') as HTMLElement;
      if (!tagElement) {
        return;
      }
      e.preventDefault();
      const clickedTag = tagElement.dataset.tag;
      if (!clickedTag) return;

      const currentTags = getSelectedTags(window.location.hash);
      const newTags = toggleTag(currentTags, clickedTag);
      const newHash = updateTagsInHash(window.location.hash, newTags);

      window.location.hash = newHash;
      window.location.reload();
    });
  }

  /**
   * URL을 확인하고 태그에 따라 게시글을 필터링하고 선택된 태그를 강조
   */
  filterPostsByTags(): void {
    const selectedTags = getSelectedTags(window.location.hash);
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
      const shouldShow = hasMatchingTag(postTags, selectedTags);
      (post as HTMLElement).classList.toggle('hidden', !shouldShow);
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
  }
}

/**
 * 태그 필터 초기화 함수
 */
export const initTagFilter = (): TagFilter => {
  const tagFilter = new TagFilter();
  tagFilter.initTagClick();
  tagFilter.filterPostsByTags();
  return tagFilter;
};
