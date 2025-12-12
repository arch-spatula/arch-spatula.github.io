/**
 * @fileoverview 클라이언트 스크립트 진입점
 */

import { initSearchPopup } from './search/SearchPopup';
import { initTagFilter } from './tags/TagFilter';
import clipboard from './clipboard/clipboard';
import { initHashPreserver } from './shared/preserveHash';

document.addEventListener('DOMContentLoaded', (): void => {
  // 링크 클릭 시 URL 해시를 유지하는 기능 초기화
  initHashPreserver();

  // 검색 팝업 초기화
  initSearchPopup();

  // 태그 필터 초기화
  initTagFilter();

  clipboard();
});
