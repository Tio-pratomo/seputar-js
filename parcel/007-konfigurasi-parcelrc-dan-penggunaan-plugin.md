---
sidebar_position: 7
---

# Konfigurasi .parcelrc dan Penggunaan Plugin

Parcel sangat dikenal karena pendekatan _zero-configuration_ (tanpa konfigurasi), yang membuatnya sangat mudah digunakan. Dalam banyak kasus, Anda hanya perlu menggunakan ekstensi file yang benar dan Parcel akan secara otomatis mengetahui cara menanganinya.

Namun, ada kalanya Anda perlu menyesuaikan perilaku Parcel untuk kebutuhan tertentu. Inilah saatnya Anda perlu memahami **file konfigurasi `.parcelrc`** dan **plugin**.

---

## Apa Itu .parcelrc?

File `.parcelrc` adalah file JSON konfigurasi yang memungkinkan Anda untuk:

- Mengganti konfigurasi default Parcel
- Menambahkan plugin untuk menyesuaikan perilaku Parcel
- Menetapkan resolvers, transformers, packagers, dan reporters khusus

File ini harus ditempatkan di root proyek Anda (sejajar dengan `package.json`).

### Struktur Dasar .parcelrc

Berikut adalah struktur dasar dari file `.parcelrc`:

```json
{
  "extends": "@parcel/config-default",
  "resolvers": [...],
  "transformers": {...},
  "packagers": {...},
  "optimizers": {...},
  "compressors": {...},
  "reporters": [...]
}
```

Mari kita bahas masing-masing komponen tersebut.

---

## Komponen Utama dalam .parcelrc

### 1. `extends`

Menentukan konfigurasi default yang digunakan sebelum menambahkan perubahan Anda sendiri. Konfigurasi standar dari Parcel adalah `@parcel/config-default`.

```json
{
  "extends": "@parcel/config-default"
}
```

Jika Anda ingin menggunakan konfigurasi dari paket lain, Anda bisa mengganti nilai `@parcel/config-default` dengan nama paketnya.

### 2. `resolvers`

Resolvers menentukan bagaimana Parcel mengatasi impor. Mereka menentukan bagaimana jalur impor (misalnya `import "./utils"` atau `import "lodash"`) dipetakan ke file sebenarnya di sistem file.

Contoh: Menggunakan resolver khusus untuk alias

```json
{
  "resolvers": ["@parcel/resolver-default", "./MyCustomResolver.js"]
}
```

### 3. `transformers`

Transformers adalah plugin yang mengubah konten file. Ini adalah bagian utama dari proses Parcel untuk menangani file-file seperti TypeScript, JSX, SCSS, dan sebagainya.

**Contoh:** Mengganti transformer untuk file `.js` dengan yang khusus

```json
{
  "transformers": {
    "*.js": ["@parcel/transformer-js"],
    "*.ts": ["@parcel/transformer-typescript-types"],
    "*.graphql": ["@parcel/transformer-graphql"]
  }
}
```

### 4. `packagers`

Packagers menentukan bagaimana asset digabungkan ke dalam file bundle akhir. Mereka bekerja setelah transformasi dan sebelum optimisasi.

**Contoh:**

```json
{
  "packagers": {
    "*.js": "@parcel/packager-js",
    "*.css": "@parcel/packager-css",
    "*.html": "@parcel/packager-html"
  }
}
```

### 5. `optimizers`

Optimizers mengoptimalisasi asset setelah dipack. Misalnya, minification (pengkecilan) kode JavaScript.

**Contoh:**

```json
{
  "optimizers": {
    "*.js": ["@parcel/optimizer-terser"],
    "*.css": ["@parcel/optimizer-cssnano"]
  }
}
```

### 6. `compressors`

Compressors menghasilkan versi terkompresi dari bundle, seperti Gzip atau Brotli. Ini membantu mengurangi ukuran file yang harus diunduh oleh pengguna.

**Contoh:**

```json
{
  "compressors": {
    "*.{html,css,js,svg}": [
      "@parcel/compressor-gzip",
      "@parcel/compressor-brotli"
    ]
  }
}
```

### 7. `reporters`

Reporters menangani output Parcel ke terminal, UI, atau file. Mereka berguna untuk logging dan monitoring proses build.

**Contoh:**

```json
{
  "reporters": ["...", "@parcel/reporter-bundle-analyzer"]
}
```

Simbol `...` berarti menyertakan reporter default terlebih dahulu, lalu menambahkan reporter baru.

---

## Contoh Praktis .parcelrc

Berikut adalah contoh `.parcelrc` yang menggabungkan beberapa plugin untuk berbagai kebutuhan optimasi dan analisis:

```json
{
  "extends": "@parcel/config-default",
  "reporters": ["...", "@parcel/reporter-bundle-analyzer"],
  "compressors": {
    "*.{html,css,js,svg}": [
      "@parcel/compressor-gzip",
      "@parcel/compressor-brotli"
    ]
  },
  "optimizers": {
    "*.js": ["@parcel/optimizer-terser"],
    "*.css": ["@parcel/optimizer-cssnano"]
  }
}
```

Konfigurasi ini:

