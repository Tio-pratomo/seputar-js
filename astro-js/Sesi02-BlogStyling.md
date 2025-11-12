---
sidebar_position: 3
---

# Membuat Blog Pertama & Styling

## Pembelajaran yang akan dicapai

- Membuat halaman dinamis dengan Markdown
- Styling dengan Tailwind CSS
- Membuat struktur blog dasar
- Responsive design

---

## 1. Setup Tailwind CSS

```bash
npx astro add tailwind
```

Ini akan:

- Install `@astrojs/tailwind` & `tailwindcss`
- Update `astro.config.mjs`
- Siap pakai Tailwind classes

---

## 2. Membuat Blog Post dengan Markdown

```bash
mkdir -p src/content/blog
```

**src/content/blog/post-1.md:**

```markdown
---
title: "Post Pertama Saya"
pubDate: 2025-01-01
author: "Aman"
image: "https://picsum.photos/800/400"
---

# Welcome to My Blog

Ini adalah post pertama saya di Astro!

## Fitur Astro

- ✨ Super cepat
- 🎨 Styling mudah
- 📝 Markdown support
```

---

## 3. Setup Content Collections

```typescript title="src/content/config.ts"
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
```

---

## 4. Halaman Daftar Blog

```jsx title="src/pages/blog/index.astro"
---
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog'))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<html lang="id">
  <head>
    <meta charset="utf-8" />
    <title>Blog Saya</title>
  </head>
  <body class="bg-gray-50">
    <div class="max-w-2xl mx-auto py-16 px-4">
      <h1 class="text-4xl font-bold mb-8">Blog Saya</h1>

      <div class="space-y-6">
        {posts.map((post) => (
          <article class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 class="text-2xl font-bold mb-2">
              <a href={`/blog/${post.slug}`} class="text-blue-600 hover:underline">
                {post.data.title}
              </a>
            </h2>
            <p class="text-gray-600 mb-4">
              {post.data.pubDate.toLocaleDateString('id-ID')} · {post.data.author}
            </p>
            {post.data.image && (
              <img
                src={post.data.image}
                alt={post.data.title}
                class="w-full h-48 object-cover rounded mb-4"
              />
            )}
          </article>
        ))}
      </div>
    </div>
  </body>
</html>
```

---

## 5. Halaman Detail Blog

```jsx title="src/pages/blog/[slug].astro"
---
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<html lang="id">
  <head>
    <meta charset="utf-8" />
    <title>{post.data.title}</title>
  </head>
  <body class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4">
      <a href="/blog" class="text-blue-600 hover:underline">← Kembali ke Blog</a>

      <article class="mt-8">
        <h1 class="text-4xl font-bold mb-2">{post.data.title}</h1>
        <p class="text-gray-600 mb-6">
          {post.data.pubDate.toLocaleDateString('id-ID')} · {post.data.author}
        </p>

        {post.data.image && (
          <img
            src={post.data.image}
            alt={post.data.title}
            class="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <div class="prose prose-lg max-w-none">
          <Content />
        </div>
      </article>
    </div>
  </body>
</html>

<style is:global>
  .prose h2 {
    @apply text-2xl font-bold mt-8 mb-4;
  }
  .prose p {
    @apply mb-4 leading-relaxed;
  }
  .prose ul {
    @apply list-disc list-inside mb-4;
  }
</style>
```

---

## 6. Styling Global

```css title="src/styles/global.css"
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
}

body {
  background: #fafafa;
  color: #333;
}

a {
  color: inherit;
  text-decoration: none;
}

@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}
```

Import di halaman utama:

```jsx
---
import '../styles/global.css';
---
```

---

## Ringkasan

✓ Markdown untuk blog posts  
✓ Content Collections untuk type-safe konten  
✓ Tailwind untuk styling responsive  
✓ Dynamic routes dengan `[slug].astro`

---

## Challenge

Tambahkan: Tags, kategori, atau search di blog Anda!
