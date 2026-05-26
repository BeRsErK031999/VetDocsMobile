import fs from 'node:fs';
import path from 'node:path';

const allowedSections = {
  reception: 'Прием пациентов',
  sterilization: 'Стерилизация',
  anesthesia: 'Анестезия',
  emergency: 'Экстренные случаи',
  medicines: 'Препараты',
  templates: 'Шаблоны документов',
};

const requiredArgs = ['section', 'slug', 'title', 'description', 'tags'];
const rootDir = process.cwd();
const docsDir = path.join(rootDir, 'docs');

function printUsage() {
  console.error(`
Usage:
  node scripts/create-doc.mjs --section reception --slug primary-exam --title "Первичный осмотр" --description "Порядок первичного осмотра пациента" --tags "прием,осмотр,пациент"

Required arguments:
  --section      One of: ${Object.keys(allowedSections).join(', ')}
  --slug         File name without extension, in kebab-case
  --title        Document title
  --description  Short document description
  --tags         Comma-separated tags
`);
}

function fail(message) {
  console.error(`Error: ${message}`);
  printUsage();
  process.exit(1);
}

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) {
      fail(`Unexpected argument "${token}". Use --name value pairs.`);
    }

    const key = token.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) {
      fail(`Missing value for --${key}.`);
    }

    args[key] = value;
    index += 1;
  }

  return args;
}

function escapeFrontmatterValue(value) {
  return value.replaceAll('"', '\\"');
}

function validateArgs(args) {
  for (const arg of requiredArgs) {
    if (!args[arg]?.trim()) {
      fail(`Missing required argument --${arg}.`);
    }
  }

  if (!allowedSections[args.section]) {
    fail(`Invalid section "${args.section}". Allowed sections: ${Object.keys(allowedSections).join(', ')}.`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(args.slug)) {
    fail('Invalid slug. Use kebab-case with lowercase latin letters, digits, and single hyphens.');
  }

  const tags = args.tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (tags.length === 0) {
    fail('Tags must contain at least one comma-separated value.');
  }

  return tags;
}

function buildDocument({section, title, description}, tags) {
  const today = new Date().toISOString().slice(0, 10);
  const category = allowedSections[section];
  const tagLines = tags.map((tag) => `  - ${tag}`).join('\n');

  return `---
title: "${escapeFrontmatterValue(title)}"
description: "${escapeFrontmatterValue(description)}"
category: "${category}"
tags:
${tagLines}
lastUpdated: ${today}
---

# ${title}

## Назначение

Перенесите назначение документа из утвержденного бумажного источника.

## Когда использовать

- Укажите ситуацию из исходного документа.
- Укажите ситуацию из исходного документа.

## Ответственный сотрудник

Укажите роль или должность из исходного документа или внутренних правил клиники.

## Порядок действий

1. Перенесите первый шаг из исходного документа.
2. Перенесите второй шаг из исходного документа.
3. Перенесите третий шаг из исходного документа.

## Важные замечания

- Перенесите замечание из исходного документа.
- Перенесите замечание из исходного документа.

## Что записать в карту пациента

- Укажите, что нужно зафиксировать согласно исходному документу.
- Укажите, где или кем это фиксируется согласно исходному документу.

## Связанные документы

- Укажите связанный документ или рабочее название будущего документа.

## Дата обновления

Дата обновления: \`${today}\`

## Версия

Версия: \`1.0\`
`;
}

const args = parseArgs(process.argv.slice(2));
const tags = validateArgs(args);
const sectionDir = path.join(docsDir, args.section);
const outputPath = path.join(sectionDir, `${args.slug}.md`);

if (fs.existsSync(outputPath)) {
  fail(`File already exists: ${path.relative(rootDir, outputPath)}. Choose another --slug or edit the existing document.`);
}

fs.mkdirSync(sectionDir, {recursive: true});
fs.writeFileSync(outputPath, buildDocument(args, tags), 'utf8');

console.log(`Created document: ${path.relative(rootDir, outputPath)}`);
