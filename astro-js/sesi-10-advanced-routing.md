# Advanced Routing

## Dynamic Routes

Dynamic routes memungkinkan Anda membuat halaman berdasarkan data dinamis menggunakan parameter dalam nama file.

### Basic Dynamic Route

```jsx title="src/pages/products/[id].astro"
---
export async function getStaticPaths() {
  const products = [
    { id: '1', name: 'Laptop', price: 10000000 },
    { id: '2', name: 'Smartphone', price: 5000000 },
    { id: '3', name: 'Tablet', price: 3000000 }
  ];

  return products.map((product) => {
    return {
      params: { id: product.id },
      props: { product }
    };
  });
}

const { product } = Astro.props;
---

<html>
  <head>
    <title>{product.name}</title>
  </head>
  <body>
    <h1>{product.name}</h1>
    <p>Harga: Rp {product.price.toLocaleString('id-ID')}</p>
    <a href="/products">Kembali ke daftar produk</a>
  </body>
</html>
```

### Multiple Parameters

```jsx title="src/pages/category/[category]/[subcategory].astro"
---
export async function getStaticPaths() {
  const categories = [
    { category: 'elektronik', subcategory: 'laptop' },
    { category: 'elektronik', subcategory: 'smartphone' },
    { category: 'pakaian', subcategory: 'kaos' },
    { category: 'pakaian', subcategory: 'celana' }
  ];

  return categories.map((item) => {
    return {
      params: {
        category: item.category,
        subcategory: item.subcategory
      }
    };
  });
}

const { category, subcategory } = Astro.params;
---

<h1>Kategori: {category}</h1>
<h2>Subkategori: {subcategory}</h2>
```

## Nested Routes dan Route Parameters

### Rest Parameters

Menggunakan `[...path]` untuk menangkap semua segmen path:

```jsx title="src/pages/docs/[...path].astro"
---
const { path } = Astro.params;

// Path akan berupa array dari semua segmen URL
const pathSegments = path || [];
---

<html>
  <head>
    <title>Dokumentasi: {pathSegments.join(' / ')}</title>
  </head>
  <body>
    <nav>
      <a href="/docs">Home Dokumentasi</a>
      {pathSegments.map((segment, index) => {
        const currentPath = pathSegments.slice(0, index + 1).join('/');
        return (
          <span>
            › <a href={`/docs/${currentPath}`}>{segment}</a>
          </span>
        );
      })}
    </nav>

    <h1>Halaman: {pathSegments.join(' / ')}</h1>
    <p>Ini adalah halaman dokumentasi untuk path: {pathSegments.join('/')}</p>
  </body>
</html>
```

### Optional Rest Parameters

Menggunakan `[[...path]]` untuk parameter yang opsional:

```jsx title="src/pages/[[...path]].astro"
---
// Halaman ini akan menangani:
// - / (root)
// - /segmen-apa-saja
// - /segmen1/segmen2/dll

const { path } = Astro.params;
const pathSegments = path || ['home'];
---

<h1>Halaman: {pathSegments.join(' / ')}</h1>
```

## Redirects dan Custom 404 Pages

### Redirects

Redirect bisa dilakukan di client-side atau server-side:

```jsx title="src/pages/old-page.astro"
---
// Redirect menggunakan meta tag
import { Head } from 'astro:head';
---

<Head>
  <meta http-equiv="refresh" content="0; url=/new-page" />
</Head>

<!-- Atau redirect menggunakan JavaScript -->
<script>
  window.location.href = '/new-page';
</script>

<p>Redirecting ke halaman baru...</p>
```

### Custom 404 Page

Buat file `src/pages/404.astro`:

```jsx
---

---

<html>
  <head>
    <title>Halaman Tidak Ditemukan - 404</title>
  </head>
  <body>
    <div class="error-container">
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
      <div class="error-actions">
        <a href="/" class="btn">Kembali ke Home</a>
        <a href="/contact" class="btn">Hubungi Kami</a>
      </div>
    </div>
  </body>
</html>

<style>
  .error-container {
    text-align: center;
    padding: 4rem 2rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .error-actions {
    margin-top: 2rem;
  }

  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    margin: 0 0.5rem;
    background: #007acc;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
</style>
```

