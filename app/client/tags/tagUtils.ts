/**
 * URL 해시에서 선택된 태그 목록을 파싱
 * @param hash - window.location.hash 값
 * @returns 태그 배열
 */
export const getSelectedTags = (hash: string): string[] => {
  const params = new URLSearchParams(hash.slice(1));
  return params.get('tags')?.split(',').filter(Boolean) || [];
};

/**
 * 태그를 토글 (추가 또는 제거)
 * @param currentTags - 현재 선택된 태그 배열
 * @param tag - 토글할 태그
 * @returns 새로운 태그 배열
 */
export const toggleTag = (currentTags: string[], tag: string): string[] => {
  if (currentTags.includes(tag)) {
    return currentTags.filter((t) => t !== tag);
  }
  return [...currentTags, tag];
};

/**
 * 태그 배열을 해시 파라미터 문자열로 변환
 * @param hash - 현재 해시 문자열
 * @param tags - 태그 배열
 * @returns 새로운 해시 파라미터 문자열
 */
export const updateTagsInHash = (hash: string, tags: string[]): string => {
  const params = new URLSearchParams(hash.slice(1));
  if (tags.length > 0) {
    params.set('tags', tags.join(','));
  } else {
    params.delete('tags');
  }
  return params.toString();
};

/**
 * 게시글의 태그 중 선택된 태그가 하나라도 있는지 확인
 * @param postTags - 게시글의 태그 배열
 * @param selectedTags - 선택된 태그 배열
 * @returns 일치 여부
 */
export const hasMatchingTag = (postTags: string[], selectedTags: string[]): boolean => {
  if (selectedTags.length === 0) return true;
  return selectedTags.some((tag) => postTags.includes(tag));
};
