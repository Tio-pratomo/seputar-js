---
sidebar_position: 5
---

# Styling Fundamentals & Dark Mode Architecture

Sebelum kita menyuntikkan **Shoelace** (Web Components) di sesi depan, kita harus memegang kendali penuh atas _native styling_ Docusaurus.

Docusaurus menggunakan framework CSS bernama **Infima**. Tidak seperti Bootstrap atau Tailwind yang berbasis utility-class banyak, Infima sangat bergantung pada **CSS Variables**.

Ini adalah kunci untuk membuat _Dark Mode_ bekerja otomatis tanpa duplikasi kode CSS yang masif.

Di sesi ini, kita akan mengubah "wajah" standar Docusaurus menjadi _brand_ Anda sendiri, dan menyiapkan fondasi CSS agar kompatibel dengan Shoelace nanti.

---

## Materi: Pengetahuan & Konsep

### 1. The Power of CSS Variables (`--ifm-`)

Buka file `src/css/custom.css`. Anda akan melihat banyak variabel dimulai dengan `--ifm-`.

Docusaurus tidak men-hardcode warna hex di komponennya. Ia hanya merujuk ke variabel ini.

Contoh logika internal Docusaurus:

```css
.button--primary {
  background-color: var(--ifm-color-primary); /* Bukan #25c2a0 */
}
```

Artinya, untuk mengganti tema seluruh website, Anda cukup mengubah nilai variabel di `:root`, tidak perlu menimpa class `.navbar` atau `.footer` satu per satu.

### 2. Algoritma Dark Mode

Docusaurus secara otomatis menyuntikkan atribut `data-theme="dark"` ke elemen `<html>` saat user mengaktifkan mode gelap.

```css
/* Default (Light) */
:root {
  --ifm-color-primary: #2e8555;
}

/* Dark Mode Override */
[data-theme="dark"] {
  --ifm-color-primary: #25c2a0; /* Warna lebih terang agar kontras di background gelap */
}
```

### 3. CSS Specificity & Customization

File `src/css/custom.css` di-load **terakhir** dalam bundle styles.

Artinya, aturan CSS apa pun yang Anda tulis di sini akan menimpa style bawaan Infima (selama specificity-nya sama atau lebih tinggi).

---

## Praktik: Branding & Typography

### Langkah 1: Color Generator (Primary Brand)

Warna hijau standar Docusaurus sangat "mainstream". Mari ubah menjadi warna modern lain, misalnya **Indigo/Violet**.

Jangan menebak kode hex manual untuk varian _light/dark/darker_. Gunakan tool generator.

1.  Kunjungi [Docusaurus Color Generator](https://docusaurus.io/docs/styling-layout#styling-your-site-with-infima).
2.  Masukkan warna Primary Anda (misal: `#6366f1` - Indigo).
3.  Copy kode CSS yang dihasilkan.

Buka `src/css/custom.css`, ganti blok `:root` dan `[data-theme='dark']` dengan hasil generate tadi.

**Contoh:**

```css title="src/css/custom.css"
:root {
  --ifm-color-primary: #6366f1;
  --ifm-color-primary-dark: #595cec;
  --ifm-color-primary-darker: #5457ea;
  --ifm-color-primary-darkest: #4548e1;
  --ifm-color-primary-light: #6d70f2;
  --ifm-color-primary-lighter: #7275f3;
  --ifm-color-primary-lightest: #8184f5;
}

[data-theme="dark"] {
  --ifm-color-primary: #8184f5;
  --ifm-color-primary-dark: #6d70f2;
  --ifm-color-primary-darker: #6366f1;
  --ifm-color-primary-darkest: #4548e1;
  --ifm-color-primary-light: #9598f7;
  --ifm-color-primary-lighter: #9fa1f8;
  --ifm-color-primary-lightest: #bdbebb;
}
```

_Simpan dan lihat browser. Seluruh elemen interaktif (link, navbar active, button) sekarang berubah warna._

### Langkah 2: Menambahkan Custom Font (Google Fonts)

Font bawaan sistem kadang membosankan. Kita akan gunakan **Inter** (font standar industri modern).

1.  Buka `docusaurus.config.js`.
2.  Docusaurus punya properti `stylesheets` di config utama untuk memuat aset eksternal di `<head>`.

Tambahkan array `stylesheets` di luar objek `themeConfig` (di root config object):

```javascript title="docusaurus.config.js"
const config = {
  // ... config lainnya ...

  // Tambahkan ini untuk load font
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  ],

  // ... themeConfig ...
};
```

3.  Buka kembali `src/css/custom.css`, dan aplikasikan font tersebut secara global:

```css title="src/css/custom.css"
:root {
  /* ... variabel warna tadi ... */

  /* Override Font Family Infima */
  --ifm-font-family-base: "Inter", system-ui, -apple-system, sans-serif;
}
```

### Langkah 3: Navbar & Footer Tweaks

Terkadang kita ingin Navbar terlihat sedikit transparan dengan efek _blur_ (Glassmorphism).

**Tambahkan ini di bagian bawah** `src/css/custom.css`:

```css
/* Custom Navbar Styling */
.navbar {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .navbar {
  background-color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Langkah 4: Layout Wrapper (Persiapan Shoelace)

Shoelace memiliki variabel CSS-nya sendiri (CSS Custom Properties) untuk tema. Agar Shoelace nanti "sadar" akan Dark Mode Docusaurus, kita perlu memastikan styling global kita konsisten.

Di sesi ini, kita cukup pastikan bahwa `html` tag memiliki transisi yang halus saat ganti mode.

```css
/* Smooth transition for Dark Mode toggle */
body {
  transition: background-color 0.5s ease, color 0.5s ease;
}
```

---

### Verifikasi Sesi 4

1.  Cek Browser: Apakah warna utama website sudah berubah dari hijau ke warna pilihan Anda?
2.  Cek Font: Gunakan "Inspect Element" pada teks paragraf, pastikan `font-family` memuat **Inter**.
3.  Cek Navbar: Scroll halaman ke bawah, lihat apakah navbar memiliki efek blur (transparan) saat konten lewat di belakangnya.
4.  Cek Dark Mode: Klik tombol toggle (matahari/bulan) di pojok kanan atas. Pastikan warna berubah smooth dan kontras tetap terjaga.

Jika tampilan sudah **"Sleek & Modern"**, berarti kita siap untuk menyuntikkan komponen canggih **Shoelace** di Sesi 5.