1. Memperluas konfigurasi default Parcel
2. Menambahkan reporter bundle analyzer untuk analisis ukuran bundle
3. Menambahkan kompresor Gzip dan Brotli untuk file statis
4. Menambahkan optimizer Terser (untuk JS) dan CSSNano (untuk CSS)

---

## Plugin Populer dan Penggunaannya

### 1. @parcel/reporter-bundle-analyzer

Plugin ini menyediakan visualisasi interaktif tentang ukuran dan komposisi bundle Anda.

**Instalasi:**

```bash
npm install -D @parcel/reporter-bundle-analyzer
```

**Konfigurasi:**

```json
{
  "extends": "@parcel/config-default",
  "reporters": ["...", "@parcel/reporter-bundle-analyzer"]
}
```

Setelah build selesai, buka file HTML yang dihasilkan untuk melihat visualisasi bundle Anda.

### 2. @parcel/compressor-gzip & @parcel/compressor-brotli

Plugin-plugin ini menghasilkan versi terkompresi dari bundle Anda yang didukung oleh sebagian besar browser modern.

**Instalasi:**

```bash
npm install -D @parcel/compressor-gzip @parcel/compressor-brotli
```

**Konfigurasi:**

```json
{
  "extends": "@parcel/config-default",
  "compressors": {
    "*.{html,css,js,svg}": [
      "@parcel/compressor-gzip",
      "@parcel/compressor-brotli"
    ]
  }
}
```

### 3. @parcel/optimizer-terser

Optimizer ini melakukan minification dan mangling pada kode JavaScript untuk mengurangi ukuran file.

:::info [Catatan]
**mangling** artinya penggantian nama (untuk ringkas)
:::

**Instalasi:**

```bash
npm install -D @parcel/optimizer-terser
```

**Konfigurasi:**

```json
{
  "extends": "@parcel/config-default",
  "optimizers": {
    "*.js": ["@parcel/optimizer-terser"]
  }
}
```

### 4. @parcel/transformer-webmanifest

Transformasi ini menangani file `webmanifest` untuk aplikasi web progresif (PWA).

**Instalasi:**

```bash
npm install -D @parcel/transformer-webmanifest
```

**Konfigurasi:**

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.webmanifest": ["@parcel/transformer-webmanifest"]
  }
}
```

---

## Membuat Plugin Sendiri

Meskipun kebanyakan kasus bisa ditangani dengan plugin yang sudah ada, Anda juga bisa membuat plugin Parcel sendiri. Plugin Parcel adalah modul ES6 yang mengekspor fungsi dengan struktur tertentu, tergantung jenis pluginnya (transformer, optimizer, dll).

### Struktur Plugin Transformer Sederhana

Berikut adalah contoh plugin transformer sederhana yang menambahkan komentar ke setiap file JavaScript:

```javascript title="MyTransformer.js"
// Ini adalah plugin transformer sederhana
module.exports = {
  // Versi API plugin
  version: 2,
  // Fungsi transform
  async transform({ asset }) {
    // Baca konten asset
    const code = await asset.getCode();

    // Tambahkan komentar
    const modifiedCode = `// File ini telah diproses oleh plugin saya\n${code}`;

    // Set konten yang dimodifikasi
    asset.setCode(modifiedCode);

    return [asset];
  },
};
```

Lalu gunakan di `.parcelrc`:

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.js": ["./MyTransformer.js", "@parcel/transformer-js"]
  }
}
```

---

## Tips dan Trik

### 1. Gunakan Simbol `...`

Saat menambahkan plugin ke array seperti `"reporters"` atau `"transformers"`, gunakan simbol `...` untuk mempertahankan konfigurasi default:

```json
{
  "reporters": ["...", "@parcel/reporter-bundle-analyzer"]
}
```

### 2. Urutan Plugin Penting

Dalam beberapa kasus, urutan plugin dalam array bisa mempengaruhi hasilnya. Pastikan plugin yang mengubah format file (misalnya transpiler) ditempatkan sebelum plugin yang memerlukan format tertentu.

### 3. Testing Konfigurasi

Setelah mengubah `.parcelrc`, pastikan untuk menjalankan `parcel build` atau `parcel serve` untuk menguji apakah konfigurasi bekerja sesuai harapan.

### 4. Dokumentasi Plugin

Pastikan untuk membaca dokumentasi resmi dari setiap plugin yang Anda gunakan untuk memahami konfigurasi dan penggunaannya yang paling efektif.

---

## Kesimpulan

File `.parcelrc` memberikan Anda kendali penuh terhadap perilaku Parcel tanpa kehilangan keunggulan "zero configuration" secara keseluruhan. Dengan memahami berbagai komponen dalam file konfigurasi ini dan menggunakan plugin yang sesuai, Anda dapat:

- Menyesuaikan proses build sesuai kebutuhan proyek Anda
- Meningkatkan kinerja aplikasi Anda melalui optimasi yang lebih canggih
- Menghasilkan output yang lebih sesuai dengan kebutuhan deployment Anda
- Memperoleh insight yang lebih dalam tentang bundle Anda melalui alat analisis

Meskipun dalam banyak kasus, konfigurasi default Parcel sudah cukup baik, kemampuan untuk menyesuaikan konfigurasi ini membuat Parcel menjadi alat yang sangat fleksibel untuk proyek-proyek dengan persyaratan yang lebih kompleks.
