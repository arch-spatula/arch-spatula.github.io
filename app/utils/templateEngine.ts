/**
 * 간단한 템플릿 엔진
 * {{PLACEHOLDER}} 형태의 플레이스홀더를 실제 값으로 치환
 */

/**
 * 템플릿 문자열에서 플레이스홀더를 실제 값으로 치환
 * @param template - 템플릿 문자열
 * @param data - 치환할 데이터 객체
 * @returns 치환된 문자열
 */
export const renderTemplate = (template: string, data: Record<string, string>): string => {
  let result = template;

  // {{PLACEHOLDER}} 형태의 플레이스홀더를 찾아서 치환
  Object.entries(data).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(placeholder, value ?? '');
  });

  // 치환되지 않은 플레이스홀더는 빈 문자열로 치환
  result = result.replace(/{{.*?}}/g, '');

  return result;
};

/**
 * 조건부 렌더링을 처리
 * {{#if CONDITION}}...{{/if}} 형태의 조건문 처리
 * @param template - 템플릿 문자열
 * @param data - 조건 확인을 위한 데이터 객체
 * @returns 조건 처리된 문자열
 */
export const renderConditional = (template: string, data: Record<string, any>): string => {
  let result = template;

  // {{#if KEY}}...{{/if}} 패턴 찾기
  const ifPattern = /{{#if\s+(\w+)}}([\s\S]*?){{\/if}}/g;

  result = result.replace(ifPattern, (match, key, content) => {
    // 조건이 true이거나 값이 존재하면 내용 반환, 아니면 빈 문자열
    if (data[key]) {
      return content;
    }
    return '';
  });

  return result;
};

/**
 * 중첩된 {{#each}}...{{/each}} 블록을 올바르게 찾기
 * @param template - 템플릿 문자열
 * @param startIndex - 검색 시작 위치
 * @returns 매칭 정보 또는 null
 */
const findEachBlock = (
  template: string,
  startIndex = 0,
): { key: string; content: string; fullMatch: string; start: number; end: number } | null => {
  const openPattern = /{{#each\s+(\w+)}}/g;
  openPattern.lastIndex = startIndex;
  const openMatch = openPattern.exec(template);

  if (!openMatch) return null;

  const key = openMatch[1];
  const contentStart = openPattern.lastIndex;
  let depth = 1;
  let i = contentStart;

  // 매칭되는 닫는 태그를 찾기 위해 depth 카운팅
  while (i < template.length && depth > 0) {
    if (template.slice(i, i + 8) === '{{#each ') {
      depth++;
      i += 8;
    } else if (template.slice(i, i + 9) === '{{/each}}') {
      depth--;
      if (depth === 0) {
        const content = template.slice(contentStart, i);
        const fullMatch = template.slice(openMatch.index, i + 9);
        return {
          key,
          content,
          fullMatch,
          start: openMatch.index,
          end: i + 9,
        };
      }
      i += 9;
    } else {
      i++;
    }
  }

  return null;
};

/**
 * 배열 렌더링을 처리
 * {{#each ARRAY}}...{{/each}} 형태의 반복문 처리
 * @param template - 템플릿 문자열
 * @param data - 배열 데이터를 포함한 객체
 * @returns 반복 처리된 문자열
 */
export const renderEach = (template: string, data: Record<string, any>): string => {
  let result = template;
  let hasMatch = true;

  // 모든 each 블록을 처리할 때까지 반복
  while (hasMatch) {
    const match = findEachBlock(result);

    if (!match) {
      hasMatch = false;
      break;
    }

    const { key, content, fullMatch } = match;
    const array = data[key];

    // 배열이 아니거나 비어있으면 빈 문자열로 치환
    if (!Array.isArray(array) || array.length === 0) {
      result = result.replace(fullMatch, '');
      continue;
    }

    // 배열의 각 항목에 대해 템플릿 렌더링
    const rendered = array
      .map((item) => {
        let itemContent = content;

        if (typeof item === 'object' && item !== null) {
          // 객체인 경우, 중첩된 each를 먼저 처리
          itemContent = renderEach(itemContent, item);

          // 객체의 각 속성을 플레이스홀더로 치환
          Object.entries(item).forEach(([itemKey, itemValue]) => {
            const placeholder = new RegExp(`{{${itemKey}}}`, 'g');
            if (Array.isArray(itemValue)) {
              itemContent = itemContent.replace(placeholder, itemValue.join(', '));
            } else if (typeof itemValue === 'object' && itemValue !== null) {
              itemContent = itemContent.replace(placeholder, JSON.stringify(itemValue));
            } else {
              itemContent = itemContent.replace(placeholder, String(itemValue ?? ''));
            }
          });
        } else {
          // 원시 값인 경우 {{this}}로 치환
          itemContent = itemContent.replace(/{{this}}/g, String(item));
        }

        return itemContent;
      })
      .join('');

    result = result.replace(fullMatch, rendered);
  }

  return result;
};

/**
 * 완전한 템플릿 렌더링
 * 조건문, 반복문, 일반 플레이스홀더를 모두 처리
 * @param template - 템플릿 문자열
 * @param data - 렌더링할 데이터
 * @returns 렌더링된 최종 문자열
 */
export const render = (template: string, data: Record<string, any>): string => {
  // 1. 조건문 처리
  let result = renderConditional(template, data);

  // 2. 반복문 처리
  result = renderEach(result, data);

  // 3. 일반 플레이스홀더 처리 (모든 값을 문자열로 변환)
  const stringData: Record<string, string> = {};
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      stringData[key] = value.join(', ');
    } else if (typeof value === 'object' && value !== null) {
      stringData[key] = JSON.stringify(value);
    } else {
      stringData[key] = String(value ?? '');
    }
  });

  result = renderTemplate(result, stringData);

  return result;
};
