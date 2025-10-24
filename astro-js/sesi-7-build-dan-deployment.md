import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Build dan Deployment

Setelah membangun website kita, langkah selanjutnya adalah mempublikasikannya agar bisa diakses oleh semua orang. Sesi ini membahas proses build untuk produksi dan cara men-deploy-nya ke berbagai platform hosting.

## 1. Membuat Production Build

Selama pengembangan, kita menggunakan `npm run dev`. Untuk production, kita perlu membuat versi yang dioptimalkan dari situs kita.

Jalankan perintah berikut:

<Tabs groupId="package-manager">
  <TabItem value="npm" label="npm" default>
    ```bash
    npm run build
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```bash
    pnpm run build
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    yarn build
    ```
  </TabItem>
</Tabs>

Perintah ini akan melakukan beberapa hal penting:

- **Optimasi Aset**: Mengecilkan (minify) file CSS dan JavaScript.
- **Optimasi Gambar**: Mengoptimalkan gambar untuk ukuran yang lebih kecil.
- **Bundling**: Menggabungkan file-file yang diperlukan.
- **Output**: Menghasilkan semua file statis ke dalam folder `dist/`.

Folder `dist/` inilah yang akan kita deploy ke server hosting.

## 2. Static Generation vs. Server-Side Rendering (SSR)

Astro mendukung dua mode rendering utama:

### A. Static Site Generation (SSG) - Default

- **Cara Kerja**: Seluruh website di-generate menjadi file HTML, CSS, dan JS statis pada saat `build`.
- **Kelebihan**: Sangat cepat, aman, dan murah untuk di-host. Sempurna untuk blog, portofolio, dan situs dokumentasi.
- **Kekurangan**: Konten tidak bisa dinamis per-request. Untuk memperbarui konten, Anda harus me-rebuild seluruh situs.

### B. Server-Side Rendering (SSR)

- **Cara Kerja**: Halaman HTML di-generate di server untuk setiap permintaan (request) dari pengguna.
- **Kelebihan**: Memungkinkan konten yang sangat dinamis dan dipersonalisasi (misalnya, menampilkan data pengguna yang login, keranjang belanja).
- **Kekurangan**: Membutuhkan lingkungan server Node.js untuk berjalan (bukan hanya hosting statis), dan bisa sedikit lebih lambat daripada SSG.
- **Cara Mengaktifkan**: Ubah `output: 'static'` menjadi `output: 'server'` di file `astro.config.mjs` dan tambahkan adapter untuk lingkungan deployment Anda (misalnya `@astrojs/netlify`).

## 3. Deployment ke Berbagai Platform

Folder `dist/` yang dihasilkan oleh `npm run build` bisa di-host di mana saja. Berikut adalah beberapa platform populer:

### A. Netlify

Netlify sangat cocok untuk hosting situs statis Astro.

1.  Hubungkan akun GitHub/GitLab Anda ke Netlify.
2.  Pilih repositori proyek Anda.
3.  Konfigurasi build:
    - **Build command**: `npm run build`
    - **Publish directory**: `dist`
4.  Klik "Deploy site". Netlify akan otomatis men-deploy setiap kali Anda melakukan `git push`.

### B. Vercel

Vercel, dari pembuat Next.js, juga menyediakan hosting kelas satu untuk Astro (baik statis maupun SSR).

1.  Hubungkan akun Git Anda ke Vercel.
2.  Impor proyek dari repositori Anda.
3.  Vercel biasanya akan otomatis mendeteksi bahwa ini adalah proyek Astro dan mengkonfigurasi build settings dengan benar.
    - **Build command**: `astro build` atau `npm run build`
    - **Output Directory**: `dist`
4.  Deploy.

### C. GitHub Pages

Anda bisa men-deploy situs Astro Anda secara gratis langsung dari repositori GitHub.

1.  Di `astro.config.mjs`, atur `site` dengan URL GitHub Pages Anda. Contoh: `site: 'https://<USERNAME>.github.io'`.
2.  Atur juga `base` sesuai nama repositori Anda. Contoh: `base: '/<REPO_NAME>'`.
3.  Deploy folder `dist/` ke branch `gh-pages`.

## 4. Setup Custom Domain dan SSL

Setelah situs Anda di-deploy, platform seperti Netlify dan Vercel memudahkan untuk menambahkan custom domain.

1.  Beli domain dari provider (Namecheap, GoDaddy, dll).
2.  Di dashboard hosting Anda (Netlify/Vercel), pergi ke pengaturan "Domains".
3.  Tambahkan custom domain Anda.
4.  Anda akan diminta untuk mengkonfigurasi DNS records (biasanya CNAME atau A record) di provider domain Anda untuk menunjuk ke server hosting.
5.  **SSL**: Netlify dan Vercel secara otomatis menyediakan dan memperbarui sertifikat SSL (HTTPS) secara gratis melalui Let's Encrypt.

## 5. GitHub Actions untuk CI/CD

Untuk otomatisasi yang lebih canggih, Anda bisa menggunakan GitHub Actions.
**CI/CD (Continuous Integration/Continuous Deployment)** adalah praktik di mana setiap `push` ke branch utama akan secara otomatis menjalankan serangkaian tugas seperti:

- Menjalankan test.
- Melakukan build.
- Men-deploy ke production jika semua langkah berhasil.

**Contoh file workflow `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to Netlify

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: "./dist"
          netlify-auth-token: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          netlify-site-id: ${{ secrets.NETLIFY_SITE_ID }}
```

Ini memastikan proses deployment yang konsisten dan andal.
