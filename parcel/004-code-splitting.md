# Code Splitting

Seiring aplikasi Anda bertambah besar, file JavaScript yang digabungkan (_bundle_) juga akan membengkak. Ini bisa membuat waktu muat awal aplikasi menjadi lambat. Solusinya adalah **Code Splitting**.

**Code Splitting** adalah proses memecah satu file JavaScript raksasa menjadi beberapa file yang lebih kecil (disebut _chunks_ atau bundel). Bundel-bundel ini kemudian dapat dimuat secara dinamis atau sesuai permintaan (_on-demand_), bukan sekaligus di awal.

Kabar baiknya, Parcel mendukung _code splitting_ tanpa perlu konfigurasi apa pun.

Kabar baiknya lagi, pada umumnya, Anda **tidak perlu** menyentuh konfigurasi ini karena pengaturan default Parcel sudah dioptimalkan untuk HTTP/2 dan memberikan hasil yang sangat baik untuk sebagian besar proyek.

## Cara Melakukan Code Splitting

### Dynamic `import()`

Untuk memberitahu Parcel agar memisahkan sebagian kode ke dalam bundel yang berbeda, kita menggunakan sintaks `import()` dinamis. Ini berbeda dari `import` statis yang biasa kita tulis di bagian atas file.

- `import ... from '...'` (statis) : Modul dimuat di awal, secara sinkron.
- `import('...')` (dinamis) : Modul dimuat nanti saat kode dijalankan, secara asinkron. Ia mengembalikan sebuah **Promise**.

#### Contoh Praktis : Memuat Modul Saat Tombol Diklik

Bayangkan kita punya sebuah modul yang tidak selalu dibutuhkan, misalnya untuk menampilkan grafik atau galeri. Kita hanya ingin memuatnya saat pengguna mengklik sebuah tombol.

1.  Buat file baru `src/gallery.js`:

    ```javascript title="src/gallery.js"
    export function showGallery() {
      alert("Ini adalah galeri gambar yang dimuat secara on-demand!");
    }
    ```

2.  Di file utama Anda (misalnya `src/index.js`), tambahkan logika untuk memuat `gallery.js` saat sebuah tombol diklik.

    **Menggunakan `.then()` (Promise klasik):**

    ```javascript title="src/gallery.js"
    const galleryButton = document.createElement("button");
    galleryButton.textContent = "Tampilkan Galeri";
    document.body.appendChild(galleryButton);

    galleryButton.addEventListener("click", () => {
      console.log("Tombol galeri diklik, memuat modul...");
      import("./gallery.js")
        .then((galleryModule) => {
          // Setelah modul berhasil dimuat
          galleryModule.showGallery();
        })
        .catch((err) => {
          console.error("Gagal memuat galeri", err);
        });
    });
    ```

    **Menggunakan `async/await` (sintaks modern):**

    ```javascript title="src/gallery.js"
    const galleryButton = document.createElement("button");
    galleryButton.textContent = "Tampilkan Galeri";
    document.body.appendChild(galleryButton);

    galleryButton.addEventListener("click", async () => {
      try {
        console.log("Tombol galeri diklik, memuat modul...");
        const galleryModule = await import("./gallery.js");
        galleryModule.showGallery();
      } catch (err) {
        console.error("Gagal memuat galeri", err);
      }
    });
    ```

**Apa yang terjadi?**

Saat Anda menjalankan aplikasi, kode untuk `gallery.js` tidak akan dimuat. Buka _Developer Tools_ di browser Anda pada tab _Network_. Saat Anda mengklik tombol "Tampilkan Galeri", Anda akan melihat sebuah file JavaScript baru diunduh oleh browser. Itulah _code splitting_ dalam penerapannya.

### Bundel Bersama (Shared Bundles) Otomatis

Bagaimana jika beberapa bagian aplikasi Anda menggunakan _library_ yang sama? Misalnya, Anda punya dua halaman berbeda yang sama-sama menggunakan _library_ untuk memformat tanggal seperti `dayjs`.

Parcel cukup pintar untuk menangani ini. Ia akan secara otomatis mendeteksi dependensi yang sama dan memisahkannya ke dalam sebuah "bundel bersama" (_shared bundle_).

#### Contoh Kasus

Bayangkan Anda punya dua file HTML sebagai *entry points*:

- `halaman-satu.html` yang memuat `halaman-satu.js`
- `halaman-dua.html` yang memuat `halaman-dua.js`

Dan kedua file JavaScript tersebut sama-sama mengimpor dan menggunakan `dayjs`:

```javascript title="halaman-satu.js"
import dayjs from 'dayjs';

// Tampilkan tanggal hari ini di halaman pertama
const element = document.createElement('p');
element.textContent = `Halaman 1: ${dayjs().format('DD MMMM YYYY')}`;
document.body.appendChild(element);
```

```javascript title="halaman-dua.js"
import dayjs from 'dayjs';

// Tampilkan tanggal besok di halaman kedua
const element = document.createElement('p');
element.textContent = `Halaman 2: ${dayjs().add(1, 'day').format('DD MMMM YYYY')}`;
document.body.appendChild(element);
```

Saat Parcel mem-build proyek ini, ia tidak akan memasukkan kode `dayjs` ke dalam bundel `halaman-satu.js` **dan** `halaman-dua.js`. Sebaliknya, ia akan membuat tiga file utama:

1.  Bundel untuk `halaman-satu.js` (hanya berisi kode spesifik untuk halaman itu).
2.  Bundel untuk `halaman-dua.js` (hanya berisi kode spesifik untuk halaman itu).
3.  `dayjs.xxxxx.js` (bundel bersama yang berisi *library* `dayjs`).

Hasilnya, file HTML Anda (misalnya `halaman-satu.html`) akan memuat dua skrip:

```html title="halaman-satu.html (hasil build)"
<!-- Kode lain diatasnya -->
<script src="dayjs.xxxxx.js"></script>
<script src="halaman-satu.yyyyy.js"></script>
```

**Keuntungannya:** Pengguna hanya perlu mengunduh `dayjs` satu kali. Saat ia berpindah dari halaman satu ke halaman dua, browser sudah menyimpan `dayjs` di dalam _cache_, sehingga navigasi menjadi lebih cepat.

## Konfigurasi Lanjutan (Opsional)

Secara default, Parcel hanya akan membuat _shared bundle_ jika ukuran modul yang dibagikan cukup besar (misalnya di atas 20KB). Ini untuk menghindari pembuatan banyak file kecil yang justru bisa memperlambat koneksi pada beberapa kasus.

Namun, jika Anda perlu mengubah perilaku ini, Anda bisa melakukannya di `package.json`.

```json title="package.json"
{
  // ... konfigurasi lain ...
  "@parcel/bundler-default": {
    "minBundleSize": 30000, // Buat shared bundle jika ukurannya > 30KB
    "maxParallelRequests": 6 // Batasi maks 6 request paralel (untuk HTTP/1)
  }
}
```
