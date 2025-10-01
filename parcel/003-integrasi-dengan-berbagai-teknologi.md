---
sidebar_position: 4
---

# Integrasi dengan Berbagai Teknologi

Salah satu kekuatan terbesar Parcel adalah kemampuannya untuk mendukung berbagai teknologi modern secara otomatis.

Di mana _bundler_ lain seperti Webpack memerlukan instalasi _plugin_ dan konfigurasi yang panjang, Parcel seringkali hanya butuh melihat ekstensi file untuk melakukan hal yang benar.

Di bab ini, kita akan mencoba beberapa integrasi populer.

---

## CSS Pre-processors (Contoh: Sass)

CSS Pre-processor seperti Sass atau Less memungkinkan kita menulis CSS dengan fitur-fitur canggih seperti variabel, _nesting_, dan _mixin_.

Parcel memiliki dukungan bawaan untuk Sass, Less, dan Stylus. Mari kita coba menggunakan Sass.

**Langkah-langkah:**

1.  **Ubah nama file CSS.**

    Ganti nama file `src/style.css` menjadi `src/style.scss`.

2.  **Perbarui impor di JavaScript.**

    Di file `src/index.js`, ubah baris impor CSS menjadi:

    ```javascript
    import "./style.scss";
    ```

3.  **Gunakan fitur Sass.**

    Buka file `src/style.scss` dan modifikasi isinya untuk menggunakan variabel dan _nesting_:

    ```scss
    // Definisikan variabel
    $primary-color: #3498db;
    $font-family: sans-serif;
    $background-color: #f0f0f0;

    body {
      background-color: $background-color;
      font-family: $font-family;
    }

    h1 {
      color: $primary-color;
      text-shadow: 2px 2px 4px #ccc;

      // Fitur Nesting: aturan untuk hover di dalam h1
      &:hover {
        color: darken($primary-color, 10%);
        cursor: pointer;
      }
    }
    ```

4.  **Simpan dan lihat hasilnya.**

    Saat Anda menyimpan file `index.js` (setelah mengubah impor), Parcel akan mendeteksi bahwa Anda membutuhkan `sass`. Ia akan secara otomatis menginstalnya untuk Anda! Setelah instalasi selesai, gaya Sass Anda akan dikompilasi menjadi CSS biasa dan diterapkan ke halaman.

Proses yang sama juga berlaku untuk **Less** (`.less`) dan **Stylus** (`.styl`). Cukup gunakan ekstensi file yang benar, dan Parcel akan menangani sisanya.

## Framework JavaScript (Contoh: React)

Parcel juga sangat memudahkan penggunaan _framework_ seperti React, Vue, dan Svelte. Dukungan untuk **JSX** (sintaks yang digunakan React) sudah tersedia secara bawaan.

**Langkah-langkah:**

1.  **Instal React dan ReactDOM.**
    Tidak seperti _compiler_ (seperti Sass), _library framework_ inti seperti React harus kita instal secara manual. Jalankan perintah berikut:

    ```bash
    npm install react react-dom
    ```

2.  **Buat elemen root di HTML.**

    React perlu "jangkar" di file HTML untuk me-render aplikasi. Ubah `src/index.html`:

    ```html
    <body>
      <div id="root"></div>
      <script src="./index.js"></script>
    </body>
    ```

3.  **Buat komponen React.**

    Buat file baru `src/App.js`.

    ```javascript
    import React from "react";

    function App() {
      const [count, setCount] = React.useState(0);

      return (
        <div>
          <h2>Ini adalah komponen React!</h2>
          <p>Parcel mengerti JSX secara otomatis.</p>
          <button onClick={() => setCount(count + 1)}>
            Kamu mengklik {count} kali
          </button>
        </div>
      );
    }

    export default App;
    ```

4.  **Render komponen utama.**

    Ubah file `src/index.js` secara keseluruhan untuk me-render komponen `App`.

    ```javascript
    import React from "react";
    import ReactDOM from "react-dom";
    import "./style.scss";
    import App from "./App";

    ReactDOM.render(<App />, document.getElementById("root"));
    ```

5.  **Simpan dan lihat hasilnya.**

    Aplikasi React sederhana Anda kini berjalan! Parcel mengompilasi sintaks JSX menjadi JavaScript biasa secara otomatis tanpa perlu konfigurasi Babel atau apa pun.

## Dukungan TypeScript

Ingin menggunakan TypeScript? Parcel membuatnya sangat mudah.

**Langkah-langkah:**

1.  **Ubah nama file.**

    - Ubah `src/index.js` menjadi `src/index.ts`.
    - Ubah `src/App.js` menjadi `src/App.tsx` (ekstensi `.tsx` untuk file TypeScript yang mengandung JSX).

2.  **Perbarui entri poin di HTML.**

    Di `src/index.html`, perbarui tag script:

    ```html
    <script src="./index.ts"></script>
    ```

3.  **Gunakan sintaks TypeScript.**

    Buka `src/App.tsx` dan tambahkan beberapa tipe data.

    ```typescript
    import React, { useState } from "react";

    interface AppProps {
      initialMessage?: string;
    }

    function App({ initialMessage = "Dunia" }: AppProps) {
      const [count, setCount] = useState<number>(0);

      return (
        <div>
          <h2>Halo, {initialMessage}!</h2>
          <p>Ini komponen React dengan TypeScript.</p>
          <button onClick={() => setCount(count + 1)}>
            Kamu mengklik {count} kali
          </button>
        </div>
      );
    }

    export default App;
    ```

4.  **Simpan dan lihat hasilnya.**

    Saat Anda menyimpan, Parcel akan mendeteksi file `.ts` dan `.tsx`, lalu secara otomatis menginstal paket `typescript` untuk Anda. Setelah itu, kode TypeScript Anda akan dikompilasi dan dijalankan. Tidak perlu membuat file `tsconfig.json` untuk memulai!

## Teknologi Lain yang Didukung

Selain contoh di atas, Parcel juga mendukung banyak teknologi lain dengan pendekatan serupa:

- **Vue:** Cukup buat file `.vue` (Single-File Components), impor, dan Parcel akan menanganinya.
- **Svelte:** Sama seperti Vue, file `.svelte` didukung secara otomatis.
- **Pug:** Anda bahkan bisa menggunakan file `.pug` sebagai entri poin HTML Anda.

Intinya, filosofi Parcel adalah: **gunakan saja filenya, biar kami yang urus konfigurasinya**.
