import { readFileSync } from 'fs';

const readMarkdownFile = async (dirPath: string) => {
  const content = readFileSync(dirPath, 'utf8');
  return content;
};

export default readMarkdownFile;
