---
sidebar_position: 3
---

# Kuantitas, Batas, dan Pintasan

Pada sesi kedua ini, kita akan mendalami cara mengontrol **jumlah** karakter yang ingin dicocokkan, menentukan **posisi** kecocokan, dan menggunakan **pintasan** untuk pola yang umum.

---

## Quantifiers (Kuantitas)

Quantifiers memungkinkan kita untuk menentukan berapa kali sebuah karakter atau grup karakter harus muncul agar cocok.

### Quantifiers `+` - Satu atau Lebih

Mencocokkan karakter sebelumnya yang muncul **satu kali atau lebih**.

```javascript
const pola = /\d+/; // Cocokkan satu atau lebih digit

console.log(pola.test("Tahun 2024")); // true, karena ada '2024'
console.log(pola.test("Tahun ini")); // false, karena tidak ada digit sama sekali
console.log("Ada 300 item".match(pola)); // [ '300' ]
```

:::info[**Catatan**]
Kita menggunakan `\d` bukan `\d` dalam string literal JavaScript karena backslash adalah karakter escape. Dalam Regex literal `/.../`, Anda cukup menulis `\d`.
:::

### Quantifiers `*` - Nol atau Lebih

Mencocokkan karakter sebelumnya yang muncul **nol kali atau lebih**.

Ini berguna untuk mencocokkan sesuatu yang mungkin ada atau tidak ada sama sekali.

```javascript
const pola = /go*l/; // Cocok untuk 'gl', 'gol', 'gool', 'gooool', dst.

console.log(pola.test("gl")); // true (o muncul nol kali)
console.log(pola.test("gol")); // true (o muncul satu kali)
console.log(pola.test("gool")); // true (o muncul dua kali)
```

### Quantifiers `?` - Nol atau Satu (Opsional)

Mencocokkan karakter sebelumnya yang muncul **nol atau satu kali** saja. Sangat baik untuk menandai sesuatu sebagai opsional.

```javascript
// Pola untuk mencocokkan 'color' atau 'colour'
const pola = /colou?r/;

console.log(pola.test("color")); // true (u muncul nol kali)
console.log(pola.test("colour")); // true (u muncul satu kali)
console.log(pola.test("colouur")); // false (u muncul lebih dari satu kali)
```

### Quantifiers `{}` - Jumlah Spesifik

Kurung kurawal memberikan kontrol paling presisi terhadap kuantitas.

1.  `{n}`: Tepat **n** kali.

    ```javascript
    const pola = /\d{4}/; // Mencari tepat 4 digit
    console.log("Tahun 2024".match(pola)); // [ '2024' ]
    console.log("ID-123".match(pola)); // null
    ```

2.  `{n,}`: Minimal **n** kali.

    ```javascript
    const pola = /\d{3,}/; // Mencari minimal 3 digit
    console.log("ID-12".match(pola)); // null
    console.log("ID-123".match(pola)); // [ '123' ]
    console.log("ID-12345".match(pola)); // [ '12345' ]
    ```

3.  `{n,m}`: Antara **n** dan **m** kali.
    ```javascript
    const pola = /\d{2,4}/; // Mencari antara 2 hingga 4 digit
    console.log("ID-1".match(pola)); // null
    console.log("ID-12".match(pola)); // [ '12' ]
    console.log("ID-1234".match(pola)); // [ '1234' ]
    console.log("ID-12345".match(pola)); // [ '1234' ] (mengambil 4 digit pertama)
    ```

---

## Anchors (Batas)

Anchors adalah metacharacters yang tidak mencocokkan karakter, melainkan **posisi** dalam teks.

### Anchors `^` - Awal String

Memastikan pola hanya cocok jika berada di **awal** dari teks (atau baris, jika flag `m` aktif).

```javascript
const pola = /^Halo/;

console.log(pola.test("Halo dunia")); // true
console.log(pola.test("Oh, Halo dunia")); // false
```

### Anchors `$` - Akhir String

Memastikan pola hanya cocok jika berada di **akhir** dari teks (atau baris).

```javascript
const pola = /dunia$/;

console.log(pola.test("Halo dunia")); // true
console.log(pola.test("Halo dunia, apa kabar?")); // false
```

### Menggabungkan Anchors `^` dan `$`

Kombinasi `^` dan `$` sangat kuat untuk validasi format yang ketat, memastikan seluruh string cocok dengan pola, tanpa ada karakter tambahan.

```javascript
// Pola untuk validasi username: 4 digit angka saja
const pola = /^\d{4}$/;

console.log(pola.test("1234")); // true
console.log(pola.test("12345")); // false (terlalu panjang)
console.log(pola.test("123")); // false (terlalu pendek)
console.log(pola.test("ab1234")); // false (ada karakter tambahan di awal)
console.log(pola.test("1234ab")); // false (ada karakter tambahan di akhir)
```

---

## Shortcuts (Pintasan Karakter)

Regex menyediakan pintasan untuk kelas karakter yang sering digunakan.

- `\d`: Digit (`[0-9]`)
- `\D`: Non-Digit (`[^0-9]`)

- `\w`: Karakter "Word" (`[A-Za-z0-9_]`)
- `\W`: Karakter Non-"Word" (`[^A-Za-z0-9_]`)

- `\s`: Karakter Spasi (spasi, tab, baris baru)
- `\S`: Karakter Non-Spasi

Contoh penggunaan:

```javascript
// Pola untuk format "KODE-123"
const pola = /\w{4}-\d{3}/;
console.log(pola.test("KODE-123")); // true

// Mencari kata pertama dalam sebuah kalimat
const teks = "Regex itu mudah!";
const polaKata = /\w+/;
console.log(teks.match(polaKata)); // [ 'Regex' ]

// Memisahkan string berdasarkan spasi
const kalimat = "satu dua tiga";
const polaSpasi = /\s/;
console.log(kalimat.split(polaSpasi)); // [ 'satu', 'dua', 'tiga' ]
```

---

Anda kini memiliki kemampuan untuk mengontrol jumlah dan posisi kecocokan dengan lebih baik. Di sesi terakhir, kita akan masuk ke fitur-fitur yang lebih canggih seperti pengelompokan dan lookaheads.
