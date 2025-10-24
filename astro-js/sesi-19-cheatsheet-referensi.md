# Tambahan: Referensi dan Best Practices

## Cheat Sheet Astro

### Struktur Proyek Dasar

```
my-astro-project/
├── public/          # Static assets (fonts, images, robots.txt)
├── src/
│   ├── components/  # Komponen reusable (.astro, .jsx, .vue, dll)
│   ├── layouts/     # Layout templates
│   ├── pages/       # File-based routing
│   ├── styles/      # Global CSS
│   └── utils/       # Utility functions
├── astro.config.mjs # Konfigurasi Astro
└── package.json
```

### Sintaksis Dasar Astro

```astro
---
// Component Script (JavaScript/TypeScript)
// Dijalankan di server saja
const title = "Hello World";
const items = ['A', 'B', 'C'];
const response = await fetch('https://api.example.com/data');
const data = await response.json();
---

<!-- Template HTML -->
<html>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>

    <!-- Conditional rendering -->
    {data && (
      <div class="content">
        {/* Loop rendering */}
        {items.map(item => (
          <li>{item}</li>
        ))}
      </div>
    )}

    <!-- Style dan Script -->
    <style>
      .content { color: blue; }
    </style>

    <script>
      // Client-side JavaScript
      console.log('Hello from browser');
    </script>
  </body>
</html>
```

### Direktif Client yang Umum

```astro
---
import InteractiveComponent from '../components/Interactive.jsx';
---

<!-- Load segera -->
<InteractiveComponent client:load />

<!-- Load setelah halaman siap -->
<InteractiveComponent client:idle />

<!-- Load ketika komponen terlihat -->
<InteractiveComponent client:visible />

<!-- Load berdasarkan media query -->
<InteractiveComponent client:media="(max-width: 768px)" />

<!-- Hanya render di client -->
<InteractiveComponent client:only />
```

### API Routes

```javascript
// src/pages/api/users.js
export async function GET({ params, request }) {
  return new Response(JSON.stringify({ users: [] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST({ request }) {
  const body = await request.json();
  // Process data
  return new Response(JSON.stringify({ success: true }));
}
```

## Kumpulan Resources dan Dokumentasi Resmi

### Dokumentasi Utama

