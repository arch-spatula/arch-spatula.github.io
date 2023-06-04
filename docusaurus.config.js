// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
require('dotenv').config();
// const mdxMermaid = import('mdx-mermaid')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Arch-Spatula의 레시피',
  tagline: '저 혼자 다시 보려고 만들었습니다.',
  favicon: 'img/logo.svg',

  // Set the production url of your site here
  url: 'https://arch-spatula.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // baseUrl: "/arch-spatula.github.io/",
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'arch-spatula', // Usually your GitHub org/user name.
  projectName: 'arch-spatula.github.io', // Usually your repo name.
  trailingSlash: false,
  customFields: {
    GIT_PASS: process.env.GIT_PASS,
    GIT_USER: process.env.GIT_USER,
  },

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  deploymentBranch: 'main',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/arch-spatula/arch-spatula.github.io/blob/dev/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/arch-spatula/arch-spatula.github.io/blob/dev/',
          postsPerPage: 'ALL',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Arch-Spatula의 레시피',
        logo: {
          alt: 'Arch-Spatula blog Logo',
          src: 'img/profile.png',
          width: 32,
          height: 32,
        },
        // style: "primary",
        hideOnScroll: true,
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '이런저런 레시피 시리즈',
          },
          { to: '/blog', label: '블로그', position: 'left' },
          {
            href: 'https://github.com/arch-spatula/arch-spatula.github.io',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '이런저런 것',
            items: [
              {
                label: '이런저런 레시피 시리즈',
                to: '/docs/intro',
              },
              {
                label: '블로그',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          // {
          //   title: "More",
          //   items: [
          //     {
          //       label: "블로그",
          //       to: "/blog",
          //     },
          //     {
          //       label: "GitHub",
          //       href: "https://github.com/facebook/docusaurus",
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Arch-Spatula | All rights reserved. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
