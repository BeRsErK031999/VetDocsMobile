import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const sections = [
  {
    title: 'Прием пациентов',
    description: 'Чек-лист для стойки и кабинета: анамнез, первичный осмотр, жалобы владельца и решение, куда вести пациента дальше.',
    meta: 'Регистратура и врач',
    to: '/docs/reception/patient-intake',
  },
  {
    title: 'Стерилизация',
    description: 'Порядок обработки инструментов, упаковки и контроля готовности перед операциями, перевязками и стоматологией.',
    meta: 'Операционная и ассистенты',
    to: '/docs/sterilization/instrument-processing',
  },
  {
    title: 'Анестезия',
    description: 'Предоперационная сверка пациента, команды, расходников, аппарата и мониторинга перед вмешательством.',
    meta: 'Подготовка к вмешательству',
    to: '/docs/anesthesia/preoperative-checklist',
  },
  {
    title: 'Экстренные случаи',
    description: 'Алгоритм первичной оценки, стабилизации и передачи информации, когда пациенту нужна срочная помощь.',
    meta: 'Триаж и стабилизация',
    to: '/docs/emergency/shock-triage',
  },
  {
    title: 'Препараты',
    description: 'Карточки препаратов, ограничения и напоминания для быстрой сверки перед назначением или выдачей владельцу.',
    meta: 'Назначения',
    to: '/docs/medicines/drug-card',
  },
  {
    title: 'Шаблоны документов',
    description: 'Готовая структура выписок и памяток, чтобы быстро оформить понятный документ после приема или лечения.',
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
              Регламенты, чек-листы и шаблоны под рукой во время приема, подготовки к процедуре,
              экстренной ситуации или выписки пациента. Открывается с телефона и работает без сети.
            </p>
            <div className="home-actions" aria-label="Быстрые действия">
              <Link className="home-action home-action--primary" to="/search">
                Найти по документам
              </Link>
              <Link className="home-action" to="/docs/reception/patient-intake">
                Начать с приема
              </Link>
            </div>
            <div className="home-quick-panel" aria-label="Быстрые сценарии">
              <span>Прием</span>
              <span>Операционная</span>
              <span>Экстренно</span>
              <span>Выписка</span>
            </div>
          </div>
        </section>
        <section className="home-sections container" aria-label="Разделы документации">
          <div className="home-section-heading">
            <Heading as="h2">Разделы для ежедневной работы</Heading>
            <p>Крупные карточки ведут к самым частым сценариям клиники: от регистрации пациента до документа для владельца.</p>
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
