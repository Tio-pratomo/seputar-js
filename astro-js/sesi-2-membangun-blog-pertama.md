import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Membangun Blog Pertama dengan Astro

Di sesi ini, kita akan langsung praktik membuat sebuah proyek blog sederhana menggunakan Astro, mengikuti alur dari dokumentasi resminya. Kita akan belajar tentang setup lingkungan, struktur proyek, routing, dan cara membuat konten dengan Markdown.

## 1. Persiapan Lingkungan Pengembangan

Sebelum memulai, ada beberapa hal yang perlu disiapkan di komputer Anda.

### Prasyarat:

- **Terminal / Command Line**: Alat wajib untuk menjalankan perintah-perintah instalasi.
- **Code Editor**: Visual Studio Code (VS Code) sangat direkomendasikan karena ada ekstensi resmi dari Astro.
- **Node.js**: Ini adalah prasyarat paling penting.

:::warning[**Catatan Unik tentang Versi Node.js**]
Astro memiliki persyaratan yang cukup unik: hanya mendukung versi Node.js dengan **nomor genap** (misalnya, `v18.x`, `v20.x`, `v22.x`). Versi dengan nomor ganjil (seperti `v19` atau `v21`) tidak didukung. Pastikan Anda menggunakan versi yang sesuai.

Silahkan cek [Prerequisites](https://docs.astro.build/en/install-and-setup/#prerequisites)
:::

Untuk memeriksa versi Node.js Anda, jalankan perintah:

```bash
node -v
```

Jika Anda perlu mengelola beberapa versi Node.js untuk proyek yang berbeda, sangat disarankan menggunakan **NVM (Node Version Manager)**. Ini memungkinkan Anda beralih antar versi Node.js dengan mudah.

## 2. Membuat Proyek Astro Pertama

Astro menyediakan _setup wizard_ yang interaktif untuk membuat proyek baru.

1.  Jalankan perintah berikut di terminal:

<Tabs groupId="package-manager">
  <TabItem value="npm" label="npm" default>
    ```bash
    npm create astro@latest
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```bash
    pnpm create astro@latest
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    yarn create astro
    ```
  </TabItem>
</Tabs>

2.  Ikuti langkah-langkah dari _wizard_:
    - **Where should we create your project?**: Ketik nama folder untuk proyek Anda (misal: `blog-astro`).
    - **Which template would you like to use?**: Pilih `Empty`, karena kita akan membangun dari awal.
    - **Install dependencies?**: Pilih `Yes`.
    - **Initialize a new git repository?**: Pilih `Yes`.

Setelah selesai, Astro akan membuatkan folder proyek baru dengan semua file yang diperlukan.

## 3. Menjalankan Project dan Eksplorasi Awal

1.  Masuk ke direktori proyek yang baru dibuat:

    ```bash
    cd blog-astro
    ```

2.  Jalankan server pengembangan (development server):

    <Tabs groupId="package-manager">
        <TabItem value="npm" label="npm" default>
            ```bash
            npm run dev
            ```
        </TabItem>
        <TabItem value="pnpm" label="pnpm">
            ```bash
            pnpm run dev
            ```
        </TabItem>
        <TabItem value="yarn" label="yarn">
            ```bash
            yarn dev
            ```
        </TabItem>
    </Tabs>

3.  Buka browser dan kunjungi alamat `http://localhost:4321`. Anda akan melihat halaman selamat datang dari Astro.

:::tip[Tips]
Saat pertama kali membuka proyek Astro di VS Code, Anda akan direkomendasikan untuk menginstal ekstensi **"Astro"**. Ekstensi ini sangat membantu karena menyediakan _syntax highlighting_ dan _IntelliSense_ untuk file `.astro`.
:::

Di pojok kanan bawah browser, Anda juga akan melihat **Astro Dev Toolbar**, sebuah alat bantu yang berguna untuk melakukan audit performa, melihat _island_ yang aktif, dan lainnya.

## 4. Halaman Astro dan Routing Berbasis File

Konsep routing di Astro sangat sederhana dan mirip dengan Next.js.

> **Konsep Inti**: Setiap file yang Anda buat di dalam direktori `src/pages/` secara otomatis akan menjadi sebuah halaman (route) di website Anda.

- `src/pages/index.astro` → `http://localhost:4321/`
- `src/pages/about.astro` → `http://localhost:4321/about`
- `src/pages/blog.astro` → `http://localhost:4321/blog`

File `.astro` itu sendiri memiliki struktur yang mirip dengan file HTML, namun dibagi menjadi dua bagian utama:

```html
---
// 1. Frontmatter (untuk menulis JavaScript & TypeScript)
// Di sini Anda bisa mendefinisikan variabel, fetch data, dll.
const pageTitle = "About Me";
---

<!-- 2. Template (untuk menulis HTML & komponen) -->
<html lang="en">
  <head>
    <title>{pageTitle}</title>
  </head>
  <body>
    <h1>{pageTitle}</h1>
    <p>Ini adalah halaman tentang saya.</p>

    <!-- Navigasi antar halaman -->
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/blog">Blog</a>
  </body>
</html>
```

## 5. Membuat Postingan Blog dengan Markdown

Astro memberikan dukungan kelas satu untuk file Markdown (`.md`), menjadikannya pilihan ideal untuk membuat konten seperti postingan blog.

1.  **Buat Folder untuk Postingan**
    Di dalam `src/pages/`, buat folder baru bernama `posts`.

2.  **Buat File Markdown Pertama Anda**
    Di dalam `src/pages/posts/`, buat file baru bernama `post-1.md`.

3.  **Isi Konten Markdown**
    File Markdown di Astro juga memiliki dua bagian: _frontmatter_ (untuk metadata) dan konten.

    ```markdown
    --- 
    // Bagian Frontmatter (metadata dalam format YAML)
    title: "Postingan Blog Pertamaku"
    pubDate: "2025-07-22"
    description: "Ini adalah postingan pertamaku belajar Astro!"
    author: "Aman"
    image:
        url: "https://astro.build/assets/press/astro-icon-light.png"
        alt: "The Astro logo."
    tags: ["astro", "blogging", "learning in public"]
    ---

    # Selamat Datang di Blog Baruku

    Ini adalah halaman yang dibuat sepenuhnya dari file Markdown! Astro akan secara otomatis mengubahnya menjadi halaman HTML.

    ## Apa yang sudah saya capai?

    - Saya belajar cara membuat proyek Astro.
    - Saya membuat halaman `.astro`.
    - Saya berhasil membuat postingan dari file `.md`!
    ```

4.  **Lihat Hasilnya**
    Sekarang, buka `http://localhost:4321/posts/post-1` di browser. Anda akan melihat konten Markdown Anda sudah di-render menjadi halaman HTML yang rapi.

5.  **Menambahkan Link ke Postingan**
    Buka file `src/pages/blog.astro` dan tambahkan link ke postingan yang baru Anda buat.

    ```html
    <!-- di dalam file blog.astro -->
    <h1>Blog Saya</h1>
    <ul>
      <li><a href="/posts/post-1">Postingan Pertama</a></li>
      <li><a href="/posts/post-2">Postingan Kedua</a></li>
      <!-- dan seterusnya -->
    </ul>
    ```

## Kesimpulan Sesi 2

Kita telah berhasil:

- Melakukan setup proyek Astro dari awal.
- Memahami cara kerja routing berbasis file yang intuitif.
- Membuat halaman statis menggunakan sintaks `.astro`.
- Membuat konten dinamis untuk blog menggunakan file Markdown dengan _frontmatter_.

Prosesnya terasa sangat alami, terutama bagi mereka yang sudah terbiasa dengan HTML. Di sesi berikutnya, kita akan mulai menjelajahi kekuatan komponen Astro untuk membuat kode kita lebih terstruktur dan dapat digunakan kembali (_reusable_).
