---
sidebar_position: 10
---

# Versioning Dokumentasi (Multi-Release Ready)

Mulai sesi ini, dokumentasi Anda naik kelas: bukan lagi “satu versi selamanya”, tapi mampu melayani banyak versi produk (v1, v2, v3) dalam satu situs yang rapi.

Docusaurus punya sistem versioning built-in di plugin `@docusaurus/plugin-content-docs`. Sistem ini men-_snapshot_ isi folder `docs/` ke folder `versioned_docs/` dan mengelola metadata di `versions.json`, sehingga setiap rilis dokumentasi bisa dibekukan dan tetap dapat diakses meskipun `docs/` terus berubah.

---

## Materi: Konsep Versioning

Docusaurus versi >=2 menggunakan **CLI `docs:version`** untuk memotong versi baru dari konten terkini di `docs/`. Perintah ini akan:

- Menyalin isi `docs/` ke `versioned_docs/version-[versionName]/`.
- Menyalin konfigurasi sidebar ke `versioned_sidebars/version-[versionName]-sidebars.json`.
- Menambahkan entri baru ke file `versions.json` di root project.

Setelah versioning diaktifkan, struktur rute menjadi:

- Versi terbaru (latest): `/docs/...`
- Versi lain: `/docs/{versionName}/...` (misalnya `/docs/1.0.0/intro`)

Konfigurasi `docs` di `docusaurus.config.js` menyediakan opsi seperti `lastVersion`, `onlyIncludeVersions`, `includeCurrentVersion`, dan `disableVersioning` untuk mengontrol versi mana yang dipublikasikan.

Ini sangat penting untuk menjaga agar UI tidak penuh dengan versi lama yang sudah di-_sunset_.

Jika Anda nanti memakai Algolia DocSearch, fitur **Contextual Search** akan otomatis mem-filter hasil pencarian berdasarkan versi yang sedang dibuka (v1/v2) dan bahasa (en/id), agar user tidak dibanjiri hasil dari versi lain.

---

## Praktik: Mengaktifkan Versioning & Version Dropdown

### 1. Aktifkan Opsi Versioning di Config

Buka `docusaurus.config.js`, cari bagian `presets` → `classic` → `docs`, lalu tambahkan pengaturan dasar versioning:

```javascript title="docusaurus.config.js"
presets: [
  [
    'classic',
    /** @type {import('@docusaurus/preset-classic').Options} */
    ({
      docs: {
        sidebarPath: './sidebars.js',

        // Versi konfigurasi
        lastVersion: 'current',          // 'current' = isi folder ./docs sekarang [web:82]
        versions: {
          current: {
            label: 'Next 🚧',           // Label yang muncul di dropdown untuk versi pengembangan [web:82]
          },
        },
      },
      blog: {
        showReadingTime: true,
      },
      theme: {
        customCss: './src/css/custom.css',
      },
    }),
  ],
],
```

Untuk saat ini kita belum punya versi rilis, jadi `current` dijadikan baseline dengan label “Next 🚧” agar jelas bahwa ini masih WIP.

### 2. Potong Versi Pertama (v1.0.0)

Sebelum menjalankan perintah ini, pastikan isi `docs/` Anda sudah relatif stabil untuk rilis pertama (Sesi 1–8 yang sudah dibuat).

Jalankan:

```bash
npm run docusaurus docs:version 1.0.0
```

Setelah ini, akan muncul:

- Folder `versioned_docs/version-1.0.0/` berisi snapshot docs.
- File `versioned_sidebars/version-1.0.0-sidebars.json`.
- File `versions.json` di root, dengan isi mirip:
  ```json
  ["1.0.0"]
  ```

Mulai sekarang:

- `/docs/...` → menunjuk ke versi “current” (branch pengembangan).
- `/docs/1.0.0/...` → snapshot rilis pertama yang beku.

### 3. Menambahkan Version Dropdown ke Navbar

Versi UI-nya kita tempatkan di navbar agar user bisa switch versi dengan mudah.

Buka `src/config/navbar.js`, tambahkan item dropdown versi:

```javascript title="src/config/navbar.js"
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

    // Version dropdown (untuk default docs plugin)
    {
      type: "docsVersionDropdown",
      position: "right",
    },

    { type: "search", position: "right" },
  ],
};

export default navbar;
```

Item bertipe `docsVersionDropdown` otomatis mengikat ke plugin docs default (ID `default`) dan akan menampilkan versi “Next 🚧” dan `1.0.0` dengan label yang sudah diatur di config.

### 4. Mengontrol Versi yang Ditampilkan

Jika nanti jumlah versi makin banyak (v1.0.0, v1.1.0, v2.0.0, dst.), gunakan properti `onlyIncludeVersions` dan konfigurasi label per versi:

```javascript title="docusaurus.config.js"
docs: {
  sidebarPath: './sidebars.js',
  lastVersion: 'current',
  versions: {
    current: {
      label: 'Next 🚧',
    },
    '1.0.0': {
      label: 'v1',
      banner: 'none',         // sembunyikan banner deprecated di halaman v1 [web:82]
    },
  },
  onlyIncludeVersions: ['current', '1.0.0'], // Versi yang benar-benar dipublish [web:82]
},
```

`banner` bisa di-set ke `unreleased`, `unmaintained`, atau `none` untuk menampilkan notifikasi di atas halaman versi tertentu (misalnya “Dokumentasi ini tidak lagi dipelihara”).

### 5. Integrasi dengan Multi-instance (Opsional Lanjutan)

Jika di masa depan Anda punya beberapa set dokumentasi (misal: “Product API” dan “SDK Mobile”) yang masing-masing punya siklus versi sendiri, gunakan **Docs Multi-instance**: beberapa instance plugin `@docusaurus/plugin-content-docs` dengan `id` berbeda, masing-masing bisa di-versioning secara independen dan memiliki dropdown versinya sendiri.

Contoh pola di `docusaurus.config.js`:

```javascript
plugins: [
  [
    '@docusaurus/plugin-content-docs',
    {
      id: 'sdk',
      path: 'sdk',
      routeBasePath: 'sdk',
      sidebarPath: './sidebarsSdk.js',
      lastVersion: 'current',
    },
  ],
],
themeConfig: {
  navbar: {
    items: [
      { to: '/docs/intro', label: 'Core Docs', position: 'left' },
      { to: '/sdk/intro', label: 'SDK', position: 'left' },
      { type: 'docsVersionDropdown', docsPluginId: 'sdk', position: 'right' },
    ],
  },
},
```

Setiap instance akan memiliki file versi sendiri seperti `sdk_versions.json`, `sdk_versioned_docs`, dll.

---

Jika `npm run build` dan `npm run serve` berjalan mulus, dropdown versi muncul, dan route `/docs/1.0.0/...` berfungsi, berarti sistem versioning Anda sudah siap untuk skenario real (multi-rilis).
