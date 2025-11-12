---
sidebar_position: 2
---

# Pengenalan Astro & Setup Proyek

## Pembelajaran yang akan dicapai

- Memahami apa itu Astro dan keunggulannya
- Setup lingkungan pengembangan
- Membuat proyek Astro pertama
- Memahami file-based routing dan struktur folder

---

## 1. Apa itu Astro?

**Astro** adalah framework web modern untuk membangun website yang **content-driven** dengan fokus pada **kecepatan** dan **performa**.

### Tagline

:::info[Catatan]
"The web framework for content-driven websites"
:::

### Ideal untuk:

- Blog dan website dokumentasi
- Landing page dan marketing site
- Portfolio dan resume website
- Static e-commerce catalog
- News portal dan media site

### Keunggulan Utama

#### 1. **Server-First Architecture**

- Rendering HTML di server saat build time
- Pengiriman HTML yang ringan ke browser
- Minimal JavaScript yang dikirim

#### 2. **Astro Islands Architecture**

- Sebagian besar halaman adalah HTML statis yang cepat
- "Island" = komponen interaktif yang diisolasi
- Setiap island hanya memuat JavaScript yang diperlukan

#### 3. **Content-Driven**

- Support Markdown native
- File-based routing yang sederhana
- Integrasi CMS yang mudah

#### 4. **Zero Lock-in**

- Gunakan framework favorit Anda (React, Vue, Svelte, dll)
- Bahkan bisa campur framework dalam satu halaman
- Atau gunakan vanilla JavaScript

---

## 2. Persiapan Lingkungan

### Prasyarat:

- **Node.js**: versi **genap** saja (v18, v20, v22, dst)
  - Astro tidak support versi ganjil (v19, v21, dst)
- **Code Editor**: VS Code (+ extensi Astro)
- **Terminal**: Command line / Terminal

### Verifikasi Node.js:

```bash
node -v
# Output: v20.x.x ✓
```

Jika versi ganjil, gunakan NVM untuk mengganti versi:

```bash
nvm install 20
nvm use 20
```

---

## 3. Membuat Proyek Astro Pertama

```bash
npm create astro@latest my-blog
cd my-blog
npm install
npm run dev
```

### Wizard Setup:

- **Template**: Pilih "Empty" untuk mulai dari awal
- **Dependencies**: Pilih "Yes"
- **Git**: Pilih "Yes"

Output: Server berjalan di `http://localhost:4321`

---

## 4. Struktur Folder Astro

Contoh struktur folder:

<sl-tree class="tree-with-icons">
  <sl-tree-item expanded>
    <sl-icon name="folder"></sl-icon>
      <span>my-blog/</span>
    <sl-tree-item expanded>
      <sl-icon name="folder"> </sl-icon>
      <span>src/</span>
      <sl-tree-item expanded>
        <sl-icon name="folder"></sl-icon>
        <span>pages/ ⟶ File di sini = routes otomatis</span>
        <sl-tree-item>
          <sl-icon name="file-earmark-code"></sl-icon>
          <span>index.astro ⟶ `http://localhost:4321/`</span>
        </sl-tree-item>
      </sl-tree-item>
      <sl-tree-item>
        <sl-icon name="folder"></sl-icon> 
        <span>component/ ⟶ Komponen yang reusable</span>
      </sl-tree-item>
      <sl-tree-item>
        <sl-icon name="folder"></sl-icon>
        <span>layouts/ ⟶ Template halaman</span>
      </sl-tree-item>
      <sl-tree-item>
        <sl-icon name="folder"></sl-icon>
        <span>styles/ ⟶ CSS global</span>
      </sl-tree-item>
      <sl-tree-item>
        <sl-icon name="folder"></sl-icon>
        <span>content/ ⟶ Blog posts & konten</span>
      </sl-tree-item>
    </sl-tree-item>

    <sl-tree-item>
      <sl-icon name="folder"></sl-icon>
      <span>public/ ⟶ Asset statis (images, fonts, dll)</span>
    </sl-tree-item>

    <sl-tree-item>
      <sl-icon name="file-earmark-code"></sl-icon>
      <span>astro.config.mjs ⟶ Konfigurasi Astro</span>
    </sl-tree-item>

    <sl-tree-item>
      <sl-icon name="filetype-json"></sl-icon>
      <span>package.json</span>
    </sl-tree-item>

    <sl-tree-item>
      <sl-icon name="filetype-json"></sl-icon>
      <span>tsconfig.json</span>
    </sl-tree-item>

  </sl-tree-item>
