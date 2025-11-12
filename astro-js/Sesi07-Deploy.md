---
sidebar_position: 8
---

# Deploy & Production Ready

## Pembelajaran yang akan dicapai

- Production build optimization
- Image optimization
- Deployment ke Vercel/Netlify
- Environment variables
- Performance monitoring

---

## 1. Production Build

```bash
npm run build
```

Output: `dist/` folder dengan HTML statis siap deploy

### Apa yang di-build:

- ✓ HTML statis
- ✓ CSS diminify
- ✓ JavaScript diminify
- ✓ Image dioptimasi
- ✓ Source maps (untuk debugging)

---

## 2. Build Optimization

```javascript title="astro.config.mjs"
export default defineConfig({
  // Compress assets
  vite: {
    build: {
      minify: "terser",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
          },
        },
      },
    },
  },
  // Sitemap untuk SEO
  integrations: [sitemap()],
});
```

---

## 3. Image Optimization

```jsx
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.png';
---

<!-- Astro Image component - auto optimization -->
<Image
  src={heroImage}
  alt="Hero image"
  width={800}
  height={400}
/>

<!-- Atau gunakan image service -->
<img src="/images/logo.png" alt="Logo" loading="lazy" />
```

---

## 4. Deploy ke Vercel

**Langkah 1: Connect GitHub**

```bash
git push origin main
```

**Langkah 2: Import ke Vercel**

- Buka vercel.com
- Click "New Project"
- Import GitHub repo
- Pilih framework "Other"
- Build command: `npm run build`
- Output directory: `dist`

**Langkah 3: Deploy**

- Click "Deploy"
- Done! Site live di URL Vercel

---

## 5. Deploy ke Netlify

**Langkah 1: Connect Git**

```bash
git push
```

**Langkah 2: New Site**

- Buka netlify.com
- Click "New site from Git"
- Connect GitHub
- Build command: `npm run build`
- Publish directory: `dist`

**Langkah 3: Deploy**

- Click "Deploy site"
- Site live!

---

## 6. Environment Variables

**.env** (local):

```
API_URL=http://localhost:3000
DATABASE_URL=postgres://...
SECRET_KEY=xxx
```

**astro.config.mjs:**

```javascript
export default defineConfig({
  env: {
    server: ["DATABASE_URL", "SECRET_KEY"],
    client: ["API_URL"],
  },
});
```

**Gunakan di halaman:**

```jsx
---
// Server-side only (aman)
const dbUrl = import.meta.env.DATABASE_URL;

// Client-side (public)
const apiUrl = import.meta.env.PUBLIC_API_URL;
---
```

**Production env vars:**

- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment

---

## 7. Monitoring & Analytics

**Add Google Analytics:**

```jsx
---
// src/layouts/BaseLayout.astro
---

<html>
  <head>
    <!-- Google Analytics -->
    <script is:inline>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_ID');
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
  </head>
  <body>
    <!-- content -->
  </body>
</html>
```

---

## 8. Performance Tips

| Optimization          | Impact    |
| --------------------- | --------- |
| Image optimization    | 📊 High   |
| CSS minify            | 📊 Medium |
| Defer non-critical JS | 📊 High   |
| Caching strategy      | 📊 High   |
| Compression (gzip)    | 📊 Medium |

---

## 9. Security Headers

**vercel.json** (Vercel):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

---

## 📋 Challenge

1. **Build & deploy** ke Vercel atau Netlify
2. **Setup environment variables** untuk API
3. **Add analytics** untuk track visitors
4. **Check Core Web Vitals** di PageSpeed Insights

---

## Ringkasan

✓ `npm run build` untuk production  
✓ Image optimization untuk performa  
✓ Deploy ke Vercel/Netlify (1 click!)  
✓ Environment variables untuk config  
✓ Monitoring dengan Google Analytics  
✓ Security headers untuk protection
