---
sidebar_position: 4
---

# Komponen Reusable & Layouts

## Pembelajaran yang akan dicapai

- Membuat komponen Astro yang reusable
- Menggunakan props dan slots
- Membuat layout templates
- Component composition patterns

---

## 1. Pengenalan Komponen Astro

Komponen Astro adalah file `.astro` yang bisa dipakai ulang di berbagai halaman. Tujuannya adalah untuk menghindari duplikasi kode (**DRY Principle**).

### Struktur Komponen:

```jsx
---
// FRONTMATTER: Logic, imports, props
const { title, date, author, slug } = Astro.props;
---

<!-- TEMPLATE: HTML dengan interpolasi -->
<article class="post-card">
  <h2><a href={`/blog/${slug}`}>{title}</a></h2>
  <p class="meta">{date} · {author}</p>
  <slot /> <!-- Placeholder untuk children content -->
</article>

<style>
  /* Component-scoped CSS -->
  .post-card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
</style>
```

---

## 2. Props: Mengirim Data ke Komponen

**Buat file: src/components/BlogCard.astro**

```jsx
---
interface Props {
  title: string;
  date: Date;
  author: string;
  slug: string;
  excerpt?: string;
}

const { title, date, author, slug, excerpt } = Astro.props;
---

<article class="blog-card">
  <h2 class="title">
    <a href={`/blog/${slug}`}>{title}</a>
  </h2>

  <p class="meta">
    {date.toLocaleDateString('id-ID')} · <span class="author">{author}</span>
  </p>

  {excerpt && <p class="excerpt">{excerpt}</p>}
</article>

<style>
  .blog-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .blog-card:hover {
    shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .title a {
    color: #1f2937;
    text-decoration: none;
    font-weight: 600;
  }

  .title a:hover {
    color: #2563eb;
  }

  .meta {
    font-size: 0.875rem;
    color: #6b7280;
  }

  .excerpt {
    color: #374151;
    margin-top: 0.5rem;
  }
</style>
```

### Menggunakan Komponen:

**Di src/pages/blog/index.astro:**

```jsx
---
import { getCollection } from 'astro:content';
import BlogCard from '../components/BlogCard.astro';

const posts = (await getCollection('blog'))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<html>
  <body>
    <div class="posts-list">
      {posts.map((post) => (
        <BlogCard
          title={post.data.title}
          date={post.data.pubDate}
          author={post.data.author}
          slug={post.slug}
          excerpt={post.data.excerpt}
        />
      ))}
    </div>
  </body>
</html>
```

---

## 3. Slots: Menerima Children Content

Slots memungkinkan komponen menerima konten dari parent.

**Buat: src/components/Card.astro**

```jsx
---
interface Props {
  title: string;
  variant?: 'default' | 'highlight';
}

const { title, variant = 'default' } = Astro.props;
---

<div class={`card card-${variant}`}>
  <h3 class="card-title">{title}</h3>
  <div class="card-content">
    <slot /> <!-- Content dari parent ditaruh di sini -->
  </div>
</div>

<style>
  .card {
    border-radius: 8px;
    padding: 1.5rem;
  }

  .card-default {
    background: white;
    border: 1px solid #e5e7eb;
  }

  .card-highlight {
    background: #f0f9ff;
    border: 2px solid #0284c7;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .card-content {
    color: #374151;
    line-height: 1.6;
  }
</style>
```

### Menggunakan Slot:

```jsx
---
import Card from '../components/Card.astro';
---

<Card title="Welcome" variant="highlight">
  <p>Ini adalah konten yang dikirim dari parent!</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</Card>
```

---

## 4. Layout: Template Halaman

Layout adalah komponen khusus yang membungkus halaman.

**Buat: src/layouts/BaseLayout.astro**

```jsx
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
  </head>

  <body>
    <header class="header">
      <nav class="navbar">
        <a href="/" class="logo">My Blog</a>
        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>

    <main class="main-content">
      <slot /> <!-- Halaman content dimasukkan di sini -->
    </main>

    <footer class="footer">
      <p>&copy; 2025 My Blog. All rights reserved.</p>
    </footer>
  </body>
</html>

<style is:global>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #f9fafb;
    color: #1f2937;
  }

  .header {
    background: white;
    border-bottom: 1px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .navbar {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-weight: 700;
    font-size: 1.5rem;
    color: #1f2937;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
  }

  .nav-links a {
    color: #6b7280;
    text-decoration: none;
    transition: color 0.2s;
  }

  .nav-links a:hover {
    color: #1f2937;
  }

  .main-content {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 2rem;
    min-height: 60vh;
  }

  .footer {
    background: #1f2937;
    color: white;
    text-align: center;
    padding: 2rem;
    margin-top: 4rem;
  }
</style>
```

### Menggunakan Layout:

**src/pages/about.astro:**

```jsx
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About Me" description="Tentang saya">
  <h1>Tentang Saya</h1>
  <p>Halo! Saya adalah seorang web developer...</p>
</BaseLayout>
```

---

## 5. Named Slots: Multiple Placeholders

Untuk slot yang lebih kompleks dengan multiple placeholder:

```jsx
---
// src/components/BlogPostLayout.astro
---

<article class="post">
  <header>
    <slot name="header" /> <!-- Tempat untuk title dan meta -->
  </header>

  <main>
    <slot /> <!-- Default content -->
  </main>

  <aside>
    <slot name="sidebar" /> <!-- Tempat untuk sidebar content -->
  </aside>
</article>
```

### Menggunakan Named Slots:

```jsx
---
import BlogPostLayout from '../layouts/BlogPostLayout.astro';
---

<BlogPostLayout>
  <div slot="header">
    <h1>Judul Post</h1>
    <p class="meta">Jan 1, 2025</p>
  </div>

  <p>Konten utama post...</p>

  <div slot="sidebar">
    <h3>Related Posts</h3>
    <ul>...</ul>
  </div>
</BlogPostLayout>
```

---

## 6. Component Composition Pattern

Gunakan komponen kecil untuk membentuk komponen yang lebih besar:

```jsx title="src/components/BlogPost.astro"
---
import { render } from 'astro:content';
import PostHeader from './PostHeader.astro';
import PostContent from './PostContent.astro';
import PostFooter from './PostFooter.astro';

const { post } = Astro.props;
const { Content } = await render(post);
---

<article class="blog-post">
  <PostHeader post={post} />
  <PostContent content={Content} />
  <PostFooter post={post} />
</article>

<style>
  .blog-post {
    max-width: 65ch;
    margin: 0 auto;
  }
</style>
```

---

## 📋 Challenge Sesi Ini

1. **Buat komponen `Header.astro`** dengan props: `siteName`, `navItems`
2. **Buat komponen `Footer.astro`** dengan slot untuk content
3. **Refactor halaman blog** untuk menggunakan layout dan komponen yang sudah dibuat
4. **Buat komponen `Tag.astro`** yang displaykan tags dengan styling berbeda berdasarkan props

---

## Ringkasan

✓ Komponen Astro untuk DRY principle  
✓ Props untuk mengirim data ke komponen  
✓ Slots untuk menerima content dari parent  
✓ Layouts untuk template halaman  
✓ Composition pattern untuk organize components

**Sesi selanjutnya:** Menambahkan interaktivitas dengan React!
