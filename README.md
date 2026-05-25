# VetDocs Mobile

Мобильная база ветеринарных регламентов, чек-листов и шаблонов документов на Docusaurus 3, TypeScript и React.

## Команды

```bash
npm install
npm run start
npm run build
npm run build:search
npm run serve
```

`npm run build:search` собирает production-версию сайта и создает локальный индекс Pagefind в `build/pagefind`.

Для финальной web/mobile-сборки используйте `npm run build:search`: эта команда сначала выполняет production-сборку Docusaurus, а затем добавляет офлайн-индекс поиска Pagefind в `build/pagefind`.

`npm run build` нужен только для обычной Docusaurus-сборки без индекса поиска. После этой команды папка `build/pagefind` не создается, поэтому поиск в готовом статическом артефакте будет недоступен до запуска `npm run build:search`.

## Офлайн-режим

VetDocs Mobile собирается как статический справочник без внешних ссылок, CDN, аналитики и удаленного поискового сервиса. Поиск работает через локальные файлы Pagefind из `build/pagefind`, поэтому финальный артефакт для упаковки должен быть получен командой `npm run build:search`.

## Проверки

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Структура документации

Документы находятся в `docs`:

- `reception` - прием пациентов
- `sterilization` - стерилизация
- `anesthesia` - анестезия
- `emergency` - экстренные случаи
- `medicines` - препараты
- `templates` - шаблоны документов

## Как добавить новый документ

1. Скопируйте структуру из `docs/_templates/document-template.md`.
2. Создайте новый `.md` файл в нужной папке внутри `docs`.
3. Заполните frontmatter: `title`, `description`, `category`, `tags`.
4. Добавьте документ в `sidebars.ts` в нужный раздел.
5. Проверьте сборку:

```bash
npm run build
```
