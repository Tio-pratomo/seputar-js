# Optimasi dan Performa

## Penggunaan Komponen Island secara Strategis

Komponen Island adalah konsep fundamental Astro di mana komponen interaktif diisolasi dan di-load secara terpisah.

### Dasar Komponen Island

```jsx title="src/pages/home.astro"
---
import Counter from '../components/Counter.jsx';
import Search from '../components/Search.vue';
import InteractiveChart from '../components/InteractiveChart.svelte';
---

<!-- Komponen statis (zero JavaScript) -->
<Header />

<!-- Komponen Island dengan interaktivitas -->
<Counter client:load />
<Search client:idle />
<InteractiveChart client:visible />
```

### Strategi Loading Komponen Island

```jsx
---
import HeavyComponent from '../components/HeavyComponent.jsx';
import ChatWidget from '../components/ChatWidget.jsx';
import Analytics from '../components/Analytics.jsx';
---

<!--
  client:load - Prioritas tinggi, load segera
  Cocok untuk: Komponen kritis yang harus tersedia segera
-->
<HeavyComponent client:load />

<!--
  client:idle - Load setelah halaman selesai render
  Cocok untuk: Komponen yang tidak kritis
-->
<ChatWidget client:idle />

<!--
  client:visible - Load ketika komponen terlihat di viewport
  Cocok untuk: Komponen di bagian bawah halaman
-->
<Analytics client:visible />

<!--
  client:media - Load berdasarkan media query
  Cocok untuk: Komponen yang hanya dibutuhkan di device tertentu
-->
<MobileMenu client:media="(max-width: 768px)" />
```

### Contoh Implementasi Strategis

```jsx
---
// src/pages/product.astro
import ProductGallery from '../components/ProductGallery.jsx';
import ProductRecommendations from '../components/ProductRecommendations.jsx';
import ProductReviews from '../components/ProductReviews.jsx';
import AddToCart from '../components/AddToCart.jsx';
import SocialShare from '../components/SocialShare.jsx';
---

<div class="product-page">
  <!-- Kritis - load segera -->
  <ProductGallery client:load />

  <div class="product-info">
    <h1>{product.name}</h1>
    <p>{product.description}</p>

    <!-- Sangat kritis - harus tersedia segera -->
    <AddToCart product={product} client:load />
  </div>

  <!-- Tidak kritis - load saat idle -->
  <ProductRecommendations client:idle />

  <!-- Konten panjang - load saat terlihat -->
  <ProductReviews client:visible />

  <!-- Footer - load dengan prioritas rendah -->
  <SocialShare client:idle />
</div>
```

## Image Optimization dengan `<Image />` dan `<Picture />` Astro

### Komponen `<Image />`

```jsx
---
// src/pages/gallery.astro
import { Image } from 'astro:assets';
import heroImage from '../images/hero.jpg';
import productImage from '../images/product.png';
---

<!-- Optimasi otomatis dengan format modern -->
<Image
  src={heroImage}
  alt="Deskripsi gambar hero"
  width={1200}
  height={600}
  formats={['avif', 'webp', 'jpeg']}
  quality={80}
  loading="eager"
/>

<!-- Gambar responsif -->
<Image
  src={productImage}
  alt="Produk kami"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, 50vw"
  format="webp"
/>
```

### Komponen `<Picture />` untuk Art Direction

```jsx
---
import { Picture } from 'astro:assets';
import desktopHero from '../images/hero-desktop.jpg';
import mobileHero from '../images/hero-mobile.jpg';
import tabletHero from '../images/hero-tablet.jpg';
---

<Picture
  src={desktopHero}
  alt="Hero image responsive"
  widths={[768, 1024, 1536]}
  sizes="100vw"
  formats={['avif', 'webp', 'jpeg']}
>
  <!-- Art direction untuk device berbeda -->
  <source
    srcset={mobileHero}
    media="(max-width: 768px)"
    width={400}
    height={300}
  />
  <source
    srcset={tabletHero}
    media="(max-width: 1024px)"
    width={800}
    height={400}
  />
</Picture>
```

