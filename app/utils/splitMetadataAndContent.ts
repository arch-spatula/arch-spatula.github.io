/**
 * ---으로 시작하고 ---으로 끝나는 부분을 찾아서 분리
 * 메타정보를 입력하지 않은 경우 빈 문자열을 반환
 * 파일이 ---으로 시작하면 2번째 ---으로 끝나는 부분을 찾아서 분리
 * 앞뒤 공백은 무시
 */
export const splitMetadataAndContent = (content: string) => {
  // 앞뒤 공백 제거
  const trimmedContent = content.trim();

  const start = trimmedContent.indexOf('---');
  if (start === -1 || start !== 0) {
    return { metadata: '', markdownContent: content };
  }
  // 2번째 ---으로 끝나는 부분을 찾아서 분리
  const end = trimmedContent.indexOf('---', start + 4);
  if (end === -1) {
    return { metadata: '', markdownContent: content };
  }
  const metadata = trimmedContent.slice(start + 4, end).trim();
  const markdownContent = trimmedContent.slice(end + 4).trim();
  return { metadata, markdownContent };
};
