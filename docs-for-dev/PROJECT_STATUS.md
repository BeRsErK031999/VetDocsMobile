# VetDocsMobile Project Status

## Что это за проект

VetDocsMobile - офлайн-справочник ветеринарной клиники для мобильного использования. Проект хранит регламенты, чек-листы, шаблоны документов и перенесенные бумажные материалы в виде Docusaurus-документации, собирает локальный Pagefind-индекс и упаковывается в Android-приложение через Capacitor.

Клинический контент должен переноситься только из утвержденных источников клиники. Нельзя добавлять рекомендации от себя или менять медицинский смысл документа.

## Стек

- Docusaurus 3
- React 19
- TypeScript
- Pagefind для офлайн-поиска
- Capacitor для Android-оболочки
- Gradle/Android project в папке `android`
- Node.js 20+

## Что уже реализовано

- Главная страница с крупными мобильными карточками разделов.
- Рабочие разделы документации: `reception`, `sterilization`, `anesthesia`, `emergency`, `medicines`, `templates`.
- Отдельная страница офлайн-поиска на Pagefind.
- Pagefind индексирует только реальные документы из рабочих docs-разделов, без главной, tag pages и служебных страниц.
- Строгая валидация документов через `npm run test`.
- CLI для создания документа: `npm run docs:create`.
- Автоматическое добавление созданного документа в нужную секцию `sidebars.ts`.
- Android-сборка через Capacitor без сервера и внешних API.

## Как запустить web

```bash
npm install
npm run start
```

Docusaurus dev server откроет web-версию для разработки. Для проверки production-артефакта используйте `npm run build` или `npm run build:search`.

## Как собрать поиск

```bash
npm run build:search
```

Команда сначала выполняет production-сборку Docusaurus, затем создает локальный индекс Pagefind в `build/pagefind`.

Текущий индекс ограничен рабочими документами:

```bash
docs/{reception,sterilization,anesthesia,emergency,medicines,templates}/**/*.html
```

Это сделано, чтобы поиск не ранжировал главную страницу, tag pages и служебные страницы выше реальных документов.

## Как собрать Android APK

```bash
npm run mobile:build
cd android
.\gradlew.bat assembleDebug
```

APK появляется здесь:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

`npm run mobile:build` пересобирает Docusaurus, создает Pagefind-индекс и синхронизирует `build` в Android-проект через Capacitor.

## Как добавить документ

Используйте CLI:

```bash
npm run docs:create -- --section reception --slug primary-exam --title "Первичный осмотр" --description "Порядок первичного осмотра пациента" --tags "прием,осмотр,пациент"
```

Разрешенные секции:

- `reception`
- `sterilization`
- `anesthesia`
- `emergency`
- `medicines`
- `templates`

Скрипт создаст markdown-файл, добавит frontmatter, вставит структурный шаблон и зарегистрирует doc id в нужном `items`-массиве `sidebars.ts`.

После создания:

1. Перенесите только утвержденный текст бумажного документа.
2. Проверьте, что `sidebars.ts` обновлен корректно.
3. Запустите `npm run test`.
4. Запустите `npm run build:search`, чтобы проверить Pagefind-индекс.

## Проверки перед коммитом

Перед коммитом запускайте:

```bash
npm run lint
npm run typecheck
npm run test
npm run build:search
npm run mobile:build
```

Для проверки APK дополнительно:

```bash
cd android
.\gradlew.bat assembleDebug
```

После проверок смотрите `git status` и `git diff`, чтобы в коммит не попали временные файлы или unrelated changes.

## Нюанс Java 21/JBR для Gradle

На машине может быть установлен слишком новый Java runtime. Java 25 ломает Gradle-сборку ошибкой вида:

```text
Unsupported class file major version 69
```

Для Android-сборки используйте JBR из Android Studio:

```powershell
$env:JAVA_HOME='C:\Program Files\Android\Android Studio\jbr'
$env:Path="$env:JAVA_HOME\bin;$env:Path"
.\gradlew.bat assembleDebug
```

JBR 21 подходит для текущей Gradle/Android-сборки.

## Что НЕ делать

- Не запускать `npm audit fix --force`.
- Не добавлять сервер для работы приложения.
- Не добавлять внешние API.
- Не добавлять `INTERNET` permission в Android manifest.
- Не подключать CDN, аналитику или удаленный поиск.
- Не выдумывать клинический контент.
- Не менять медицинский смысл бумажных документов при переносе.
- Не ломать Docusaurus, Pagefind или Capacitor ради локального удобства.
