/**  
 * @fileoverview 빌드를 처리하는 루트 파일
 * 
 * @todo 읽기 로직 구현
 * @todo 처리 로직 구현
 * @todo 쓰기 로직 구현
 */

import { readdir,  } from "fs/promises";
import path, { join } from "path";

interface BlogPost {
    slug: string;
    filePath: string;
    dirPath: string | null;
    isInFolder: boolean;
    isProcessed: boolean;
}

/**
 * @param dirPath 디렉토리 경로
 * @param baseDir 기본 디렉토리 경로
 * @returns 블로그 포스트 목록을 반환함
 *   - 파일 내 정보는 다른 함수에서 처리함
 */
const  findMarkdownFiles  = async (
    dirPath: string,
    baseDir: string = dirPath
  )   => {

    const posts: BlogPost[] = []

    const entries = await readdir(dirPath, { withFileTypes: true })
    
    for (const entry of entries) {
        const fullPath = join(dirPath, entry.name)
        
        if (entry.isDirectory()) {
            // 재귀적으로 하위 디렉토리 탐색
            const subPosts = await findMarkdownFiles(fullPath, baseDir)
            posts.push(...subPosts)
        } else if (entry.isFile() && path.extname(entry.name) === '.md') {
            const isInFolder = dirPath !== baseDir
            const slug = isInFolder 
                ? path.basename(dirPath)
                : path.basename(entry.name, '.md')
            
            posts.push({
                slug,
                filePath: fullPath,
                dirPath: isInFolder ? dirPath : null,
                isInFolder,
                isProcessed: false,
            })
        }
    }

    return posts;
  }

const readMarkdownFiles = async (dirPath: string) => {
  //
  const files = await findMarkdownFiles(dirPath);
  console.log(files);
}

const processMarkdownFiles = async () => {
    // 
}

const writeHtmlFiles = async () => {
    // 
}

/**
 * 모든 빌드 로직의 호출을 처리하는 함수
 * 3계층 구조를 유지하고자 함
 * 1. 마크다운 파일 읽기 계층:
 *   - 마크 다운 파일들을 찾고 처리할 대상들을 기록함
 * 2. 마크다운 처리 및 html 변환 계층:
 *   - 마크다운 파일을 처리하고 html로 변환함
 * 3. html dist로 파일에 쓰기 계층:
 *   - 처리된 html 파일을 dist 폴더에 쓰기
 */
const build = async () => {
    // content/blogs의 모든 마크다운 파일 가져오기
    const blogsDir = join(process.cwd(), 'blogs');
    await readMarkdownFiles(blogsDir);
//   const files = await readdir(blogsDir, (err, files) => {
//     if (err) {
//       console.error(err);
//       return [];
//     }
//     console.log(files);
//     // return files;
//   });
// const markdownFiles = files.filter((file) => file.endsWith('.md'));

// console.log(`총 ${markdownFiles.length}개의 블로그 포스트 발견`);
// markdownFiles.forEach(file => console.log(`  - ${file}`));
};  

build();