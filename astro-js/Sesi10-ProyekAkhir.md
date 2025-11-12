---
sidebar_position: 11
---

# Proyek Akhir - Blog Komprehensif

## Pembelajaran yang akan dicapai

- Menggabungkan semua konsep Astro + React
- Build production-ready blog
- Implementasi fitur lengkap
- Deployment ke production
- **DURATION: 3 HOURS WORKSHOP**

---

## 1. Project Setup

```bash
npm create astro@latest my-production-blog
cd my-production-blog
npx astro add react tailwind
npm run dev
```

---

## 2. Folder Structure

```
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── BlogCard.astro
│   ├── SearchBox.jsx (React)
│   ├── CommentForm.jsx (React)
│   └── TableOfContents.jsx (React)
├── layouts/
│   ├── BaseLayout.astro
│   └── BlogLayout.astro
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── tag/
│   │   └── [tag].astro
│   └── api/
│       ├── search.js
│       ├── comment.js
│       └── views.js
├── content/
│   ├── config.ts
│   └── blog/
├── utils/
│   ├── formatDate.ts
│   ├── slugify.ts
│   └── getReadingTime.ts
├── types/
│   └── blog.ts
└── styles/
    └── global.css
```

---

## 3. Content Collections Config

**src/content/config.ts:**

```typescript
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string().max(100),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string().url(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    category: z.enum(["tutorial", "review", "guide"]),
  }),
});

export const collections = { blog };
```

---

## 4. Sample Content

**src/content/blog/getting-started.md:**

```markdown
---
title: "Getting Started with Astro"
description: "Learn how to build fast websites with Astro"
pubDate: 2025-01-01
author: "John Doe"
image: "https://..."
tags: ["astro", "web-dev", "javascript"]
category: "guide"
---

# Getting Started with Astro

Astro is the web framework for building fast websites...
```

---

## 5. Homepage

**src/pages/index.astro:**

```jsx
---
import BaseLayout from '../layouts/BaseLayout.astro';
import BlogCard from '../components/BlogCard.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog'))
  .filter(p => !p.data.draft)
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 6);
---

<BaseLayout title="My Blog">
  <section class="hero">
    <div class="hero-content">
      <h1>Welcome to My Blog</h1>
      <p>Sharing knowledge about web development</p>
    </div>
  </section>

  <section class="recent-posts">
    <h2>Recent Posts</h2>
    <div class="posts-grid">
      {posts.map(post => (
        <BlogCard
          title={post.data.title}
          date={post.data.pubDate}
          author={post.data.author}
          slug={post.slug}
          description={post.data.description}
          image={post.data.image}
        />
      ))}
    </div>
  </section>
</BaseLayout>

<style>
  .hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 2rem;
    text-align: center;
  }

  .hero-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .recent-posts {
    max-width: 1200px;
    margin: 4rem auto;
    padding: 0 2rem;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
</style>
```

---

## 6. Blog Post Detail

**src/pages/blog/[slug].astro:**

```jsx
---
import { getCollection, render } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';
import CommentForm from '../../components/CommentForm.jsx';
import TableOfContents from '../../components/TableOfContents.jsx';
import { getReadingTime } from '../../utils/getReadingTime';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}

const { post } = Astro.props;
const { Content, headings } = await render(post);
const readingTime = getReadingTime(post.body);
---

<BlogLayout
  title={post.data.title}
  description={post.data.description}
>
  <article class="blog-post">
    <header>
      <h1>{post.data.title}</h1>
      <div class="meta">
        <span>{post.data.pubDate.toLocaleDateString('id-ID')}</span>
        <span>•</span>
        <span>{post.data.author}</span>
        <span>•</span>
        <span>{readingTime} min read</span>
      </div>
      <img src={post.data.image} alt={post.data.title} />
    </header>

    <div class="content-wrapper">
      <aside>
        <TableOfContents headings={headings} client:visible />
      </aside>

      <main class="content">
        <Content />

        <footer class="post-footer">
          <div class="tags">
            {post.data.tags.map(tag => (
              <a href={`/tag/${tag}`} class="tag">#{tag}</a>
            ))}
          </div>
        </footer>
      </main>
    </div>

    <section class="comments">
      <h2>Comments</h2>
      <CommentForm client:visible postSlug={post.slug} />
    </section>
  </article>
</BlogLayout>

<style>
  .blog-post {
    max-width: 900px;
    margin: 0 auto;
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 3rem;
  }

  aside {
    position: sticky;
    top: 2rem;
    height: fit-content;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 2rem;
  }

  .tag {
    padding: 0.25rem 0.75rem;
    background: #f3f4f6;
    border-radius: 20px;
    text-decoration: none;
    color: #667eea;
    font-size: 0.875rem;
  }
</style>
```

---

## 7. Search Functionality

**src/pages/api/search.js:**

```javascript
import { getCollection } from "astro:content";

export async function GET({ url }) {
  const query = url.searchParams.get("q")?.toLowerCase() || "";

  if (!query) {
    return new Response(JSON.stringify({ results: [] }));
  }

  const posts = await getCollection("blog");
  const results = posts
    .filter((p) => !p.data.draft)
    .filter(
      (p) =>
        p.data.title.toLowerCase().includes(query) ||
        p.data.description.toLowerCase().includes(query)
    )
    .map((p) => ({
      slug: p.slug,
      title: p.data.title,
      description: p.data.description,
    }));

  return new Response(JSON.stringify({ results }));
}
```

**SearchBox Component:**

```jsx
// src/components/SearchBox.jsx
import { useState, useEffect } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    fetch(`/api/search?q=${query}`)
      .then((r) => r.json())
      .then((data) => setResults(data.results));
  }, [query]);

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />

      {isOpen && results.length > 0 && (
        <ul className="results">
          {results.map((post) => (
            <li key={post.slug}>
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## 8. Comments Feature

```jsx
// src/components/CommentForm.jsx
import { useState } from "react";

export default function CommentForm({ postSlug }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, content, postSlug }),
    });

    setName("");
    setEmail("");
    setContent("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      {submitted && <p className="success">Comment submitted!</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <textarea
        placeholder="Comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button type="submit">Post Comment</button>
    </form>
  );
}
```

---

## 9. Deploy

```bash
# Build
npm run build

# Preview
npm run preview

# Deploy ke Vercel
npm install -g vercel
vercel
```

---

## 📋 Fitur yang Diimplementasikan

✓ Blog homepage dengan list posts  
✓ Detail halaman dengan full content  
✓ Search functionality  
✓ Tags & filtering  
✓ Comments system  
✓ Table of contents  
✓ Reading time estimation  
✓ Responsive design  
✓ Dark mode (bonus)  
✓ SEO optimization  
✓ Production deployment

---

## 🎯 Challenge

1. **Add dark mode toggle** dengan localStorage
2. **Implement pagination** di blog list
3. **Add related posts** suggestion
4. **Create admin dashboard** untuk manage posts
5. **Add RSS feed** untuk subscribers
6. **Deploy ke production** dengan monitoring

---

## ✅ Congratulations!

Anda sudah mempelajari Astro dari fundamentals hingga production-ready project!

**Next steps:**

- Build personal projects dengan Astro
- Explore advanced topics (i18n, SSR, etc)
- Join Astro community
- Share portfolio projects

---

**Happy Building! 🚀**
