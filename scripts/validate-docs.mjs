import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const docsDir = path.join(rootDir, 'docs');
const sidebarPath = path.join(rootDir, 'sidebars.ts');
const allowedSections = ['reception', 'sterilization', 'anesthesia', 'emergency', 'medicines', 'templates'];
const requiredFields = ['title', 'description', 'category', 'tags'];
const dateFields = ['lastUpdated', 'dateUpdated'];

let errorCount = 0;

function fail(file, problem, fix) {
  errorCount += 1;
  console.error(`\n${file}`);
  console.error(`  Error: ${problem}`);
  console.error(`  Fix: ${fix}`);
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

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function isTemplateFile(file) {
  const relative = toPosixPath(path.relative(docsDir, file));
  return relative === '_templates' || relative.startsWith('_templates/');
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return null;
  }

  const fields = new Map();
  const lines = match[1].split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fieldMatch = line.match(/^([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?$/);
    if (!fieldMatch) {
      continue;
    }

    const [, key, rawValue = ''] = fieldMatch;
    const value = rawValue.trim();

    if (value) {
      fields.set(key, value);
      continue;
    }

    const list = [];
    let nextIndex = index + 1;
    while (nextIndex < lines.length) {
      const listMatch = lines[nextIndex].match(/^\s*-\s+(.+?)\s*$/);
      if (!listMatch) {
        break;
      }

      list.push(listMatch[1]);
      nextIndex += 1;
    }

    fields.set(key, list.length > 0 ? list : '');
    index = nextIndex - 1;
  }

  return fields;
}

function hasNonEmptyValue(frontmatter, field) {
  const value = frontmatter.get(field);
  return typeof value === 'string' && value.trim().length > 0;
}

function hasValidTags(frontmatter) {
  const tags = frontmatter.get('tags');

  if (Array.isArray(tags)) {
    return tags.every((tag) => tag.trim().length > 0);
  }

  if (typeof tags === 'string') {
    const trimmed = tags.trim();
    return /^\[(\s*[^,\]]+\s*,)*\s*[^,\]]+\s*\]$/.test(trimmed);
  }

  return false;
}

function readSidebarDocumentIds() {
  const sidebar = fs.readFileSync(sidebarPath, 'utf8');
  return new Set(
    [...sidebar.matchAll(/['"]([A-Za-z0-9/_-]+)['"]/g)]
      .map((match) => match[1])
      .filter((value) => allowedSections.some((section) => value.startsWith(`${section}/`))),
  );
}

for (const section of allowedSections) {
  const sectionDir = path.join(docsDir, section);
  if (!fs.existsSync(sectionDir)) {
    fail(
      `docs/${section}`,
      `Missing docs section "${section}".`,
      `Create docs/${section} or remove the section from validate-docs.mjs if it is no longer supported.`,
    );
    continue;
  }

  const docs = fs.readdirSync(sectionDir).filter((file) => /\.mdx?$/.test(file));
  if (docs.length === 0) {
    fail(
      `docs/${section}`,
      `Docs section "${section}" has no markdown documents.`,
      `Add at least one .md document to docs/${section}.`,
    );
  }
}

const sidebarDocumentIds = readSidebarDocumentIds();
const markdownFiles = readMarkdownFiles(docsDir).filter((file) => !isTemplateFile(file));

for (const file of markdownFiles) {
  const relativePath = toPosixPath(path.relative(rootDir, file));
  const docsRelativePath = toPosixPath(path.relative(docsDir, file));
  const [section] = docsRelativePath.split('/');
  const content = fs.readFileSync(file, 'utf8');
  const frontmatter = parseFrontmatter(content);

  if (!allowedSections.includes(section)) {
    fail(
      relativePath,
      `Document is in unsupported section "${section}".`,
      `Move it into one of: ${allowedSections.map((allowedSection) => `docs/${allowedSection}`).join(', ')}.`,
    );
    continue;
  }

  if (!frontmatter) {
    fail(
      relativePath,
      'Missing frontmatter block.',
      'Add a YAML frontmatter block at the top with title, description, category, tags, and lastUpdated.',
    );
    continue;
  }

  for (const field of requiredFields) {
    if (!frontmatter.has(field)) {
      fail(
        relativePath,
        `Missing frontmatter field "${field}".`,
        `Add "${field}:" to the frontmatter. Required fields: ${requiredFields.join(', ')}.`,
      );
    }
  }

  for (const field of ['title', 'description', 'category']) {
    if (frontmatter.has(field) && !hasNonEmptyValue(frontmatter, field)) {
      fail(
        relativePath,
        `Frontmatter field "${field}" is empty.`,
        `Fill "${field}" with a short, meaningful value copied from the approved document metadata.`,
      );
    }
  }

  if (!dateFields.some((field) => hasNonEmptyValue(frontmatter, field))) {
    fail(
      relativePath,
      'Missing update date field.',
      `Add "lastUpdated: YYYY-MM-DD" to frontmatter. Accepted fields: ${dateFields.join(', ')}.`,
    );
  }

  if (frontmatter.has('tags') && !hasValidTags(frontmatter)) {
    fail(
      relativePath,
      'Frontmatter field "tags" is not a valid list.',
      'Use a YAML list, for example:\n       tags:\n         - прием\n         - чек-лист',
    );
  }

  const documentId = docsRelativePath.replace(/\.mdx?$/, '');
  if (!sidebarDocumentIds.has(documentId)) {
    fail(
      relativePath,
      `Document "${documentId}" is not listed in sidebars.ts.`,
      `Add "${documentId}" to the correct items array in sidebars.ts so Docusaurus navigation can reach it.`,
    );
  }
}

if (errorCount > 0) {
  console.error(`\nDocs validation failed with ${errorCount} error(s).`);
  process.exit(1);
}

console.log(`Docs structure and frontmatter are valid. Checked ${markdownFiles.length} document(s).`);
