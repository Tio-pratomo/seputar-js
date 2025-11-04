---
sidebar_position: 7
---

# Integrasi Prettier dan Eslint

Sesi 6 membahas integrasi Prettier dengan linter (ESLint) dan otomatisasi melalui Git hooks dengan Husky dan lint-staged, agar kode tidak hanya terformat konsisten tetapi juga melalui quality checks sebelum commit. Setelah sesi ini, pemula akan mampu menjalankan Prettier dan ESLint bersama tanpa konflik, serta mengotomatisasi pemformatan pada setiap tahap pengembangan menggunakan pre-commit hooks.

## Tujuan sesi

- Memahami cara mengintegrasikan Prettier dengan linter seperti ESLint agar kedua alat tidak saling bertentangan.
- Menggunakan Husky untuk menjalankan perintah sebelum commit ke Git.
- Mengatur lint-staged agar hanya file yang diubah yang diproses oleh Prettier dan ESLint, mempercepat pre-commit hooks.

## Perbedaan ESLint dan Prettier

ESLint adalah linter yang mendeteksi bug dan error dalam kode, serta menerapkan aturan kualitas kode seperti "jangan gunakan variabel yang tidak digunakan." Prettier adalah formatter yang mengatur gaya penulisan seperti spasi, semicolon, dan line breaks. Kedua alat memiliki peran berbeda: ESLint untuk kualitas, Prettier untuk gaya.

## Integrasi dengan ESLint menggunakan eslint-config-prettier

Masalah terjadi ketika ESLint memiliki aturan tentang gaya (semicolon, quotes, indentation) yang bertentangan dengan Prettier, sehingga hasil format satu sama lain saling menimpa. Solusinya adalah menggunakan eslint-config-prettier yang menonaktifkan semua aturan gaya ESLint dan membiarkan Prettier menangani pemformatan.

**Instalasi eslint-config-prettier:**

```bash
npm install --save-dev eslint-config-prettier
```

**Konfigurasi di .eslintrc.json:**

```json
{
  "extends": ["eslint:recommended", "prettier"]
}
```

Pastikan "prettier" berada di **posisi terakhir** agar dapat mengesampingkan konfigurasi lain. Dengan setup ini, ESLint hanya fokus pada kualitas kode, dan Prettier menangani semua aspek pemformatan.

## Pengenalan Husky

Husky adalah tools yang memungkinkan menjalankan perintah sebelum event Git tertentu seperti pre-commit atau pre-push, tanpa perlu script khusus. Ini memastikan bahwa kode tidak akan commit jika tidak memenuhi standar format dan quality yang ditentukan.

**Instalasi Husky:**

```bash
npx husky-init
```

Perintah ini akan membuat folder .husky dan hook file pre-commit yang dapat disesuaikan.

## Pengenalan lint-staged

Lint-staged menjalankan linter hanya pada file-file yang di-stage (akan di-commit), bukan seluruh proyek, sehingga pre-commit hooks berjalan lebih cepat. Contoh: jika hanya 2 file yang berubah, lint-staged hanya memproses 2 file tersebut, bukan 1000 file lainnya.

**Instalasi lint-staged:**

```bash
npm install --save-dev lint-staged
```

## Setup Husky dan lint-staged bersama

Langkah-langkah untuk mengintegrasikan Husky, lint-staged, Prettier, dan ESLint:

1. Instal dependensi yang diperlukan:

```bash
npm install --save-dev husky lint-staged prettier eslint eslint-config-prettier
```

2. Inisialisasi Husky:

```bash
npx husky-init
```

3. Konfigurasi lint-staged di package.json:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```

4. Edit file `.husky/pre-commit` untuk menjalankan lint-staged:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

## Alur kerja setelah setup

Ketika developer menjalankan git commit, Husky akan memicu pre-commit hook yang menjalankan lint-staged. Lint-staged akan menjalankan ESLint --fix dan Prettier --write hanya pada file yang di-stage. Jika ada error yang tidak bisa di-fix otomatis, commit akan dibatalkan. Jika semua berhasil, file akan di-stage ulang dengan perubahan format dan commit akan berjalan.

## Konfigurasi lengkap contoh

Berikut adalah contoh konfigurasi lengkap dalam package.json:

```json
{
  "name": "contoh-project",
  "version": "1.0.0",
  "scripts": {
    "format": "prettier --write .",
    "lint": "eslint . --fix",
    "format:check": "prettier --check ."
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "eslint-config-prettier": "^9.0.0",
    "husky": "^8.0.0",
    "lint-staged": "^15.0.0",
    "prettier": "^3.0.0"
  }
}
```

## Latihan cepat

- Instal ESLint, Prettier, eslint-config-prettier, Husky, dan lint-staged di proyek baru.
- Buat file .eslintrc.json dengan "prettier" di extends array, lalu verifikasi tidak ada konflik dengan npx eslint . --fix.
- Jalankan npx husky-init dan edit .husky/pre-commit untuk menjalankan npx lint-staged.
- Konfigurasi lint-staged di package.json untuk menjalankan ESLint --fix dan Prettier --write pada file JS/TS.
- Ubah file, stage ke Git, coba commit, dan amati bahwa Husky menjalankan Prettier dan ESLint secara otomatis.
- Buat file yang sengaja berformat buruk, stage, dan lihat apakah pre-commit hook menangkap dan memperbaikinya sebelum commit.

## Tips umum

- Selalu taruh "prettier" di posisi terakhir dalam ESLint extends array agar dapat mengesampingkan aturan style dari config lain.
- Gunakan lint-staged agar pre-commit hooks cepat dan hanya memproses file yang benar-benar berubah.
- Jangan gunakan eslint-plugin-prettier (berbeda dari eslint-config-prettier); rekomendasi terbaru adalah membiarkan Prettier terpisah dan menonaktifkan aturan ESLint yang konflik.
- Selalu commit file .husky dan .lintstagedrc (atau konfigurasi di package.json) ke repo agar semua developer menggunakan setup yang sama.
- Jalankan npm run format dan npm run lint:fix secara terpisah di awal proyek untuk memastikan basis kode sudah konsisten sebelum mengaktifkan hooks.
