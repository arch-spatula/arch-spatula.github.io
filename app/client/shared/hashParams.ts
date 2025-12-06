/**
 * URL 해시에서 파라미터를 파싱
 * @param hash - window.location.hash 값
 * @returns URLSearchParams 객체
 */
export const parseHashParams = (hash: string): URLSearchParams => new URLSearchParams(hash.slice(1));

/**
 * URLSearchParams를 해시 문자열로 변환
 * @param params - URLSearchParams 객체
 * @returns 해시 문자열 (#으로 시작)
 */
export const toHashString = (params: URLSearchParams): string => {
  const str = params.toString();
  return str ? `#${str}` : '';
};

/**
 * 해시에서 특정 키의 값을 가져옴
 * @param hash - window.location.hash 값
 * @param key - 파라미터 키
 * @returns 값 또는 null
 */
export const getHashParam = (hash: string, key: string): string | null => parseHashParams(hash).get(key);

/**
 * 해시에 파라미터를 설정
 * @param hash - 현재 해시 문자열
 * @param key - 파라미터 키
 * @param value - 파라미터 값
 * @returns 새로운 해시 문자열
 */
export const setHashParam = (hash: string, key: string, value: string): string => {
  const params = parseHashParams(hash);
  params.set(key, value);
  return params.toString();
};

/**
 * 해시에서 파라미터를 삭제
 * @param hash - 현재 해시 문자열
 * @param key - 삭제할 파라미터 키
 * @returns 새로운 해시 문자열
 */
export const deleteHashParam = (hash: string, key: string): string => {
  const params = parseHashParams(hash);
  params.delete(key);
  return params.toString();
};

/**
 * 해시에 특정 파라미터가 특정 값을 포함하는지 확인
 * @param hash - window.location.hash 값
 * @param key - 파라미터 키
 * @param value - 확인할 값
 * @returns 포함 여부
 */
export const hashParamIncludes = (hash: string, key: string, value: string): boolean => {
  const paramValue = getHashParam(hash, key);
  return paramValue === value;
};
