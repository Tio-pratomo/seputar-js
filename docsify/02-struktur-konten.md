---
sidebar_position: 3
---

# Struktur Dasar dan Penulisan Konten

Di sesi ini, kita akan menyelami lebih dalam struktur dasar proyek Docsify yang telah kita inisialisasi, serta bagaimana cara menulis dan mengatur konten menggunakan Markdown, termasuk fitur-fitur khusus yang disediakan oleh Docsify.

## Struktur Folder dan File Dasar

Saat Anda menjalankan `docsify init ./docs`, Docsify membuat beberapa file penting di dalam folder `docs/`. Mari kita pahami peran masing-masing:

```
.
└── docs/
    ├── index.html
    ├── README.md
    └── .nojekyll
```

- **`index.html`**: Ini adalah jantung dari situs Docsify Anda. File ini adalah satu-satunya file HTML yang akan di-_serve_ oleh server. Di sinilah konfigurasi Docsify Anda ditempatkan, dan juga tempat Docsify memuat semua file Markdown Anda.

  Berikut adalah bagian penting dari `index.html` yang perlu Anda ketahui:

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta charset="UTF-8" />
      <link
        rel="stylesheet"
        href="//cdn.jsdelivr.net/npm/docsify@4/themes/vue.css"
      />
    </head>
    <body>
      <div id="app"></div>
      <script>
        window.$docsify = {
          // ... konfigurasi Docsify Anda di sini ...
        };
      </script>
      <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
    </body>
  </html>
  ```

  Perhatikan `window.$docsify = {}` di mana semua pengaturan Docsify akan Anda tulis.

- **`README.md`**: File ini secara otomatis akan menjadi halaman utama atau _homepage_ dari situs dokumentasi Anda. Setiap konten yang Anda tulis di `README.md` akan ditampilkan saat pengunjung pertama kali membuka situs Anda.

- **`.nojekyll`**: File kosong ini sangat penting jika Anda berencana untuk _deploy_ situs Docsify Anda ke GitHub Pages. Keberadaannya memberitahu GitHub Pages untuk tidak memproses folder `docs` sebagai situs Jekyll, sehingga file-file yang diawali dengan garis bawah (seperti `_sidebar.md` atau `_navbar.md` yang akan kita bahas nanti) tidak diabaikan.

## Konten dan Penulisan

Docsify sepenuhnya mengandalkan file Markdown untuk konten. Ini berarti Anda bisa menulis dokumentasi Anda dengan sintaks Markdown yang sudah umum.

### Membuat Halaman Baru

Untuk membuat halaman baru, Anda cukup membuat file Markdown baru di dalam folder `docs/`. Nama file Markdown akan menjadi bagian dari URL halaman tersebut.

**Contoh Struktur Folder:**

```
.
└── docs/
    ├── README.md
    ├── guide.md
    └── tutorial/
        └── basic.md
        └── advanced.md
```

**URL yang Sesuai:**

- `docs/README.md` => `http://domain.com` (Halaman Utama)
- `docs/guide.md` => `http://domain.com/#/guide`
- `docs/tutorial/basic.md` => `http://domain.com/#/tutorial/basic`
- `docs/tutorial/advanced.md` => `http://domain.com/#/tutorial/advanced`

Anda bisa membuat sub-direktori untuk mengorganisir halaman-halaman Anda, dan Docsify akan secara otomatis membuat rute yang sesuai.

### Sintaks Markdown Dasar

Docsify mendukung sintaks Markdown standar. Anda bisa menggunakan:

