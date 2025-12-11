---
sidebar_position: 6
---

# Integrasi Shoelace (Visual Engineering)

Kita akan menyuntikkan **Shoelace** (Web Components) ke dalam Docusaurus.

Docusaurus adalah SSR (Server-Side Rendering), sedangkan Web Components (seperti Shoelace) sangat bergantung pada Browser API (`window`, `HTMLElement`). Jika Anda salah pasang, build akan gagal ("Window is not defined").

Kita akan melakukan **setup hybrid**: Menggunakan wrapper React resmi dari Shoelace agar bisa dipanggil layaknya komponen React biasa, sambil menjaga aset tetap aman.

---

## Materi: Konsep Integrasi

### 1. The "SSR Safe" Strategy

Web Components butuh browser untuk aktif. Saat Docusaurus melakukan build statis (di server/Node.js), browser belum ada.

**Solusinya:** Kita gunakan komponen `<BrowserOnly>` atau membiarkan React Wrapper menangani _hydration_ dengan aman.

### 2. NPM vs CDN

Untuk project production-grade, **jangan gunakan CDN** di script tag.
Kita akan gunakan **NPM Package** agar versi terkunci (stabil) dan bisa di-bundle oleh Rspack.

### 3. Base Path Problem

Shoelace memuat ikon dan aset secara _lazy load_. Ia perlu tahu "Di mana folder aset saya disimpan?".

Karena struktur folder build Docusaurus unik, kita perlu menyalin aset Shoelace ke folder `static` Docusaurus dan memberi tahu Shoelace lokasinya.

---

## Praktik: Instalasi & Konfigurasi

### Langkah 1: Instalasi Paket

Matikan server development (`Ctrl + C`), lalu instal paket Shoelace.

```bash
npm install @shoelace-style/shoelace
```

### Langkah 2: Menyalin Aset (The "Assets Copy" Trick)

Shoelace butuh akses ke ikon dan style. Cara paling robust adalah menyalinnya ke folder `static` agar bisa diakses publik.

Namun, menyalin manual itu merepotkan. Kita akan pakai plugin Docusaurus atau _command line script_. Untuk kesederhanaan dan kontrol penuh, kita buat script "post-install".

Buka `package.json`, tambahkan script ini di bagian `"scripts"`:

```json
"scripts": {
  "docusaurus": "docusaurus",
  "start": "npm run copy-shoelace && docusaurus start",
  "build": "npm run copy-shoelace && docusaurus build",
  "swizzle": "docusaurus swizzle",
  "deploy": "docusaurus deploy",
  "clear": "docusaurus clear",
  "serve": "docusaurus serve",
  "write-translations": "docusaurus write-translations",
  "write-heading-ids": "docusaurus write-heading-ids",
  // highlight-next-line
  "copy-shoelace": "cp -r node_modules/@shoelace-style/shoelace/dist/assets static/shoelace"
}
```

:::tip[Catatan]
Perintah `cp` berada di Linux/Mac.
Jika Anda di Windows (CMD), gunakan `xcopy` atau instal paket `shx` (`npm i -D shx`).

Lalu ganti jadi `shx cp -r ...`
:::

**Jalankan perintah copy manual sekali untuk inisialisasi:**

```bash
npm run copy-shoelace
```

_Cek folder `static/shoelace`, pastikan isinya ada._

Perintah `copy-shoelace` cukup aman jika tidak sengaja menjalankan itu kedua kalinya atau lebih.

Yang terjadi, Aset disalin lagi, menimpa aset yang sudah ada(overwrite). Jadi, file tersebut akan selalu baru dan tidak bertumpuk.

### Langkah 3: Import CSS Global

Agar komponen Shoelace tampil benar (Shadow DOM styling), kita harus mengimpor CSS tema-nya.

Buka `src/css/custom.css`, tambahkan ini di **paling atas** (baris pertama):

```css title="src/css/custom.css"
/* Import Shoelace Light & Dark Theme */
@import "@shoelace-style/shoelace/dist/themes/light.css";
@import "@shoelace-style/shoelace/dist/themes/dark.css";

/* ... (kode CSS sesi sebelumnya di bawah sini) ... */
```

### Langkah 4: Konfigurasi Base Path (Crucial Step)

Kita harus memberi tahu Shoelace: "Hei, asetmu ada di `/shoelace`".

Buka `src/pages/index.js` (atau entry point project). Namun, cara paling elegan di Docusaurus adalah membuat file **Client Module**. File ini akan dijalankan di browser sebelum render apa pun.

1.  Buat file baru: `src/client-modules.js`.
2.  Isi dengan kode berikut:

```javascript title="src/client-modules.js"
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

if (ExecutionEnvironment.canUseDOM) {
  // Mengarahkan Shoelace ke folder static/shoelace yang sudah kita copy
  setBasePath("/shoelace");
}
```

3.  Daftarkan file ini di `docusaurus.config.js`:

```javascript title="docusaurus.config.js"
const config = {
  // ... config lainnya

  // Tambahkan array ini di root config
  clientModules: [require.resolve("./src/client-modules.js")],

  // ...
};
```

### Langkah 5: Testing Komponen di MDX

Mari kita buktikan integrasinya. Kita akan menggunakan komponen **Card** dan **Button** dari Shoelace di dalam Markdown.

1.  Buka file `docs/tutorial-dasar/fitur-mdx.mdx` (yang kita buat di Sesi 3).
2.  Tambahkan import Shoelace React Wrapper di bagian atas (setelah import Tabs).

```markdown
---
sidebar_position: 1
title: Menggunakan MDX
description: Contoh penggunaan komponen React dalam Markdown
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- highlight-start -->

import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';

<!-- highlight-end -->

/_ ... konten lama ... _/

## Demo Shoelace Components

Ini adalah komponen **Web Components** yang berjalan di dalam Docusaurus!

<div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

  <SlCard className="card-overview">
    <div slot="header">
      <strong>Shoelace Card</strong>
      <SlIcon name="gear" style={{ fontSize: '20px', float: 'right' }}></SlIcon>
    </div>
    
    Ini adalah card responsif dari Shoelace.
    <br/>
    <br/>
    <SlButton variant="primary" size="small">Action</SlButton>
  </SlCard>

  <SlCard>
    <img
      slot="image"
      src="https://images.unsplash.com/photo-1547146353-24d15c8109bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
      alt="A kitten sits patiently between a terracotta pot and decorative grasses."
    />
    <strong>Image Card</strong><br/>
    Komponen ini mendukung slot gambar.
  </SlCard>

</div>

<br/>

<SlButton variant="success" outline>
  <SlIcon slot="prefix" name="check-circle"></SlIcon>
  Success Button
</SlButton>

<SlButton variant="warning" outline>
  <SlIcon slot="prefix" name="exclamation-triangle"></SlIcon>
  Warning Button
</SlButton>
```

---

### Verifikasi Sesi 5

1.  Jalankan `npm start` (Script copy akan jalan otomatis).
2.  Buka halaman MDX tadi.
3.  Perhatikan:
    - Apakah tombol dan card muncul dengan style Shoelace?
    - Apakah **Ikon** (gear, check-circle) muncul? (Jika ikon kotak kosong, berarti langkah `setBasePath` atau copy aset gagal).
    - Coba ganti Dark Mode. Shoelace Card harusnya otomatis menyesuaikan warna background (karena kita import `themes/dark.css`).

Jika ikon muncul dan style terlihat rapi, selamat! Anda berhasil menggabungkan **React SSR** dengan **Web Components**. Ini adalah setup _advanced_ yang jarang dikuasai pemula.
