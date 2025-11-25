/* eslint-disable no-console */
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { existsSync } from 'fs';

const PORT = 3000;

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const preview = async () => {
  const server = createServer(async (req, res) => {
    try {
      // URL에서 경로 추출
      let filePath = req.url || '/';

      // 루트 경로는 index.html로
      if (filePath === '/') {
        filePath = '/index.html';
      }

      // dist 디렉토리 기준으로 파일 경로 생성
      const fullPath = join(process.cwd(), 'dist', filePath);

      // 파일이 존재하는지 확인
      if (!existsSync(fullPath)) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
        console.log(`❌ 404: ${filePath}`);
        return;
      }

      // 파일 읽기
      const content = await readFile(fullPath);

      // MIME 타입 결정
      const ext = extname(filePath);
      const mimeType = MIME_TYPES[ext] || 'text/plain';

      // 개발 환경에 적합한 캐시 헤더 설정
      const headers: Record<string, string> = {
        'Content-Type': mimeType,
        // 캐시 무효화: 항상 최신 버전 확인
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      };

      // 응답
      res.writeHead(200, headers);
      res.end(content);

      console.log(`✅ Served: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error serving ${req.url}:`, error);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 - Internal Server Error</h1>');
    }
  });

  server.listen(PORT, () => {
    console.log(`\n🚀 Preview server running at:`);
    console.log(`   http://localhost:${PORT}\n`);
    console.log(`Press Ctrl+C to stop\n`);
  });
};

preview();
