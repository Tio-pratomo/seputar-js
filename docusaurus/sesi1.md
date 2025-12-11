---
sidebar_position: 2
---

# Inisialisasi High-Performance Documentation

Di sesi ini, kita akan membangun fondasi project. Untuk konfigurasi docusaurus.config.js, tidak lagi menggunakan konfigurasi default (CommonJS) yang sudah mulai ditinggalkan, melainkan langsung migrasi ke **ES6 Modules** dan mengaktifkan **Docusaurus Faster** (Rust-based bundler) agar waktu build Anda secepat kilat.

## Materi: Pengetahuan & Konsep

### 1. Apa itu Docusaurus (Under the Hood)?

Docusaurus adalah **Static Site Generator (SSG)** berbasis React.

- **Build Time:** Mengubah Markdown + React Components menjadi file HTML statis (SEO Friendly).
- **Run Time (Hydration):** Saat browser memuat halaman, React "bangun" dan mengambil alih, mengubah situs menjadi **Single Page Application (SPA)**. Ini membuat navigasi antar halaman terjadi instan tanpa refresh browser.

### 2. Mengapa ES6 Modules?

Secara default, template Docusaurus masih menggunakan `require()` dan `module.exports` (CommonJS). Kita akan ubah ke `import` dan `export default` (ESM).

- **Konsistensi:** Selaras dengan kodingan React modern di folder `/src`.
- **Tree Shaking:** Memungkinkan bundler membuang kode yang tidak terpakai lebih efisien.

### 3. Rspack (Docusaurus Faster)

Docusaurus v3.6+ memperkenalkan modul eksperimental bernama **Faster**. Ini menggantikan Webpack (JavaScript-based) dengan **Rspack** (Rust-based).

- **Dampak:** Build time 3x-5x lebih cepat.
- **Benefit:** Saat Anda menulis konten, perubahan akan muncul di layar hampir seketika (_Hot Module Replacement_).

---

## Praktik: Setup & Modernisasi

Ikuti langkah ini secara berurutan. Jangan melewatkan satu baris kode pun.

### Langkah 1: Instalasi Project

Buka terminal Anda. Kita akan menginstal versi terbaru.

```bash
npx create-docusaurus@latest my-docs classic
```

**Format:** npx create-docusaurus@latest [nama-folder] [template]

Disarankan menggunakan template classic.

Tunggu proses selesai, lalu masuk ke direktori:

```bash
cd my-docs
```

### Langkah 2: Instalasi Paket "Faster"

Untuk mengaktifkan Rspack, kita perlu menginstal paket tambahan.

```bash
npm install @docusaurus/faster
```

### Langkah 3: Migrasi Config ke ES6 & Aktivasi Faster

Buka file `docusaurus.config.js` di root project Anda.

**Hapus semua isinya**, dan ganti dengan kode di bawah ini.

Kode ini diubah menjadi ES6 dan mengaktifkan fitur Faster.

```javascript title="docusaurus.config.js"
// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "My Modern Docs",
  tagline: "Documentation with Superpowers",
  favicon: "img/favicon.ico",

  // URL Production Anda nanti
  url: "https://your-docusaurus-site.example.com",
  baseUrl: "/",

  // Best Practice: Fail fast jika ada link rusak saat build
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Internationalization (i18n) - Kita bahas detail di Sesi 10
  i18n: {
    defaultLocale: "id",
    locales: ["id"],
  },

  // ⚡️ HIGH PERFORMANCE CONFIG ⚡️
  // Mengaktifkan Rspack dan SWC Loader (Rust-based tools)
  future: {
    experimental_faster: true,
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Opsi editUrl bisa diaktifkan nanti saat sudah ada repo Git
          // editUrl: 'https://github.com/...',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Ganti dengan image social card project Anda
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "My Docs",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Tutorial",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/facebook/docusaurus",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
```

### Langkah 4: Penyesuaian Sidebars (ES6)

Buka file `sidebars.js`. Kita juga harus mengubah ini menjadi ES6 modules.

**Hapus isinya**, ganti dengan:

```javascript title="sidebars.js"
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Secara default, membuat sidebar dari struktur folder docs
  tutorialSidebar: [{ type: "autogenerated", dirName: "." }],

  // Nanti kita bisa buat sidebar manual di sini untuk kontrol lebih
};

export default sidebars;
```

### Langkah 5: Running & Verification

Sekarang saatnya pembuktian. Jalankan server development.

```bash
npm start
```

Jika berhasil:

1.  Terminal akan menampilkan info bahwa build menggunakan **Rspack** (bukan Webpack).
2.  Browser akan otomatis terbuka di `localhost:3000`.
3.  Coba edit sedikit teks di `docusaurus.config.js` (misal ubah `title`), simpan, dan lihat betapa cepatnya browser me-refresh.

### Langkah 6: Clean Up (Persiapan Kanvas)

Agar sesi berikutnya bersih, mari kita hapus file sampah bawaan template.

1.  Hapus **semua file** di dalam folder `/docs/`.
2.  Buat file baru `/docs/intro.md` (Wajib ada minimal 1 file di folder docs agar tidak error).

    ```markdown
    ---
    sidebar_position: 1
    ---

    # Pendahuluan

    Selamat datang di dokumentasi modern saya.
    ```

3.  Hapus **semua file** di dalam folder `/blog/` (Opsional, jika Anda tidak butuh blog sekarang).

### Langkah 7: additionalLanguage (Opsional)

Di awal Inisialisasi proyek, sintaks highlighting milik docusaurus terbatas. Berikut bahasa yang didukung:

```bash
"markup",
"jsx",
"tsx",
"swift",
"kotlin",
"objectivec",
"js-extras",
"reason",
"rust",
"graphql",
"yaml",
"go",
"cpp",
"markdown",
"python",
"json",
```

Untuk menambahkan bahasa pemrograman lain, atau konfigurasi (yaml, ini) berikut langkah-langkahnya.

1.  Install paket prismjs

    ```bash
    npm install prismjs
    ```

2.  Di file `docusaurus.config.js` cari property `prism` tambahkan
    ```js
    {
        // kode lainnya
        prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        // highlight-next-line
        additionalLanguages: ['php', 'bash'],
      },
    }
    ```

---

### Rangkuman Sesi 1

Anda telah berhasil:

1.  Menginstal Docusaurus v3.9+.
2.  Menginstal paket `@docusaurus/faster` untuk performa build Rust-based.
3.  Mengubah konfigurasi inti (`docusaurus.config.js` dan `sidebars.js`) menjadi **ES6 Modules**.
4.  Membersihkan project dari file template bawaan.

Sekarang project Anda sudah **"Clean & Fast"**. Di sesi berikutnya, kita akan membedah **Routing Strategy** dan memisahkan konfigurasi Navbar agar kodingan kita tetap rapi.
