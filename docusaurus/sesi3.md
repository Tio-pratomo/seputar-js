---
sidebar_position: 4
---

# Content Engineering (MDX & Metadata)

Fondasi sistem sudah kuat. Sekarang saatnya mengisi "nyawa" dari dokumentasi ini: **Konten**.

Docusaurus tidak hanya merender Markdown biasa, tapi **MDX**. Ini memungkinkan kita menulis JSX (React) di dalam file Markdown. Artinya, dokumentasi Anda bukan sekadar teks statis, tapi bisa menjadi aplikasi mini yang interaktif.

Di sesi ini, kita akan membedah struktur file konten agar SEO-friendly, rapi, dan siap disisipi komponen canggih (termasuk Shoelace nanti).

---

## Materi: Pengetahuan & Konsep

### 1. The Anatomy of Front Matter

Setiap file `.md` atau `.mdx` di Docusaurus **wajib** memiliki header YAML di bagian paling atas. Ini disebut _Front Matter_.

```yaml
---
id: my-doc-id # (Opsional) ID unik. Default: nama file.
title: Judul Dokumen # Judul di tab browser & h1.
sidebar_label: Label # (Opsional) Teks di sidebar (jika ingin beda dengan title).
sidebar_position: 1 # Urutan di sidebar.
slug: /custom-url # (Opsional) Custom URL path.
description: ... # Untuk meta description SEO.
---
```

### 2. Markdown vs MDX

- **Markdown Standard:** Teks, Bold, List, Link, Image.
- **MDX:** Markdown + React Component.
  - Anda bisa `import` komponen React di atas file markdown.
  - Anda bisa menggunakan tag HTML/JSX langsung (`<button>Click Me</button>`).

### 3. Asset Management (Images)

Ada dua cara menangani gambar di Docusaurus (Penting dipahami Fullstack Dev):

1.  **Co-located (Disarankan):** Gambar ditaruh di folder yang sama dengan file markdown.
    - Syntax: ``
    - _Benefit:_ Gambar diproses oleh Webpack/Rspack (bisa dioptimasi, di-hash, dan dicek jika file hilang saat build).
2.  **Static Folder:** Gambar ditaruh di `/static/img`.
    - Syntax: ``
    - _Benefit:_ URL tetap, tidak diproses bundler. Cocok untuk gambar yang dipakai di banyak tempat (logo, favicon).

---

## Praktik: Advanced Content Creation

Mari kita buat struktur konten yang rapi menggunakan kategori folder dan fitur MDX.

### Langkah 1: Membuat Kategori Folder

Di dalam folder `docs`, kita bisa membuat folder untuk mengelompokkan materi (Nested Navigation).

1.  Buat folder `docs/tutorial-dasar`.
2.  Buat file JSON khusus bernama `_category_.json` di dalam folder tersebut untuk mengatur metadata folder.

Buat file: `docs/tutorial-dasar/_category_.json`

```json
{
  "label": "Tutorial Dasar",
  "position": 2,
  "link": {
    "type": "generated-index",
    "description": "Pelajari dasar-dasar penggunaan sistem ini."
  }
}
```

_Ini akan membuat menu dropdown di sidebar bernama "Tutorial Dasar" yang jika diklik menampilkan daftar isi otomatis._

### Langkah 2: Membuat File MDX dengan Interaktivitas

Sekarang kita buat file konten di dalam folder tadi. Kita akan mencoba menggunakan komponen bawaan Docusaurus (`<Tabs>`) untuk melihat kekuatan MDX.

Buat file: `docs/tutorial-dasar/fitur-mdx.mdx`
(Perhatikan ekstensinya `.mdx`, bukan `.md`)

````markdown
---
sidebar_position: 1
title: Menggunakan MDX
description: Contoh penggunaan komponen React dalam Markdown
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kekuatan MDX

MDX memungkinkan kita menulis **JSX** di dalam dokumen Markdown. Ini contoh sederhana menggunakan komponen `Tabs` bawaan Docusaurus.

:::tip Info Pro
Komponen ini dirender secara Server-Side (SSR) lalu di-hydrate di Client-Side.
:::

## Contoh Code Tabs

Berikut adalah contoh instruksi instalasi multi-platform:

<Tabs>
  <TabItem value="npm" label="npm" default>
  ```
  npm install my-library
  ```
</TabItem>
<TabItem value="yarn" label="Yarn">
  ```
  yarn add my-library
  ```
</TabItem>
<TabItem value="pnpm" label="pnpm">
  ```
  pnpm add my-library
  ```
</TabItem>
</Tabs>
````

## Menyisipkan HTML Standar

Karena ini MDX, kita juga bisa menulis HTML standar dengan styling inline (walaupun tidak disarankan untuk production, lebih baik pakai CSS Class).

```html
<div style={{
backgroundColor: '#f0f0f0',
padding: '20px',
borderRadius: '8px',
color: '#333',
border: '1px solid #ccc'
}}>
<h3>Ini adalah HTML Div</h3>
<p>Dirender langsung di tengah konten Markdown!</p>
</div>
```

### Langkah 3: Admonitions (Alerts)

Docusaurus punya syntax khusus untuk _Alerts_ (disebut Admonitions). Tambahkan ini ke file MDX di atas atau file baru.

```markdown
:::note Catatan
Ini adalah informasi umum.
:::

:::tip Tips
Ini adalah saran yang berguna.
:::

:::info Informasi
Informasi tambahan.
:::

:::warning Peringatan
Hati-hati dengan fitur ini.
:::

:::danger Bahaya
Tindakan ini bisa menghapus database!
:::
```

### Langkah 4: Verifikasi

1.  Buka browser (`http://localhost:3000`).
2.  Lihat sidebar: Harusnya ada grup baru **Tutorial Dasar**.
3.  Buka halaman **Menggunakan MDX**.
4.  Coba klik Tabs (npm/yarn/pnpm). Apakah berubah tanpa reload?
5.  Lihat kotak HTML div dan Admonitions warna-warni.

---

### Rangkuman Sesi 3

Anda telah belajar:

1.  **Front Matter:** Cara mengontrol metadata halaman.
2.  **Grouping:** Menggunakan folder dan `_category_.json` untuk struktur sidebar.
3.  **MDX Power:** Mengimpor komponen React (`<Tabs>`) dan menyisipkannya di antara teks Markdown.
4.  **Admonitions:** Membuat alert box standar.

Ini adalah dasar sebelum kita masuk ke **Sesi 4 (Styling)** dan **Sesi 5 (Shoelace)**. Di Sesi 5 nanti, kita akan mengganti HTML div sederhana di atas dengan komponen **Shoelace Card** yang jauh lebih cantik.
