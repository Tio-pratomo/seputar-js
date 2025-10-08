---
sidebar_position: 4
---

# Navigasi dan Kustomisasi Tampilan

Setelah memahami cara membuat konten, kini saatnya membuat situs dokumentasi kita lebih mudah dinavigasi dan lebih menarik secara visual. Di sesi ini, kita akan belajar cara menambahkan sidebar, navbar, halaman sampul (cover page), serta cara mengubah tema dan tampilan dasar situs Docsify Anda.

## Mengatur Navigasi

Navigasi yang baik adalah kunci agar pengguna dapat dengan mudah menemukan informasi yang mereka cari. Docsify menyediakan tiga komponen navigasi utama: Sidebar, Navbar, dan Cover Page.

### Sidebar (Menu Samping)

Sidebar adalah menu navigasi utama yang biasanya terletak di sisi kiri halaman. Menu ini sangat berguna untuk menampilkan daftar semua halaman dokumentasi Anda.

**Cara Mengaktifkan Sidebar:**

1.  Buka file `index.html` dan tambahkan konfigurasi `loadSidebar: true`.

    ```javascript
    // index.html
    window.$docsify = {
      loadSidebar: true,
    };
    ```

2.  Buat file baru bernama `_sidebar.md` di dalam folder `docs/`.

3.  Isi file `_sidebar.md` dengan daftar link halaman Anda dalam format Markdown.

    ```markdown
    <!-- docs/_sidebar.md -->

    - [Halaman Utama](/)
    - [Panduan](guide.md)
    - Tutorial
      - [Dasar-dasar](tutorial/basic.md)
      - [Tingkat Lanjut](tutorial/advanced.md)
    ```

Docsify akan secara otomatis membuat sidebar berdasarkan isi dari file `_sidebar.md` tersebut. Anda bisa membuat daftar bersarang (nested list) untuk mengelompokkan halaman.

**Membuat Daftar Isi Otomatis (Table of Contents):**

Anda juga bisa membuat sidebar secara otomatis menghasilkan daftar isi (ToC) dari judul-judul (headings) yang ada di halaman aktif. Gunakan konfigurasi `subMaxLevel`.

```javascript
// index.html
window.$docsify = {
  loadSidebar: true,
  subMaxLevel: 2, // Menampilkan heading level 1 (h1) dan 2 (h2) di sidebar
};
```

### Navbar (Menu Atas)

Navbar adalah menu horizontal yang berada di bagian atas halaman. Biasanya digunakan untuk link-link penting seperti link ke repositori, bahasa, atau halaman utama.

**Cara Mengaktifkan Navbar:**

1.  Tambahkan konfigurasi `loadNavbar: true` di `index.html`.

    ```javascript
    // index.html
    window.$docsify = {
      loadNavbar: true,
    };
    ```

2.  Buat file baru bernama `_navbar.md` di dalam folder `docs/`.

3.  Isi file `_navbar.md` dengan daftar link yang ingin Anda tampilkan.

    ```markdown
    <!-- docs/_navbar.md -->

    - [GitHub](https://github.com/user/repo)
    - Bahasa
      - [English](/)
      - [Indonesia](/id/)
    ```

Anda juga bisa membuat navbar langsung menggunakan tag HTML `<nav>` di dalam `index.html` jika membutuhkan kustomisasi yang lebih kompleks.

### Cover Page (Halaman Sampul)

Cover page adalah halaman pembuka yang dramatis, cocok untuk dijadikan halaman arahan (landing page) proyek Anda.

**Cara Mengaktifkan Cover Page:**

1.  Tambahkan konfigurasi `coverpage: true` di `index.html`.

    ```javascript
    // index.html
    window.$docsify = {
      coverpage: true,
    };
    ```

2.  Buat file baru bernama `_coverpage.md` di dalam folder `docs/`.

3.  Desain halaman sampul Anda di `_coverpage.md`.

    ```markdown
    <!-- docs/_coverpage.md -->

    ![logo](_media/icon.svg)

    # Nama Proyek <small>v1.0</small>

    > Slogan atau deskripsi singkat proyek Anda.

    - Fitur 1
    - Fitur 2
    - Fitur 3

    [GitHub](https://github.com/user/repo) [Mulai](guide.md)

    <!-- Latar Belakang Kustom -->

    ![color](#f0f0f0)
    ```

    Anda bisa menambahkan gambar latar atau warna latar belakang kustom di bagian bawah file.

Jika Anda hanya ingin menampilkan cover page di halaman utama (tanpa konten dari `README.md`), gunakan konfigurasi `onlyCover: true`.

## Kustomisasi Tampilan

Docsify memudahkan Anda untuk mengubah tampilan situs dokumentasi.

### Menggunakan Tema

Docsify menyediakan beberapa tema bawaan yang bisa langsung Anda gunakan dengan mengubah link CSS di `index.html`.

- **Vue Theme (Default):**
  ```html
  <link
    rel="stylesheet"
    href="//cdn.jsdelivr.net/npm/docsify/lib/themes/vue.css"
  />
  ```
- **Buble Theme:**
  ```html
  <link
    rel="stylesheet"
    href="//cdn.jsdelivr.net/npm/docsify/lib/themes/buble.css"
  />
  ```
- **Dark Theme:**
  ```html
  <link
    rel="stylesheet"
    href="//cdn.jsdelivr.net/npm/docsify/lib/themes/dark.css"
  />
  ```
- **Pure Theme:**
  ```html
  <link
    rel="stylesheet"
    href="//cdn.jsdelivr.net/npm/docsify/lib/themes/pure.css"
  />
  ```

Cukup ganti URL stylesheet di `index.html` Anda untuk mencoba tema yang berbeda.

### Konfigurasi Tampilan Dasar

Beberapa konfigurasi di `window.$docsify` dapat mengubah elemen visual dasar dari situs Anda:

- **`name`**: Mengatur nama situs yang muncul di sidebar.

  ```javascript
  window.$docsify = { name: "Proyek Keren" };
  ```

- **`nameLink`**: Mengatur URL tujuan saat nama situs di sidebar diklik.

  ```javascript
  window.$docsify = { nameLink: "/" };
  ```

- **`logo`**: Menambahkan logo di atas nama situs di sidebar.

  ```javascript
  window.$docsify = { logo: "/_media/logo.png" };
  ```

- **`repo`**: Menambahkan _badge_ "Fork me on GitHub" di pojok kanan atas.

  ```javascript
  window.$docsify = { repo: "username/repository" };
  ```

- **`themeColor`**: Mengubah warna utama tema (misalnya, warna link dan aksen lainnya).
  ```javascript
  window.$docsify = { themeColor: "#3F51B5" };
  ```

---

Dengan mengatur navigasi dan tampilan, situs dokumentasi Anda kini tidak hanya fungsional tetapi juga menarik. Di sesi berikutnya, kita akan membahas lebih dalam tentang berbagai opsi konfigurasi dan cara memperluas fungsionalitas Docsify dengan plugin.
