import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'POS App',
  tagline: 'Dokumentation for Verifone POS-integrationen',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'your-github-name',
  projectName: 'pos-app-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'sv',
    locales: ['sv'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'POS App',
      logo: {
        alt: 'POS App Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'appSidebar',
          position: 'left',
<<<<<<< HEAD
          label: 'Dokumentation',
        },
        {to: '/blog', label: 'Blogg', position: 'left'},
=======
          label: 'App',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
>>>>>>> b46b863277691fa6a1e0f16074b7fa0c6c586e12
        {
          href: 'https://github.com/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Dokumentation',
          items: [
            {
              label: 'Intro',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Projekt',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/',
            },
          ],
        },
        {
          title: 'Innehall',
          items: [
            {
              label: 'Blogg',
              to: '/blog',
            },
            {
              label: 'Kom igang',
              to: '/docs/intro',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} POS App.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
