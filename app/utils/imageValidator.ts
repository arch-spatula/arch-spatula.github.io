import { existsSync, readdirSync } from 'fs';
import { join, dirname, basename } from 'path';

// 마크다운 이미지 링크 패턴
// ![alt text](image.png) 또는 ![alt text](/img/path/image.png)
const IMAGE_REGEX = /!\[([^\]]*)\]\(([^)]+)\)/g;

// 이미지 확장자 목록
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

export interface BrokenImageLink {
  /** 이미지 alt 텍스트 */
  alt: string;
  /** 원본 이미지 경로 */
  src: string;
  /** 마크다운 파일 경로 */
  markdownFilePath: string;
}

/**
 * 디렉토리 내에서 특정 파일명의 이미지를 재귀적으로 찾는 함수
 *
 * @param dirPath - 검색할 디렉토리 경로
 * @param fileName - 찾을 파일명
 * @returns 파일이 존재하면 true
 */
const findImageInDirectory = (dirPath: string, fileName: string): boolean => {
  if (!existsSync(dirPath)) {
    return false;
  }

  try {
    const entries = readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // 재귀적으로 하위 디렉토리 탐색
        if (findImageInDirectory(fullPath, fileName)) {
          return true;
        }
      } else if (entry.name === fileName) {
        return true;
      }
    }
  } catch {
    return false;
  }

  return false;
};

/**
 * 마크다운 콘텐츠에서 이미지 링크를 추출하는 함수
 *
 * @param markdownContent - 마크다운 콘텐츠
 * @returns 이미지 링크 배열 (alt, src)
 *
 * @example
 * const images = extractImageLinks('![alt](image.png)');
 * // [{ alt: 'alt', src: 'image.png' }]
 */
export const extractImageLinks = (markdownContent: string): Array<{ alt: string; src: string }> => {
  const images: Array<{ alt: string; src: string }> = [];
  let match;

  // 정규식 lastIndex 초기화
  IMAGE_REGEX.lastIndex = 0;

  while ((match = IMAGE_REGEX.exec(markdownContent)) !== null) {
    const [, alt, src] = match;
    // URL(http, https)은 제외
    if (!src.startsWith('http://') && !src.startsWith('https://')) {
      images.push({ alt, src });
    }
  }

  return images;
};

/**
 * 이미지 파일이 빌드 후 dist에 존재할지 확인하는 함수
 *
 * 빌드 시 복사되는 이미지:
 * 1. app/asset/ → dist/ (구조 유지)
 * 2. blogs/ 내의 이미지 → dist/ (파일명만)
 *
 * @param imageSrc - 마크다운에서 참조하는 이미지 경로
 * @param markdownFilePath - 마크다운 파일의 절대 경로
 * @param blogsDir - blogs 디렉토리 경로
 * @param assetDir - app/asset 디렉토리 경로
 * @returns 이미지 파일이 빌드 후 존재할 예정이면 true
 *
 * @example
 * // 상대 경로
 * checkImageExists('image.png', '/path/to/blogs/2024-01-01.md', '/path/to/blogs', '/path/to/app/asset');
 * // 절대 경로
 * checkImageExists('/img/image.png', '/path/to/blogs/2024-01-01.md', '/path/to/blogs', '/path/to/app/asset');
 */
export const checkImageExists = (
  imageSrc: string,
  markdownFilePath: string,
  blogsDir: string,
  assetDir: string,
): boolean => {
  if (imageSrc.startsWith('/')) {
    // 절대 경로: 빌드 후 dist에 복사될 이미지인지 확인

    // 1. app/asset/ 폴더에서 해당 경로 확인
    const assetPath = join(assetDir, imageSrc);
    if (existsSync(assetPath)) {
      return true;
    }

    // 2. blogs/ 폴더 내에서 파일명으로 재귀 검색
    // (blogs 내의 이미지는 파일명만으로 dist 루트에 복사됨)
    const fileName = basename(imageSrc);
    if (findImageInDirectory(blogsDir, fileName)) {
      return true;
    }

    return false;
  }
  // 상대 경로: 마크다운 파일 위치 기준으로 찾음
  const markdownDir = dirname(markdownFilePath);
  const imagePath = join(markdownDir, imageSrc);
  return existsSync(imagePath);
};

/**
 * 마크다운 콘텐츠에서 깨진 이미지 링크를 찾는 함수
 *
 * @param markdownContent - 마크다운 콘텐츠
 * @param markdownFilePath - 마크다운 파일의 절대 경로
 * @param blogsDir - blogs 디렉토리 경로
 * @param assetDir - app/asset 디렉토리 경로
 * @returns 깨진 이미지 링크 배열
 *
 * @example
 * const brokenLinks = findBrokenImageLinks(content, '/path/to/blog.md', '/path/to/blogs', '/path/to/app/asset');
 */
export const findBrokenImageLinks = (
  markdownContent: string,
  markdownFilePath: string,
  blogsDir: string,
  assetDir: string,
): BrokenImageLink[] => {
  const images = extractImageLinks(markdownContent);
  const brokenLinks: BrokenImageLink[] = [];

  for (const { alt, src } of images) {
    if (!checkImageExists(src, markdownFilePath, blogsDir, assetDir)) {
      brokenLinks.push({
        alt,
        src,
        markdownFilePath,
      });
    }
  }

  return brokenLinks;
};

/**
 * 깨진 이미지 링크를 터미널에 출력하는 함수
 *
 * @param brokenLinks - 깨진 이미지 링크 배열
 */
export const reportBrokenImageLinks = (brokenLinks: BrokenImageLink[]): void => {
  if (brokenLinks.length === 0) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log('\n⚠️  깨진 이미지 링크가 발견되었습니다:');
  // eslint-disable-next-line no-console
  console.log('─'.repeat(60));

  for (const { alt, src, markdownFilePath } of brokenLinks) {
    // eslint-disable-next-line no-console
    console.log(`📄 파일: ${markdownFilePath}`);
    // eslint-disable-next-line no-console
    console.log(`   🖼️  이미지: ${src}${alt ? ` (alt: "${alt}")` : ''}`);
  }

  // eslint-disable-next-line no-console
  console.log('─'.repeat(60));
  // eslint-disable-next-line no-console
  console.log(`총 ${brokenLinks.length}개의 깨진 이미지 링크\n`);
};
