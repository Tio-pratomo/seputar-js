---
sidebar_position: 4
---

# Fitur Lanjutan

Di sini kita akan membuka kekuatan penuh dari Regex dengan mempelajari fitur-fitur canggih seperti pengelompokan, referensi kembali, dan *lookaheads*. Konsep-konsep ini akan membawa kemampuan Anda ke level berikutnya.

---

## Pengelompokan `()`

Kurung `()` memiliki dua fungsi utama: **mengelompokkan** pola dan **menangkap** (capture) hasilnya.

### Mengelompokkan Pola

Anda bisa mengelompokkan beberapa karakter untuk menerapkan *quantifiers* pada seluruh grup tersebut.

```javascript
// Pola untuk mencocokkan 'ha' yang berulang
const pola = /(ha)+/;

console.log(pola.test('hahaha')); // true
console.log(pola.test('haha'));   // true
console.log(pola.test('ha'));     // true
console.log(pola.test('h'));      // false
```

### Menangkap Grup (Capturing Groups)

Setiap kali Anda menggunakan `()`, bagian dari string yang cocok dengan pola di dalamnya akan "ditangkap" dan disimpan. Ini memungkinkan Anda untuk mengekstrak data yang sangat spesifik.

Hasil tangkapan ini akan muncul dalam array yang dikembalikan oleh `match()`.

```javascript
const teks = 'Nama file: gambar.jpg';
// Pola untuk menangkap nama file dan ekstensinya
const pola = /(\w+)\.(\w+)/;

const hasil = teks.match(pola);

console.log(hasil);
/*
Output:
[
  'gambar.jpg', // [0] - Kecocokan penuh
  'gambar',     // [1] - Tangkapan grup pertama (\w+)
  'jpg'         // [2] - Tangkapan grup kedua (\w+)
]
*/
```

---

## Referensi Kembali (Backreferences)

Backreferences memungkinkan Anda untuk merujuk kembali ke grup yang sudah ditangkap sebelumnya dalam pola yang sama. Ini berguna untuk menemukan kata atau pola yang berulang.

Anda menggunakan `\1` untuk merujuk ke grup pertama, `\2` untuk grup kedua, dan seterusnya.

```javascript
// Pola untuk menemukan kata yang diulang (misal: 'the the')
const pola = /(\w+)\s+\1/;

console.log(pola.test('Halo halo dunia')); // true, karena 'halo' berulang
console.log(pola.test('Satu dua tiga')); // false

const teks = 'Ini ini adalah contoh.';
console.log(teks.match(pola));
/*
Output:
[
  'Ini ini', // Kecocokan penuh
  'Ini'      // Grup pertama yang ditangkap
]
*/
```

---

## Lookaheads

Lookaheads adalah "zero-width assertions". Artinya, mereka **memeriksa** apakah suatu pola ada (atau tidak ada) **setelah** posisi saat ini, tetapi mereka **tidak memasukkan** pola tersebut ke dalam hasil kecocokan akhir. Mereka hanya menegaskan sebuah kondisi.

### Positive Lookahead `(?=...)`

"Pastikan pola ini ada di depan, tapi jangan ikut dicocokkan."

Ini sangat berguna untuk validasi password yang kompleks.

```javascript
// Pola: password harus minimal 6 karakter DAN harus mengandung setidaknya satu angka.
const pola = /^(?=.*\d).{6,}$/;

/*
Penjelasan pola:
^         - Mulai dari awal string
(?=.*\d) - Positive Lookahead: pastikan di suatu tempat setelah ini ada angka (\d)
.{6,}     - Cocokkan karakter apa pun sebanyak 6 kali atau lebih
$         - Sampai akhir string
*/

console.log(pola.test('password123')); // true
console.log(pola.test('123456'));      // true
console.log(pola.test('password'));    // false (tidak ada angka)
console.log(pola.test('12345'));       // false (kurang dari 6 karakter)
```

### Negative Lookahead `(?!...)`

"Pastikan pola ini **TIDAK** ada di depan."

```javascript
// Pola untuk mencocokkan kata 'q' yang TIDAK diikuti oleh 'u'
const pola = /q(?!u)/;

console.log(pola.test('Iraqi')); // true, karena setelah q bukan u
console.log(pola.test('queen')); // false, karena setelah q adalah u
```

---

## Greedy vs. Lazy Matching

Secara default, *quantifiers* seperti `+` dan `*` bersifat **Greedy (rakus)**. Artinya, mereka akan mencoba mencocokkan teks sebanyak mungkin.

### Contoh Greedy Matching

```javascript
const teks = '<div>Halo</div><div>Dunia</div>';
const polaGreedy = /<div>.*<\/div>/; // Greedy

console.log(teks.match(polaGreedy));
// Output: [ '<div>Halo</div><div>Dunia</div>' ]
// `.*` mencocokkan semuanya dari `<div>` pertama hingga `</div>` terakhir.
```

### Lazy Matching `?`

Untuk membuat *quantifier* menjadi **Lazy (malas)**, tambahkan `?` setelahnya (`*?`, `+?`). Mode lazy akan mencoba mencocokkan sesedikit mungkin teks.

```javascript
const teks = '<div>Halo</div><div>Dunia</div>';
const polaLazy = /<div>.*?<\/div>/; // Lazy

console.log(teks.match(polaLazy));
// Output: [ '<div>Halo</div>' ]
// `.*?` berhenti pada `</div>` pertama yang ditemuinya.
```

---

## Penutup

Selamat! Anda telah menyelesaikan semua materi dasar hingga lanjutan dari Regular Expression. Anda sekarang memiliki perangkat yang sangat kuat untuk memanipulasi dan memvalidasi teks.

Kunci untuk menguasai Regex adalah **latihan**. Cobalah untuk menerapkan apa yang telah Anda pelajari pada studi kasus nyata. Gunakan situs seperti [Regex101](https://regex101.com/) untuk bereksperimen dan memvisualisasikan pola Anda.

Teruslah berlatih!