- **Dokumentasi Resmi**: [docs.astro.build](https://docs.astro.build)
- **Migrasi Guide**: [docs.astro.build/en/migrate](https://docs.astro.build/en/migrate)
- **API Reference**: [docs.astro.build/en/reference](https://docs.astro.build/en/reference)
- **Integrations**: [astro.build/integrations](https://astro.build/integrations)

### Learning Resources

- **Blog Astro**: [astro.build/blog](https://astro.build/blog)
- **Examples Gallery**: [astro.build/examples](https://astro.build/examples)
- **Tutorial Interaktif**: [docs.astro.build/en/tutorial](https://docs.astro.build/en/tutorial)
- **Video Courses**: [astro.build/resources](https://astro.build/resources)

### Komunitas

- **Discord**: [astro.build/chat](https://astro.build/chat)
- **GitHub**: [github.com/withastro/astro](https://github.com/withastro/astro)
- **Twitter**: [@astrodotbuild](https://twitter.com/astrodotbuild)
- **Stack Overflow**: Tag `astro`

## Best Practices untuk Berbagai Skenario

### 1. Situs Statis (Blog, Dokumentasi, Portfolio)

```javascript
// astro.config.mjs
export default defineConfig({
  output: "static",
  site: "https://mysite.com",
  integrations: [sitemap(), tailwind()],
});
```

**Best Practices:**

- Gunakan `output: 'static'` untuk build optimal
- Implementasi SSG dengan `getStaticPaths`
- Gunakan `astro:assets` untuk image optimization
- Generate sitemap otomatis

```astro
---
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  const posts = await getBlogPosts();
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}
---

<!-- Gunakan markdown untuk konten -->
```

### 2. Aplikasi Web dengan Interaktivitas

```javascript
// astro.config.mjss
export default defineConfig({
  output: "server",
  integrations: [react(), vue(), svelte()],
});
```

**Best Practices:**

- Gunakan `output: 'server'` untuk SSR
- Isolate interactivity dengan komponen islands
- Implementasi partial hydration
- Gunakan `client:*` directives secara strategis

```astro
---
// src/pages/dashboard.astro
import Chart from '../components/Chart.jsx';
import DataTable from '../components/DataTable.vue';
---

<!-- Hanya komponen interaktif yang dikirim ke client -->
<Chart client:load />
<DataTable client:idle />
```

### 3. E-commerce Site

```astro
---
// src/pages/products/[id].astro
export async function getStaticPaths() {
  const products = await fetchProducts();
  return products.map(product => ({
    params: { id: product.id },
    props: { product }
  }));
}
---

<!-- Optimasi untuk SEO dan performance -->
<Image src={product.image} alt={product.name} widths={[400, 800, 1200]} />
```

**Best Practices:**

- Static generation untuk halaman produk
- API routes untuk cart dan checkout
- Optimasi images dengan multiple formats
- Structured data untuk SEO

### 4. Content-Heavy Site (CMS)

```astro
---
// src/pages/[...slug].astro
export async function getStaticPaths() {
  const pages = await fetchFromCMS();
  return pages.map(page => ({
    params: { slug: page.slug.split('/') },
    props: { page }
  }));
}
---

<!-- Render konten dari CMS -->
<div set:html={page.content} />
```

**Best Practices:**

- Dynamic routes untuk konten CMS
- Preview mode untuk draft content
- Incremental Static Regeneration
- Cache headers optimization

### 5. Performance-Critical Applications

```javascript
// astro.config.mjs
export default defineConfig({
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      minify: "terser",
      cssMinify: true,
    },
  },
});
```

**Best Practices:**

- Critical CSS inlining
- Image optimization dengan modern formats
- Resource hints (preload, preconnect)
- Lazy loading non-critical components

## Template Starter untuk Berbagai Jenis Proyek

### Official Starters

```bash
# Blog/Portfolio
npm create astro@latest -- --template blog
npm create astro@latest -- --template portfolio

# Documentation
npm create astro@latest -- --template docs

# Minimal
npm create astro@latest -- --template minimal
```

### Community Templates

#### 1. Blog dengan CMS

```bash
# Starlight (Documentation)
npm create astro@latest -- --template starlight

# Blog dengan Markdown
npm create astro@latest -- --template with-markdown
```

#### 2. E-commerce

```bash
# Astro E-commerce
npm create astro@latest -- --template ecommerce
```

#### 3. Dashboard Admin

```bash
# Admin Dashboard
npm create astro@latest -- --template dashboard
```

#### 4. Landing Page

```bash
# Landing page dengan optimasi SEO
npm create astro@latest -- --template landing-page
```

### Custom Template Setup

```bash
# Dengan TypeScript
npm create astro@latest my-project -- --template with-typescript

# Dengan Tailwind CSS
npm create astro@latest my-project -- --template with-tailwindcss

# Dengan React
npm create astro@latest my-project -- --template with-react

# Dengan multiple frameworks
npm create astro@latest my-project -- --template with-multiple-frameworks
```

## Daftar Tools dan Ekosistem Astro

### Integrations Resmi

#### UI Frameworks

```bash
# React
npx astro add react

# Vue
npx astro add vue

# Svelte
npx astro add svelte

# Preact
npx astro add preact

# Solid
npx astro add solid-js

# Lit
npx astro add lit
```

#### Styling

```bash
# Tailwind CSS
npx astro add tailwind

# Styled Components
npx astro add styled-components

# Stitches
npx astro add stitches
```

#### CMS & Content

```bash
# Strapi
npx astro add strapi

# Contentful
npm install @astrojs/contentful

# Storyblok
npm install @astrojs/storyblok

# Markdown/MDX
npx astro add mdx
```

#### Utilities

```bash
# Sitemap
npx astro add sitemap

# RSS
npx astro add rss

# Partytown (Third-party scripts)
npx astro add partytown
```

### Development Tools

#### Debugging dan Analysis

```json
{
  "devDependencies": {
    "astro-bundle-analyser": "^1.0.0",
    "astro-check": "^0.3.0",
    "@astrojs/check": "^0.3.0"
  }
}
```

#### Testing

```bash
# Playwright untuk E2E testing
npm install @playwright/test

# Vitest untuk unit testing
npm install -D vitest

# Testing Library
npm install -D @testing-library/jest-dom
```

#### Performance Monitoring

```javascript
// src/components/PerformanceMonitor.astro
---
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
---

<script>
// Track Core Web Vitals
getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
</script>
```

### Build dan Deployment Tools

#### Adapters untuk Deployment

```bash
# Vercel
npx astro add vercel

# Netlify
npx astro add netlify

# Cloudflare Pages
npx astro add cloudflare

# Node.js
npx astro add node
```

#### Optimization Plugins

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import compress from "astro-compress";
import critters from "astro-critters";

export default defineConfig({
  integrations: [
    // Kompresi assets
    compress({
      CSS: true,
      HTML: true,
      JavaScript: true,
      Image: true,
    }),

    // Critical CSS extraction
    critters({
      // Options
    }),
  ],
});
```

### Code Quality Tools

#### ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: ["eslint:recommended", "@astrojs/astro"],
  rules: {
    // Custom rules
  },
};
```

#### Prettier Configuration

```json
{
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}
```

### Useful Snippets dan Patterns

#### Layout Pattern

```astro
---
// src/layouts/BaseLayout.astro
export interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    {description && <meta name="description" content={description}>}
    <slot name="head" />
  </head>
  <body>
    <slot />
    <slot name="scripts" />
  </body>
</html>
```

#### API Route Pattern

```javascript
// src/pages/api/[...path].js
export async function GET({ params, request }) {
  try {
    const data = await fetchData(params.path);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }
}
```

#### Error Boundary Pattern

```astro
---
// src/components/ErrorBoundary.astro
export interface Props {
  fallback?: string;
}

const { fallback = 'Something went wrong' } = Astro.props;
---

<div class="error-boundary">
  <slot />
</div>

<script>
class ErrorBoundary extends HTMLElement {
  connectedCallback() {
    window.addEventListener('error', this.handleError.bind(this));
  }

  handleError(event) {
    this.innerHTML = `<div class="error">${this.fallback}</div>`;
  }
}

customElements.define('error-boundary', ErrorBoundary);
</script>
```

Dengan mengikuti best practices dan menggunakan tools yang tepat dari ekosistem Astro, Anda dapat membangun aplikasi web yang cepat, accessible, dan maintainable. Selalu merujuk ke dokumentasi resmi untuk informasi terbaru dan update terbaru dari framework Astro.
