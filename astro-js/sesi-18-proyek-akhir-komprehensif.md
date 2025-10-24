# Sesi 18: Proyek Akhir Komprehensif

Pada sesi ini, kita akan menggabungkan semua konsep yang telah dipelajari sebelumnya untuk membangun sebuah blog lengkap dan production-ready. Proyek ini akan mencakup berbagai fitur modern seperti sistem komentar, CMS headless, pencarian, dark mode, dan internationalization.

## 1. Setup Proyek Awal

Mari kita mulai dengan membuat proyek Astro baru dan mengatur struktur dasar:

```bash
npm create astro@latest blog-comprehensive
cd blog-comprehensive
npm install
```

Tambahkan integrasi yang kita butuhkan:

```bash
npm install @astrojs/tailwind tailwindcss @astrojs/sitemap @astrojs/partytown
npm install @types/node
```

## 2. Membangun Aplikasi Blog Lengkap dengan Fitur Komentar

### Struktur Proyek

```
src/
├── components/
│   ├── CommentForm.astro
│   ├── CommentList.astro
│   ├── BlogPost.astro
│   └── BlogCard.astro
├── content/
│   └── blog/
├── layouts/
│   ├── BaseLayout.astro
│   └── BlogLayout.astro
├── pages/
│   ├── index.astro
│   ├── blog/
│   └── api/
│       └── comments/
├── styles/
│   └── global.css
└── utils/
    ├── comment-service.js
    └── blog-helpers.js
```

### Integrasi Sistem Komentar

Untuk sistem komentar, kita bisa menggunakan solusi seperti:
1. API eksternal (kita buat sendiri)
2. Layanan pihak ketiga (disqus, utterances, giscus)
3. Implementasi sendiri dengan database

Kita akan buat sistem komentar sederhana dengan API routes:

```javascript
// src/pages/api/comments/[slug].js
import { addComment, getComments } from '../../../utils/comment-service';

export async function GET({ params }) {
  const { slug } = params;
  const comments = await getComments(slug);
  return new Response(JSON.stringify(comments), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function POST({ request, params }) {
  const { slug } = params;
  const data = await request.json();
  
  // Validasi data
  if (!data.name || !data.email || !data.content) {
    return new Response(JSON.stringify({ error: 'All fields are required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const comment = await addComment({ ...data, slug });
  return new Response(JSON.stringify(comment), {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
```

### Komponen Komentar

```astro
---
// src/components/CommentList.astro
const { postSlug } = Astro.props;

// Ambil komentar dari API
const comments = await fetch(`/api/comments/${postSlug}`).then(res => res.json());
---

<div class="comments-section">
  <h3>Komentar ({comments.length})</h3>
  <ul>
    {comments.map(comment => (
      <li class="comment-item">
        <div class="comment-header">
          <strong>{comment.name}</strong>
          <small>{new Date(comment.createdAt).toLocaleDateString()}</small>
        </div>
        <p>{comment.content}</p>
      </li>
    ))}
  </ul>
</div>

<style>
  .comments-section {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .comment-item {
    margin-bottom: 1rem;
    padding: 0.75rem;
    background-color: #f9fafb;
    border-radius: 0.375rem;
  }
</style>
```

## 3. Implementasi CMS Headless

Kita akan menggunakan Sanity sebagai headless CMS:

1. Install integrasi Sanity:

```bash
npm install @astrojs/sanity
npm install @sanity/image-url
```

2. Konfigurasi Astro:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sanity from '@astrojs/sanity';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://my-comprehensive-blog.com',
  integrations: [
    tailwind(),
    sanity({
      projectId: import.meta.env.SANITY_PROJECT_ID,
      dataset: import.meta.env.SANITY_DATASET,
      apiVersion: '2023-06-12',
      stega: {
        enabled: false
      }
    })
  ]
});
```

3. Buat skema konten di Sanity:

```javascript
// schemas/post.js
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' }
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ]
}
```

4. Ambil konten dari Sanity di halaman:

```astro
---
// src/pages/blog/[slug].astro
import { groq } from 'groq';
import { client } from '@sanity/astro';

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  body,
  publishedAt,
  "authorName": author->name,
  "mainImage": mainImage.asset->url,
  categories[]->{title}
}`;

const { slug } = Astro.params;
const post = await client.fetch(query, { slug });

if (!post) {
  return Astro.redirect('/404');
}
---

<html>
  <head>
    <title>{post.title}</title>
  </head>
  <body>
    <article class="blog-post">
      <header>
        <h1>{post.title}</h1>
        <p>Ditulis oleh {post.authorName} pada {new Date(post.publishedAt).toLocaleDateString()}</p>
      </header>
      
      {post.mainImage && (
        <img src={post.mainImage} alt={post.title} />
      )}
      
      <div class="content">
        {post.body}
      </div>
      
      <CommentList postSlug={slug} />
    </article>
  </body>
</html>

<style>
  .blog-post {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .blog-post img {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
  }
  
  .content {
    margin-top: 2rem;
    line-height: 1.6;
  }
</style>
```

