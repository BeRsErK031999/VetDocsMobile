import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Прием пациентов',
      items: ['reception/patient-intake'],
    },
    {
      type: 'category',
      label: 'Стерилизация',
      items: ['sterilization/instrument-processing'],
    },
    {
      type: 'category',
      label: 'Анестезия',
      items: ['anesthesia/preoperative-checklist'],
    },
    {
      type: 'category',
      label: 'Экстренные случаи',
      items: ['emergency/shock-triage'],
    },
    {
      type: 'category',
      label: 'Препараты',
      items: ['medicines/drug-card'],
    },
    {
      type: 'category',
      label: 'Шаблоны документов',
      items: ['templates/discharge-summary'],
    },
  ],
};

export default sidebars;
