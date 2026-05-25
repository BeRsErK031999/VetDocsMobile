import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const sections = [
  {
    title: 'Прием пациентов',
    description: 'Быстрый сбор анамнеза, первичный осмотр и маршрутизация пациента на приеме.',
    meta: 'Регистратура и врач',
    to: '/docs/reception/patient-intake',
  },
  {
    title: 'Стерилизация',
    description: 'Пошаговый контроль обработки инструментов перед операциями и процедурами.',
    meta: 'Операционная и ассистенты',
    to: '/docs/sterilization/instrument-processing',
  },
  {
    title: 'Анестезия',
    description: 'Предоперационная проверка пациента, команды, расходников и оборудования.',
    meta: 'Подготовка к вмешательству',
    to: '/docs/anesthesia/preoperative-checklist',
  },
  {
    title: 'Экстренные случаи',
    description: 'Алгоритмы первичной оценки и действий, когда пациенту нужна срочная помощь.',
    meta: 'Триаж и стабилизация',
    to: '/docs/emergency/shock-triage',
  },
  {
    title: 'Препараты',
    description: 'Карточки препаратов, ограничения и напоминания для сверки перед назначением.',
    meta: 'Назначения',
    to: '/docs/medicines/drug-card',
  },
  {
    title: 'Шаблоны документов',
    description: 'Готовая структура выписок и документов для владельца после приема или лечения.',
    meta: 'Документы владельцу',
    to: '/docs/templates/discharge-summary',
  },
];

export default function Home(): React.ReactNode {
  return (
    <Layout title="VetDocs Mobile" description="Мобильная база ветеринарных документов">
      <main>
        <section className="home-hero">
          <div className="container">
            <p className="home-hero__eyebrow">Офлайн-справочник для смены в ветклинике</p>
            <Heading as="h1" className="home-hero__title">
              VetDocs Mobile
            </Heading>
            <p className="home-hero__subtitle">
              Регламенты, чек-листы и шаблоны под рукой: прием, стерилизация, анестезия,
              экстренные случаи, препараты и документы для владельца.
            </p>
            <div className="home-actions" aria-label="Быстрые действия">
              <Link className="home-action home-action--primary" to="/search">
                Найти документ
              </Link>
              <Link className="home-action" to="/docs/reception/patient-intake">
                Начать с приема
              </Link>
            </div>
          </div>
        </section>
        <section className="home-sections container" aria-label="Разделы документации">
          <div className="home-section-heading">
            <Heading as="h2">Разделы для ежедневной работы</Heading>
            <p>Откройте нужный сценарий прямо с телефона во время приема, подготовки или выписки.</p>
          </div>
          <div className="section-grid">
            {sections.map((section, index) => (
              <Link className="section-card" key={section.to} to={section.to}>
                <span className="section-card__number">{String(index + 1).padStart(2, '0')}</span>
                <Heading as="h3">{section.title}</Heading>
                <p>{section.description}</p>
                <span className="section-card__meta">{section.meta}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
