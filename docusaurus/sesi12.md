---
sidebar_position: 12
---

# Deployment + CI/CD modern

Sesi ini akan menutup seri untuk Docusaurus (GitHub Pages + opsi Vercel).

---

## Strategi Deployment yang Dipakai

Untuk stack yang sudah kita bangun (ESM config, Faster/Rspack, search, versioning, i18n), opsi yang paling realistis:

- **GitHub Pages + GitHub Actions** untuk repo open source / dokumentasi publik. Docusaurus punya panduan resmi dengan workflow Pages generasi terbaru (`configure-pages`, `upload-pages-artifact`, `deploy-pages@v4`).
- **Vercel** sebagai alternatif ketika butuh preview per-branch otomatis dan edge CDN global tanpa banyak konfigurasi. Vercel mengenali Docusaurus dan akan mengisi setting build/output secara otomatis saat import repo.

Di sini fokus utama ke GitHub Pages + Actions, Vercel hanya jadi “plan B” yang bisa dipakai kapan saja.

---

## Konfigurasi `docusaurus.config.js` untuk Production

Pastikan bagian berikut sudah benar sebelum deploy (ini sering jadi sumber error URL/asset):

```javascript
// docusaurus.config.js
const config = {
  title: "My Modern Docs",
  tagline: "Dokumentasi developer modern dengan Docusaurus",
  url: "https://USERNAME.github.io", // Ganti USERNAME [web:132][web:130]
  baseUrl: "/NAMA_REPO/", // Ganti dengan nama repo GitHub Anda [web:132]
  organizationName: "USERNAME", // GitHub user / org [web:132]
  projectName: "NAMA_REPO", // Nama repo [web:132]
  deploymentBranch: "gh-pages", // Branch output GitHub Pages [web:139]

  // ... future, presets, themes, dll ...
};

export default config;
```

Jika memakai **custom domain** (mis. `docs.mycompany.com`), `url` diisi `https://docs.mycompany.com` dan `baseUrl: '/'`, lalu atur domain di pengaturan Pages GitHub atau di Vercel.

Setelah mengubah ini, selalu jalankan `npm run build` dan `npm run serve` lokal untuk memastikan path asset tidak rusak sebelum commit.

---

## Workflow GitHub Actions (Deploy ke GitHub Pages)

GitHub Pages sekarang punya **mode baru berbasis Actions**; Docusaurus docs menyarankan dua job (build + deploy) dengan action resmi Pages (`configure-pages`, `upload-pages-artifact`, `deploy-pages@v4`).

1. Buat folder & file workflow: `.github/workflows/deploy.yml`.
2. Isi dengan YAML berikut (sesuaikan `node-version` & manager paket):

```yaml
name: Deploy Docusaurus site to GitHub Pages

on:
  push:
    branches: [main] # Jalankan setiap push ke main

permissions:
  contents: read
  pages: write # Wajib untuk GitHub Pages
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build Docusaurus
        run: npm run build

      - name: Upload build artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build # Folder output Docusaurus

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Setup GitHub Pages
        uses: actions/configure-pages@v5

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Setelah file ini dikomit dan di-push, buka tab **Settings → Pages** dan pilih **Source: GitHub Actions** (bukan branch).

Workflow akan otomatis build setiap push ke `main`, lalu deploy hasil `build/` ke branch `gh-pages` internal Pages.

---

## Catatan CI/CD Lanjutan & Vercel

Beberapa poin penting untuk pipeline yang sudah pakai **Docusaurus Faster**:

- Faster/Rspack menggunakan **cache di `node_modules/.cache`** untuk mempercepat rebuild; di GitHub Actions default cache ini tidak dipertahankan antar run, jadi manfaat utamanya terasa di lokal dan di platform seperti Vercel/Netlify yang otomatis menyimpan cache antar build.
- Untuk **preview per-PR**, Anda bisa menambahkan workflow kedua (trigger `on: pull_request`) yang menjalankan `npm run build` dan `npm run serve` via alat preview, atau cukup gunakan Vercel:
  - Push repo ke GitHub.
  - Import repo di Vercel → Vercel otomatis mendeteksi Docusaurus dan mengisi `build` command (`npm run build`) dan output dir (`build`).
  - Setiap PR akan punya preview URL unik.

Dengan ini, pipeline Anda menjadi: **dev lokal cepat (Rspack + hot reload) → lint/test (opsional) → build otomatis via GitHub Actions → deploy ke GitHub Pages / Vercel** dengan URL dan SEO yang sudah rapi dari sesi sebelumnya.
