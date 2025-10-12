---
sidebar_position: 2
---

# Perkenalan dan Instalasi Docsify

Selamat datang di sesi pertama pembelajaran Docsify! Di sini, kita akan berkenalan dengan Docsify, memahami apa saja fitur andalannya, dan melakukan instalasi hingga bisa menjalankan server lokal untuk melihat hasilnya secara langsung.

## Apa itu Docsify?

Docsify adalah sebuah _documentation site generator_ yang ajaib. Berbeda dengan alat lain seperti GitBook, Docsify tidak menghasilkan file-file HTML statis. Sebaliknya, ia secara cerdas memuat dan mengurai file Markdown Anda secara _on-the-fly_ (langsung saat diakses) dan menampilkannya sebagai sebuah website.

Prosesnya sangat sederhana: Anda hanya perlu membuat satu file `index.html` dan beberapa file Markdown, lalu Docsify akan mengurus sisanya. Ini membuat proses pembuatan dan pemeliharaan dokumentasi menjadi sangat cepat dan efisien.

## Fitur Utama

Berikut adalah beberapa fitur unggulan yang membuat Docsify disukai banyak orang:

- **Tanpa File HTML Statis**: Tidak perlu proses _build_ yang rumit setiap kali Anda mengubah konten. Cukup tulis Markdown, dan situs Anda langsung ter-update.
- **Sederhana dan Ringan**: Inti dari Docsify sangat kecil dan cepat, memastikan dokumentasi Anda dapat diakses dengan gegas.
- **Plugin Pencarian Cerdas**: Tersedia plugin untuk menambahkan fungsionalitas pencarian teks lengkap di seluruh dokumentasi Anda.
- **Banyak Pilihan Tema**: Anda bisa dengan mudah mengubah tampilan situs dokumentasi dengan tema-tema yang sudah tersedia.
- **API Plugin yang Berguna**: Jika fitur bawaan tidak cukup, Anda bisa membuat atau menggunakan plugin untuk memperluas kemampuan Docsify.
- **Dukungan Emoji**: Tambahkan emoji ke dalam tulisan Anda dengan mudah menggunakan sintaks shorthand.
- **Mendukung SSR**: Untuk kebutuhan SEO yang lebih baik, Docsify juga mendukung _Server-Side Rendering_.

## Instalasi dan Persiapan

Mari kita mulai menyiapkan lingkungan kerja untuk Docsify.

### Langkah 1: Instalasi Docsify CLI

Untuk mempermudah proses inisialisasi dan pratinjau, sangat disarankan untuk menginstal `docsify-cli` secara global di komputer Anda. Buka terminal atau command prompt, lalu jalankan perintah berikut:

```bash
npm i docsify-cli -g
```

:::info[**Catatan**:]
Anda harus sudah memiliki [Node.js](https://nodejs.org/) dan npm yang terinstal di sistem Anda untuk menjalankan perintah ini.
:::

`docsify-cli` adalah alat bantu baris perintah yang akan membantu kita membuat proyek baru dan menjalankan server pengembangan lokal.

### Langkah 2: Inisialisasi Proyek

Setelah `docsify-cli` terinstal, buatlah sebuah folder untuk proyek dokumentasi Anda. Masuk ke folder tersebut melalui terminal, lalu jalankan perintah `init`. Kita akan menyimpan file dokumentasi di dalam subfolder bernama `docs`.

```bash
docsify init ./docs
```

Perintah ini akan membuat beberapa file di dalam folder `docs`:

- `index.html`: File utama yang menjadi pintu masuk situs Docsify Anda.
- `README.md`: Konten Markdown yang akan menjadi halaman utama (homepage).
- `.nojekyll`: Sebuah file kosong untuk memastikan GitHub Pages tidak mengabaikan file-file yang diawali dengan garis bawah (`_`).

### Langkah 3: Menjalankan Server Lokal

Untuk melihat hasil dokumentasi Anda dalam bentuk situs web, jalankan server lokal dengan perintah berikut dari direktori root proyek Anda:

```bash
docsify serve docs
```

Perintah ini akan memulai sebuah server pengembangan. Anda bisa langsung membuka browser dan mengakses alamat `http://localhost:3000` untuk melihat pratinjau situs dokumentasi Anda. Setiap kali Anda menyimpan perubahan pada file Markdown, situs di browser akan otomatis diperbarui.

---

Selamat! Anda telah berhasil menyiapkan proyek Docsify pertama Anda. Di sesi berikutnya, kita akan membahas lebih dalam tentang struktur folder dan cara menambahkan lebih banyak konten ke situs dokumentasi Anda.