</sl-tree>

---

## 5. File-Based Routing

Astro menggunakan **file-based routing** seperti Next.js:

```
Struktur File               ⟶ URL
src/pages/index.astro       ⟶ /
src/pages/about.astro       ⟶ /about
src/pages/blog/index.astro  ⟶ /blog
src/pages/blog/post-1.astro ⟶ /blog/post-1
src/pages/[id].astro        ⟶ /123 (dynamic route)
```

### Contoh: Membuat halaman About

1. Buat file

```bash
touch src/pages/about.astro
```

2. Buka di editor dan tulis:

```jsx
---
// Frontmatter: JavaScript/TypeScript berjalan di server
const title = "Tentang Saya";
---

<html lang="id">
  <head>
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
    <p>Halo! Saya adalah web developer.</p>
    <a href="/">← Kembali ke Home</a>
  </body>
</html>
```

3. Akses di browser

```bash
http://localhost:4321/about
```

---

## 6. Struktur File .astro

File Astro dibagi menjadi 3 bagian:

```jsx
---
// ========== BAGIAN 1: FRONTMATTER ==========
// JavaScript/TypeScript yang berjalan di SERVER saat build
// Tempat untuk: variabel, import, fetch data, logic
const name = "Aman";
const year = new Date().getFullYear();
---

<!-- ========== BAGIAN 2: HTML TEMPLATE ========== -->
<!-- Mirip JSX, tapi rendering di server -->
<html lang="id">
  <head>
    <title>Nama saya: {name}</title>
  </head>
  <body>
    <h1>Hello {name}!</h1>
    <p>Tahun sekarang: {year}</p>
  </body>
</html>

<!-- ========== BAGIAN 3: STYLES (OPTIONAL) ========== -->
<style>
  h1 {
    color: purple;
    font-size: 3rem;
  }
</style>
```

### Penting:

- Kode di **Frontmatter** (`---`) berjalan di **SERVER**
- Kode di **HTML Template** dirender di **SERVER** → dikirim sebagai HTML ke browser
- **Hasilnya**: HTML murni tanpa JavaScript overhead

---

## 7. Dev Toolbar

Saat `npm run dev` jalan, di browser akan muncul **Astro Dev Toolbar** (pojok kanan bawah):

- **🔍 Inspect**: Klik elemen halaman untuk info komponen & props
- **📊 Audit**: Check performa & aksesibilitas
- ⚙️ **Settings**: Konfigurasi toolbar

Gunakan untuk debugging dan monitoring.

---

## 8. Perintah Penting

```bash
# Development
npm run dev        # Start server di localhost:4321

# Build untuk production
npm run build      # Generate folder dist/

# Preview build
npm run preview    # Test production build locally

# Astro CLI
npm run astro add react     # Add integrasi React
npm run astro add tailwind  # Add Tailwind CSS
```

---

## Ringkasan

✓ Astro = Framework untuk static sites yang super cepat  
✓ File-based routing: folder structure = URL structure  
✓ File `.astro` punya 3 bagian: Frontmatter (server), Template (HTML), Styles (CSS)  
✓ Rendering server-first = minimal JavaScript  
✓ Siap untuk proyek nyata dengan Content Collections + CMS

---

## Sesi Selanjutnya

Kita akan membuat blog pertama dengan halaman dinamis, komponen reusable, dan styling.
