import { readdir } from 'fs/promises';
import path, { join } from 'path';

/**
 * @param dirPath 디렉토리 경로
 * @param baseDir 기본 디렉토리 경로
 * @returns 마크다운 파일 목록을 반환함
 */
const listUpMarkdownFiles = async (dirPath: string, baseDir: string = dirPath) => {
  const posts: { filePath: string; isProcessed: boolean }[] = [];

  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // 재귀적으로 하위 디렉토리 탐색
      const subPosts = await listUpMarkdownFiles(fullPath, baseDir);
      posts.push(...subPosts);
    } else if (entry.isFile() && path.extname(entry.name) === '.md') {
      posts.push({
        filePath: fullPath,
        isProcessed: false,
      });
    }
  }
  return posts;
};

export default listUpMarkdownFiles;
