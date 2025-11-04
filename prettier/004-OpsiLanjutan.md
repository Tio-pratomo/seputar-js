---
sidebar_position: 5
---

# Opsi Lanjutan

Sesi 4 membahas cara mengabaikan file atau bagian kode tertentu dari pemformatan Prettier, menggunakan .prettierignore, komentar prettier-ignore, dan opsi CLI untuk kontrol granular atas file mana yang diformat. Setelah sesi ini, pemula akan mampu menyesuaikan perimeter pemformatan agar hanya file yang relevan saja yang diformat, dan menghindari kesalahan pada file generated atau sensitif.

### Tujuan sesi

- Memahami cara membuat dan menggunakan file .prettierignore untuk mengecualikan file atau folder dari pemformatan.
- Mengetahui komentar prettier-ignore untuk mengabaikan baris atau bagian kode individual dalam file.
- Menggunakan opsi CLI seperti --ignore-path dan --no-prettier-ignore untuk kontrol pemformatan yang fleksibel.

### File .prettierignore

File .prettierignore mengikuti sintaks .gitignore dan disimpan di root proyek untuk memberitahu Prettier file atau folder mana yang tidak perlu diformat. Dengan .prettierignore, dapat menjalankan npx prettier . --write tanpa khawatir memenggal file generated atau sensitif, dan editor juga akan tahu file mana yang tidak perlu diformat.

```
# .prettierignore
# Ignore build artifacts
build
dist
coverage

# Ignore node modules (sudah diabaikan default)
node_modules

# Ignore file-file tertentu
*.min.js
*.min.css

# Ignore semua HTML file
**/*.html

# Ignore folder tertentu
public
temp
```

### Pola umum di .prettierignore

Sintaks sama dengan .gitignore, jadi pola umum yang sudah dikenal dapat digunakan langsung.

- Abaikan folder: ketik nama folder tanpa trailing slash, misalnya build mengabaikan folder build.
- Abaikan file tertentu: ketik nama file lengkap termasuk ekstensi, misalnya filename.html atau file.min.js.
- Abaikan berdasarkan pola glob: gunakan wildcard, misalnya \*_/_.html mengabaikan semua file HTML, atau \*.min.js mengabaikan semua file minified.
- Abaikan direktori bersarang: gunakan \*\*, misalnya node_modules mengabaikan folder node_modules di level manapun.

### Apa yang diabaikan secara default

Prettier secara otomatis mengabaikan file di folder versi kontrol seperti .git, .svn, .hg, serta folder node_modules kecuali flag --with-node-modules dipakai. Prettier juga akan mengikuti pola di .gitignore jika file tersebut ada di direktori yang sama dari mana perintah dijalankan, sehingga tidak perlu mendulikat pola jika sudah di .gitignore.

### Komentar prettier-ignore

Gunakan komentar // prettier-ignore (JavaScript) atau <!-- prettier-ignore --> (HTML/Markdown) tepat di atas kode yang ingin diabaikan untuk melewati satu pernyataan atau elemen tertentu.  Komentar ini berguna untuk kasus khusus di mana format Prettier tidak sesuai dengan kebutuhan spesifik, misalnya tabel data yang indah atau ASCII art.

```javascript
// prettier-ignore
const matrix = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];
```

Setelah prettier-ignore diterapkan, pernyataan berikutnya akan tetap dalam format aslinya, bukan dimulai pada baris baru.

### prettier-ignore-start dan prettier-ignore-end

Untuk mengabaikan blok kode multi-baris, gunakan <!-- prettier-ignore-start --> dan <!-- prettier-ignore-end --> di file Markdown atau HTML, tetapi komentar ini hanya berfungsi pada Markdown dan HTML, bukan pada JavaScript.

```markdown
<!-- prettier-ignore-start -->

| Kolom A | Kolom B |
|---------|---------|
| Data 1  | Data 2  |

<!-- prettier-ignore-end -->
```

Catatan penting: di file JavaScript, prettier-ignore-start dan prettier-ignore-end **tidak didukung**, jadi hanya dapat menggunakan prettier-ignore per baris.

### Opsi CLI untuk kontrol ignore

Gunakan --ignore-path untuk menentukan file .prettierignore kustom jika perlu menyimpannya di lokasi non-standar.

```bash
npx prettier . --write --ignore-path ./config/.prettierignore
```

Gunakan --no-prettier-ignore untuk memaksa Prettier memproses semua file termasuk yang di .prettierignore, berguna saat perlu memformat ulang seluruh repo.

```bash
npx prettier . --write --no-prettier-ignore
```

### Latihan cepat

- Buat file .prettierignore di root proyek dan abaikan build, dist, dan node_modules.
- Jalankan npx prettier . --check dan amati bahwa file di folder ignored tidak diproses.
- Buat file JavaScript dengan kode yang ingin diabaikan, tambahkan // prettier-ignore di atasnya, lalu format dengan npx prettier --write dan lihat kode tersebut tetap rapi.
- Buat file Markdown dengan tabel, gunakan <!-- prettier-ignore-start --> dan <!-- prettier-ignore-end --> untuk membungkus tabel, lalu format dan perhatikan tabel tidak berubah.
- Coba --no-prettier-ignore untuk memaksa pemformatan semua file, lalu amati perubahan di file yang sebelumnya diabaikan.

### Tips umum

- Selalu sertakan .prettierignore dalam repo dan commit bersama file konfigurasi lain agar semua developer dan CI menggunakan aturan yang sama.
- Hindari menggunakan prettier-ignore terlalu banyak; jika sering perlu mengabaikan, mungkin sebaiknya menyesuaikan opsi konfigurasi Prettier.
- Untuk folder besar yang tidak perlu diformat seperti vendor atau third-party libraries, simpan namanya di .prettierignore untuk mempercepat eksekusi perintah prettier.
- Gunakan prettier-ignore hanya untuk kasus edge-case, bukan sebagai solusi umum menghindari pemformatan.