### Gambar Dinamis dengan Optimasi

```jsx
---
// src/pages/products/[id].astro
import { getImage } from 'astro:assets';

export async function getStaticPaths() {
  const products = await fetchProducts();
  return products.map(product => ({
    params: { id: product.id },
    props: { product }
  }));
}

const { product } = Astro.props;

// Generate optimized image URL
const optimizedImage = await getImage({
  src: product.imageUrl,
  width: 800,
  quality: 75,
  format: 'webp'
});
---

<div class="product-detail">
  <img
    src={optimizedImage.src}
    alt={product.name}
    width="800"
    height="600"
    loading="lazy"
  />
</div>
```

## Lazy Loading dan Preloading Resources

### Lazy Loading Gambar

```jsx title="src/pages/blog.astro"
---
const posts = await fetchBlogPosts();
---

<div class="blog-grid">
  {posts.map((post, index) => (
    <article class="blog-card">
      <!-- Gambar pertama load eager, sisanya lazy -->
      <img
        src={post.thumbnail}
        alt={post.title}
        loading={index < 3 ? "eager" : "lazy"}
        width="400"
        height="250"
      />
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
    </article>
  ))}
</div>
```

### Preloading Resources Kritis

```jsx title="src/pages/home.astro"
---
import { Head } from 'astro:head';
---

<Head>
  <!-- Preload font kritis -->
  <link
    rel="preload"
    href="/fonts/inter-var.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />

  <!-- Preload gambar hero -->
  <link
    rel="preload"
    href="/images/hero.webp"
    as="image"
    media="(min-width: 768px)"
  />

  <!-- Preload CSS kritis -->
  <link
    rel="preload"
    href="/styles/critical.css"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'"
  />

  <!-- Preload komponen interaktif -->
  <link
    rel="modulepreload"
    href="/components/Counter.jsx"
  />
</Head>
```

### Dynamic Import untuk Komponen Berat

```jsx title="src/pages/dashboard.astro"
---
import { mount } from 'astro:mount';

// Dynamic import untuk komponen berat
const loadHeavyComponent = () => import('../components/HeavyChart.jsx');
---

<div id="chart-container"></div>

<script>
  // Load komponen ketika dibutuhkan
  document.addEventListener('DOMContentLoaded', async () => {
    const button = document.getElementById('show-chart');
    const container = document.getElementById('chart-container');

    button.addEventListener('click', async () => {
      const { default: HeavyChart } = await loadHeavyComponent();
      mount(container, HeavyChart);
    });
  });
</script>
```

## Pengukuran Core Web Vitals dan Optimasi SEO

### Struktur HTML untuk SEO

```jsx title="src/pages/blog/[slug].astro"
---
import { Head } from 'astro:head';

const { post } = Astro.props;
const canonicalUrl = `${Astro.site.origin}${Astro.url.pathname}`;
---

<Head>
  <title>{post.title} - Situs Saya</title>
  <meta name="description" content={post.excerpt} />
  <link rel="canonical" href={canonicalUrl} />

  <!-- Open Graph -->
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.excerpt} />
  <meta property="og:image" content={post.thumbnail} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="article" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={post.title} />
  <meta name="twitter:description" content={post.excerpt} />
  <meta name="twitter:image" content={post.thumbnail} />

  <!-- Schema.org markup -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "{post.title}",
      "description": "{post.excerpt}",
      "image": "{post.thumbnail}",
      "author": {
        "@type": "Person",
        "name": "{post.author}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Situs Saya",
        "logo": {
          "@type": "ImageObject",
          "url": "{Astro.site.origin}/logo.jpg"
        }
      },
      "datePublished": "{post.publishedAt}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "{canonicalUrl}"
      }
    }
  </script>
</Head>
```

### Optimasi Core Web Vitals

