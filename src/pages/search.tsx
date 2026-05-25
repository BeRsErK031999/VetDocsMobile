import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PagefindSearch from '@site/src/components/PagefindSearch';

export default function SearchPage(): React.ReactNode {
  return (
    <Layout title="Поиск" description="Офлайн-поиск по документации VetDocs Mobile">
      <main className="container margin-vert--xl">
        <Heading as="h1">Поиск</Heading>
        <p>
          Индекс Pagefind создается после production build и хранится рядом со статическими файлами.
        </p>
        <PagefindSearch />
      </main>
    </Layout>
  );
}
