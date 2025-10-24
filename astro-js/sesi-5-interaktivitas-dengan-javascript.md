# Menambahkan Interaktivitas dengan JavaScript

Sejauh ini, website yang kita bangun masih statis. Pada sesi ini, kita akan menambahkan interaktivitas menggunakan JavaScript di sisi klien (_client-side_). Studi kasus utamanya adalah membuat menu navigasi hamburger yang fungsional di perangkat mobile.

## 1. Refactoring: Membuat Komponen `Header.astro`

Sebelum menambahkan JavaScript, langkah pertama yang baik adalah merapikan struktur komponen. Alih-alih menempatkan komponen `Navigation` dan `Hamburger` secara terpisah di setiap halaman, kita akan menyatukannya dalam satu komponen induk yang reusable.

1.  Buat komponen baru: `src/components/Header.astro`.
2.  Pindahkan semua logika dan elemen yang terkait dengan header (logo/judul situs, komponen `Hamburger`, dan komponen `Navigation`) ke dalam `Header.astro`.

    ```jsx
    ---
    // src/components/Header.astro
    import Hamburger from './Hamburger.astro';
    import Navigation from './Navigation.astro';
    ---
    <header>
      <a href="/">My Astro Blog</a>
      <Hamburger />
      <Navigation />
    </header>
    ```

3.  Sekarang, di setiap file halaman (seperti `index.astro`, `about.astro`), kita cukup memanggil satu komponen `<Header />`.

Ini membuat kode di level halaman jauh lebih bersih dan perawatannya lebih mudah.

## 2. Styling Responsif untuk Navigasi

Logika CSS untuk menu hamburger ditambahkan ke file `src/styles/global.css`.

**Strategi CSS:**

- **Mobile First**: Secara default, menu navigasi (`.navigation`) disembunyikan di layar kecil.
- **Tombol Hamburger**: Tombol ini hanya muncul di layar kecil.
- **Kelas `.expanded`**: JavaScript akan menambahkan kelas ini ke elemen `.navigation` saat tombol hamburger diklik, yang akan membuatnya muncul.
- **Media Query**: Di layar besar (desktop), tombol hamburger disembunyikan dan menu navigasi selalu terlihat.

:::tip[**Penting: Pewarisan Style Global**]
Anda tidak perlu mengimpor `global.css` di dalam setiap komponen anak. Selama file CSS global sudah diimpor di komponen level tertinggi (seperti layout atau halaman), gayanya akan secara otomatis diwariskan ke semua komponen anak yang ada di dalamnya (seperti `Header`, `Navigation`, dll).
:::

## 3. Menambahkan Script Sisi Klien

Inilah inti dari sesi ini: **bagaimana Astro menangani JavaScript untuk interaktivitas**.

### A. Logika Inti: Menggunakan Vanilla JavaScript

Secara default, Astro mendorong penggunaan API web standar (Vanilla JS) untuk interaksi DOM. Ini mungkin terasa berbeda jika Anda terbiasa dengan framework seperti React yang mengabstraksi manipulasi DOM.

Logika untuk menu hamburger kita adalah sebagai berikut:

1.  Cari elemen tombol hamburger.
2.  Tambahkan _event listener_ untuk mendeteksi klik.
3.  Saat diklik, cari elemen navigasi.
4.  _Toggle_ (tambah/hapus) kelas `.expanded` pada elemen navigasi tersebut.

### B. Mengorganisir Kode JavaScript

Daripada menulis JavaScript langsung di dalam tag `<script>` di file `.astro`, praktik terbaik adalah memisahkannya ke dalam file `.js` tersendiri.

1.  **Buat Folder `scripts`**
    Buat direktori baru di `src/scripts/`.

2.  **Buat File Script**
    Buat file baru, misalnya `src/scripts/menu.js`, dan letakkan logika JavaScript kita di dalamnya.

    **`src/scripts/menu.js`**

    ```javascript
    document.querySelector(".hamburger").addEventListener("click", () => {
      document.querySelector(".navigation").classList.toggle("expanded");
    });
    ```

3.  **Impor Script di Komponen**
    Kembali ke komponen `Header.astro`, impor file script tersebut di dalam _frontmatter script_. Astro akan secara otomatis mem-bundle dan memuat script ini di sisi klien saat komponen `Header` digunakan.

    **`src/components/Header.astro`**

    ```jsx
    ---
    import Hamburger from './Hamburger.astro';
    import Navigation from './Navigation.astro';

    // Impor script agar dijalankan di client
    import '../scripts/menu.js';
    ---
    <header>
      <!-- ... Konten header ... -->
    </header>
    ```

Dengan cara ini, script hanya akan dimuat pada halaman-halaman yang menggunakan komponen `Header`, membuatnya efisien.

## Kesimpulan Sesi 5

Kita telah berhasil menambahkan interaktivitas pertama ke situs Astro kita. Poin-poin penting yang dipelajari:

- Pentingnya refactoring menjadi komponen yang logis seperti `Header`.
- Cara kerja JavaScript di sisi klien pada Astro, yang secara default menggunakan API web standar (Vanilla JS).
- Praktik terbaik untuk mengorganisir file JavaScript di dalam direktori `src/scripts/` dan mengimpornya ke dalam komponen yang relevan.

Meskipun pendekatan ini mungkin terasa sangat "manual", ini menunjukkan filosofi Astro yang mengutamakan performa dengan tidak memuat JavaScript yang tidak perlu secara default. Di sesi-sesi mendatang, kita mungkin akan melihat cara mengintegrasikan Astro dengan UI framework lain untuk menangani interaktivitas yang lebih kompleks.
