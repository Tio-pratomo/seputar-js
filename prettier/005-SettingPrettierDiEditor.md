---
sidebar_position: 6
---

# Integrasi ke Code Editor

Sesi 5 membahas integrasi Prettier ke dalam editor kode, khususnya VS Code, agar kode dapat diformat secara otomatis saat disimpan tanpa perlu menjalankan perintah CLI secara manual setiap saat. Setelah sesi ini, pemula akan mampu mengaktifkan format-on-save, menetapkan Prettier sebagai formatter default, dan mengalami pengalaman pengembangan yang jauh lebih mulus dengan pemformatan otomatis.

## Tujuan sesi

- Memahami cara memasang ekstensi Prettier di VS Code dan editor lainnya.
- Mengaktifkan format-on-save agar kode diformat secara otomatis setiap kali menyimpan file.
- Menetapkan Prettier sebagai formatter default di editor untuk memastikan konsistensi.

## Instalasi ekstensi Prettier di VS Code

Langkah pertama adalah memasang ekstensi Prettier dari marketplace VS Code agar editor mengenali dan menjalankan Prettier secara terintegrasi.

1. Buka VS Code dan klik tab **Extensions** (atau tekan Ctrl+Shift+X).
2. Cari "Prettier - Code formatter" di kotak pencarian.
3. Klik **Install** pada ekstensi resmi yang dibuat oleh Prettier.
4. Setelah instalasi selesai, ekstensi akan aktif secara global di VS Code.

## Menetapkan Prettier sebagai formatter default

Agar VS Code selalu menggunakan Prettier untuk semua operasi pemformatan, perlu menetapkan Prettier sebagai formatter default.

1. Buka **Settings** dengan menekan Ctrl+, (Windows/Linux) atau Command+, (macOS).
2. Cari "Editor: Default Formatter" di kotak pencarian.
3. Pilih "Prettier - Code formatter" dari dropdown yang muncul.
4. Pengaturan ini dapat diterapkan secara global atau per workspace dengan menyimpan di `.vscode/settings.json`.

## Mengaktifkan format-on-save

Fitur format-on-save memungkinkan kode diformat secara otomatis setiap kali file disimpan, sehingga tidak perlu menjalankan perintah manual.

1. Buka **Settings** dengan Ctrl+, (Windows/Linux) atau Command+, (macOS).
2. Cari "Editor: Format On Save" di kotak pencarian.
3. Centang checkbox untuk mengaktifkan format-on-save.

Alternatif, dapat langsung mengedit file `settings.json` dengan menambahkan baris berikut:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Format per-bahasa tertentu

Jika ingin menggunakan Prettier hanya untuk bahasa tertentu atau menonaktifkannya untuk bahasa lain, dapat menggunakan pengaturan per-bahasa.

```json
{
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Menjalankan pemformatan manual di VS Code

Meskipun format-on-save aktif, masih dapat memformat file secara manual kapan saja.

1. Buka **Command Palette** dengan Ctrl+Shift+P (Windows/Linux) atau Cmd+Shift+P (macOS).
2. Ketik "Format Document" dan tekan Enter.
3. File akan diformat sesuai konfigurasi Prettier yang ada di proyek.

## Menggunakan Prettier dari proyek lokal

Penting untuk memastikan VS Code menggunakan versi Prettier yang terinstal secara lokal di proyek, bukan versi global, agar tetap konsisten dengan tim. Ekstensi Prettier akan secara otomatis mencari instalasi lokal Prettier di direktori proyek dan menggunakannya.

Jika ingin memverifikasi, buka **Settings** dan cari "Prettier: Prettier Path" untuk melihat path yang digunakan.

## Integrasi editor lainnya

Prettier mendukung berbagai editor selain VS Code, masing-masing dengan caranya sendiri untuk diintegrasikan.

- **Vim/Neovim**: Gunakan plugin seperti `vim-prettier`.
- **Sublime Text**: Gunakan `JsPrettier` package.
- **Atom**: Gunakan `atom-prettier` package.
- **Emacs**: Gunakan `prettier.el` package.
- **WebStorm/IntelliJ IDEA**: Konfigurasi di File → Settings → Languages & Frameworks → JavaScript → Prettier.

## Latihan cepat

- Instal ekstensi Prettier dari marketplace VS Code dan restart editor.
- Buka file JavaScript, ubah kode menjadi format yang berantakan (spasi tidak teratur, tanpa semicolon), lalu simpan dan amati perubahan otomatis.
- Atur format-on-save di settings.json dan verifikasi dengan mengubah file lagi lalu simpan.
- Coba menjalankan "Format Document" dari Command Palette pada file yang belum diformat, lalu bandingkan dengan hasil format-on-save.
- Ubah pengaturan Prettier di proyek (misalnya singleQuote: true), simpan file, dan lihat perubahan efek pada editor.

## Tips umum

- Selalu arahkan ke Prettier versi lokal proyek, bukan global, untuk konsistensi di seluruh tim dan CI/CD.
- Jika format-on-save tidak bekerja, periksa apakah Prettier sudah diinstal lokal di proyek dan apakah ekstensi VS Code sudah aktif.
- Gunakan pengaturan per-workspace (.vscode/settings.json) agar konfigurasi Prettier tetap konsisten untuk semua anggota tim yang membuka proyek.
- Disable extension lain yang juga berfungsi sebagai formatter jika ada konflik dengan Prettier, karena multiple formatters dapat menyebabkan masalah.
