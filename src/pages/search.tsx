import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PagefindSearch from '@site/src/components/PagefindSearch';

export default function SearchPage(): React.ReactNode {
  return (
    <Layout title="Поиск" description="Офлайн-поиск по документации VetDocs Mobile">
      <main className="search-page container">
        <div className="search-page__header">
          <Heading as="h1">Поиск</Heading>
          <p>
            Ищите по названиям, тегам и тексту документов: анестезия, шок, препараты, эпикриз.
          </p>
        </div>
        <PagefindSearch />
      </main>
    </Layout>
  );
}
