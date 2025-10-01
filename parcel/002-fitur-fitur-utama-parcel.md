---
sidebar_position: 3
---

# Fitur-fitur Utama Parcel

Di bab sebelumnya, kita telah berhasil menyiapkan proyek Parcel. Sekarang, mari kita selami lebih dalam beberapa fitur utama yang membuat Parcel begitu istimewa dan produktif.

---

## Hot Module Replacement (HMR)

Kita sempat menyinggung ini sebelumnya, tetapi fitur ini sangat penting untuk dipahami. HMR adalah salah satu fitur produktivitas terbaik dari Parcel.

**Masalah:** Tanpa HMR, setiap kali Anda menyimpan perubahan pada file (misalnya JavaScript), seluruh halaman web akan di-_refresh_. Jika Anda sedang mengisi formulir atau berada di halaman yang memerlukan beberapa langkah untuk dicapai, semua progres itu akan hilang. Ini disebut _Live Reload_.

**Solusi HMR:** HMR lebih cerdas. Ia hanya "menyuntikkan" perubahan baru ke dalam halaman yang sedang berjalan tanpa perlu me-_refresh_ seluruhnya. Hasilnya, _state_ (keadaan) aplikasi Anda, seperti teks yang diketik di input atau state komponen React, akan tetap terjaga.

### Cara Mengaktifkan HMR

Untuk mengaktifkan HMR, tambahkan potongan kode berikut ke file entri JavaScript Anda (`src/index.js`):

```javascript
// Kode ini memeriksa apakah Parcel sedang berjalan dalam mode 'hot'
// dan menerima pembaruan modul secara otomatis.
if (module.hot) {
  module.hot.accept();
}
```

**Mari kita coba!**

1.  Tambahkan elemen `<input>` di `src/index.html`:

    ```html
    <body>
      <h1>Halo, Parcel!</h1>
      <input type="text" placeholder="Ketik sesuatu di sini..." />
      <script src="./index.js"></script>
    </body>
    ```

2.  Jalankan server dengan `npm start`.
3.  Buka browser dan ketik beberapa kata di dalam kotak input.
4.  Sekarang, ubah pesan `console.log` di `src/index.js` dan simpan filenya.
5.  Perhatikan: Pesan baru akan muncul di konsol browser, tetapi teks yang Anda ketik di kotak input **tidak hilang**. Itulah keajaiban HMR!

## Instalasi Dependensi Otomatis

Ini adalah fitur "ajaib" lainnya dari Parcel. Jika Anda mengimpor sebuah paket (misalnya dari `npm`) yang belum terinstal di proyek Anda, Parcel akan secara otomatis mendeteksinya, menginstalnya untuk Anda, dan menambahkannya ke `package.json`.

**Mari kita coba!**

1.  Pastikan server `npm start` masih berjalan.
2.  Ubah file `src/index.js` untuk mengimpor dan menggunakan paket `cowsay`, sebuah paket menyenangkan untuk membuat gambar sapi dari teks.

    ```javascript
    import cowsay from "cowsay";

    console.log(cowsay.say({ text: "Parcel itu MUDAH!" }));
    ```

3.  Simpan file tersebut. Lihat terminal tempat server Anda berjalan. Parcel akan menampilkan pesan bahwa ia sedang menginstal `cowsay`.

4.  Setelah selesai, periksa file `package.json` Anda. Anda akan melihat bahwa `cowsay` telah ditambahkan ke bagian `"dependencies"` secara otomatis!

Fitur ini sangat menghemat waktu karena Anda tidak perlu bolak-balik ke terminal untuk menginstal setiap paket yang Anda butuhkan.

## Mengimpor Aset Selain Kode

Dengan Parcel, Anda bisa mengimpor hampir semua jenis file langsung ke dalam JavaScript, dan Parcel akan tahu cara menanganinya.

### Mengimpor File CSS

1.  Buat file baru `src/style.css`.
2.  Isi dengan beberapa aturan CSS sederhana:

    ```css
    body {
      background-color: #f0f0f0;
      font-family: sans-serif;
    }

    h1 {
      color: navy;
      text-shadow: 2px 2px 4px #ccc;
    }
    ```

3.  Impor file CSS tersebut di baris paling atas `src/index.js`:

    ```javascript
    import "./style.css";

    // ... sisa kode Anda ...
    ```

4.  Simpan file `index.js`. Gaya CSS akan langsung diterapkan pada halaman Anda berkat HMR.

### Mengimpor Gambar

1.  Simpan sebuah gambar (misalnya `logo.png`) di dalam folder `src`.
2.  Impor gambar tersebut di `index.js` dan tampilkan di halaman:

    ```javascript
    // ... impor lainnya ...
    import logoURL from "./logo.png"; // Ganti dengan nama file gambar Anda

    // Buat elemen gambar baru
    const imgElement = document.createElement("img");
    imgElement.src = logoURL;
    imgElement.width = 100; // Atur lebar agar tidak terlalu besar

    // Tambahkan gambar ke dalam body
    document.body.appendChild(imgElement);
    ```

Saat Anda mengimpor gambar, Parcel akan memprosesnya, memberinya nama file yang unik (untuk menghindari masalah _cache_ di browser), dan mengembalikannya sebagai URL yang bisa Anda gunakan di dalam kode.

## Membersihkan Folder `dist`

Satu hal penting yang perlu diketahui adalah Parcel **tidak secara otomatis membersihkan folder `dist`** setiap kali Anda menjalankan perintah `build`.

Ini berarti file-file lama dari proses _build_ sebelumnya akan tetap ada, yang bisa menyebabkan penumpukan file yang tidak perlu.

Solusi umumnya adalah dengan menggunakan paket tambahan untuk membersihkan folder `dist` sebelum setiap proses `build`.

1.  Instal paket `rimraf` sebagai _dev dependency_.

    ```bash
    npm install -D rimraf
    ```

2.  Ubah skrip `"build"` di `package.json` menjadi seperti ini:

    ```json
    "scripts": {
      "start": "parcel src/index.html",
      "build": "rimraf dist && parcel build src/index.html"
    },
    ```

Sekarang, setiap kali Anda menjalankan `npm run build`, perintah `rimraf dist` akan menghapus folder `dist` terlebih dahulu, lalu `&&` memastikan `parcel build` hanya berjalan jika pembersihan berhasil. Ini memastikan folder `dist` Anda selalu berisi file-file terbaru dari proses _build_.