## 4. Search Functionality

Kita akan implementasi search sederhana dengan client-side search:

```astro
---
// src/components/Search.astro
import { useState } from 'react';
import { client } from '@sanity/astro';

const posts = await client.fetch(groq`*[_type == "post"]{
  title,
  slug,
  publishedAt,
  "authorName": author->name,
  excerpt
}`);
---

<script>
  import { useState } from 'react';
  
  export default function Search() {
    const [query, setQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    
    const handleSearch = (e) => {
      e.preventDefault();
      const q = e.target.search.value.toLowerCase();
      setQuery(q);
      
      if (q.length > 1) {
        const results = posts.filter(post => 
          post.title.toLowerCase().includes(q) || 
          post.excerpt.toLowerCase().includes(q) ||
          post.tags?.some(tag => tag.toLowerCase().includes(q))
        );
        setFilteredPosts(results);
      } else {
        setFilteredPosts([]);
      }
    };
    
    return (
      <div>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            name="search" 
            placeholder="Cari postingan..."
            value={query}
          />
          <button type="submit">Cari</button>
        </form>
        
        {filteredPosts.length > 0 && (
          <ul class="search-results">
            {filteredPosts.map(post => (
              <li>
                <a href={`/blog/${post.slug.current}`}>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt?.substring(0, 100)}...</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
</script>
```

Atau dengan API endpoint untuk pencarian:

```javascript
// src/pages/api/search.js
import { groq } from 'groq';
import { client } from '@sanity/astro';

export async function GET({ url }) {
  const query = url.searchParams.get('q');
  
  if (!query || query.length < 2) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const searchQuery = groq`*[_type == "post" && (
    title match $query ||
    body[] match $query ||
    tags[] match $query
  )]{
    title,
    slug,
    publishedAt,
    "authorName": author->name,
    excerpt,
    "mainImage": mainImage.asset->url
  }`;
  
  const results = await client.fetch(searchQuery, { query: `*${query}*` });
  
  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
```

## 5. Dark Mode Toggle

Kita akan implementasi dark mode menggunakan CSS variables dan localStorage:

```astro
---
// src/components/DarkModeToggle.astro
---

<button id="dark-mode-toggle" aria-label="Toggle dark mode">
  <span class="sun-icon">☀️</span>
  <span class="moon-icon">🌙</span>
</button>

<style>
  :root {
    --bg-color: #ffffff;
    --text-color: #000000;
    --border-color: #e5e7eb;
  }
  
  [data-theme="dark"] {
    --bg-color: #1f2937;
    --text-color: #f9fafb;
    --border-color: #374151;
  }
  
  .sun-icon,
  .moon-icon {
    position: absolute;
    transition: opacity 0.3s ease;
  }
  
  .sun-icon {
    opacity: 1;
  }
  
  .moon-icon {
    opacity: 0;
  }
  
  [data-theme="dark"] .sun-icon {
    opacity: 0;
  }
  
  [data-theme="dark"] .moon-icon {
    opacity: 1;
  }
</style>

<script>
  function setupDarkMode() {
    const toggle = document.getElementById('dark-mode-toggle');
    
    // Periksa preferensi user dari localStorage
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (currentTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      // Gunakan preferensi sistem jika tidak ada preferensi user
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }
    
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      
      if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', setupDarkMode);
</script>
```

## 6. Internationalization (i18n)

Kita akan setup internationalization dengan sistem rute berbasis bahasa:

```javascript
// src/i18n/config.js
export const locales = {
  'en': {
    'home': 'Home',
    'blog': 'Blog',
    'about': 'About',
    'search': 'Search',
    'dark_mode': 'Dark Mode',
    'light_mode': 'Light Mode'
  },
  'id': {
    'home': 'Beranda',
    'blog': 'Blog',
    'about': 'Tentang',
    'search': 'Cari',
    'dark_mode': 'Mode Gelap',
    'light_mode': 'Mode Terang'
  }
};

export function getTranslation(locale, key) {
  return locales[locale]?.[key] || locales['en'][key] || key;
}
```

Buat middleware untuk menangani routing berdasarkan bahasa:

```javascript
// src/middleware.js
import { sequence } from 'astro:middleware';

export function onRequest({ url, locals }, next) {
  // Deteksi locale dari URL path
  const pathSegments = url.pathname.split('/');
  const locale = pathSegments[1];
  
  if (locales[locale]) {
    locals.locale = locale;
    // Hapus locale dari path untuk routing
    url.pathname = '/' + pathSegments.slice(2).join('/');
  } else {
    // Default ke English
    locals.locale = 'en';
  }
  
  return next();
}
```

