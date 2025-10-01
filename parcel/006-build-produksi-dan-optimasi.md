# Build Produksi dan Optimasi

Setelah selesai mengembangkan aplikasi, langkah terakhir adalah mempersiapkannya untuk _production_. Ini berarti membuat versi aplikasi yang paling optimal, kecil, dan cepat untuk diakses oleh pengguna. Parcel membuat proses ini sangat mudah dengan perintah `build`.

Berbeda dengan `npm start` yang fokus pada kecepatan _rebuild_ dan fitur _debugging_, `npm run build` fokus pada optimasi akhir.

```bash
npm run build
```

Perintah ini akan memicu serangkaian optimasi otomatis oleh Parcel. Mari kita bedah satu per satu.

---

## Optimasi Ukuran Bundle Otomatis

Tujuan utama dari _build_ produksi adalah memperkecil ukuran file agar lebih cepat diunduh oleh pengguna. Berikut adalah cara Parcel melakukannya secara otomatis:

### Minification (Minifikasi)

Parcel akan secara otomatis "memperkecil" (minify) file JavaScript, CSS, HTML, dan SVG. Proses ini meliputi:

- Menghapus spasi, baris baru, dan komentar yang tidak perlu.
- Mengganti nama variabel menjadi lebih pendek (misalnya `namaPanjangVariabel` menjadi `a`).

Ini secara drastis mengurangi ukuran file teks tanpa mengubah fungsinya.

### Tree Shaking (Membuang Kode Mati)

Parcel akan menganalisis seluruh kode Anda dan secara cerdas **membuang kode yang tidak pernah digunakan**. Proses ini disebut _Tree Shaking_.

Misalnya, jika Anda mengimpor sebuah _library_ besar tetapi hanya menggunakan satu fungsi darinya, _tree shaking_ akan memastikan bahwa hanya fungsi yang Anda pakai (dan dependensinya) yang masuk ke dalam _bundle_ akhir. Ini sangat efektif dalam mengurangi ukuran _bundle_.

### Menghapus Kode Khusus Development

Banyak _library_ (termasuk React) memiliki kode peringatan atau _debugging_ yang hanya berguna saat pengembangan. Kode ini biasanya dibungkus dalam kondisi `process.env.NODE_ENV !== 'production'`.

Saat `npm run build`, Parcel secara otomatis mengatur `NODE_ENV` ke `"production"`, sehingga semua blok kode ini akan dihapus sepenuhnya dari _bundle_ akhir.

Anda juga bisa menggunakan pola ini di kode Anda sendiri:

```javascript
if (process.env.NODE_ENV !== "production") {
  console.log(
    "Pesan ini hanya muncul saat development, dan akan hilang di versi produksi."
  );
}
```

### Optimasi Gambar

Parcel juga mengoptimalkan gambar secara otomatis saat _build_ produksi:

1.  **Optimasi Lossless**: Gambar JPEG dan PNG akan dikompresi tanpa mengurangi kualitas visualnya.
2.  **Konversi dan Resizing**: Anda bisa meminta Parcel untuk mengubah format dan ukuran gambar menggunakan _query parameter_ saat mengimpornya. Ini sangat berguna untuk menyediakan format modern seperti WebP yang ukurannya jauh lebih kecil.

    ```html
    <picture>
      <!-- Sediakan versi WebP untuk browser yang mendukung -->
      <source
        type="image/webp"
        srcset="./images/kucing.jpg?as=webp&width=400"
      />

      <!-- Fallback ke JPEG untuk browser lain -->
      <source type="image/jpeg" srcset="./images/kucing.jpg?width=400" />

      <!-- Elemen img utama -->
      <img src="./images/kucing.jpg?width=400" alt="Kucing" />
    </picture>
    ```

## Optimasi Cache Browser

Selain ukuran, kecepatan juga ditentukan oleh seberapa efektif browser bisa menyimpan aset di _cache_. Parcel membantu ini dengan:

- **Content Hashing**

  Parcel secara otomatis memberi nama file hasil _build_ dengan _hash_ unik berdasarkan isinya, contoh: `index.a1b2c3d4.js`. Jika isi file berubah, _hash_-nya juga berubah. Ini memberitahu browser untuk mengunduh versi baru dan memungkinkan server untuk mengatur _cache_ jangka panjang (misalnya 1 tahun) untuk file yang tidak berubah.

- **Shared Bundles & Differential Bundling**

  Seperti yang dibahas di bab sebelumnya, kedua fitur ini juga berperan besar dalam optimasi _cache_. Pengguna tidak perlu mengunduh ulang _library_ yang sama di setiap halaman, dan pengguna browser modern mendapatkan _bundle_ yang sudah di-_cache_ secara terpisah dari _bundle_ untuk browser lama.

## Menganalisis Ukuran Bundle

Kadang kita perlu tahu: "Bagian mana dari aplikasi saya yang paling besar?" Parcel menyediakan alat untuk ini.

### Laporan Detail di Terminal

Jalankan perintah `build` dengan flag `--detailed-report`. Ini akan menampilkan daftar file terbesar di dalam setiap _bundle_.

```bash
npm run build -- --detailed-report
```

### Bundle Analyzer (Visual)

Untuk analisis visual yang lebih interaktif, Anda bisa menggunakan `@parcel/reporter-bundle-analyzer`. Ini akan menghasilkan file HTML yang berisi _treemap_ dari isi _bundle_ Anda.

1.  **Instalasi**:

    ```bash
    npm install -D @parcel/reporter-bundle-analyzer
    ```

2.  **Jalankan via `.parcelrc` (rekomendasi)**:

    Buat file `.parcelrc` di root proyek Anda dan tambahkan konfigurasi berikut. Ini akan menjalankan analyzer setiap kali Anda melakukan `build`.

    ```json
    {
      "extends": "@parcel/config-default",
      "reporters": ["...", "@parcel/reporter-bundle-analyzer"]
    }
    ```

    _`"..."`_ : berarti kita tetap menjalankan reporter default (laporan di terminal) selain analyzer.

3.  Setelah `build` selesai, akan ada folder `parcel-bundle-reports` berisi file HTML yang bisa Anda buka di browser untuk melihat visualisasi ukuran _bundle_.

## Kompresi dengan Gzip & Brotli (Tingkat Lanjut)

Untuk optimasi lebih jauh, Anda bisa meminta Parcel untuk membuat versi terkompresi dari _bundle_ Anda (`.gz` untuk Gzip dan `.br` untuk Brotli). Web server yang dikonfigurasi dengan benar bisa mengirim file terkompresi ini langsung ke browser, menghemat _bandwidth_.

Ini adalah fitur _opt-in_ (tidak aktif secara default).

1.  **Instalasi**:

    ```bash
    npm install -D @parcel/compressor-gzip @parcel/compressor-brotli
    ```

2.  **Konfigurasi di `.parcelrc`**:

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

Sekarang, setiap kali `build`, Parcel akan menghasilkan `file.js`, `file.js.gz`, dan `file.js.br` di folder `dist`.
