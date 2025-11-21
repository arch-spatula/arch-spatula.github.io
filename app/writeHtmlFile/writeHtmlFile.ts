import { join, basename } from 'path';
// import { writeFile } from 'fs/promises';

const writeHtmlFile = async (filePath: string, htmlContent: string) => {
  // TODO: 실제 파일 쓰기 구현
  // 파일명만 추출하고 확장자를 .html로 변경
  const fileName = `${basename(filePath, '.md')}.html`;
  const htmlFilePath = join(process.cwd(), 'dist', fileName);
  console.log('htmlFilePath: ', htmlFilePath);
  //   await writeFile(htmlFilePath, htmlContent);
};

export default writeHtmlFile;
