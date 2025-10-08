---
sidebar_position: 2
---

# Konsep Inti & Sintaks Dasar

Selamat datang di sesi pertama pembelajaran Regular Expression (Regex)! Di sini, kita akan memulai perjalanan dari konsep paling dasar yang menjadi fondasi utama dalam menggunakan Regex.

Mari kita mulai!

---

## Apa itu Regex?

Bayangkan Anda memiliki sebuah teks yang sangat panjang dan ingin menemukan semua nomor telepon di dalamnya. Mencari satu per satu tentu melelahkan, bukan?

**Regular Expression (Regex)** adalah solusinya. Regex adalah **pola pencarian** yang kuat untuk menemukan, mencocokkan, dan bahkan memanipulasi teks.

Fungsi utamanya ada dua:

1.  **Validasi**: Memeriksa apakah sebuah teks (seperti email, password, atau nomor telepon) sudah sesuai format yang benar.
2.  **Pencarian & Ekstraksi**: Menemukan dan mengambil (mengekstrak) data spesifik dari dalam teks.

Di JavaScript, pola Regex ditulis di antara dua garis miring (`/`):

```javascript
const polaRegex = /pola/;
```

---

## Metode Pengujian

Setelah membuat pola, bagaimana cara menggunakannya? Ada dua metode utama di JavaScript.

### `test()` - Mengembalikan `true` atau `false`

Metode `test()` digunakan untuk validasi. Ia akan mengembalikan `true` jika pola ditemukan dalam teks, dan `false` jika tidak.

```javascript
const teks = "Halo, nama saya Budi.";
const pola = /Budi/;

console.log(pola.test(teks));
// Output: true

const polaLain = /Ani/;
console.log(polaLain.test(teks));
// Output: false
```

### `match()` - Mengekstrak Hasil

Metode `match()` lebih kuat. Ia digunakan pada sebuah _string_ untuk mengekstrak bagian teks yang cocok dengan pola Regex.

- Jika tidak ada yang cocok, ia mengembalikan `null`.
- Jika ada yang cocok, ia mengembalikan sebuah array berisi hasil yang ditemukan.

```javascript
const teks = "Tahun 2024 adalah tahun yang hebat.";
const pola = /2024/;

const hasil = teks.match(pola);
console.log(hasil);
// Output: [ '2024', index: 6, input: 'Tahun 2024 adalah tahun yang hebat.', groups: undefined ]
```

> **Catatan:** `test()` dijalankan pada **pola Regex**, sedangkan `match()` dijalankan pada **string**.

---

## Flags (Pengubah)

Flags adalah pengubah yang diletakkan setelah garis miring penutup (`/`) untuk mengubah cara kerja pencarian Regex.

```javascript
const polaDenganFlags = /pola/flags;
```

Dua flags yang paling umum adalah:

### `/i` - Ignore Case

Membuat pencarian tidak membedakan antara huruf besar dan kecil.

```javascript
const teks = "Email saya adalah CONTOH@gmail.com";
const pola = /contoh/i; // Menggunakan flag 'i'

console.log(pola.test(teks));
// Output: true (tanpa /i, hasilnya akan false)
```

### `/g` - Global Search

Mencari semua kecocokan dalam teks, tidak hanya berhenti pada yang pertama. Ini sangat berguna saat digunakan dengan `match()`.

```javascript
const teks = "apel, jeruk, apel, mangga";
const pola = /apel/g; // Menggunakan flag 'g'

const hasil = teks.match(pola);
console.log(hasil);
// Output: [ 'apel', 'apel' ]
```

Anda juga bisa menggabungkan beberapa flags:

```javascript
const polaGabungan = /pola/gi; // Global dan Ignore Case
```

---

## Sintaks Karakter Khusus

Regex menjadi sangat kuat karena adanya karakter khusus (metacharacters).

### `|` - Operator ATAU (OR)

Mencocokkan salah satu di antara beberapa pilihan.

```javascript
const teks = "Saya suka kopi.";
const pola = /kopi|teh/; // Cocokkan "kopi" ATAU "teh"

console.log(pola.test(teks));
// Output: true
```

### `.` - Karakter Apa Pun (Wildcard)

Mewakili satu karakter apa pun (huruf, angka, simbol, atau spasi), kecuali baris baru.

```javascript
const pola = /h.t/;
// Cocok untuk "hat", "hot", "h.t", "h@t", dll.

console.log(pola.test("hot")); // true
console.log(pola.test("hat")); // true
console.log(pola.test("hit")); // true
```

### `[]` - Kelas Karakter (Character Class)

Mencocokkan salah satu karakter yang ada di dalam kurung siku.

```javascript
const pola = /h[aiu]t/; // Cocok untuk "hat", "hit", atau "hut"

console.log(pola.test("hat")); // true
console.log(pola.test("hot")); // false
```

### `[-]` - Rentang Karakter (Character Range)

Cara singkat untuk mendefinisikan kelas karakter yang berurutan.

- `[a-z]` : Semua huruf kecil.
- `[A-Z]` : Semua huruf besar.
- `[0-9]` : Semua angka.

```javascript
const teks = "Sekarang tahun 2024.";
const polaAngka = /[0-9]/;

console.log(polaAngka.test(teks)); // true
```

### `[^]` - Negasi dalam Kelas Karakter

Jika `^` digunakan sebagai karakter pertama di dalam kelas karakter `[]`, ia berarti **KECUALI**.

```javascript
const pola = /[^aiueo]/; // Cocokkan karakter apa pun KECUALI a, i, u, e, o

console.log(pola.test("b")); // true
console.log(pola.test("a")); // false
```