Gunakan di layout untuk mengakses terjemahan:

```astro
---
// src/layouts/BaseLayout.astro
import { getTranslation } from '../i18n/config';

const { title, locale = 'en' } = Astro.props;

const t = (key) => getTranslation(locale, key);
---

<html lang={locale}>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <title>{title}</title>
  <link rel="stylesheet" href="~/styles/global.css" />
</head>
<body data-theme="light">
  <header>
    <nav>
      <a href={`/${locale}/`}>{t('home')}</a>
      <a href={`/${locale}/blog`}>{t('blog')}</a>
      <a href={`/${locale}/about`}>{t('about')}</a>
    </nav>
    
    <div class="header-right">
      <DarkModeToggle />
      <select id="locale-switcher">
        <option value="en" selected={locale === 'en'}>EN</option>
        <option value="id" selected={locale === 'id'}>ID</option>
      </select>
    </div>
  </header>
  
  <main>
    <slot />
  </main>
  
  <footer>
    <p>&copy; {new Date().getFullYear()} My Comprehensive Blog</p>
  </footer>
  
  <script>
    document.getElementById('locale-switcher').addEventListener('change', (e) => {
      const newLocale = e.target.value;
      // Redirect ke locale baru
      window.location.href = window.location.pathname.replace(/^\/[^\/]+/, `/${newLocale}`);
    });
  </script>
</body>
</html>
```

## 7. Deployment Production-Ready

### Optimasi Build

Pastikan konfigurasi Astro optimal untuk production:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from '@playform/compress';

export default defineConfig({
  site: 'https://my-comprehensive-blog.com',
  output: 'server', // atau 'static' tergantung kebutuhan
  adapter: /* sesuaikan dengan platform deployment */,
  
  integrations: [
    tailwind(),
    sitemap(),
    compress({
      gzip: true,
      Brotli: true
    })
  ],
  
  build: {
    format: 'directory' // untuk menghasilkan folder tanpa .html
  },
  
  image: {
    domains: ['cdn.sanity.io'] // domain untuk image dari Sanity
  }
});
```

### Setup Environment Variables

Buat file `.env.production`:

```
# Sanity
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production

# Authentication
AUTH_SECRET=your_auth_secret
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

# Database
DATABASE_URL=your_database_url

# Analytics
GA_MEASUREMENT_ID=your_ga_id
```

### Optimasi Gambar dengan Astro Assets

Gunakan komponen Image dari Astro untuk mengoptimasi gambar:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../images/hero.jpg';
---

<Image 
  src={heroImage} 
  alt="Hero image"
  width={1200}
  height={600}
  format="webp"
  quality={80}
  class="hero-image"
/>
```

### Implementasi Monitoring dan Analytics

Tambahkan Google Analytics atau layanan analytics lainnya:

```astro
---
// Di BaseLayout.astro
---

<script>
  // Google Analytics
  if ('gtag' in window) {
    gtag('config', import.meta.env.GA_MEASUREMENT_ID, {
      page_path: location.pathname,
    });
  }
</script>
```

### Setup Continuous Deployment

Contoh GitHub Actions workflow untuk deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm ci

      - name: Build Project
        run: npm run build
        env:
          SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
          SANITY_DATASET: ${{ secrets.SANITY_DATASET }}
          AUTH_SECRET: ${{ secrets.AUTH_SECRET }}

      - name: Deploy to Production
        run: |
          # Deployment script sesuai platform (Netlify, Vercel, etc.)
```

### Security Headers

Tambahkan security headers di server atau middleware:

```javascript
// middleware untuk security headers
export function onRequest({ response }, next) {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return next();
}
```

## 8. Final Proyek dan Best Practices

Berikut beberapa best practices untuk memastikan proyek Anda production-ready:

1. **Error Handling**: Implementasi error pages (404, 500)
2. **Loading States**: Tambahkan loading indicator untuk operasi async
3. **Caching**: Gunakan caching untuk data yang tidak sering berubah
4. **Testing**: Tambahkan unit tests dan E2E tests
5. **Performance Monitoring**: Gunakan tools seperti Lighthouse untuk monitoring performa
6. **SEO**: Pastikan meta tags, structured data, dan sitemap bekerja dengan baik

Proyek akhir ini menunjukkan bagaimana berbagai fitur Astro dapat digabungkan untuk menciptakan aplikasi web modern yang lengkap, cepat, dan mudah dikelola. Ini mencakup berbagai aspek penting dalam pengembangan web saat ini, dari otentikasi dan keamanan hingga pengalaman pengguna yang optimal di berbagai perangkat dan bahasa.