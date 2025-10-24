# Sesi 15: Content Collections dan CMS di Astro

Sesi ini membahas sistem Content Collections di Astro (fitur baru di Astro 3+) dan berbagai integrasi dengan Content Management System (CMS).

## 1. Pengenalan Content Collections (Astro 3+)

Content Collections adalah sistem manajemen konten baru di Astro 3 yang menyediakan:
- Pemeriksaan tipe otomatis untuk frontmatter konten
- Validasi schema konten
- Pembacaan dan query konten yang aman secara tipe
- Dukungan untuk berbagai format file (Markdown, MDX, JSON, YAML)

### Setup Content Collections

1. Buat folder `src/content/` di proyek Anda
2. Tambahkan konfigurasi di `astro.config.mjs`:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://my-astro-site.com',
  integrations: [],
  contentCollections: () => [
    // Konfigurasi collections akan ditambahkan di sini
  ]
});
```

### Membuat Schema untuk Collection

```javascript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    author: z.string().default('Anonymous')
  })
});

export const collections = { blog };
```

### Membaca Konten dari Collection

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';

const blogPosts = await getCollection('blog');
const publishedPosts = blogPosts.filter(post => !post.data.draft)
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<html>
<body>
  <h1>Blog Posts</h1>
  <ul>
    {publishedPosts.map(post => (
      <li>
        <h2><a href={`/blog/${post.slug}`}>{post.data.title}</a></h2>
        <p>{post.data.description}</p>
        <time>{post.data.pubDate.toLocaleDateString()}</time>
      </li>
    ))}
  </ul>
</body>
</html>
```

## 2. Migrasi dari File-based ke Content Collections

Jika Anda sebelumnya menggunakan pendekatan berbasis file, berikut langkah-langkah migrasi:

### A. Struktur Sebelumnya
```
src/
  pages/
    posts/
      post-1.md
      post-2.md
```

### B. Struktur Baru dengan Content Collections
```
src/
  content/
    blog/
      post-1.md
      post-2.md
  content/
    config.ts  // file konfigurasi schema
```

### C. Contoh migrasi konten

**Sebelum (src/pages/posts/post-1.md):**
```markdown
---
title: "My First Post"
pubDate: "2024-01-01"
author: "John Doe"
tags: ["astro", "blog"]
---
# My First Post
Content here...
```

**Sesudah (src/content/blog/post-1.md):**
```markdown
---
title: "My First Post"
pubDate: "2024-01-01"
author: "John Doe"
tags: ["astro", "blog"]
---
# My First Post
Content here...
```

### D. Mengakses konten dengan API baru
```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => {
  return !data.draft; // hanya tampilkan postingan yang sudah dipublikasikan
});
---

<!-- Template -->
{
  posts.map(post => (
    <article>
      <h2>{post.data.title}</h2>
      <p>{post.data.description}</p>
      <time>{post.data.pubDate.toLocaleDateString()}</time>
    </article>
  ))
}
```

## 3. Integrasi dengan Headless CMS

### A. Contentful

1. Install integrasi Contentful:
```bash
npm install @astrojs/contentful
```

2. Tambahkan ke konfigurasi:
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import contentful from '@astrojs/contentful';

export default defineConfig({
  integrations: [
    contentful({
      spaceId: import.meta.env.CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
    })
  ]
});
```

3. Gunakan konten dari Contentful:
```astro
---
import { getCollection } from 'astro:content';

// Dapatkan konten dari Contentful
const articles = await getCollection('article');
---

{
  articles.map(article => (
    <div>
      <h2>{article.data.title}</h2>
      <div set:html={article.body.html} />
    </div>
  ))
}
```

### B. Sanity

1. Install integrasi Sanity:
```bash
npm install @astrojs/sanity
```

2. Konfigurasi:
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sanity from '@astrojs/sanity';

export default defineConfig({
  integrations: [
    sanity({
      projectId: import.meta.env.SANITY_PROJECT_ID,
      dataset: import.meta.env.SANITY_DATASET,
      apiVersion: '2023-06-12', // atau tanggal yang Anda pilih
      useCdn: false // `false` jika Anda ingin data terbaru
    })
  ]
});
```

### C. Strapi

1. Gunakan API eksternal untuk mengambil konten dari Strapi:
```astro
---
const getBlogPosts = async () => {
  const res = await fetch('http://localhost:1337/api/posts?populate=*');
  const data = await res.json();
  return data.data;
};

const posts = await getBlogPosts();
---

{
  posts.map(post => (
    <div>
      <h2>{post.attributes.title}</h2>
      <div set:html={post.attributes.content} />
    </div>
  ))
}
```

## 4. Best Practices untuk Content Collections

### A. Organisasi Collection

Gunakan struktur folder yang jelas:
```
src/content/
  blog/
  projects/
  authors/
  config.ts
```

### B. Schema Validation

Gunakan schema yang ketat untuk mencegah kesalahan:
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string().max(100, "Title terlalu panjang"),
    description: z.string().max(200).optional(),
    pubDate: z.date(),
    tags: z.array(z.string()).min(1, "Minimal 1 tag"),
    draft: z.boolean().default(false),
    category: z.enum(['tech', 'life', 'tutorial']),
    readingTime: z.number().optional()
  })
});
```

### C. Optimasi Query

Hanya ambil data yang benar-benar dibutuhkan:
```astro
---
// Efisien: hanya ambil data yang diperlukan
const blogPosts = await getCollection('blog', ({ data }) => {
  return !data.draft && data.pubDate <= new Date();
});

const postsPreview = blogPosts.map(post => ({
  slug: post.slug,
  data: {
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    tags: post.data.tags
  }
}));
---
```

### D. SEO dan Metadata

Implementasi metadata dinamis berdasarkan konten:
```astro
---
import { getEntryBySlug } from 'astro:content';

const post = await getEntryBySlug('blog', Astro.params.slug);
---

<head>
  <title>{post.data.title}</title>
  <meta name="description" content={post.data.description} />
  <meta property="og:title" content={post.data.title} />
  <meta property="og:description" content={post.data.description} />
</head>
```

Dengan Content Collections dan integrasi CMS, Astro memberikan fleksibilitas besar dalam manajemen konten, memungkinkan Anda memilih pendekatan terbaik tergantung kebutuhan proyek Anda.