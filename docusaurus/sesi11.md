---
sidebar_position: 12
---

# Konsep i18n di Docusaurus

Docusaurus punya sistem i18n built-in dengan 3 langkah besar: **Configure → Translate → Deploy**.

Intinya, Anda mendefinisikan daftar locale di `docusaurus.config.js`, lalu menaruh file terjemahan di path filesystem tertentu (`i18n/<locale>/...`), dan Docusaurus akan membuat route berawalan `/<locale>/` untuk semua bahasa non-default.

Default-nya, bahasa utama (misal `en`) tidak memakai prefix di URL (`/docs/...`), sedangkan bahasa lain memakai prefix (`/id/docs/...`).

Ini bagus untuk SEO karena tiap bahasa punya URL konsisten, dan bisa dikonfigurasi per locale jika mau pakai domain/subdomain terpisah.

---

## Konfigurasi Dasar i18n

Buka `docusaurus.config.js`, pastikan bagian `i18n` diset seperti ini:

```javascript title="docusaurus.config.js"
const config = {
  // ...
  i18n: {
    defaultLocale: "en",
    locales: ["en", "id"],
    path: "i18n", // default, bisa dibiarkan
    localeConfigs: {
      en: {
        label: "English",
      },
      id: {
        label: "Bahasa Indonesia",
      },
    },
  },
  // ...
};

export default config;
```

- `defaultLocale`: bahasa tanpa prefix URL (SEO utama).
- `locales`: daftar semua bahasa; wajib mengandung `defaultLocale`.
- `path`: root folder untuk semua file terjemahan plugin & tema, default `i18n/` di root project.
- `localeConfigs[locale].label`: teks yang muncul di dropdown bahasa.

Tambahkan juga locale switcher di navbar (kalau belum):

```javascript title="src/config/navbar.js"
items: [
  // ... items lain ...
  {
    type: 'localeDropdown',
    position: 'right',
  },
],
```

Item `localeDropdown` akan menampilkan daftar bahasa berdasarkan `i18n.locales` dan `localeConfigs`.

---

## Struktur Folder Terjemahan

Setelah konfigurasi, jalankan perintah untuk mengekstrak string yang bisa diterjemahkan:

```bash
npm run docusaurus write-translations -- --locale id
```

Docusaurus akan membuat struktur mirip berikut:

```text
i18n/
  id/
    docusaurus-theme-classic/
      navbar.json
      footer.json
      ...
    code.json              # string dari plugin (misal docs)
    ...
```

- `i18n/id/docusaurus-theme-classic/navbar.json`: terjemahan label navbar (menu, tombol, versi).
- `i18n/id/docusaurus-theme-classic/footer.json`: terjemahan footer.
- File JSON lain memuat string UI generik (search placeholder, pagination, dll.).

Untuk konten Markdown/MDX (docs/blog/pages), Docusaurus menganut pendekatan “**file per bahasa**”:

- Konten default: `docs/intro.md`
- Terjemahan ID: `i18n/id/docusaurus-plugin-content-docs/current/intro.md` (untuk versi `current`).

Struktur ini otomatis dibuat setelah Anda mengaktifkan i18n dan menjalankan perintah terkait atau menyalin manual sesuai contoh di dokumentasi.

---

## Menulis Konten Terjemahan Docs

Untuk satu dokumen, alurnya seperti ini:

1. Pastikan ada file dasar, misalnya: `docs/intro.md`.
2. Buat folder: `i18n/id/docusaurus-plugin-content-docs/current/`.
3. Salin `docs/intro.md` ke `i18n/id/docusaurus-plugin-content-docs/current/intro.md` lalu terjemahkan isi teksnya (front matter bisa disesuaikan sesuai bahasa, terutama `title`, `description`, `keywords`).

Contoh front matter versi Indonesia:

```markdown
---
id: intro
title: Pengantar Docusaurus untuk Developer
description: Pelajari dasar Docusaurus, struktur project, dan cara menulis konten dengan MDX dalam bahasa Indonesia.
keywords:
  - docusaurus
  - dokumentasi
  - bahasa indonesia
  - tutorial
---
```

Docusaurus akan otomatis men-serve:

- `/docs/intro` → versi default (English).
- `/id/docs/intro` → versi Indonesia.

Versioning + i18n: jika Anda sudah mengaktifkan versioning, path untuk konten terjemahan akan mengandung nama versi (`current`, `1.0.0`, dll.) di bawah `i18n/<locale>/docusaurus-plugin-content-docs/<version>/`.

---

## i18n & SEO (Per Bahasa)

Docusaurus secara otomatis menambah segmen `/<locale>/` ke URL untuk semua locale selain default, sehingga setiap bahasa punya namespace URL yang jelas (misalnya `/id/docs/...`).

Bersama dengan meta `title` dan `description` pada front matter terjemahan, ini membantu mesin pencari mengkaitkan konten dengan bahasa tertentu dan mengurangi konten duplikat lintas bahasa.

Anda bisa mengatur opsi tambahan per locale di `i18n.localeConfigs[locale]`, seperti URL khusus per locale (untuk strategi multi-domain/subdomain) dan label di dropdown, sehingga bisa menerapkan pola seperti `https://docs.myproduct.com` untuk default dan `https://id.docs.myproduct.com` untuk Bahasa Indonesia jika dibutuhkan nanti.

---

Kalau konfigurasi dasar ini sudah berjalan (dropdown bahasa muncul, `/id/...` berfungsi, dan file terjemahan terbaca), tinggal menyusun guideline penulisan: mana konten yang wajib diterjemahkan, pola commit (misalnya 1 PR per bahasa), dan integrasi dengan tools eksternal seperti Crowdin atau Git workflow khusus (bisa jadi topik tambahan setelah semua sesi selesai).