```jsx title="src/layouts/Layout.astro"
---
import { Head } from 'astro:head';
---

<Head>
  <!-- Critical CSS Inline -->
  <style>
    /* CSS kritis untuk above-the-fold content */
    .header { position: sticky; top: 0; }
    .hero { height: 100vh; background: #fff; }
  </style>

  <!-- Non-critical CSS async -->
  <link
    rel="stylesheet"
    href="/styles/non-critical.css"
    media="print"
    onload="this.media='all'"
  />

  <!-- Preconnect ke domain eksternal -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Font loading optimasi -->
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
    rel="stylesheet"
    media="print"
    onload="this.media='all'"
  />
</Head>

<!-- Struktur semantik untuk CLS rendah -->
<header class="header">
  <nav><!-- Navigation --></nav>
</header>

<main>
  <!-- Reserve space untuk gambar -->
  <div class="hero-image-container">
    <img
      src="/hero.jpg"
      alt="Hero"
      width="1200"
      height="600"
      loading="eager"
      style="aspect-ratio: 1200/600"
    />
  </div>
</main>
```

### Monitoring Web Vitals

```javascript title="src/components/WebVitalsTracker.jsx"
import { useEffect } from "react";
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

export default function WebVitalsTracker() {
  useEffect(() => {
    const reportWebVitals = (metric) => {
      // Kirim ke analytics service
      console.log(metric);

      // atau kirim ke API endpoint
      fetch("/api/analytics/vitals", {
        method: "POST",
        body: JSON.stringify(metric),
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      });
    };

    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  }, []);

  return null;
}
```

## Bundle Analysis dan Asset Optimization

### Analisis Bundle

```javascript title="astro.config.mjs"
import { defineConfig } from "astro/config";
import bundleAnalyzer from "astro-bundle-analyser";

export default defineConfig({
  integrations: [
    // Analisis bundle size
    bundleAnalyzer({
      analyzerMode: "static",
      reportFilename: ".bundles/report.html",
    }),
  ],

  build: {
    // Split chunks optimization
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          utils: ["lodash", "date-fns"],
        },
      },
    },
  },

  // Kompresi dan minification
  compressHTML: true,
  vite: {
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  },
});
```

### Optimasi Asset

```jsx title="src/pages/optimized.astro"
---
import { getImage } from 'astro:assets';
---

<html>
  <head>
    <!-- Resource Hints -->
    <link rel="dns-prefetch" href="https://api.example.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">

    <!-- Cache Strategy -->
    <meta http-equiv="Cache-Control" content="public, max-age=3600">
  </head>

  <body>
    <!-- Gambar dengan optimasi format modern -->
    <picture>
      <source
        type="image/avif"
        srcset="
          /images/photo.avif?width=400 400w,
          /images/photo.avif?width=800 800w,
          /images/photo.avif?width=1200 1200w
        "
        sizes="(max-width: 768px) 100vw, 50vw"
      >
      <source
        type="image/webp"
        srcset="
          /images/photo.webp?width=400 400w,
          /images/photo.webp?width=800 800w,
          /images/photo.webp?width=1200 1200w
        "
        sizes="(max-width: 768px) 100vw, 50vw"
      >
      <img
        src="/images/photo.jpg?width=800"
        alt="Optimized image"
        loading="lazy"
        width="800"
        height="450"
      >
    </picture>

    <!-- Komponen dengan loading strategis -->
    <script>
      // Preload visible components
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const component = entry.target.dataset.component;
            import(`/components/${component}.js`);
            observer.unobserve(entry.target);
          }
        });
      });

      document.querySelectorAll('[data-component]').forEach(el => {
        observer.observe(el);
      });
    </script>
  </body>
</html>
```

### Konfigurasi Build untuk Performa

```javascript title="astro.config.mjs"
export default defineConfig({
  // Output static site untuk performa terbaik
  output: "static",

  build: {
    // Inline assets kecil
    inlineStylesheets: "auto",

    // Split chunks secara optimal
    rollupOptions: {
      output: {
        chunkFileNames: "chunks/[name]-[hash].js",
        entryFileNames: "entry-[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },

  // Kompresi
  compressHTML: true,

  // Image optimization
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
```

Dengan menerapkan teknik-teknik optimasi ini, Anda dapat mencapai skor Core Web Vitals yang excellent dan memberikan pengalaman pengguna yang cepat dan responsif.
