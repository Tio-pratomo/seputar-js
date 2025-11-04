---
sidebar_position: 9
---

# Use Case Praktis

Sesi 8 adalah sesi penutup yang menggabungkan use case praktis dari dunia nyata, best practices inti, serta dampak Prettier pada komunitas pengembangan. Setelah 7 sesi sebelumnya, pemula sudah memiliki fondasi solid tentang instalasi, konfigurasi, opsi pemformatan, integrasi editor, linter, Git hooks, dan plugin. Sesi terakhir ini fokus pada penerapan nyata dan filosofi penggunaan Prettier dalam tim.

## Tujuan sesi

- Memahami skenario praktis penggunaan Prettier dalam proyek nyata.
- Menerapkan best practices inti untuk memaksimalkan manfaat Prettier di tim.
- Mengenal dampak positif Prettier pada komunitas dan budaya development.

## Use case 1: Proyek multi-bahasa

Dalam aplikasi web modern, kode sering terdiri dari JavaScript, TypeScript, CSS, HTML, JSON, Markdown, dan YAML dalam satu repository. Prettier dapat memformat semua file ini dengan satu perintah `npx prettier . --write`, memastikan konsistensi gaya di seluruh tumpukan teknologi tanpa perlu mengatur formatter terpisah untuk setiap bahasa. Ini mengurangi beban konfigurasi dan memastikan semua developer mengikuti standar format yang sama.

## Use case 2: Menjaga kerapian dokumentasi

Prettier memiliki dukungan sangat baik untuk Markdown, memastikan README.md, dokumentasi API, dan blog post tetap rapi dan konsisten. Dengan konfigurasi `proseWrap: "always"` di overrides untuk file `.md`, teks panjang akan otomatis dibungkus ke baris baru, membuat dokumentasi mudah dibaca di editor dan Git diffs lebih ringkas.

## Use case 3: Pipeline CI/CD

Menjalankan `npx prettier --check .` sebagai langkah dalam pipeline CI memastikan bahwa setiap pull request yang masuk sudah terformat dengan benar. Jika developer lupa menjalankan format-on-save, pipeline akan menolak PR, mencegah kode tak terformat masuk ke branch utama dan menjaga basis kode tetap konsisten.

## Use case 4: Onboarding developer baru

Tanpa Prettier, tim harus menghabiskan waktu menjelaskan standar gaya kode kepada anggota baru melalui panduan gaya yang panjang dan rumit. Dengan Prettier, cukup minta developer baru menginstal ekstensi editor dan mengaktifkan format-on-save, kode mereka akan otomatis sesuai standar proyek tanpa perlu memorisasi aturan.

## Use case 5: Refactoring kode legacy

Salah satu langkah pertama saat memodernisasi basis kode lama adalah menjalankannya melalui Prettier untuk menciptakan standar format seragam. Ini membuat kode lebih mudah dibaca dan dipahami sebelum memulai refactoring besar, sehingga perubahan logika tidak tercampur dengan perubahan format.

## Best practice 1: Jadikan konfigurasi sebagai sumber kebenaran

Selalu commit file `.prettierrc`, `.prettierignore`, dan konfigurasi Prettier lainnya ke version control Git. Ini memastikan bahwa setiap developer, CI/CD, dan alat lainnya menggunakan aturan format yang persis sama, mencegah perbedaan hasil format antara mesin.

## Best practice 2: Jangan berdebat dengan Prettier

Manfaat terbesar Prettier adalah mengakhiri perdebatan tentang gaya kode yang tidak produktif. Terima saja format yang dihasilkan Prettier, bahkan jika tidak sesuai preferensi pribadi, karena waktu yang dihemat dari tidak berdebat jauh lebih berharga daripada gaya sempurna.

## Best practice 3: Otomatisasi adalah kunci

Jangan mengandalkan developer untuk menjalankan Prettier secara manual setiap saat. Andalkan format-on-save di editor, pre-commit hooks dengan Husky dan lint-staged, serta --check di CI agar pemformatan terjadi secara otomatis dan transparan tanpa intervensi manual.

## Best practice 4: Biarkan Prettier menangani gaya

Jangan mencoba membuat aturan linter seperti ESLint bersaing dengan Prettier tentang gaya kode. Gunakan `eslint-config-prettier` untuk menonaktifkan semua aturan style di ESLint dan biarkan Prettier menjadi satu-satunya yang bertanggung jawab atas pemformatan. Pisahkan concerns: ESLint untuk kualitas kode, Prettier untuk gaya.

## Best practice 5: Gunakan --check di CI sebagai jaring pengaman terakhir

Selalu jalankan `npx prettier --check` pada setiap pull request di CI/CD pipeline. Ini adalah pertahanan terakhir untuk memastikan tidak ada kode yang tidak terformat lolos ke basis kode utama, terutama jika ada developer yang melewati konfigurasi lokal.

## Dampak positif Prettier pada komunitas

Adopsi Prettier yang luas telah membawa dampak signifikan bagi ekosistem development:

**Mengurangi beban kognitif**: Developer tidak perlu lagi membuang energi mental untuk mengingat aturan format saat menulis kode.

**Code review lebih efisien**: Reviewer dapat fokus pada hal penting seperti logika bisnis, arsitektur, dan bug, bukan memberikan komentar sepele tentang spasi atau titik koma.

**Memudahkan kontribusi open source**: Proyek yang menggunakan Prettier menjadi lebih ramah bagi kontributor baru yang tidak perlu membaca panduan gaya panjang.

**Standarisasi ekosistem**: Prettier telah menciptakan standar de-facto untuk pemformatan kode dalam ekosistem JavaScript, membuat perpindahan antar proyek menjadi lebih mulus.

## Kesimpulan

Prettier lebih dari sekadar alat pemformat kode; ia adalah alat untuk meningkatkan kolaborasi dan produktivitas tim. Manfaat utamanya bukan karena gayanya "lebih baik", tetapi karena ia menghentikan semua perdebatan tentang gaya. Dengan mengadopsi Prettier, tim menghemat waktu dan energi mental tak terhitung yang sebelumnya dihabiskan untuk perdebatan nonproduktif, sehingga developer dapat fokus pada hal yang benar-benar penting: membangun perangkat lunak yang luar biasa.

## Latihan penutup

- Terapkan semua 5 best practices dalam proyek yang telah dibangun selama 7 sesi sebelumnya.
- Konfigurasi CI/CD untuk menjalankan `npx prettier --check` pada setiap pull request.
- Dokumentasikan standar Prettier tim di README atau CONTRIBUTING.md untuk referensi developer baru.
- Evaluasi kecepatan dan efisiensi development setelah 2-3 minggu menggunakan Prettier secara konsisten.

Selamat! Anda telah menyelesaikan 8 sesi pembelajaran Prettier yang komprehensif.
