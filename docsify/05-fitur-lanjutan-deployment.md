---
sidebar_position: 6
---

# Fitur Lanjutan dan Deployment

Selamat datang di sesi terakhir! Anda telah menempuh perjalanan panjang, dari instalasi hingga kustomisasi. Kini saatnya untuk mempelajari beberapa fitur paling canggih dari Docsify dan, yang paling penting, cara mempublikasikan situs dokumentasi Anda agar dapat diakses oleh seluruh dunia.

## Fitur Lanjutan

Mari kita jelajahi beberapa fitur yang dapat membuat situs dokumentasi Anda lebih interaktif dan andal.

### a. Kompatibilitas Vue (Konten Dinamis)

Salah satu fitur paling kuat dari Docsify adalah kemampuannya untuk merender sintaks [Vue.js](https://vuejs.org/) langsung di dalam file Markdown Anda. Ini memungkinkan Anda membuat konten yang dinamis dan interaktif.

**Cara Menggunakan:**

1.  Tambahkan script Vue.js ke `index.html` Anda.

    ```html
    <!-- index.html -->
    <script src="//cdn.jsdelivr.net/npm/vue@2/dist/vue.min.js"></script>
    ```

2.  Gunakan sintaks Vue langsung di file Markdown Anda.

    ```markdown
    2 + 2 = {{ 2 + 2 }}

    <ul>
      <li v-for="i in 3">Item ke-{{ i }}</li>
    </ul>
    ```

Anda juga bisa membuat komponen Vue kustom yang dapat digunakan kembali menggunakan konfigurasi `vueComponents`.

**Contoh Komponen Tombol Counter:**

```javascript
// index.html
window.$docsify = {
  vueComponents: {
    "button-counter": {
      template: `
        <button @click="count += 1">
          Anda mengklik saya {{ count }} kali
        </button>
      `,
      data() {
        return {
          count: 0,
        };
      },
    },
  },
};
```

Lalu gunakan di Markdown Anda:

```markdown
<button-counter></button-counter>
```

### b. Progressive Web App (PWA) / Mode Offline

Dengan PWA, situs dokumentasi Anda dapat diakses bahkan saat pengguna tidak memiliki koneksi internet. Docsify menggunakan _Service Worker_ untuk menyimpan file-file penting di cache browser.

**Cara Mengaktifkan:**

1.  Buat file baru bernama `sw.js` di direktori root proyek Anda (sejajar dengan `index.html`) dan salin kode dari [dokumentasi resmi PWA Docsify](https://docsify.js.org/#/pwa?id=create-serviceworker).

2.  Daftarkan Service Worker tersebut di `index.html` dengan menambahkan script berikut sebelum tag penutup `</body>`.

    ```html
    <!-- index.html -->
    <script>
      if (typeof navigator.serviceWorker !== "undefined") {
        navigator.serviceWorker.register("sw.js");
      }
    </script>
    ```

Setelah di-deploy, pada kunjungan kedua, browser akan menyimpan file-file situs Anda, memungkinkannya untuk diakses secara offline.

### c. Server-Side Rendering (SSR)

Secara default, Docsify merender konten di sisi klien (browser). Ini cepat, tetapi kurang ideal untuk SEO karena _web crawler_ mesin pencari mungkin tidak melihat konten yang dirender oleh JavaScript. SSR menyelesaikan masalah ini dengan merender HTML di sisi server sebelum mengirimkannya ke browser.

> **Catatan**: Fitur SSR di Docsify masih bersifat eksperimental.

**Cara Cepat Menggunakan SSR:**

Anda bisa menggunakan `docsify-cli` untuk menjalankan server SSR.

1.  Instal `docsify-cli`: `npm i docsify-cli -g`.
2.  Jalankan server dengan perintah `start`.

    ```bash
    docsify start ./docs
    ```

Ini akan menjalankan server SSR di `http://localhost:4000`, yang menyajikan konten yang sudah di-render dan ramah SEO.

## Deployment (Mempublikasikan Situs Anda)

Karena pada dasarnya situs Docsify hanyalah sekumpulan file statis (`index.html`, file-file `.md`, gambar, dll.), proses deployment-nya sangat mudah. Berikut adalah beberapa platform populer untuk hosting situs Docsify Anda.

### a. GitHub Pages (Paling Umum)

Ini adalah cara termudah dan paling umum untuk mempublikasikan dokumentasi, terutama jika kode Anda sudah ada di GitHub.

1.  Pastikan semua file dokumentasi Anda berada di dalam folder `/docs` di branch `main` (atau `master`) repositori Anda.
2.  Buka repositori Anda di GitHub, lalu pergi ke **Settings > Pages**.
3.  Di bawah "Build and deployment", pilih sumber (Source) dari **Deploy from a branch**.
4.  Pilih branch `main` dan folder `/docs`. Klik **Save**.

    <!-- ![Pengaturan GitHub Pages](_images/deploy-github-pages.png) -->

5.  Tunggu beberapa menit, dan situs Anda akan tersedia di alamat `https://<username>.github.io/<repository>/`.

### b. Vercel

Vercel menawarkan deployment yang sangat cepat, baik melalui CLI maupun integrasi Git.

**Menggunakan Vercel CLI:**

1.  Instal Vercel CLI: `npm i -g vercel`.
2.  Masuk ke direktori proyek Anda (misalnya, `cd Belajar-Docsify`).
3.  Jalankan perintah `vercel`.
4.  Saat ditanya, konfigurasikan proyek Anda. Pastikan **Publish Directory** atau **Output Directory** diatur ke `docs`.

### c. Netlify

Netlify juga sangat populer dan mudah digunakan, terutama dengan alur kerja berbasis Git.

1.  Buat akun di [Netlify](https://www.netlify.com/) dan hubungkan dengan akun GitHub/GitLab Anda.
2.  Klik **New site from Git** dan pilih repositori Anda.
3.  Atur pengaturan build:
    - **Build command**: Biarkan kosong.
    - **Publish directory**: Isi dengan `docs`.
4.  Klik **Deploy site**.

> **Untuk Router History**: Jika Anda menggunakan `routerMode: 'history'`, Anda perlu menambahkan file `_redirects` di dalam folder `docs` dengan isi berikut agar _refresh_ halaman berfungsi dengan benar di Netlify:
>
> ```
> /*    /index.html   200
> ```

### d. Pilihan Lainnya

Anda juga bisa men-deploy situs Docsify Anda ke platform lain seperti:

- **GitLab Pages**
- **Firebase Hosting**
- **Virtual Private Server (VPS)** dengan Nginx atau Apache.

Prinsipnya sama: layani folder `docs` Anda sebagai direktori web statis.

---

**Selamat!** Anda telah menyelesaikan seluruh rangkaian materi pembelajaran Docsify. Anda kini memiliki pengetahuan yang kuat, mulai dari konsep dasar, penulisan konten, kustomisasi, hingga deployment. Langkah selanjutnya adalah bereksperimen dan membangun dokumentasi yang luar biasa untuk proyek-proyek Anda. Jangan ragu untuk merujuk kembali ke materi ini atau menjelajahi dokumentasi resmi Docsify untuk detail lebih lanjut.
