---
sidebar_position: 11
---

# Konsep SEO di Docusaurus

Sesi ini kita fokus **mengoptimalkan SEO** dulu: meta tags, Open Graph/Twitter card, sitemap, robots.txt, dan praktik per halaman.

Docusaurus sudah cukup “SEO-friendly by default”, tapi butuh sedikit konfigurasi agar benar-benar production grade.

## Materi: Konsep SEO di Docusaurus

Docusaurus secara otomatis melakukan pre-render HTML untuk setiap route, sehingga mesin pencari dapat mengindeks konten tanpa masalah SPA/hydration. Untuk meta data, ada dua level:

- **Global metadata** di `themeConfig` (`metadata`, `image`, dsb.), yang diterapkan ke seluruh situs.
- **Page-level metadata** melalui front matter (`title`, `description`, `image`, `keywords`) di setiap Markdown/MDX (docs, blog, pages). Ini otomatis di-mapping ke `<title>`, `meta name="description"`, `og:title`, `og:description`, dan `og:image`.

Docusaurus juga mengaktifkan plugin `@docusaurus/plugin-sitemap` di preset classic untuk menghasilkan `sitemap.xml` secara otomatis di `/sitemap.xml` (atau dengan `baseUrl` prefix), yang membantu crawler menemukan semua halaman dengan struktur yang benar.

Jika halaman memiliki meta `robots` dengan `noindex`, plugin sitemap akan mengabaikan halaman tersebut.

---

## Praktik: Global SEO Setup (`docusaurus.config.js`)

### 1. Global Meta Tags & Social Image

Buka `docusaurus.config.js` dan perkuat bagian SEO global di `themeConfig`.

```javascript title="docusaurus.config.js"
const config = {
  title: "My Modern Docs",
  tagline: "Dokumentasi developer modern dengan Docusaurus",
  url: "https://docs.myproduct.com", // penting untuk canonical & sitemap [web:16][web:96]
  baseUrl: "/",

  // ...

  themeConfig: {
    image: "img/social-card.png", // default og:image & twitter:image [web:68][web:96]
    metadata: [
      {
        name: "keywords",
        content: "docusaurus, documentation, shoelace, react, tutorial",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@mycompany" },
    ],

    // ... navbar, footer, prism, dll ...
  },
};

export default config;
```

Field `image` di `themeConfig` menjadi fallback untuk `og:image` dan `twitter:image` ketika halaman tidak mendefinisikan `image` sendiri.

### 2. Sitemap Configuration

Preset classic sudah menyertakan `@docusaurus/plugin-sitemap`, tapi Anda bisa mengatur `changefreq`, `priority`, atau `ignorePatterns` jika perlu. Di dalam `presets`:

```javascript title="docusaurus.config.js"
presets: [
  [
    'classic',
    {
      docs: { /* ... */ },
      blog: { /* ... */ },
      theme: { customCss: './src/css/custom.css' },

      sitemap: {
        changefreq: 'weekly',
        priority: 0.5,
        ignorePatterns: ['/tags/**'],   // contoh: tidak perlu index halaman tag blog [web:103]
        filename: 'sitemap.xml',
      },
    },
  ],
],
```

Setelah `npm run build`, sitemap tersedia di `https://docs.myproduct.com/sitemap.xml` dan bisa disubmit ke Google Search Console.

### 3. robots.txt Minimalis

Tambahkan file `robots.txt` di folder `static/`:

```txt title="static/robots.txt"
User-agent: *
Allow: /

Sitemap: https://docs.myproduct.com/sitemap.xml
```

Folder `static/` disalin verbatim ke root build, sehingga file ini akan tersedia di `/robots.txt`.

---

## Praktik: Page-Level SEO (Docs & Blog)

### 1. SEO-Friendly Front Matter untuk Docs

Buka salah satu dokumen penting, misalnya `docs/intro.md`, dan perkuat front matter-nya:

```markdown
---
id: intro
title: Pengantar Docusaurus untuk Developer
description: Dasar-dasar Docusaurus, mulai dari instalasi, struktur project, hingga penulisan konten dengan MDX.
keywords:
  - docusaurus
  - dokumentasi
  - react
  - static site generator
image: /img/social-intro.png
sidebar_position: 1
---
```

`title`, `description`, dan `image` di sini akan digunakan untuk `<title>`, `meta description`, `og:*`, dan `twitter:*` secara otomatis. `keywords` akan diubah menjadi `meta name="keywords"`.

### 2. SEO untuk Blog Post

Untuk blog (misal `blog/2025-01-01-my-post.md`):

```markdown
---
slug: /blog/docusaurus-seo-best-practices
title: Optimasi SEO di Docusaurus untuk Developer
description: Cara mengatur meta tag, sitemap, dan social card di Docusaurus agar dokumentasi Anda mudah ditemukan.
tags: [docusaurus, seo, best-practices]
image: /img/blog-seo-cover.png
authors: you
---
```

Docusaurus akan menggabungkan info ini dengan templat blog untuk menghasilkan metadata kaya (Open Graph, Twitter Card) yang siap dibaca sosial media dan mesin pencari.

---

## Praktik: Custom Page (React) dengan Layout Head Props

Untuk halaman React di `src/pages/about.js`, manfaatkan prop `title` dan `description` milik `Layout`.

```javascript title="src/pages/about.js"
import React from "react";
import Layout from "@theme/Layout";

export default function About() {
  return (
    <Layout
      title="Tentang Dokumentasi Ini"
      description="Informasi tentang tujuan, struktur, dan teknis di balik dokumentasi My Modern Docs."
    >
      <main style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
        <h1>Tentang Dokumentasi Ini</h1>
        <p>...</p>
      </main>
    </Layout>
  );
}
```

Docusaurus akan menggenerate `<title>`, `meta description`, dan canonical URL berdasarkan properti ini dan konfigurasi global (`url` + `baseUrl`).

---

Dengan konfigurasi ini, situs dokumentasi Anda sudah:

- Memiliki **meta global yang konsisten**,
- Menggunakan **metadata per halaman** yang kaya,
- Punya **sitemap.xml** dan **robots.txt** yang benar,
- Dan siap di-submit ke **Google Search Console** dan di-share ke sosial media dengan tampilan card yang rapi.
