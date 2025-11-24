// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Seputar JS",
  tagline:
    "Panduan seputar teknologi JavaScript yang modern, dari dasar hingga mahir.",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    experimental_faster: {
      rspackBundler: true, // required flag
      rspackPersistentCache: true,
    },
  },

  // Set the production url of your site here
  url: "https://seputar-js.vercel.app",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "id",
    locales: ["id"],
  },

  onBrokenLinks: "throw",

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        debug: false, // Disable debug features to avoid Rspack issues
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "vite",
        path: "vite",
        routeBasePath: "vite",
        sidebarPath: "./viteSidebars.js",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docusaurus",
        path: "docusaurus",
        routeBasePath: "docusaurus",
        sidebarPath: "./docusaurusSidebars.js",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "webpack",
        path: "webpack",
        routeBasePath: "webpack",
        sidebarPath: "./webpackSidebars.js",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "parcel",
        path: "parcel",
        routeBasePath: "parcel",
        sidebarPath: "./parcelSidebars.js",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docsify",
        path: "docsify",
        routeBasePath: "docsify",
        sidebarPath: "./docsifySidebars.js",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "regex",
        path: "regex",
        routeBasePath: "regex",
        sidebarPath: "./regexSidebars.js",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "astro",
        path: "astro-js",
        routeBasePath: "astro-js",
        sidebarPath: "./astro-js-sidebars.js",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "prettier",
        path: "prettier",
        routeBasePath: "prettier",
        sidebarPath: "./prettierSidebars.js",
      },
    ],
    [
      "@docusaurus/plugin-debug", // Add debug plugin explicitly with debug disabled
      {
        debug: false,
      },
    ],
  ],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  themes: ["@docusaurus/theme-mermaid"],
  clientModules: [require.resolve("./src/shoelace.client.js")],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "SeputarJS",
        logo: {
          alt: "My Site Logo",
          src: "img/seputar-js.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docusaurusSitebar",
            position: "left",
            label: "Docusaurus",
            docsPluginId: "docusaurus",
          },
          {
            type: "docSidebar",
            sidebarId: "viteSitebar",
            position: "left",
            label: "Vite",
            docsPluginId: "vite",
          },
          {
            type: "docSidebar",
            sidebarId: "webpackSidebar",
            position: "left",
            label: "Webpack",
            docsPluginId: "webpack",
          },
          {
            type: "docSidebar",
            sidebarId: "parcelSidebar",
            position: "left",
            label: "Parcel JS",
            docsPluginId: "parcel",
          },
          {
            type: "docSidebar",
            sidebarId: "docsifySidebar",
            position: "left",
            label: "Docsify",
            docsPluginId: "docsify",
          },
          {
            type: "docSidebar",
            sidebarId: "regexSidebar",
            position: "left",
            label: "Regex",
            docsPluginId: "regex",
          },
          {
            type: "docSidebar",
            sidebarId: "astroSidebar",
            position: "left",
            label: "Astro JS",
            docsPluginId: "astro",
          },
          {
            type: "docSidebar",
            sidebarId: "prettierSidebar",
            position: "left",
            label: "Prettier",
            docsPluginId: "prettier",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Materi Tersedia",
            items: [
              {
                label: "Docusaurus",
                to: "/docusaurus/intro",
              },
              {
                label: "Vite JS",
                to: "/vite/intro",
              },
              {
                label: "Webpack",
                to: "/webpack/intro",
              },
              {
                label: "Docsify",
                to: "/docsify/intro",
              },
              {
                label: "Regex",
                to: "/regex/intro",
              },
              {
                label: "Astro JS",
                to: "/astro-js/intro",
              },
              {
                label: "Prettier",
                to: "/prettier/intro",
              },
            ],
          },
          {
            title: "Bacaan Lainnya",
            items: [
              {
                label: "Belajar HTML, CSS,Git",
                href: "https://html-css-git-tutorial.vercel.app/",
              },
              {
                label: "Belajar Hugo SSG",
                href: "https://tio-pratomo.github.io/learn-hugo/",
              },
              {
                label: "Cara Pakai Utility Javascript",
                href: "https://tio-pratomo.github.io/utility-js/",
              },
            ],
          },
          {
            title: "Lainnya",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/Tio-pratomo/seputar-js/tree/main",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Seputar JS.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["ini"],
      },
    }),
};

export default config;
