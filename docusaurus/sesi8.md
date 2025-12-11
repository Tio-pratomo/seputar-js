---
sidebar_position: 9
---

# Search Engine & UX Pencarian

Di sesi ini kita akan meng-upgrade UX dokumentasi dengan **search bar modern** di navbar dan indeks pencarian yang optimal.

**Fokusnya:** konfigurasi **local search** (`@easyops-cn/docusaurus-search-local`) dan penempatan search bar yang rapi di navbar dengan ES Modules, sambil tetap membuka jalan ke **Algolia DocSearch** bila nanti dokumentasi jadi publik besar.

---

## Materi: Konsep Search di Docusaurus

Docusaurus secara resmi mendukung 4 pendekatan search: **Algolia DocSearch (official)**, Typesense, Local Search, atau membuat SearchBar sendiri.

Untuk project pribadi/internal atau yang belum cukup besar untuk apply Algolia, **local search plugin** adalah pilihan paling praktis dan gratis.

Plugin `@easyops-cn/docusaurus-search-local` membangun indeks pencarian dari konten Markdown/MDX saat build, lalu menjalankan pencarian sepenuhnya di browser (offline/klien).

Plugin ini bisa di-hook sebagai **theme** di Docusaurus v2/v3 melalui field `themes` dengan berbagai opsi seperti `hashed`, `docsRouteBasePath`, `indexBlog`, dan dukungan multi-bahasa.

Untuk UX, Docusaurus menyediakan item navbar khusus bertipe `search`, sehingga posisi search bar bisa dikontrol (kiri/kanan) dan tetap konsisten dengan tema.

Jika Anda menggunakan Algolia di masa depan, cukup menambahkan konfigurasi `themeConfig.algolia` tanpa mengubah struktur navbar secara drastis.

---

## Praktik: Implementasi Local Search + Optimasi Navbar

### 1. Instalasi Plugin Local Search

Jika belum, instal plugin lokal:

```bash
npm install @easyops-cn/docusaurus-search-local
```

Pastikan Node.js Anda sudah 18+ dan Docusaurus v3, lalu sesuaikan versi plugin (gunakan versi terkini dari npm, misalnya `^0.52.x`).

### 2. Konfigurasi di `docusaurus.config.js` (ESM)

Kita akan menambahkan plugin sebagai **theme** (cara modern yang disarankan), serta mengatur ruang lingkup indeks hanya ke `/docs` untuk performa yang baik di awal.

```javascript title="docusaurus.config.js"
// ... import lain, navbar, footer, dll

/** @type {import('@docusaurus/types').Config} */
const config = {
  // ...config lain (title, url, future, presets, dll)

  themes: [
    // Theme lain jika ada...

    // Local search
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true, // Cache index jangka panjang [web:62]
        language: ["en", "id"], // Jika dokumentasi bilingual [web:62]
        docsRouteBasePath: ["/docs"], // Scope docs; nanti bisa tambah '/community' dll [web:62][web:63]
        indexBlog: false, // Aktifkan true jika butuh search di blog
        searchResultLimits: 20, // Batas hasil untuk UX yang nyaman [web:62]
      }),
    ],
  ],

  // ...
};

export default config;
```

`hashed: true` membuat file indeks diberi hash sehingga bisa di-cache oleh browser/CDN, mempercepat load search di kunjungan berikutnya.

### 3. Mengatur Posisi Search Bar di Navbar

Secara default, plugin lokal akan menyuntikkan search bar di sisi kanan navbar jika integrasi otomatis aktif, tapi untuk kontrol penuh gunakan navbar item bertipe `search`.

Buka `src/config/navbar.js` dan tambahkan item berikut:

```javascript title="src/config/navbar.js"
/** @type {import('@docusaurus/preset-classic').ThemeConfig['navbar']} */
const navbar = {
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
    { to: "/about", label: "About", position: "left" },
    { to: "/blog", label: "Blog", position: "left" },

    // Search Bar: selalu di kanan
    {
      type: "search",
      position: "right",
    },
  ],
};

export default navbar;
```

Item bertipe `search` akan dirender sebagai search bar penuh yang kompatibel dengan tema, dan posisinya mengikuti `position: 'right'|'left'`. [7]

### 4. Build & Validasi Indeks

Setelah konfigurasi:

```bash
npm start          # untuk dev (indeks bisa belum 100% akurat)
npm run build      # untuk rebuild penuh indeks
npm run serve      # pratinjau versi produksi
```

Indeks lokal dibangun saat `docusaurus build`, sehingga hasil paling akurat terlihat di mode produksi (`npm run serve`). Jika Anda memiliki struktur docs multi-instance, gunakan opsi seperti `docsRouteBasePath` array dan `docsPluginIdForPreferredVersion` untuk mengontrol versi yang diutamakan saat indeks dibuat.

---

Jika semua berjalan, Anda sekarang punya search bar modern di navbar dengan indeks lokal yang cepat dan bekerja offline.

Di sesi berikutnya, kita akan mengaktifkan **Versioning** dokumentasi dan memastikan search tetap relevan antar versi (konsep “contextual search” untuk versi & bahasa akan disentuh di sana).
