import { readdir } from 'fs/promises';
import { join, extname } from 'path';

// 이미지 확장자 목록
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

/**
 * 지정된 디렉토리에서 이미지 파일을 재귀적으로 찾는 함수
 * @param dirPath 탐색할 디렉토리 경로
 * @returns 이미지 파일 경로 목록
 */
const listUpImageFiles = async (dirPath: string): Promise<string[]> => {
  const images: string[] = [];
  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      images.push(...(await listUpImageFiles(fullPath)));
    } else if (IMAGE_EXTENSIONS.includes(extname(entry.name).toLowerCase())) {
      images.push(fullPath);
    }
  }
  return images;
};

export default listUpImageFiles;
