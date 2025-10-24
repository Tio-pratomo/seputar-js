# Konten Dinamis dan Styling di Astro

Pada sesi ini, kita akan mendalami cara kerja file `.astro` dengan menambahkan logika JavaScript untuk membuat konten yang dinamis. Kita juga akan mengeksplorasi berbagai metode untuk menerapkan styling (CSS) pada halaman Astro.

## 1. Frontmatter Script: Otak dari Halaman Astro

Setiap file `.astro` memiliki area di bagian paling atas yang diapit oleh `---`. Area ini disebut **Frontmatter Script**.

```astro
---
// Di sinilah tempat Anda menulis JavaScript atau TypeScript.
// Kode ini berjalan di sisi server saat halaman di-build.
---

<!-- Di bawah sini adalah template HTML -->
```

Di dalam _frontmatter script_, Anda bisa melakukan banyak hal, seperti:

- Mendefinisikan variabel.
- Mengimpor komponen atau file lain.
- Mengambil data dari API.

### Menggunakan Variabel di dalam HTML

Variabel yang Anda definisikan di _frontmatter script_ bisa langsung digunakan di dalam bagian template HTML menggunakan kurung kurawal `{}`. Ini sangat mirip dengan JSX di React.

**Contoh di `src/pages/about.astro`:**

```html
---
const pageTitle = "Tentang Saya";
const identity = {
  name: "Aman",
  country: "Indonesia",
  hobbies: ["Programming", "Designing"],
};
---

<html lang="en">
  <head>
    <title>{pageTitle}</title>
  </head>
  <body>
    <h1>{pageTitle}</h1>
    <p>Nama saya adalah {identity.name}.</p>
  </body>
</html>
```

## 2. Menampilkan Konten Secara Dinamis

Dengan kemampuan mengeksekusi JavaScript, kita bisa menerapkan pola-pola umum seperti _list rendering_ dan _conditional rendering_.

### A. Rendering List (Menampilkan Data dari Array)

Jika Anda memiliki data dalam bentuk array, Anda bisa menggunakan fungsi `.map()` untuk merendernya menjadi sebuah daftar elemen HTML. Ini adalah cara yang efisien dan dinamis untuk menampilkan data.

**Contoh:** Menampilkan daftar hobi.

```html
---
const identity = {
  hobbies: ["Programming", "Designing", "Membaca"],
};
---

<body>
  <h2>Hobi Saya:</h2>
  <ul>
    {identity.hobbies.map((hobi) => (
    <li>{hobi}</li>
    ))}
  </ul>
</body>
```

**Mengapa menggunakan `.map()`?** Pola ini secara otomatis akan menangani kasus jika array kosong (tidak akan merender apa-apa), yang jauh lebih baik daripada merender elemen secara manual satu per satu.

### B. Rendering Bersyarat (Conditional Rendering)

Anda bisa menampilkan atau menyembunyikan elemen HTML berdasarkan kondisi tertentu. Pola ini juga identik dengan yang ada di React.

1.  **Menggunakan Operator Logika `&&`**
    Gunakan ini jika Anda hanya ingin menampilkan sesuatu **jika** kondisinya benar.

    ```astro
    {identity.age && <p>Umur saya adalah {identity.age}</p>}
    ```

    _Elemen `<p>` di atas hanya akan dirender jika `identity.age` memiliki nilai (bukan `null`, `undefined`, atau `0`)._

2.  **Menggunakan Operator Ternary `? :`**
    Gunakan ini untuk logika `if-else`, di mana Anda ingin menampilkan satu dari dua kemungkinan elemen.

    ```astro
    {identity.age > 50 ? <p>Status: Senior</p> : <p>Status: Junior</p>}
    ```

## 3. Styling di Astro

Astro menyediakan beberapa cara untuk menambahkan CSS ke halaman Anda.

### A. Scoped Styles (Gaya Spesifik per Halaman)

Anda bisa menulis CSS langsung di dalam file `.astro` dengan menambahkan tag `<style>`. Secara _default_, CSS yang ditulis di sini bersifat **scoped**, artinya gaya tersebut hanya akan berlaku untuk elemen di file itu saja dan tidak akan "bocor" ke halaman lain.

```html
---
// ... script ...
---

<h1>Judul Halaman</h1>
<p class="greeting">Halo!</p>

<style>
  h1 {
    color: purple;
    font-size: 3rem;
  }
  .greeting {
    color: orange;
  }
</style>
```

### B. Menggunakan Variabel JavaScript di CSS

Astro memungkinkan Anda untuk mengirim variabel dari _frontmatter script_ ke blok `<style>` menggunakan direktif `define:vars`.

```html
---
const colors = {
  primary: 'royalblue',
  accent: 'red'
};
---
<h1 class="title">Judul Dinamis</h1>

<style define:vars={{ titleColor: colors.primary, accentColor: colors.accent }}>
  .title {
    /* Gunakan variabel dengan sintaks var(--namaVariabel) */
    color: var(--titleColor);
    border-bottom: 2px solid var(--accentColor);
  }
</style>
```

### C. Global Styles (Gaya untuk Seluruh Situs)

Untuk gaya yang ingin Anda terapkan di semua halaman (misalnya, font, warna dasar, reset CSS), ikuti langkah-langkah berikut:

1.  Buat folder baru di `src` bernama `styles`.
2.  Di dalam `src/styles`, buat file CSS baru, misalnya `global.css`.
3.  Tulis semua gaya global Anda di file `global.css`.
    ```css
    /* src/styles/global.css */
    body {
      font-family: sans-serif;
      background-color: #f0f0f0;
    }
    h1 {
      font-size: 2.5rem;
      color: #333;
    }
    ```
4.  **Impor** file `global.css` tersebut di dalam _frontmatter script_ di setiap halaman yang membutuhkannya.
    ```astro
    ---
    import '../styles/global.css';
    ---
    <!-- Konten HTML -->
    ```

:::info[**Catatan**]
Keharusan mengimpor file CSS global di setiap halaman mungkin terasa merepotkan. Masalah ini akan diatasi dengan lebih elegan menggunakan **Layouts**, yang akan kita bahas di sesi berikutnya.
:::

## Kesimpulan Sesi 3

Kita telah belajar bagaimana memanfaatkan kekuatan JavaScript di dalam file Astro untuk membuat konten yang dinamis dan interaktif. Kita juga sudah memahami tiga metode utama untuk styling: _scoped_, dinamis dengan `define:vars`, dan global. Pengetahuan ini menjadi fondasi penting sebelum kita melangkah ke konsep komponen dan layout.
