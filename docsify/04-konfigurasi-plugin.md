---
sidebar_position: 5
---

# Konfigurasi Lanjutan dan Plugin

Selamat datang di sesi keempat! Di sini kita akan membuka potensi penuh dari Docsify dengan mempelajari berbagai opsi konfigurasi lanjutan dan cara menambahkan fungsionalitas baru menggunakan sistem plugin yang fleksibel.

## Mendalami Opsi Konfigurasi

Semua konfigurasi Docsify dilakukan di dalam objek `window.$docsify` pada file `index.html`. Selain konfigurasi yang telah kita bahas di sesi sebelumnya, ada banyak opsi lain yang sangat berguna untuk menyesuaikan perilaku situs Anda.

Berikut adalah beberapa opsi konfigurasi lanjutan yang paling sering digunakan:

- **`alias`**: Berguna untuk membuat "alias" atau pintasan untuk rute. Anda bisa menggunakannya untuk mengarahkan ulang halaman atau memuat konten dari sumber lain.

  ```javascript
  window.$docsify = {
    alias: {
      // Mengarahkan /changelog ke file CHANGELOG di GitHub
      "/changelog":
        "https://raw.githubusercontent.com/docsifyjs/docsify/master/CHANGELOG",
      // Memastikan semua sub-halaman tetap menggunakan sidebar utama
      "/.*/_sidebar.md": "/_sidebar.md",
    },
  };
  ```

- **`auto2top`**: Jika diatur ke `true`, halaman akan otomatis di-scroll ke atas setiap kali rute berganti. Ini memberikan pengalaman pengguna yang lebih baik.

  ```javascript
  window.$docsify = { auto2top: true };
  ```

- **`homepage`**: Secara default, Docsify menggunakan `README.md` sebagai halaman utama. Anda bisa mengubahnya ke file lain.

  ```javascript
  window.$docsify = { homepage: "home.md" };
  ```

- **`mergeNavbar`**: Jika diatur ke `true`, navbar (menu atas) akan digabungkan dengan sidebar pada tampilan layar kecil (mobile). Ini sangat berguna untuk menghemat ruang.

  ```javascript
  window.$docsify = { mergeNavbar: true };
  ```

- **`notFoundPage`**: Memungkinkan Anda untuk membuat halaman "404 Not Found" kustom. Jika diatur ke `true`, Docsify akan mencari dan memuat file `_404.md`.

  ```javascript
  window.$docsify = {
    notFoundPage: true,
    // Atau, gunakan file kustom
    // notFoundPage: 'halaman-404.md'
  };
  ```

- **`relativePath`**: Jika diatur ke `true`, semua link di dalam file Markdown akan dianggap sebagai link relatif terhadap file saat ini, bukan terhadap direktori root. Ini berguna untuk struktur proyek yang kompleks.

  ```javascript
  window.$docsify = { relativePath: true };
  ```

## Memperluas Fungsionalitas dengan Plugin

Plugin adalah cara terbaik untuk menambahkan fitur-fitur baru ke Docsify yang tidak tersedia secara bawaan. Ada banyak plugin yang dibuat oleh komunitas untuk berbagai keperluan.

### Cara Menggunakan Plugin

Pada dasarnya, plugin adalah file JavaScript. Untuk menggunakannya, Anda hanya perlu menambahkan tag `<script>` untuk plugin tersebut di file `index.html`, **setelah** script Docsify utama.

```html
<!-- index.html -->

<!-- Script Docsify utama -->
<script src="//cdn.jsdelivr.net/npm/docsify@4"></script>

<!-- Script untuk Plugin -->
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
```

### Plugin Esensial dan Populer

Berikut adalah beberapa plugin yang sangat direkomendasikan:

#### a. Search (Pencarian)

Plugin ini menambahkan kotak pencarian untuk melakukan pencarian teks lengkap di seluruh dokumentasi Anda.

**Instalasi:**

```html
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
```

**Konfigurasi:**

```javascript
// index.html
window.$docsify = {
  search: {
    maxAge: 86400000, // Masa berlaku cache indeks pencarian (1 hari)
    paths: "auto", // Secara otomatis mengindeks halaman dari sidebar
    placeholder: "Cari...",
    noData: "Tidak ada hasil!",
    depth: 2, // Kedalaman heading yang diindeks
  },
};
```

#### b. Zoom Image (Perbesar Gambar)

Plugin ini memberikan efek zoom seperti di Medium saat gambar diklik.

**Instalasi:**

```html
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js"></script>
```

Tidak perlu konfigurasi tambahan. Untuk gambar yang tidak ingin diberi efek zoom, tambahkan `':no-zoom'` pada sintaks gambar di Markdown: `![gambar](path/to/image.png ':no-zoom')`.

#### c. Copy to Clipboard (Salin ke Papan Klip)

Plugin ini menambahkan tombol "Salin" pada setiap blok kode, memudahkan pengguna untuk menyalin contoh kode.

**Instalasi:**

```html
<script src="//cdn.jsdelivr.net/npm/docsify-copy-code/dist/docsify-copy-code.min.js"></script>
```

Plugin ini juga langsung aktif tanpa perlu konfigurasi tambahan.

#### d. Disqus (Komentar)

Jika Anda ingin menambahkan kolom komentar di setiap halaman, plugin Disqus adalah pilihan yang tepat.

**Instalasi:**

```html
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/disqus.min.js"></script>
```

**Konfigurasi:**

Anda memerlukan "shortname" dari situs Disqus Anda.

```javascript
// index.html
window.$docsify = {
  disqus: "shortname-disqus-anda",
};
```

### (Bonus) Sekilas tentang Menulis Plugin Sendiri

Docsify memungkinkan Anda menulis plugin kustom dengan mudah. Plugin adalah sebuah fungsi yang menerima objek `hook` dan `vm` (instance Docsify).

**Contoh Plugin Sederhana (Menambahkan Footer):**

```javascript
// index.html
window.$docsify = {
  plugins: [
    function (hook, vm) {
      const footer = [
        "<hr/>",
        "<footer>",
        "  <span>Dibuat dengan &hearts; oleh Tim Anda.</span>",
        "</footer>",
      ].join("");

      // Hook `afterEach` dipanggil setelah setiap halaman di-render
      hook.afterEach(function (html) {
        return html + footer;
      });
    },
  ],
};
```

Kode di atas akan menambahkan footer sederhana di bagian bawah setiap halaman dokumentasi Anda. Ini menunjukkan betapa kuatnya sistem _hook_ pada Docsify untuk memanipulasi konten.

---

Anda sekarang memiliki kekuatan untuk mengonfigurasi Docsify sesuai kebutuhan dan memperluasnya dengan plugin. Di sesi terakhir, kita akan membahas fitur-fitur paling canggih dan cara mempublikasikan situs Anda ke seluruh dunia.
