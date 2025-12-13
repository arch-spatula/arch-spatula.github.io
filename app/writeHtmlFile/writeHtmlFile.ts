import { join, dirname } from 'path';
import { writeFileSync, mkdirSync } from 'fs';

/**
 * HTML 파일을 dist 폴더에 저장하는 함수
 * blogs/ 폴더 구조를 유지하여 저장합니다.
 *
 * @param filePath - 원본 마크다운 파일 경로
 * @param htmlContent - 저장할 HTML 콘텐츠
 * @param blogsDir - blogs 폴더의 절대 경로
 */
const writeHtmlFile = async (filePath: string, htmlContent: string, blogsDir: string) => {
  // blogs/ 기준 상대 경로를 유지하여 HTML 파일 경로 생성
  const relativePath = filePath.replace(`${blogsDir}/`, '');
  const htmlRelativePath = relativePath.replace('.md', '.html');
  const htmlFilePath = join(process.cwd(), 'dist', htmlRelativePath);

  mkdirSync(dirname(htmlFilePath), { recursive: true });
  writeFileSync(htmlFilePath, htmlContent, 'utf8');
};

export default writeHtmlFile;
