---
sidebar_position: 8
---

# Prettier Plugin

Sesi 7 membahas plugin Prettier yang memungkinkan memperluas dukungan bahasa dan fungsionalitas pemformatan, termasuk cara menginstal plugin resmi dan pihak ketiga, serta kasus penggunaan umum dan praktik terbaik untuk proyek. Setelah sesi ini, pemula akan memahami bagaimana memperluas kemampuan Prettier ke bahasa non-JavaScript seperti Ruby, PHP, Svelte, dan alat tambahan seperti penyortiran import atau Tailwind CSS.

## Tujuan sesi

- Memahami apa itu plugin Prettier dan bagaimana cara kerjanya dalam memperluas dukungan bahasa.
- Menginstal dan mengkonfigurasi plugin resmi dan pihak ketiga dengan benar.
- Mengetahui plugin populer dan kapan sebaiknya menggunakannya dalam proyek.

## Apa itu plugin Prettier

Plugin adalah modul JavaScript yang memperluas fungsionalitas Prettier dengan menambahkan dukungan bahasa baru atau mengubah cara Prettier memformat bahasa yang sudah ada. Prettier inti hanya mendukung JavaScript, TypeScript, JSX, CSS, HTML, JSON, Markdown, YAML, dan GraphQL, tetapi dengan plugin dapat memformat Ruby, PHP, Svelte, dan banyak bahasa lainnya. Setiap plugin berisi parser, printer, dan definisi bahasa yang memberi tahu Prettier cara memahami dan memformat kode dalam bahasa tersebut.

## Cara kerja plugin

Plugin Prettier adalah modul yang mengekspor lima fungsi utama: languages (array bahasa yang didukung), parsers (konversi kode string ke AST), printers (mengubah AST kembali ke kode terformat), options (opsi konfigurasi), dan defaultOptions (nilai default). Prettier secara otomatis akan mendeteksi plugin dari package.json dan dimuat saat perintah prettier dijalankan.

## Plugin resmi Prettier

Prettier menyediakan beberapa plugin resmi yang dapat diinstal dari npm dengan awalan @prettier:

- `@prettier/plugin-php`: Untuk memformat file PHP.
- `@prettier/plugin-ruby`: Untuk memformat file Ruby (memerlukan instalasi Ruby di mesin).
- `@prettier/plugin-pug`: Untuk memformat template Pug.
- `@prettier/plugin-xml`: Untuk memformat file XML.
- `@prettier/plugin-oxc` dan `@prettier/plugin-hermes`: Parser eksperimental untuk performa lebih cepat.

## Plugin pihak ketiga populer

Selain plugin resmi, komunitas telah membuat banyak plugin berguna:

- `prettier-plugin-svelte`: Memformat komponen Svelte dengan dukungan HTML, CSS, dan JavaScript tertanam.
- `prettier-plugin-tailwindcss`: Secara otomatis mengurutkan kelas Tailwind CSS berdasarkan urutan yang disarankan.
- `prettier-plugin-organize-imports`: Menyortir dan mengorganisir import secara otomatis.
- `prettier-plugin-astro`: Memformat file Astro.
- `prettier-plugin-jsdoc`: Memformat komentar JSDoc.

## Instalasi plugin

Langkah pertama adalah menginstal plugin dari npm bersama dengan Prettier:

```bash
# Instal plugin resmi
npm install --save-dev prettier @prettier/plugin-ruby

# Instal plugin pihak ketiga
npm install --save-dev prettier prettier-plugin-tailwindcss
npm install --save-dev prettier prettier-plugin-organize-imports
```

## Mengkonfigurasi plugin di .prettierrc

Setelah instalasi, tambahkan plugin ke array "plugins" dalam file konfigurasi:

```json
// .prettierrc
{
  "plugins": ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"]
}
```

**Catatan penting:** Urutan plugin dalam array sangat penting karena beberapa plugin memiliki ketergantungan. Misalnya, prettier-plugin-tailwindcss **harus** ditempatkan di posisi terakhir agar bekerja dengan benar bersama plugin lain.

