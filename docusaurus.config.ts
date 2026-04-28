import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'POS App',
  tagline: 'Documentation for the Verifone POS integration',
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
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
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

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'integration',
        path: 'docs-integration-layer',
        routeBasePath: 'docs/integration',
        sidebarPath: require.resolve('./src/sidebars/sidebarsIntegration.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'pos',
        path: 'docs',
        routeBasePath: 'docs/app',
        sidebarPath: require.resolve('./src/sidebars/sidebarsApp.js'),
      },
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
        { to: 'docs/app', label: 'App', position: 'left' },
        { to: 'docs/integration', label: 'Integrations lager', position: 'left' },
        {
          href: 'https://github.com/JohannesL2/terminal-ux700',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Intro',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/JohannesL2/terminal-ux700',
            },
          ],
        },
        {
          title: 'Explore',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Kom igång',
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
