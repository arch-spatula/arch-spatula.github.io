/**
 * @fileoverview 클라이언트 스크립트 진입점
 */

import { initSearchPopup } from './search/SearchPopup';
import { initTagFilter } from './tags/TagFilter';
import clipboard from './clipboard/clipboard';

document.addEventListener('DOMContentLoaded', (): void => {
  // 검색 팝업 초기화
  initSearchPopup();

  // 태그 필터 초기화
  initTagFilter();

  clipboard();
});