## URL Building dan Query Parameters

### Mengakses Query Parameters

```jsx title="src/pages/search.astro"
---
const url = new URL(Astro.request.url);
const query = url.searchParams.get('q') || '';
const category = url.searchParams.get('category') || 'all';
const page = parseInt(url.searchParams.get('page') || '1');

// Simulasi data hasil pencarian
const searchResults = query ? [
  { id: 1, title: `Hasil untuk "${query}" - 1`, category: 'article' },
  { id: 2, title: `Hasil untuk "${query}" - 2`, category: 'news' }
] : [];
---

<html>
  <head>
    <title>Pencarian: {query || 'Semua'}</title>
  </head>
  <body>
    <h1>Hasil Pencarian</h1>

    <!-- Form Pencarian -->
    <form method="GET" action="/search">
      <input
        type="text"
        name="q"
        value={query}
        placeholder="Cari sesuatu..."
      />
      <select name="category">
        <option value="all" selected={category === 'all'}>Semua Kategori</option>
        <option value="article" selected={category === 'article'}>Artikel</option>
        <option value="news" selected={category === 'news'}>Berita</option>
      </select>
      <button type="submit">Cari</button>
    </form>

    <!-- Hasil Pencarian -->
    {query && (
      <div class="results">
        <h2>Menampilkan hasil untuk "{query}"</h2>

        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map(result => (
              <li>
                <h3>{result.title}</h3>
                <span class="category">{result.category}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada hasil ditemukan</p>
        )}
      </div>
    )}

    <!-- Pagination -->
    <div class="pagination">
      {page > 1 && (
        <a href={`/search?q=${query}&category=${category}&page=${page - 1}`}>
          Sebelumnya
        </a>
      )}
      <span>Halaman {page}</span>
      <a href={`/search?q=${query}&category=${category}&page=${page + 1}`}>
        Berikutnya
      </a>
    </div>
  </body>
</html>

<style>
  form {
    margin-bottom: 2rem;
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  input, select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    padding: 0.5rem 1rem;
    background: #007acc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .results {
    margin: 2rem 0;
  }

  .results ul {
    list-style: none;
    padding: 0;
  }

  .results li {
    padding: 1rem;
    border: 1px solid #eee;
    margin-bottom: 1rem;
    border-radius: 4px;
  }

  .category {
    background: #f0f0f0;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.8rem;
  }

  .pagination {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-top: 2rem;
  }
</style>
```

### Membangun URL Dinamis

```jsx title="src/pages/products/index.astro"
---
const products = [
  { id: '1', name: 'Laptop Gaming', slug: 'laptop-gaming' },
  { id: '2', name: 'Smartphone Flagship', slug: 'smartphone-flagship' },
  { id: '3', name: 'Wireless Headphones', slug: 'wireless-headphones' }
];
---

<html>
  <head>
    <title>Daftar Produk</title>
  </head>
  <body>
    <h1>Produk Kami</h1>

    <div class="product-grid">
      {products.map(product => (
        <div class="product-card">
          <h3>{product.name}</h3>
          <!-- Beberapa cara membangun URL -->
          <a href={`/products/${product.id}`}>Lihat via ID</a>
          <a href={`/products/${product.slug}`}>Lihat via Slug</a>
          <a href={`/products/${product.id}-${product.slug}`}>Lihat via ID dan Slug</a>
        </div>
      ))}
    </div>
  </body>
</html>

<style>
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }

  .product-card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
  }

  .product-card a {
    display: block;
    margin: 0.5rem 0;
    color: #007acc;
    text-decoration: none;
  }
</style>
```

Dengan memahami advanced routing di Astro, Anda dapat membuat aplikasi web yang kompleks dengan struktur URL yang bersih dan mudah dikelola.
