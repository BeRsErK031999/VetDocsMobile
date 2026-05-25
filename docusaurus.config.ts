import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'VetDocs Mobile',
  tagline: 'Мобильная база ветеринарных документов',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://berserk031999.github.io',
  baseUrl: '/',
  organizationName: 'BeRsErK031999',
  projectName: 'VetDocsMobile',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'VetDocs Mobile',
      logo: {
        alt: 'VetDocs Mobile',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Документы',
        },
        {to: '/search', label: 'Поиск', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'VetDocs Mobile',
          items: [
            {
              label: 'Документы',
              to: '/docs/reception/patient-intake',
            },
            {
              label: 'Поиск',
              to: '/search',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} VetDocs Mobile.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
