import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const docsDir = path.join(rootDir, 'docs');
const requiredDirs = ['reception', 'sterilization', 'anesthesia', 'emergency', 'medicines', 'templates'];
const requiredFields = ['title', 'description', 'category', 'tags'];

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function readMarkdownFiles(dir) {
  return fs
    .readdirSync(dir, {withFileTypes: true})
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return readMarkdownFiles(fullPath);
      }

      return entry.isFile() && /\.mdx?$/.test(entry.name) ? [fullPath] : [];
    });
}

for (const dir of requiredDirs) {
  const sectionDir = path.join(docsDir, dir);
  if (!fs.existsSync(sectionDir)) {
    fail(`Missing docs section: ${dir}`);
    continue;
  }

  const docs = fs
    .readdirSync(sectionDir)
    .filter((file) => /\.mdx?$/.test(file));

  if (docs.length === 0) {
    fail(`Docs section has no markdown pages: ${dir}`);
  }
}

for (const file of readMarkdownFiles(docsDir)) {
  const relativePath = path.relative(rootDir, file);
  const content = fs.readFileSync(file, 'utf8');
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!frontmatter) {
    fail(`Missing frontmatter: ${relativePath}`);
    continue;
  }

  for (const field of requiredFields) {
    const pattern = new RegExp(`(^|\\n)${field}:`);
    if (!pattern.test(frontmatter[1])) {
      fail(`Missing frontmatter field "${field}": ${relativePath}`);
    }
  }
}

if (process.exitCode) {
  process.exit();
}

console.log('Docs structure and frontmatter are valid.');
