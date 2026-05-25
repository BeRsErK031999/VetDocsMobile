import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PagefindSearch from '@site/src/components/PagefindSearch';

export default function SearchPage(): React.ReactNode {
  return (
    <Layout title="Поиск" description="Офлайн-поиск по документации VetDocs Mobile">
      <main className="search-page container">
        <div className="search-page__header">
          <p className="search-page__eyebrow">Офлайн-поиск по базе VetDocs</p>
          <Heading as="h1">Найти документ</Heading>
          <p>
            Ищите по названиям, словам внутри документов и рабочим ситуациям: прием, анестезия,
            шок, стерилизация, препарат или выписка.
          </p>
        </div>
        <PagefindSearch />
      </main>
    </Layout>
  );
}
