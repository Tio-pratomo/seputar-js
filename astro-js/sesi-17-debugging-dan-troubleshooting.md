# Sesi 17: Debugging dan Troubleshooting

Ketika terjadi masalah, mengetahui cara men-debug dan memecahkan masalah secara efisien adalah keterampilan yang sangat berharga. Sesi ini membahas alat dan teknik untuk debugging proyek Astro.

## 1. Penggunaan Astro Dev Toolbar secara Mendalam

Astro Dev Toolbar adalah alat bantu yang muncul di pojok kanan bawah browser saat Anda menjalankan `npm run dev`. Ini bukan sekadar hiasan, melainkan pusat informasi yang kuat.

### Fitur Utama:

-   **Inspect**:
    -   Klik ikon target, lalu arahkan kursor ke elemen mana pun di halaman.
    -   Toolbar akan menampilkan informasi tentang elemen tersebut, termasuk:
        -   **Nama Komponen**: Menunjukkan file `.astro` atau komponen UI framework mana yang merender elemen tersebut.
        -   **Props**: Menampilkan props yang diterima oleh komponen.
        -   **Client Directive**: Memberi tahu Anda jika ini adalah sebuah Astro Island dan direktif apa yang digunakan (`client:load`, `client:visible`, dll.). Sangat berguna untuk men-debug mengapa sebuah komponen tidak interaktif.

-   **Audit**:
    -   Menjalankan serangkaian pemeriksaan otomatis pada halaman Anda untuk masalah performa dan aksesibilitas.
    -   Contohnya, ia akan memberi peringatan jika ada gambar tanpa atribut `width` dan `height`, atau jika ada link yang tidak dapat diakses.

-   **Settings**:
    -   Memungkinkan Anda untuk menonaktifkan atau mengkonfigurasi fitur toolbar.

## 2. Browser Developer Tools dengan Astro

Browser DevTools (F12) tetap menjadi alat debugging utama Anda.

### Tab "Elements":
-   Karena Astro merender HTML di server, apa yang Anda lihat di tab "Elements" adalah output HTML murni.
-   Perhatikan atribut `astro-island-*` pada elemen. Ini adalah penanda yang digunakan Astro untuk mengetahui di mana harus "menghidrasi" komponen interaktif. Jika atribut ini tidak ada pada komponen yang seharusnya interaktif, kemungkinan Anda lupa menambahkan direktif `client:*`.

### Tab "Console":
-   `console.log()` yang Anda tulis di **frontmatter script** (`---`) file `.astro` akan muncul di **terminal** tempat Anda menjalankan `npm run dev`, bukan di konsol browser. Ini karena kode tersebut berjalan di server.
-   `console.log()` yang Anda tulis di dalam tag `<script>` (tanpa `is:inline`) atau di dalam file `.js` yang diimpor akan muncul di **konsul browser**, karena kode ini berjalan di sisi klien.

### Tab "Network":
-   Gunakan tab ini untuk memeriksa request API yang dibuat dari sisi klien.
-   Perhatikan file JavaScript yang diunduh. Anda bisa melihat bagaimana Astro mem-bundle dan memuat JavaScript untuk setiap "island" secara terpisah.

## 3. Common Issues dan Troubleshooting

-   **"My component is not interactive!"**
    -   **Penyebab paling umum**: Lupa menambahkan direktif `client:*` (misalnya, `client:load`, `client:visible`) pada komponen UI framework Anda di file `.astro`.
    -   **Solusi**: Tambahkan direktif yang sesuai. Gunakan "Inspect" di Dev Toolbar untuk memverifikasi.

-   **"ReferenceError: document is not defined"**
    -   **Penyebab**: Anda mencoba mengakses API browser (seperti `document` atau `window`) di dalam frontmatter script (`---`). Kode ini berjalan di server, di mana objek-objek tersebut tidak ada.
    -   **Solusi**: Pindahkan kode yang memerlukan API browser ke dalam tag `<script>` atau ke file `.js` yang diimpor, yang berjalan di sisi klien.

-   **"CSS styles are not applying as expected."**
    -   **Penyebab 1 (Scoped Styles)**: Ingat bahwa tag `<style>` di Astro bersifat *scoped* secara default. Gaya hanya akan berlaku untuk elemen di file yang sama.
    -   **Solusi 1**: Jika Anda ingin gaya menjadi global, gunakan direktif `is:global` (`<style is:global>`) atau letakkan di file CSS global.
    -   **Penyebab 2 (Tailwind)**: Kelas Tailwind tidak berfungsi. Pastikan integrasi `@astrojs/tailwind` sudah terpasang dengan benar dan `tailwind.config.mjs` sudah dikonfigurasi untuk memindai file `.astro` Anda.

## 4. Performance Profiling

Jika situs Anda terasa lambat, gunakan tab **"Performance"** atau **"Lighthouse"** di Chrome DevTools.

-   **Lighthouse**: Jalankan audit Lighthouse untuk mendapatkan laporan lengkap tentang Core Web Vitals, performa, aksesibilitas, dan SEO. Laporan ini akan memberikan saran konkret untuk perbaikan.
-   **Performance Tab**:
    -   Rekam jejak pemuatan halaman untuk melihat apa yang memblokir thread utama.
    -   Cari skrip JavaScript yang berjalan lama. Ini bisa membantu Anda mengidentifikasi "island" yang terlalu berat atau tidak efisien.
    -   Analisis "flame chart" untuk memahami urutan rendering dan eksekusi skrip. Ini bisa membantu Anda memutuskan apakah `client:load` bisa diubah menjadi `client:idle` atau `client:visible` untuk performa yang lebih baik.
