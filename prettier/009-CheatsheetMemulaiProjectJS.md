---
sidebar_position: 10
---

# Cheatsheet Lengkap: Setup .editorconfig dan Prettier untuk Project JavaScript

Berikut adalah panduan lengkap siap pakai untuk mengatur format kode JavaScript menggunakan .editorconfig dan Prettier, yang akan membantu menjaga konsistensi kode di seluruh project.

## Mengapa Perlu Setup Ini?

Sebelum masuk ke konfigurasi, penting untuk memahami fungsi masing-masing tool:

- **.editorconfig**: Mengatur setting dasar editor seperti indentasi, charset, dan end-of-line agar konsisten di semua IDE/editor
- **Prettier**: Otomatis memformat kode JavaScript, CSS, dan file lainnya sesuai standar yang ditentukan

Keduanya bekerja bersama - EditorConfig mengatur setting editor level dasar, sementara Prettier menangani format kode yang lebih kompleks.

---

## 1. Setup .editorconfig

### File: `.editorconfig` (letakkan di root project)

```ini
# Mencegah editor mencari file .editorconfig di direktori parent
root = true

# Setting default untuk semua file
[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

# Setting khusus untuk file JavaScript, TypeScript, JSX, TSX
[*.{js,ts,jsx,tsx}]
indent_size = 2
max_line_length = 100

# Setting khusus untuk file JSON
[*.{json,jsonc}]
indent_size = 2

# Setting khusus untuk file Markdown
[*.md]
trim_trailing_whitespace = false

# Setting khusus untuk file YAML
[*.{yml,yaml}]
indent_size = 2
```

### Penjelasan Konfigurasi

| Opsi                       | Nilai     | Fungsi                                                                |
| -------------------------- | --------- | --------------------------------------------------------------------- |
| `root = true`              | Boolean   | Memberitahu editor berhenti mencari .editorconfig di parent directory |
| `charset`                  | utf-8     | Mengatur encoding karakter universal                                  |
| `end_of_line`              | lf        | Mengatur line ending (lf untuk Unix/Linux, crlf untuk Windows)        |
| `insert_final_newline`     | true      | Selalu tambahkan baris kosong di akhir file                           |
| `trim_trailing_whitespace` | true      | Hapus spasi di akhir baris otomatis                                   |
| `indent_style`             | space/tab | Pilih indentasi menggunakan spasi atau tab                            |
| `indent_size`              | 2         | Jumlah spasi per indentasi level (2 untuk JavaScript modern)          |
| `max_line_length`          | 100       | Batas maksimal karakter per baris                                     |

---

## 2. Setup Prettier

### File: `.prettierrc.json` (letakkan di root project)

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "bracketSameLine": false
}
```

### Penjelasan Konfigurasi Prettier

| Opsi              | Nilai       | Fungsi                                                          |
| ----------------- | ----------- | --------------------------------------------------------------- |
| `semi`            | true        | Tambahkan semicolon di akhir statement                          |
| `singleQuote`     | true        | Gunakan single quote (') untuk string                           |
| `tabWidth`        | 2           | Lebar tab sama dengan 2 spasi                                   |
| `useTabs`         | false       | Jangan gunakan tab, gunakan spasi                               |
| `printWidth`      | 100         | Batas maksimal karakter per baris (sama dengan EditorConfig)    |
| `trailingComma`   | "es5"       | Tambahkan trailing comma untuk ES5-compatible syntax            |
| `bracketSpacing`  | true        | Tambahkan spasi di dalam kurung kurawal `{ foo: bar }`          |
| `arrowParens`     | "always"    | Selalu gunakan kurung untuk arrow function parameter `(x) => x` |
| `endOfLine`       | "lf"        | Mengatur line ending (sama dengan EditorConfig)                 |
| `quoteProps`      | "as-needed" | Hanya tambahkan quote untuk properti objek jika diperlukan      |
| `bracketSameLine` | false       | Letakkan `>` di baris baru untuk multi-line JSX                 |

---

## 3. File .prettierignore

Buat file `.prettierignore` di root project untuk menentukan file yang tidak perlu diformat:

```
# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Build outputs
dist/
build/
coverage/