## Menggunakan plugin dari CLI

Plugin dapat dimuat langsung dari command line dengan opsi --plugin:

```bash
# Menjalankan prettier dengan plugin tertentu
npx prettier --write main.rb --plugin=@prettier/plugin-ruby

# Lebih dari satu plugin
npx prettier --write . --plugin=prettier-plugin-svelte --plugin=prettier-plugin-tailwindcss
```

## Contoh konfigurasi lengkap dengan multiple plugins

Berikut adalah contoh .prettierrc yang mengintegrasikan beberapa plugin populer:

```json
// .prettierrc
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": [
    "prettier-plugin-svelte",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss"
  ],
  "overrides": [
    {
      "files": "*.svelte",
      "options": {
        "parser": "svelte"
      }
    },
    {
      "files": "*.rb",
      "options": {
        "parser": "ruby"
      }
    }
  ]
}
```

## Use case 1: Proyek multi-bahasa

Dalam proyek modern yang kompleks, mungkin memiliki JavaScript, TypeScript, CSS, Markdown, dan Ruby dalam satu repo. Dengan menggunakan plugin yang sesuai, Prettier dapat memformat semua file ini dengan satu perintah npx prettier . --write, menjaga gaya konsisten di seluruh tumpukan teknologi.

## Use case 2: Proyek Svelte atau Tailwind

Jika tim menggunakan framework Svelte dan utility-first CSS dengan Tailwind, instal prettier-plugin-svelte dan prettier-plugin-tailwindcss agar komponen dan styling tetap terformat rapi. Plugin Tailwind secara otomatis akan mengurutkan kelas CSS sesuai urutan yang optimal, mencegah perubahan yang tidak terduga saat format manual.

## Use case 3: Organisasi import otomatis

Dalam proyek yang sudah ada, import sering tersebar secara acak. Dengan prettier-plugin-organize-imports, setiap format otomatis akan menyortir import berdasarkan konteks (eksternal, internal, relative), sehingga kode lebih rapi dan mudah diikuti.

## Use case 4: Dokumentasi JSDoc

Jika proyek mengharuskan dokumentasi JSDoc yang rapi, gunakan prettier-plugin-jsdoc untuk memastikan semua komentar dokumentasi terformat dengan benar tanpa intervensi manual.

## Latihan cepat

- Instal prettier-plugin-tailwindcss dan konfigurasi di .prettierrc, lalu jalankan prettier pada file HTML dengan kelas Tailwind untuk melihat kelas diurutkan otomatis.
- Instal prettier-plugin-organize-imports, buat file JavaScript dengan import acak, lalu jalankan npx prettier --write untuk melihat import disortir otomatis.
- Buat proyek sederhana dengan file Svelte, instal prettier-plugin-svelte, dan format untuk melihat template Svelte, JavaScript, dan CSS terformat bersama.
- Coba urutan plugin berbeda dan amati hasilnya; luangkan waktu untuk memahami mengapa urutan penting, terutama untuk plugin yang mutually exclusive.

## Tips umum

- Mulai dengan plugin resmi Prettier dan hanya tambahkan plugin pihak ketiga saat benar-benar diperlukan untuk menghindari kompleksitas yang tidak perlu.
- Selalu perhatikan urutan plugin dalam konfigurasi, terutama jika menggunakan beberapa plugin; dokumentasi plugin biasanya mencantumkan urutan yang disarankan.
- Commit file konfigurasi .prettierrc yang berisi daftar plugin ke repo agar semua developer menggunakan set plugin yang sama, mencegah inkonsistensi.
- Jika plugin memperlambat pemformatan secara signifikan, pertimbangkan menjalankan formatting hanya pada file yang perlu dari plugin tersebut menggunakan overrides.
- Untuk proyek yang baru dimulai, pertimbangkan menggunakan plugin resmi saja sampai benar-benar ada kebutuhan spesifik untuk plugin tambahan.
