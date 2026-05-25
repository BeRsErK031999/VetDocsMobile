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
