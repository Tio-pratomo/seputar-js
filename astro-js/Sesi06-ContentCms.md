---
sidebar_position: 7
---

# Content Collections & CMS

## Pembelajaran yang akan dicapai

- Setup Content Collections (built-in Astro)
- Schema validation dengan Zod
- Type-safe content queries
- Markdown & MDX support
- Alternatif CMS: Strapi & TinaCMS

---

## 1. Content Collections Setup

Sudah dicover di Sesi 2, tapi lebih dalam:

```typescript title="src/content/config.ts"
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string().max(100),
    description: z.string().optional(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    category: z.enum(["technology", "tutorial", "review"]),
  }),
});

export const collections = { blog };
```

---

## 2. Content Structure

<sl-tree class="tree-with-icons">
   <sl-tree-item expanded>
      <sl-icon name="folder"></sl-icon>
      <span>src/content/blog/</span>

      <sl-tree-item>
        <sl-icon name="markdown"></sl-icon>
        <span>post-1.md</span>
      </sl-tree-item>

      <sl-tree-item>
        <sl-icon name="markdown"></sl-icon>
        <span>post-2.md</span>
      </sl-tree-item>

      <sl-tree-item expanded>
        <sl-icon name="folder"></sl-icon>
        <span>deep-learning</span>

        <sl-tree-item>
          <sl-icon name="markdown"></sl-icon>
          <span>post-3.md</span>
        </sl-tree-item>
      </sl-tree-item>
    </sl-tree-item>

</sl-tree>

```markdown title="src/content/blog/post-1.md"
---
title: "Getting Started with Astro"
description: "Learn how to build fast websites with Astro"
pubDate: 2025-01-01
author: "Aman"
image: "https://..."
tags: ["astro", "web-dev"]
category: "tutorial"
---

# Getting Started

Your content here...
```

---

## 3. Query & Render Content

```jsx
---
import { getCollection, render } from 'astro:content';

// Get ALL posts
const allPosts = await getCollection('blog');

// Filter by condition
const publishedPosts = (await getCollection('blog'))
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

// Get single post
const post = await getCollection('blog')
  .then(posts => posts.find(p => p.slug === 'post-1'));

// Render content
const { Content } = await render(post);
---

<html>
  <body>
    <h1>{post.data.title}</h1>
    <Content />
  </body>
</html>
```

---

## 4. MDX Support

MDX = Markdown + JSX

**src/content/blog/interactive-post.mdx:**

```markdown
---
title: "Interactive Post with React"
---

# Interactive Content

This is markdown text.

<Counter client:load />

More text after component.
```

Enable MDX in config:

```typescript title="astro.config.mjs"
export default defineConfig({
  integrations: [mdx()],
});
```

---

## 5. Content Relations

```typescript title="src/content/config.ts"
import { reference } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    author: reference("authors"),
    // ... other fields
  }),
});

const authors = defineCollection({
  schema: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
});

export const collections = { blog, authors };
```

---

## 6. ALTERNATIF CMS #1: Content Collections (RECOMMENDED)

**Keuntungan:**

- ✓ Built-in, zero cost
- ✓ Type-safe dengan Zod
- ✓ Konten di git repository
- ✓ Simple dan fokus

**Kekurangan:**

- ✗ Tidak ada admin UI
- ✗ Edit file manual

---

## 7. ALTERNATIF CMS #2: Strapi

**Setup:**

```bash
npm create strapi@latest my-strapi
cd my-strapi
npm run develop
```

**Integrasi ke Astro:**

```jsx title="src/pages/blog.astro"
---
const response = await fetch('http://localhost:1337/api/posts');
const posts = await response.json();
---
```

**Keuntungan:**

- ✓ 100% gratis (self-hosted)
- ✓ Admin UI yang bagus
- ✓ Populer, banyak tutorial
- ✓ Support REST & GraphQL

**Kekurangan:**

- ✗ Perlu self-hosting (database)
- ✗ Kurva belajar medium

---

## 8. ALTERNATIF CMS #3: TinaCMS

**Setup:**

```bash
npm install tinacms
```

**Config:**

```typescript title="tina/config.ts"
import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: "YOUR_ID",
  token: "YOUR_TOKEN",
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "src/content/blog",
        format: "mdx",
        fields: [
          { name: "title", label: "Title", type: "string" },
          { name: "body", label: "Body", type: "rich-text" },
        ],
      },
    ],
  },
});
```

**Keuntungan:**

- ✓ Git-based (konten di repo)
- ✓ Visual editor
- ✓ Free tier good
- ✓ Support Astro + Next.js

**Kekurangan:**

- ✗ Relatif baru
- ✗ Dokumentasi bisa confusing

---

## 📋 Challenge

1. **Setup Content Collections** dengan schema yang lengkap
2. **Tambahkan categories** dan implementasi filtering
3. **Integrasikan salah satu CMS** (Strapi atau TinaCMS)

---

## Ringkasan

✓ Content Collections = built-in, simple, gratis  
✓ Type-safe content dengan Zod  
✓ MDX untuk interactive content  
✓ Alternatif CMS: Strapi (powerful), TinaCMS (git-based)  
✓ Pilih sesuai kebutuhan project