# Environment files
.env
.env.local
.env.*.local

# Log files
*.log

# Cache directories
.cache/
.parcel-cache/
.next/

# Config files yang tidak perlu diformat
*.min.js
*.min.css
```

---

## 4. Cara Instalasi dan Setup

### Langkah 1: Install Prettier

```bash
# Install Prettier sebagai dev dependency (versi tetap)
npm install --save-dev --save-exact prettier
```

### Langkah 2: Tambahkan Script di package.json

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint:format": "prettier --write . && eslint . --fix"
  }
}
```

### Langkah 3: VS Code Extension (Opsional tapi Direkomendasikan)

Install ekstensi **"Prettier - Code formatter"** di VS Code, lalu tambahkan setting ini di `settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "prettier.requireConfig": true
}
```

---

## 5. Integrasi dengan EditorConfig

Prettier secara otomatis akan membaca konfigurasi dari `.editorconfig` jika file `.prettierrc` tidak ada. Namun, dengan adanya `.prettierrc`, Prettier akan mengabaikan `.editorconfig` kecuali untuk beberapa property tertentu.

**Best practice**: Selalu buat kedua file agar:

- Editor lain (yang tidak support Prettier) tetap mengikuti standar dasar dari `.editorconfig`
- Prettier mengatur format kode dengan lebih detail
- Konsistensi terjaga di semua environment

---

## 6. Tips Tambahan untuk Pemula

### 6.1 Format Semua File Sekaligus

Setelah setup selesai, jalankan command ini untuk format seluruh project:

```bash
npm run format
```

### 6.2 Cek Format Tanpa Mengubah File

```bash
npm run format:check
```

Command ini berguna untuk CI/CD pipeline untuk memastikan semua kode sudah diformat sebelum merge.

### 6.3 Integrasi dengan Git Hooks

Install `husky` dan `lint-staged` untuk auto-format sebelum commit:

```bash
npm install --save-dev husky lint-staged
```

Tambahkan di `package.json`:

```json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx,json,css,md}": "prettier --write"
  }
}
```

---

## 7. Ringkasan Command Penting

| Command                                        | Fungsi                              |
| ---------------------------------------------- | ----------------------------------- |
| `npm install --save-dev --save-exact prettier` | Install Prettier dengan versi tetap |
| `npx prettier --write .`                       | Format semua file di project        |
| `npx prettier --check .`                       | Cek format tanpa mengubah file      |
| `npx prettier --write src/`                    | Format hanya folder src/            |
| `npx prettier --write "**/*.{js,ts}"`          | Format hanya file JS dan TS         |

---

## 8. Workflow yang Disarankan

1. **Awal Project**: Buat file `.editorconfig` dan `.prettierrc.json` terlebih dahulu
2. **Install**: `npm install --save-dev --save-exact prettier`
3. **Format Awal**: Jalankan `npm run format` untuk format seluruh codebase
4. **VS Code**: Aktifkan "Format On Save" di setting
5. **Git**: Setup hooks dengan husky + lint-staged
6. **CI/CD**: Tambahkan `npm run format:check` di pipeline

---

## Catatan Penting

- **Jangan ubah setting terlalu banyak** - Prettier dirancang untuk minimal configuration
- **Gunakan `.prettierrc.json`** untuk konfigurasi standar, bukan `.prettierrc.js` kecuali butuh logic khusus
- **Pastikan tim menggunakan extension Prettier** di VS Code untuk hasil terbaik
- **Selalu commit file konfigurasi** ke repository agar semua developer di tim menggunakan setting yang sama

Dengan cheatsheet ini, project JavaScript Anda akan memiliki format kode yang konsisten dan profesional, siap untuk dikembangkan oleh tim dengan berbagai background.
