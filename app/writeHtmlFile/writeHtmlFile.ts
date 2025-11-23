import { join, basename, dirname } from 'path';
// import { writeFile } from 'fs/promises';
import { writeFileSync, mkdirSync } from 'fs';
import { readFile } from 'fs/promises';
import { render } from '../utils/templateEngine';
import { Metadata } from '../types';

const writeHtmlFile = async (filePath: string, htmlContent: string, metadata: Metadata) => {
  const appHtml = await readFile(join(process.cwd(), 'app', 'templates', 'app.html'), 'utf8');
  const postHtml = await readFile(join(process.cwd(), 'app', 'templates', 'post.html'), 'utf8');
  const bodyHtml = render(postHtml, { content: htmlContent });
  const finalHtml = render(appHtml, {
    body: bodyHtml,
    title: ` - ${metadata.title ?? ''}`,
    description: metadata.description ?? '',
    tags: metadata.tags?.join(', ') ?? '',
    authors: metadata.authors?.join(', ') ?? '',
    date: metadata.date ?? '',
  });
  // TODO: 실제 파일 쓰기 구현
  // 파일명만 추출하고 확장자를 .html로 변경
  const fileName = `${basename(filePath, '.md')}.html`;
  const htmlFilePath = join(process.cwd(), 'dist', fileName);

  mkdirSync(dirname(htmlFilePath), { recursive: true });
  writeFileSync(htmlFilePath, finalHtml, 'utf8');
};

export default writeHtmlFile;
