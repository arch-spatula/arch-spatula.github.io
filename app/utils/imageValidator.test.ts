import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import { extractImageLinks, checkImageExists, findBrokenImageLinks, reportBrokenImageLinks } from './imageValidator';
import { mkdirSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';

// 테스트용 임시 디렉토리
const TEST_DIR = join(process.cwd(), '.test-temp');
const TEST_BLOGS_DIR = join(TEST_DIR, 'blogs');
const TEST_ASSET_DIR = join(TEST_DIR, 'app', 'asset');

describe('extractImageLinks', () => {
  it('마크다운에서 이미지 링크를 추출한다', () => {
    const markdown = '![alt text](image.png)';
    const result = extractImageLinks(markdown);

    expect(result).toEqual([{ alt: 'alt text', src: 'image.png' }]);
  });

  it('여러 개의 이미지 링크를 추출한다', () => {
    const markdown = `
# Title
![first image](first.png)
Some text here
![second image](/img/second.jpg)
More text
![third](path/to/third.gif)
`;
    const result = extractImageLinks(markdown);

    expect(result).toEqual([
      { alt: 'first image', src: 'first.png' },
      { alt: 'second image', src: '/img/second.jpg' },
      { alt: 'third', src: 'path/to/third.gif' },
    ]);
  });

  it('alt 텍스트가 비어있어도 추출한다', () => {
    const markdown = '![](image.png)';
    const result = extractImageLinks(markdown);

    expect(result).toEqual([{ alt: '', src: 'image.png' }]);
  });

  it('http URL은 제외한다', () => {
    const markdown = '![external](https://example.com/image.png)';
    const result = extractImageLinks(markdown);

    expect(result).toEqual([]);
  });

  it('https URL은 제외한다', () => {
    const markdown = '![external](http://example.com/image.png)';
    const result = extractImageLinks(markdown);

    expect(result).toEqual([]);
  });

  it('로컬 이미지와 외부 URL이 섞여있을 때 로컬만 추출한다', () => {
    const markdown = `
![local](local.png)
![external](https://example.com/image.png)
![another local](/img/another.jpg)
`;
    const result = extractImageLinks(markdown);

    expect(result).toEqual([
      { alt: 'local', src: 'local.png' },
      { alt: 'another local', src: '/img/another.jpg' },
    ]);
  });

  it('이미지가 없으면 빈 배열을 반환한다', () => {
    const markdown = '# Title\n\nSome text without images';
    const result = extractImageLinks(markdown);

    expect(result).toEqual([]);
  });

  it('다양한 이미지 확장자를 추출한다', () => {
    const markdown = `
![png](image.png)
![jpg](image.jpg)
![jpeg](image.jpeg)
![gif](image.gif)
![svg](image.svg)
![webp](image.webp)
`;
    const result = extractImageLinks(markdown);

    expect(result).toHaveLength(6);
  });

  it('한글 alt 텍스트도 추출한다', () => {
    const markdown = '![한글 이미지 설명](korean.png)';
    const result = extractImageLinks(markdown);

    expect(result).toEqual([{ alt: '한글 이미지 설명', src: 'korean.png' }]);
  });
});

describe('checkImageExists', () => {
  beforeAll(() => {
    // 테스트용 디렉토리 및 파일 생성
    mkdirSync(TEST_BLOGS_DIR, { recursive: true });
    mkdirSync(join(TEST_BLOGS_DIR, '2024-01-01'), { recursive: true });
    mkdirSync(join(TEST_BLOGS_DIR, 'images'), { recursive: true });
    mkdirSync(TEST_ASSET_DIR, { recursive: true });

    // blogs 폴더 내 이미지 파일 생성
    writeFileSync(join(TEST_BLOGS_DIR, 'local.png'), '');
    writeFileSync(join(TEST_BLOGS_DIR, '2024-01-01', 'nested.png'), '');
    writeFileSync(join(TEST_BLOGS_DIR, 'images', 'screenshot.png'), '');

    // asset 폴더 내 이미지 파일 생성
    writeFileSync(join(TEST_ASSET_DIR, 'logo.png'), '');
  });

  afterAll(() => {
    // 테스트용 디렉토리 삭제
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it('상대 경로 이미지가 존재하면 true를 반환한다', () => {
    const result = checkImageExists('local.png', join(TEST_BLOGS_DIR, 'post.md'), TEST_BLOGS_DIR, TEST_ASSET_DIR);

    expect(result).toBe(true);
  });

  it('상대 경로 이미지가 존재하지 않으면 false를 반환한다', () => {
    const result = checkImageExists('missing.png', join(TEST_BLOGS_DIR, 'post.md'), TEST_BLOGS_DIR, TEST_ASSET_DIR);

    expect(result).toBe(false);
  });

  it('하위 디렉토리의 상대 경로를 올바르게 처리한다', () => {
    const result = checkImageExists(
      'images/screenshot.png',
      join(TEST_BLOGS_DIR, 'post.md'),
      TEST_BLOGS_DIR,
      TEST_ASSET_DIR,
    );

    expect(result).toBe(true);
  });

  it('절대 경로: blogs 내 이미지를 파일명으로 찾는다', () => {
    // /img/2024-01-01/nested.png는 파일명 nested.png로 blogs 폴더에서 찾음
    const result = checkImageExists(
      '/img/2024-01-01/nested.png',
      join(TEST_BLOGS_DIR, 'post.md'),
      TEST_BLOGS_DIR,
      TEST_ASSET_DIR,
    );

    expect(result).toBe(true);
  });

  it('절대 경로: asset 폴더에서 찾는다', () => {
    const result = checkImageExists('/logo.png', join(TEST_BLOGS_DIR, 'post.md'), TEST_BLOGS_DIR, TEST_ASSET_DIR);

    expect(result).toBe(true);
  });

  it('절대 경로: 존재하지 않는 이미지는 false를 반환한다', () => {
    const result = checkImageExists(
      '/img/missing/image.png',
      join(TEST_BLOGS_DIR, 'post.md'),
      TEST_BLOGS_DIR,
      TEST_ASSET_DIR,
    );

    expect(result).toBe(false);
  });
});

describe('findBrokenImageLinks', () => {
  beforeAll(() => {
    // 테스트용 디렉토리 및 파일 생성
    mkdirSync(TEST_BLOGS_DIR, { recursive: true });
    mkdirSync(join(TEST_BLOGS_DIR, 'subdir'), { recursive: true });
    mkdirSync(TEST_ASSET_DIR, { recursive: true });

    // 테스트용 이미지 파일 생성
    writeFileSync(join(TEST_BLOGS_DIR, 'exists.png'), '');
    writeFileSync(join(TEST_BLOGS_DIR, 'subdir', 'nested-exists.png'), '');
    writeFileSync(join(TEST_ASSET_DIR, 'asset-image.png'), '');
  });

  afterAll(() => {
    // 테스트용 디렉토리 삭제
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it('깨진 이미지 링크를 찾아 반환한다', () => {
    const markdown = `
![exists](exists.png)
![missing](missing.png)
`;
    const result = findBrokenImageLinks(markdown, join(TEST_BLOGS_DIR, 'post.md'), TEST_BLOGS_DIR, TEST_ASSET_DIR);

    expect(result).toHaveLength(1);
    expect(result[0].src).toBe('missing.png');
  });

  it('절대 경로 이미지: blogs에 있으면 찾는다', () => {
    const markdown = `
![nested](/img/2023/nested-exists.png)
`;
    const result = findBrokenImageLinks(markdown, join(TEST_BLOGS_DIR, 'post.md'), TEST_BLOGS_DIR, TEST_ASSET_DIR);

    expect(result).toEqual([]);
  });

  it('절대 경로 이미지: 없으면 깨진 링크로 반환한다', () => {
    const markdown = `
![missing](/img/2023/totally-missing.png)
`;
    const result = findBrokenImageLinks(markdown, join(TEST_BLOGS_DIR, 'post.md'), TEST_BLOGS_DIR, TEST_ASSET_DIR);

    expect(result).toHaveLength(1);
    expect(result[0].src).toBe('/img/2023/totally-missing.png');
  });

  it('모든 이미지가 존재하면 빈 배열을 반환한다', () => {
    const markdown = '![exists](exists.png)';
    const result = findBrokenImageLinks(markdown, join(TEST_BLOGS_DIR, 'post.md'), TEST_BLOGS_DIR, TEST_ASSET_DIR);

    expect(result).toEqual([]);
  });

  it('모든 이미지가 깨져있으면 전부 반환한다', () => {
    const markdown = `
![first](first.png)
![second](second.png)
`;
    const result = findBrokenImageLinks(markdown, join(TEST_BLOGS_DIR, 'post.md'), TEST_BLOGS_DIR, TEST_ASSET_DIR);

    expect(result).toHaveLength(2);
    expect(result[0].src).toBe('first.png');
    expect(result[1].src).toBe('second.png');
  });

  it('이미지가 없는 콘텐츠는 빈 배열을 반환한다', () => {
    const markdown = '# Title\n\nNo images here';
    const result = findBrokenImageLinks(markdown, join(TEST_BLOGS_DIR, 'post.md'), TEST_BLOGS_DIR, TEST_ASSET_DIR);

    expect(result).toEqual([]);
  });
});

describe('reportBrokenImageLinks', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('깨진 링크가 없으면 아무것도 출력하지 않는다', () => {
    reportBrokenImageLinks([]);

    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('깨진 링크가 있으면 터미널에 출력한다', () => {
    const brokenLinks = [
      {
        alt: 'test image',
        src: '/img/missing.png',
        markdownFilePath: '/blogs/post.md',
      },
    ];

    reportBrokenImageLinks(brokenLinks);

    expect(consoleSpy).toHaveBeenCalled();
    const allCalls = consoleSpy.mock.calls.flat().join('\n');
    expect(allCalls).toContain('깨진 이미지 링크');
    expect(allCalls).toContain('/blogs/post.md');
    expect(allCalls).toContain('/img/missing.png');
  });

  it('여러 깨진 링크를 모두 출력한다', () => {
    const brokenLinks = [
      { alt: 'first', src: 'first.png', markdownFilePath: '/blogs/post1.md' },
      { alt: 'second', src: 'second.png', markdownFilePath: '/blogs/post2.md' },
    ];

    reportBrokenImageLinks(brokenLinks);

    const allCalls = consoleSpy.mock.calls.flat().join('\n');
    expect(allCalls).toContain('총 2개의 깨진 이미지 링크');
  });

  it('alt 텍스트가 있으면 함께 출력한다', () => {
    const brokenLinks = [{ alt: 'my alt text', src: 'image.png', markdownFilePath: '/blogs/post.md' }];

    reportBrokenImageLinks(brokenLinks);

    const allCalls = consoleSpy.mock.calls.flat().join('\n');
    expect(allCalls).toContain('my alt text');
  });

  it('alt 텍스트가 없어도 정상 출력한다', () => {
    const brokenLinks = [{ alt: '', src: 'image.png', markdownFilePath: '/blogs/post.md' }];

    reportBrokenImageLinks(brokenLinks);

    expect(consoleSpy).toHaveBeenCalled();
    const allCalls = consoleSpy.mock.calls.flat().join('\n');
    expect(allCalls).toContain('image.png');
  });
});
