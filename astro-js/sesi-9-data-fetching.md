# Data Fetching dan API Routes

## Menggunakan getStaticPaths dan getStaticProps Setara dalam Astro

Di Astro, konsep `getStaticPaths` dan `getStaticProps` dari Next.js diimplementasikan dengan cara yang serupa namun lebih sederhana.

### getStaticPaths

Fungsi `getStaticPaths` digunakan untuk menghasilkan halaman statis secara dinamis. Fungsi ini harus diekspor dari file yang menggunakan dynamic routes.

```jsx title="src/pages/posts/[id].astro"
---
// Fungsi ini menghasilkan semua path yang akan di-render secara statis
export async function getStaticPaths() {
  const posts = await fetch('https://api.example.com/posts').then(response => response.json());

  return posts.map((post) => {
    return {
      params: {
        id: post.id.toString()
      },
      props: {
        post: post
      }
    };
  });
}

// Props yang dikembalikan dari getStaticPaths tersedia di komponen
const { post } = Astro.props;
---

<h1>{post.title}</h1>
<p>{post.content}</p>
```

### getStaticProps

Di Astro, data fetching biasanya dilakukan langsung dalam komponen Astro menggunakan `fetch` atau library lainnya.

```jsx title="src/pages/blog.astro"
---
// Data fetching langsung di komponen
const posts = await fetch('https://api.example.com/posts').then(response => response.json());
---

<html>
  <head>
    <title>Blog Saya</title>
  </head>
  <body>
    <h1>Artikel Terbaru</h1>
    <ul>
      {posts.map(post => (
        <li>
          <a href={`/posts/${post.id}`}>{post.title}</a>
        </li>
      ))}
    </ul>
  </body>
</html>
```

## Membuat API Endpoints di Astro

Astro memungkinkan pembuatan API endpoints melalui file dalam direktori `src/pages/api/`.

### Endpoint Sederhana

```javascript title="src/pages/api/posts.js"
export async function GET({ request }) {
  // Simulasi data dari database
  const posts = [
    { id: 1, title: "Post Pertama", content: "Ini adalah konten pertama" },
    { id: 2, title: "Post Kedua", content: "Ini adalah konten kedua" },
  ];

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
```

### Endpoint dengan Parameter

```javascript title="src/pages/api/posts/[id].js"
export async function GET({ params }) {
  const { id } = params;

  // Fetch data berdasarkan ID
  const post = {
    id: parseInt(id),
    title: `Post ${id}`,
    content: `Konten untuk post ${id}`,
  };

  if (!post) {
    return new Response(JSON.stringify({ error: "Post tidak ditemukan" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
```

## Contoh Fetching Data dari External API

```jsx title="src/pages/users.astro"
---
// Fetch data saat build time
const users = await fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .catch(error => {
    console.error('Error fetching data:', error);
    return [];
  });
---

<html>
  <head>
    <title>Daftar Pengguna</title>
  </head>
  <body>
    <h1>Daftar Pengguna</h1>
    <div class="user-list">
      {users.map(user => (
        <div class="user-card">
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Website: {user.website}</p>
          <p>Perusahaan: {user.company?.name}</p>
        </div>
      ))}
    </div>
  </body>
</html>

<style>
  .user-list {
    display: grid;
    gap: 1rem;
  }
  .user-card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
  }
</style>
```

## Server-side Rendering vs Static Generation

### Static Generation (Default)

- **Halaman di-generate saat build time**
- **Cocok untuk:** Konten yang tidak sering berubah (blog, dokumentasi, portofolio)
- **Keuntungan:** Performa sangat cepat, bisa di-host di CDN
- **Penggunaan:** Default di Astro

```jsx
---
// Halaman statis - di-generate saat build
const data = await fetch('https://api.example.com/static-data');
---

```

### Server-side Rendering (SSR)

- **Halaman di-render di server setiap ada request**
- **Cocok untuk:** Konten personalisasi, data real-time, dashboard
- **Penggunaan:** Perlu konfigurasi di `astro.config.mjs`

```javascript title="astro.config.mjs"
export default {
  output: "server", // Mengaktifkan SSR
};
```

```jsx
---
// Halaman SSR - di-render setiap request
// src/pages/dashboard.astro

// Data akan di-fetch setiap kali halaman diakses
const userData = await fetchUserData(Astro.request);
---
```

### Kapan Menggunakan Masing-masing

**Gunakan Static Generation ketika:**

- Konten tidak berubah sering
- Performa adalah prioritas utama
- Tidak perlu data real-time
- Contoh: Blog, dokumentasi, landing page

**Gunakan Server-side Rendering ketika:**

- Konten berubah sangat sering
- Perlu data real-time
- Konten yang dipersonalisasi untuk setiap user
- Contoh: Dashboard user, e-commerce, aplikasi web interaktif