- **Heading**: `# Judul 1`, `## Judul 2`, dst.
- **Paragraf**: Teks biasa.
- **Teks Tebal/Miring**: `**tebal**`, `*miring*`.
- **Daftar**: `- Item` atau `1. Item`.
- **Link**: `[Teks Link](url)`.
- **Gambar**: `![Alt Text](url_gambar)`.
- **Blok Kode**:

  ````
  ```javascript
  console.log('Hello Docsify!');
  ````

  ```

  ```

- Dan banyak lagi sintaks Markdown lainnya.

### Docsify Helpers (Sintaks Tambahan)

Docsify juga menyediakan beberapa sintaks khusus (disebut "Helpers") untuk memperkaya konten Anda:

#### Konten Penting (`!>`)

Untuk menyoroti informasi penting:

```markdown
!> **Penting**: Selalu periksa konfigurasi Anda sebelum deployment!
```

Akan dirender sebagai:

!> **Penting**: Selalu periksa konfigurasi Anda sebelum deployment!

#### Tips Umum (`?>`)

Untuk memberikan tips atau catatan tambahan:

```markdown
?> _Tips_: Gunakan `docsify serve` untuk pratinjau real-time.
```

Akan dirender sebagai:

?> _Tips_: Gunakan `docsify serve` untuk pratinjau real-time.

#### Mengabaikan Kompilasi Link (`:ignore`)

Terkadang Anda memiliki link yang tidak ingin diproses oleh Docsify (misalnya, link ke file HTML lain di luar Docsify).

```markdown
[Link ke Demo HTML](/demo/index.html ":ignore")
```

Ini akan menghasilkan `<a href="/demo/index.html">Link ke Demo HTML</a>` tanpa Docsify mencoba memuat `/demo/index.html` sebagai halaman Markdown.

#### Mengatur Atribut Target Link (`:target`)

Anda bisa mengatur bagaimana link dibuka (misalnya, di tab baru):

```markdown
[Buka di Tab Baru](https://docsify.js.org ":target=_blank")
```

#### Mengubah Ukuran Gambar (`:size`)

Anda dapat mengatur ukuran gambar langsung dari Markdown:

```markdown
![Logo Docsify](_media/icon.svg ":size=100x100")
![Logo Docsify](_media/icon.svg ":size=50%")
```

#### Custom ID untuk Heading (`:id`)

Anda bisa memberikan ID kustom pada heading, yang berguna untuk _anchor link_ atau styling CSS:

```markdown
### Bagian Penting :id=bagian-penting
```

### Menyematkan File (Embed Files)

Docsify memungkinkan Anda menyematkan berbagai jenis file langsung ke dalam halaman Markdown Anda menggunakan sintaks `:include`.

```markdown
[Nama File](path/to/file.md ":include")
```

**Contoh Menyematkan File Markdown:**

Jika Anda memiliki file `_media/contoh.md` dengan isi `> Ini adalah konten dari contoh.md`, Anda bisa menyematkannya seperti ini:

```markdown
[Konten Contoh](_media/example.md ":include")
```

Maka hasilnya akan menampilkan isi dari `_media/example.md` langsung di halaman Anda.

**Jenis File yang Didukung:**

Docsify secara otomatis mengenali dan menyematkan file berdasarkan ekstensinya:

- **iframe**: `.html`, `.htm`
- **markdown**: `.markdown`, `.md`
- **audio**: `.mp3`
- **video**: `.mp4`, `.ogg`
- **code**: Ekstensi file lainnya (akan disematkan sebagai blok kode).

Anda juga bisa memaksa jenis penyematan dengan `:type`:

```markdown
[File JS sebagai Kode](_media/example.js ":include :type=code")
```

**Menyematkan Fragmen Kode:**

Jika Anda hanya ingin menyematkan sebagian dari file kode, Anda bisa menandainya dengan `/// [nama-fragmen]` atau `### [nama-fragmen]` di file kode Anda:

```javascript
// _media/example.js
/// [demo]
const message = "Hello from fragment!";
console.log(message);
/// [demo]
```

Lalu di Markdown Anda:

```markdown
[Fragmen Demo](_media/example.js ":include :type=code :fragment=demo")
```

Ini akan menyematkan hanya bagian kode yang ada di antara tanda `/// [demo]`.

**Atribut Tag untuk iframe/audio/video:**

Anda bisa menambahkan atribut HTML langsung ke tag yang disematkan:

```markdown
[Situs Web](https://www.google.com ":include :type=iframe width=100% height=400px")
```

---

Anda telah berhasil memahami struktur dasar Docsify dan cara menulis konten yang kaya. Di sesi berikutnya, kita akan menjelajahi bagaimana cara mengatur navigasi dan melakukan kustomisasi tampilan situs dokumentasi Anda.
