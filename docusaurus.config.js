// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const math = require('remark-math');
const katex = require('rehype-katex');

const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
require('dotenv').config();
// const mdxMermaid = import('mdx-mermaid')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Arch-Spatula의 레시피',
  tagline: '다양하게 조금씩 배우고 레시피로 정리합니다. 정해진 것은 없습니다.',
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
    GIT_USER: process.env.GIT_USER,
  },

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  deploymentBranch: 'gh-pages',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'docs',
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          lastVersion: 'current',
          onlyIncludeVersions: ['current'],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/arch-spatula/arch-spatula.github.io/blob/dev/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/arch-spatula/arch-spatula.github.io/blob/dev/',
          postsPerPage: 'ALL',
          blogSidebarCount: 0,
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        /**
         * Required for any multi-instance plugin
         */
        id: 'easter',
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: 'easter',
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: './easter',
        blogSidebarCount: 0,
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'experience',
        routeBasePath: 'experience',
        path: './experience',
        blogSidebarCount: 0,
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'meme',
        routeBasePath: 'meme',
        path: './meme',
        blogSidebarCount: 0,
        postsPerPage: 'ALL',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'python',
        path: 'python',
        routeBasePath: 'python',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'industrial-engineering',
        path: 'industrial-engineering',
        routeBasePath: 'industrial-engineering',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'nestjs',
        path: 'nestjs',
        routeBasePath: 'nestjs',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'diy-cs',
        path: 'diy-cs',
        routeBasePath: 'diy-cs',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'golang',
        path: 'golang',
        routeBasePath: 'golang',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'vue',
        path: 'vue',
        routeBasePath: 'vue',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'java',
        path: 'java',
        routeBasePath: 'java',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'db',
        path: 'db',
        routeBasePath: 'db',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'design-system-wiki',
        path: 'design-system-wiki',
        routeBasePath: 'design-system-wiki',
        sidebarPath: require.resolve('./sidebars.js'),
        // 아래는 수식 쓰기 시작하면 풀어주세요
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'html-css',
        path: 'html-css',
        routeBasePath: 'html-css',
        sidebarPath: require.resolve('./sidebars.js'),
        // 아래는 수식 쓰기 시작하면 풀어주세요
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'react-cookbook',
        path: 'react-cookbook',
        routeBasePath: 'react-cookbook',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'js-ts-cookbook',
        path: 'js-ts-cookbook',
        routeBasePath: 'js-ts-cookbook',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
  ],

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

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
          { to: '/blog', label: '블로그', position: 'left' },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '이런저런 레시피 시리즈',
          },
          {
            to: '/react-cookbook/intro',
            label: '리액트 Cook-Book',
            activeBaseRegex: `/react-cookbook/`,
            position: 'left',
          },
          {
            to: '/vue/intro',
            label: '뷰 Cook-Book',
            activeBaseRegex: `/vue/`,
            position: 'left',
          },
          {
            to: '/js-ts-cookbook/intro',
            label: 'JS & TS Cook-Book',
            activeBaseRegex: `/js-ts-cookbook/`,
            position: 'left',
          },
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
                label: '블로그',
                to: '/blog',
              },
              {
                label: '이런저런 레시피 시리즈',
                to: '/docs/intro',
              },
              {
                label: '리액트 Cook-Book',
                to: '/react-cookbook/intro',
              },
              {
                label: '뷰 Cook-Book',
                to: '/vue/intro',
              },
              {
                label: 'JS & TS Cook-Book',
                to: '/js-ts-cookbook/intro',
              },
              {
                label: 'easter',
                to: '/easter',
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
