---
sidebar_position: 3
---

# Konfigurasi Dasar

Sesi 2 fokus pada konfigurasi dasar Prettier: file konfigurasi yang didukung, bagaimana Prettier menemukannya, contoh konfigurasi minimal, serta penggunaan overrides untuk kebutuhan per-file atau per-folder agar pemula cepat nyaman tanpa bingung. Setelah sesi ini, konfigurasi proyek akan rapi, mudah dibagikan ke tim, dan konsisten diterapkan lewat CLI serta script npm.

## Tujuan sesi

- Mengetahui lokasi dan format file konfigurasi Prettier yang didukung, termasuk opsi menyimpan konfigurasi di package.json.
- Memahami cara Prettier mencari dan mengutamakan konfigurasi, serta kapan perlu menentukan jalur config secara eksplisit lewat CLI.
- Menyusun konfigurasi minimal dan overrides supaya gaya format konsisten namun fleksibel untuk beberapa jenis file.

## File konfigurasi yang didukung

Prettier mendukung beberapa bentuk file konfigurasi, dan akan membaca salah satu yang ditemukannya di direktori kerja atau parent directories proyek. Nama file yang didukung meliputi .prettierrc (JSON/YAML), .prettierrc.json, .prettierrc.yaml atau .yml, .prettierrc.js/.cjs/.mjs, prettier.config.js/.cjs/.mjs, serta bidang "prettier" di package.json. Menyimpan konfigurasi di root repo memudahkan semua anggota tim mendapatkan perilaku yang sama tanpa setup masing-masing mesin.

- .prettierrc atau .prettierrc.json untuk konfigurasi berbasis JSON sederhana.
- .prettierrc.yaml atau .prettierrc.yml jika lebih nyaman menulis YAML.
- .prettierrc.js/.cjs/.mjs atau prettier.config.js/.cjs/.mjs jika butuh ekspresi JavaScript, impor bersama, atau logika ringan.
- "prettier" di package.json untuk menyatukan dependensi dan konfigurasi dalam satu file.

## Prioritas dan penemuan konfigurasi

Prettier akan mencari konfigurasi mulai dari direktori file yang sedang diformat, naik ke atas direktori induk hingga menemukan salah satu file konfigurasi yang didukung. Opsi pada command line memiliki prioritas tertinggi, kemudian konfigurasi pada file, lalu nilai default Prettier jika tidak ditentukan. Jika ingin memastikan file tertentu memakai konfigurasi spesifik, gunakan opsi `--config <path>` saat memanggil CLI.

## Contoh konfigurasi minimal

Konfigurasi minimal membantu menandai proyek memakai Prettier, sambil menjaga opsi tetap dekat dengan default agar tidak menambah beban pemula. Opsi-opsi inti seperti printWidth, semi, singleQuote, trailingComma, tabWidth, bracketSpacing, arrowParens, dan endOfLine dapat disetel bila tim punya preferensi jelas.

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

## Overrides per jenis file

Gunakan overrides untuk menerapkan opsi berbeda pada pola file tertentu, misalnya Markdown, YAML, atau file test. Ini menjaga konsistensi sambil mengakomodasi karakteristik masing-masing format dokumen.

```json
// .prettierrc dengan overrides
{
  "printWidth": 80,
  "overrides": [
    {
      "files": ["*.md", "*.mdx"],
      "options": { "proseWrap": "always" }
    },
    {
      "files": ["*.yml", "*.yaml"],
      "options": { "tabWidth": 2 }
    },
    {
      "files": ["**/*.test.{js,ts}"],
      "options": { "singleQuote": true }
    }
  ]
}
```

## Konfigurasi di package.json

Jika ingin meminimalkan jumlah file, simpan konfigurasi di bidang "prettier" dalam package.json tanpa mengubah perilaku pencarian konfigurasi. Cara ini praktis untuk proyek kecil atau demo, namun untuk proyek besar file khusus seperti .prettierrc sering lebih mudah dikelola.

```json
// package.json
{
  "name": "contoh",
  "version": "1.0.0",
  "prettier": {
    "singleQuote": true,
    "trailingComma": "all"
  }
}
```

## Mengarahkan CLI ke config tertentu

Ketika repositori monorepo atau struktur folder kompleks, tentukan jalur konfigurasi eksplisit agar perintah konsisten. Contoh: `npx prettier "packages/*/src/**/*.{js,ts,tsx}" --config ./prettier.config.cjs --write` untuk memastikan paket-paket memakai satu sumber konfigurasi.

```bash
# Menentukan file config secara eksplisit
npx prettier "packages/*/src/**/*.{js,ts,tsx}" --config ./prettier.config.cjs --write
```

## Latihan cepat

- Buat .prettierrc minimal di root repo, lalu jalankan npx prettier . --check untuk memastikan config dibaca.
- Tambahkan satu overrides untuk `.md` agar proseWrap: "always", lalu uji pada README.md dan lihat perubahan.
- Pindahkan konfigurasi ke package.json bagian "prettier", jalankan lagi --check, dan amati bahwa perilaku tetap sama.
- Untuk monorepo, jalankan perintah dengan --config menunjuk ke satu file config bersama, lalu bandingkan hasilnya.

## Tips umum

- Simpan konfigurasi di repo dan hindari konfigurasi global agar seluruh anggota tim mendapat hasil format yang identik.
- Gunakan opsi CLI hanya saat perlu mengesampingkan konfigurasi sementara, karena opsi CLI akan mengalahkan pengaturan di file.
- Tetap dekat dengan default Prettier demi kesederhanaan, dan hanya ubah opsi yang memang dibutuhkan tim.
