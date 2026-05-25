import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const sections = [
  {
    title: 'Прием пациентов',
    description: 'Протоколы сбора анамнеза, осмотра и первичной маршрутизации.',
    to: '/docs/reception/patient-intake',
  },
  {
    title: 'Стерилизация',
    description: 'Чек-листы обработки инструментов и контроля стерильности.',
    to: '/docs/sterilization/instrument-processing',
  },
  {
    title: 'Анестезия',
    description: 'Подготовка пациента, команды и оборудования к анестезии.',
    to: '/docs/anesthesia/preoperative-checklist',
  },
  {
    title: 'Экстренные случаи',
    description: 'Алгоритмы первичной оценки и действий при критических состояниях.',
    to: '/docs/emergency/shock-triage',
  },
  {
    title: 'Препараты',
    description: 'Формат справочных карточек препаратов и ограничений.',
    to: '/docs/medicines/drug-card',
  },
  {
    title: 'Шаблоны документов',
    description: 'Заготовки документов для приема, лечения и выписки.',
    to: '/docs/templates/discharge-summary',
  },
];

export default function Home(): React.ReactNode {
  return (
    <Layout title="VetDocs Mobile" description="Мобильная база ветеринарных документов">
      <main>
        <section className="hero hero--primary">
          <div className="container">
            <Heading as="h1" className="hero__title">
              VetDocs Mobile
            </Heading>
            <p className="hero__subtitle">
              Мобильная база регламентов, чек-листов и шаблонов для ветеринарной клиники.
            </p>
            <div className="button-group">
              <Link className="button button--secondary button--lg" to="/docs/reception/patient-intake">
                Открыть документацию
              </Link>
              <Link className="button button--outline button--secondary button--lg" to="/search">
                Поиск
              </Link>
            </div>
          </div>
        </section>
        <section className="container margin-vert--xl">
          <div className="section-grid">
            {sections.map((section) => (
              <Link className="section-card" key={section.to} to={section.to}>
                <Heading as="h2">{section.title}</Heading>
                <p>{section.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
