---
sidebar_position: 2
---

# Prettier dan Cara installnya

Sesi 1 membahas kenalan singkat, instalasi lokal Prettier dengan versi terkunci, serta cara menjalankan perintah dasar seperti `--write` dan `--check` secara aman untuk pemula. Tujuannya agar langsung bisa memformat seluruh proyek dengan perintah yang tepat dan menyiapkan fondasi untuk sesi-sesi berikutnya.

## Tujuan sesi

- Memahami apa itu Prettier sebagai formatter yang opinionated dan manfaat konsistensi format di tim.
- Menginstal Prettier secara lokal per proyek dengan versi terkunci agar hasil format konsisten di semua mesin.
- Menjalankan perintah dasar Prettier dari CLI untuk memformat atau memeriksa format kode.

## Apa itu Prettier

Prettier adalah formatter kode yang opinionated, artinya ia menerapkan aturan format bawaan sehingga gaya penulisan konsisten tanpa banyak pilihan yang membingungkan. Pendekatan ini membantu mengurangi perdebatan soal gaya dan membuat review fokus pada logika, bukan spasi atau tanda baca.

## Instalasi lokal

Instal lokal di dalam proyek dan kunci versinya agar setiap anggota tim menggunakan versi yang sama. Perintah berikut mendukung manajer paket umum dan menggunakan flag versi tepat yang disarankan.

```bash
npm install --save-dev --save-exact prettier
```

## Jalankan dari CLI

Setelah terinstal, jalankan Prettier secara lokal menggunakan npx atau via script agar selalu memakai versi proyek. Pola umum perintah: npx prettier [options] [file/dir/glob], misalnya memformat seluruh repo atau file tertentu.

```bash
# Format dan timpa semua file yang didukung di folder saat ini
npx prettier . --write

# Cek apakah file sudah terformat (untuk CI atau verifikasi cepat)
npx prettier . --check

# Format hanya direktori atau file tertentu
npx prettier app/ --write
npx prettier "app/**/*.test.js" --write
```

Gunakan glob dengan tanda kutip agar bekerja lintas shell, dan batasi ke direktori tertentu bila proyek besar untuk mempercepat.

## Tambah script di package.json

Menambahkan script memudahkan eksekusi yang konsisten tanpa mengingat opsi CLI setiap saat. Contoh script umum adalah format dan format:check untuk menulis perubahan dan memverifikasi di CI.

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## Latihan cepat

### Langkah 1: Buat Folder Project

Buat folder kosong, buka terminal, dan masuk ke folder tersebut.

### Langkah 2: Inisialisasi NPM

Ketik perintah ini untuk membuat file `package.json`:

```bash
npm init -y
```

### Langkah 3: Install Prettier

Ketik perintah ini untuk menginstall Prettier:

```bash
npm install --save-dev --save-exact prettier
```

### Langkah 4: Buat File Konfigurasi

Buat dua file di folder root project Anda:

**File `.prettierrc` (kosong aja)**:

```
{}
```

**File `.prettierignore`**:

```
build
coverage
node_modules
```

### Langkah 5: Tambah Script di package.json

Buka file `package.json`, cari bagian `"scripts"`, dan ganti dengan:

```json
"scripts": {
  "format": "prettier . --write",
  "format:check": "prettier . --check"
}
```

### Langkah 6: Test Formatting

Jalankan:

```bash
npm run format
```

Untuk check tanpa mengubah file, jalankan:

```bash
npm run format:check
```

## Tips dan troubleshooting

Jika perintah prettier tidak dikenali, pastikan instalasi lokal sudah benar dan panggil melalui npx atau script npm agar tidak tergantung instalasi global. Untuk kolaborasi, jalankan prettier . --check di CI agar pull request gagal ketika ada file yang belum terformat, mencegah inkonsistensi masuk ke branch utama. Gunakan glob berpagar kutip seperti "app/\*_/_.test.js" saat menargetkan banyak file agar perilaku konsisten di berbagai shell.
