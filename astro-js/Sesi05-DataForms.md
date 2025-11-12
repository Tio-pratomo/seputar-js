---
sidebar_position: 6
---

# Data Management & Forms

## Pembelajaran yang akan dicapai

- API routes di Astro
- Data fetching (server & client)
- Form handling dan validasi
- Dynamic routing
- API integration

---

## 1. API Routes

```javascript title="src/pages/api/posts.js"
export async function GET() {
  const posts = [
    { id: 1, title: "Post 1", date: "2025-01-01" },
    { id: 2, title: "Post 2", date: "2025-01-02" },
  ];

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST({ request }) {
  const data = await request.json();

  // Validasi
  if (!data.title || !data.content) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  // Simpan ke database (contoh)
  // await db.posts.create(data);

  return new Response(
    JSON.stringify({
      success: true,
      id: Math.random(),
    })
  );
}
```

---

## 2. Data Fetching Server-Side

```jsx title="src/pages/all-posts.astro"
---
// Fetch di server saat build time

const response = await fetch('https://api.example.com/posts');
const posts = await response.json();
---

<html>
  <body>
    <h1>All Posts</h1>
    {posts.map(post => (
      <article>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </article>
    ))}
  </body>
</html>
```

---

## 3. Data Fetching Client-Side (React)

```jsx title="src/components/PostSearch.jsx"
import { useState, useEffect } from "react";

export default function PostSearch() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {filtered.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 4. Form Handling & Validation

```jsx title="src/components/ContactForm.jsx"
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Invalid email");
      return false;
    }
    if (!formData.message.trim()) {
      setError("Message is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Submit failed");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset success message setelah 3 detik
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {error && <div className="error">{error}</div>}
      {status === "success" && <div className="success">Message sent!</div>}

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={status === "submitting"}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={status === "submitting"}
        />
      </label>

      <label>
        Message:
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={status === "submitting"}
        />
      </label>

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
```

**Server endpoint:**

```javascript title="src/pages/api/contact.js"
export async function POST({ request }) {
  const data = await request.json();

  // Kirim email (gunakan nodemailer atau service lain)
  console.log("Email received:", data);

  return new Response(JSON.stringify({ success: true }));
}
```

---

## 5. Dynamic Routing

```jsx title="src/pages/blog/[slug].astro"
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');

  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}

const { post } = Astro.props;
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

## 6. Query Parameters

```jsx title="src/pages/search.astro"
---
const query = Astro.url.searchParams.get('q');
const page = Astro.url.searchParams.get('page') || 1;

// Fetch dari API dengan query params
const response = await fetch(
  `/api/search?q=${query}&page=${page}`
);
const results = await response.json();
---

<html>
  <body>
    <h1>Search Results for "{query}"</h1>
    {results.map(item => (
      <div>{item.title}</div>
    ))}
  </body>
</html>
```

---

## 📋 Challenge

1. **Buat form submission** yang save ke file atau database
2. **Implement search** dengan filtering dan pagination
3. **Add validation** untuk multiple field types

---

## Ringkasan

✓ API routes untuk backend logic  
✓ Server-side fetching saat build  
✓ Client-side fetching dengan React  
✓ Form handling dengan validation  
✓ Dynamic routes dengan getStaticPaths  
✓ Query parameters handling
