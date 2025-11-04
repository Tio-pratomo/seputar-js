---
sidebar_position: 4
---

# Opsi Dasar Prettier

Sesi 3 membahas opsi pemformatan inti yang paling sering digunakan di Prettier, dengan penjelasan rinci tentang apa yang dilakukan setiap opsi, nilai default, dan kapan sebaiknya mengubah pengaturan tersebut agar sesuai dengan preferensi tim. Setelah sesi ini, pemula akan memahami kapan dan bagaimana menyesuaikan opsi seperti printWidth, semi, singleQuote, trailingComma, tabWidth, bracketSpacing, arrowParens, dan endOfLine untuk memastikan konsistensi format di seluruh proyek.

### Tujuan sesi

- Memahami opsi pemformatan inti yang paling sering disesuaikan dalam konfigurasi Prettier.
- Mengetahui nilai default setiap opsi dan alasan praktis di balik pengaturan tersebut.
- Mampu menyesuaikan opsi sesuai kebutuhan tim tanpa menambah kompleksitas yang tidak perlu.

### printWidth

Opsi ini menentukan panjang baris maksimal sebelum Prettier memotongnya menjadi beberapa baris, dengan nilai default 80 karakter. Perlu diingat bahwa printWidth adalah panduan, bukan batas keras: Prettier akan membuat baris yang lebih pendek atau lebih panjang, tetapi secara umum berusaha memenuhi lebar yang ditentukan. Untuk readability, direkomendasikan tidak menggunakan lebih dari 80 karakter, meskipun banyak tim memilih 100 atau 120 tergantung konvensi proyek.

```json
// .prettierrc
{
  "printWidth": 80
}
```

### tabWidth

Menentukan jumlah spasi per level indentasi, dengan nilai default 2 spasi. Opsi ini hanya berpengaruh jika useTabs disetel ke false, yang merupakan default Prettier. Banyak tim menggunakan 2 atau 4 spasi tergantung gaya proyek, tetapi konsistensi di seluruh kode lebih penting daripada angka spesifik.

```json
// .prettierrc
{
  "tabWidth": 2
}
```

### useTabs

Jika disetel ke true, Prettier akan menggunakan karakter tab untuk indentasi alih-alih spasi, dengan nilai default false. Pilihan ini biasanya bergantung pada preferensi tim atau standar proyek yang sudah ada, dan Prettier akan memastikan konsistensi setelah opsi ini ditetapkan.

```json
// .prettierrc
{
  "useTabs": false
}
```

### semi

Menentukan apakah Prettier akan mencetak titik koma di akhir setiap pernyataan, dengan nilai default true. Jika disetel ke false, Prettier hanya akan menambahkan titik koma di tempat yang benar-benar diperlukan untuk menghindari kesalahan parsing, misalnya di awal baris yang dimulai dengan [ atau (.

```json
// .prettierrc
{
  "semi": true
}
```

### singleQuote

Jika disetel ke true, Prettier akan menggunakan kutip tunggal alih-alih kutip ganda untuk string, dengan nilai default false. Prettier akan otomatis beralih ke jenis kutip lain jika string berisi kutip yang sama untuk menghindari escape, sehingga "You'll" tetap menggunakan kutip ganda meskipun singleQuote: true. Banyak developer lebih suka kutip tunggal karena lebih mudah diketik tanpa tombol Shift.

```json
// .prettierrc
{
  "singleQuote": false
}
```

### trailingComma

Menentukan apakah Prettier akan menambahkan koma di akhir elemen terakhir pada objek atau array multi-baris, dengan nilai default "es5". Opsi yang tersedia: "none" (tanpa trailing comma), "es5" (koma hanya pada konstruksi yang valid di ES5 seperti objek dan array), dan "all" (termasuk parameter fungsi di ES2017+). Trailing comma membantu menghasilkan diff yang lebih bersih saat menambah atau menghapus elemen, karena hanya baris yang relevan yang berubah.

```json
// .prettierrc
{
  "trailingComma": "es5"
}
```

### bracketSpacing

Jika disetel ke true, Prettier akan mencetak spasi di dalam kurung kurawal pada literal objek, dengan nilai default true. Contoh: `{ foo: bar }` dengan bracketSpacing: true, atau `{foo: bar}` dengan bracketSpacing: false.

```json
// .prettierrc
{
  "bracketSpacing": true
}
```

### arrowParens

Menentukan apakah Prettier akan menambahkan tanda kurung di sekitar parameter tunggal pada arrow function, dengan nilai default "always". Opsi yang tersedia: "always" (selalu tambahkan kurung, seperti `(x) => x`) dan "avoid" (hindari kurung jika memungkinkan, seperti `x => x`). Opsi "always" lebih konsisten dan memudahkan penambahan parameter di masa depan tanpa mengubah sintaks.

```json
// .prettierrc
{
  "arrowParens": "always"
}
```

### endOfLine

Menentukan jenis karakter akhir baris yang digunakan, dengan nilai default "lf" (Line Feed, standar Unix/Linux). Opsi yang tersedia: "lf" (Unix/Linux), "crlf" (Windows), "cr" (Mac klasik, jarang digunakan), dan "auto" (menjaga akhir baris yang ada di file). Untuk menghindari masalah lintas platform, kebanyakan tim modern menggunakan "lf" dan mengatur Git untuk menangani konversi otomatis dengan konfigurasi `core.autocrlf`.

```json
// .prettierrc
{
  "endOfLine": "lf"
}
```

### jsxSingleQuote

Mirip dengan singleQuote tetapi khusus untuk JSX, dengan nilai default false. Jika disetel ke true, Prettier akan menggunakan kutip tunggal pada atribut JSX.

```json
// .prettierrc
{
  "jsxSingleQuote": false
}
```

### parser

Menentukan parser mana yang akan digunakan untuk memformat kode, tetapi biasanya Prettier mendeteksinya secara otomatis berdasarkan ekstensi file. Opsi ini berguna untuk file dengan ekstensi non-standar atau ketika ingin memaksa parser tertentu dalam overrides.

### Contoh konfigurasi lengkap

Berikut adalah contoh konfigurasi dengan opsi inti yang disesuaikan sesuai preferensi tim, menggabungkan semua opsi yang telah dijelaskan.

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
  "jsxSingleQuote": false
}
```

### Latihan cepat

- Buat file .prettierrc dengan konfigurasi minimal seperti di atas, lalu jalankan npx prettier . --write untuk melihat efek masing-masing opsi.
- Ubah singleQuote menjadi true dan trailingComma menjadi "all", lalu format ulang dan bandingkan hasilnya.
- Coba setel printWidth ke 120 dan amati bagaimana Prettier memecah baris yang panjang secara berbeda.
- Eksperimen dengan arrowParens: "avoid" pada fungsi arrow yang memiliki satu parameter, dan perhatikan perbedaan sintaks.

### Tips praktis

- Tetap dekat dengan default Prettier untuk meminimalkan perdebatan gaya dan memudahkan kolaborasi dengan proyek lain.
- Gunakan trailing comma "es5" atau "all" untuk menghasilkan diff Git yang lebih bersih saat menambah atau menghapus elemen.
- Untuk proyek multi-platform, setel endOfLine: "lf" dan konfigurasikan Git dengan `core.autocrlf=input` atau `core.autocrlf=true` tergantung OS agar konsisten.
- Jika tim memiliki preferensi kuat tentang kutip atau titik koma, dokumentasikan alasannya di README agar anggota baru memahami konteksnya.
