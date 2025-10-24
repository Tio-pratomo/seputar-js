# Sesi 14: Authentication dan Security di Astro

Pada sesi ini, kita akan menjelajahi cara implementasi otentikasi dan praktik keamanan di Astro, yang penting untuk aplikasi web yang memerlukan manajemen pengguna dan perlindungan konten.

## 1. Setup Authentication Basics

### Client-side vs Server-side Authentication

Dalam pengembangan web modern, ada dua pendekatan utama untuk otentikasi:

- **Client-side Authentication**: Token (seperti JWT) disimpan di sisi klien (misalnya di localStorage atau cookies) dan dikirim dengan setiap permintaan ke API.
- **Server-side Authentication**: Session disimpan di server dan dikelola melalui cookies atau mekanisme lain di sisi server.

Astro mendukung keduanya, tergantung kebutuhan aplikasi Anda.

### Menggunakan API Routes untuk Authentication

Kita bisa membuat endpoint khusus untuk otentikasi di folder `src/pages/api`:

```javascript
// src/pages/api/login.js
import { validateCredentials } from '../../utils/auth';

export async function POST({ request }) {
  const { username, password } = await request.json();
  
  const user = await validateCredentials(username, password);
  
  if (user) {
    // Set session atau JWT token
    return new Response(JSON.stringify({ success: true, user }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

## 2. Contoh Integrasi dengan Auth Providers

### Integrasi dengan Auth.js (dulu NextAuth.js)

Auth.js adalah salah satu library otentikasi paling populer. Berikut cara mengintegrasikannya dengan Astro:

1. Install dependensi:
```bash
npm install @auth/core @auth/astro
```

2. Buat endpoint untuk Auth:
```javascript
// src/pages/api/auth/[...auth].js
import { Auth } from '@auth/core';
import GitHub from '@auth/core/providers/github';
import Credentials from '@auth/core/providers/credentials';

export async function GET(request) {
  const url = new URL(request.url);
  const response = await Auth(request, {
    providers: [
      GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      Credentials({
        name: 'Credentials',
        credentials: {
          username: { label: 'Username', type: 'text' },
          password: { label: 'Password', type: 'password' }
        },
        authorize: async (credentials) => {
          // Logika otentikasi di sini
          const user = await validateUser(credentials);
          if (user) return user;
          return null;
        }
      })
    ],
    secret: process.env.AUTH_SECRET,
    trustHost: true
  });
  return response;
}

export { GET };
```

3. Gunakan Auth di halaman Astro:
```astro
---
import { getSession } from "@auth/astro";

const session = await getSession(Astro.request);
---

<html>
<head>
  <title>Dashboard</title>
</head>
<body>
  {session ? (
    <div>
      <p>Welcome, {session.user?.name}!</p>
      <button onclick="logout()">Logout</button>
    </div>
  ) : (
    <div>
      <p>Please sign in</p>
      <a href="/api/auth/signin">Sign In</a>
    </div>
  )}
</body>
</html>
```

### Integrasi dengan Supabase Auth

Supabase menyediakan layanan otentikasi yang bisa digunakan di Astro:

1. Install dependensi:
```bash
npm install @supabase/supabase-js
```

2. Buat service Supabase:
```javascript
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

3. Gunakan di komponen atau halaman:
```astro
---
import { supabase } from '../../lib/supabase';

const { data: { session } } = await supabase.auth.getSession();
---

<html>
<body>
  <div id="login-container">
    {session ? (
      <div>
        <p>Signed in as {session.user.email}</p>
        <button onclick="signOut()">Sign out</button>
      </div>
    ) : (
      <div>
        <button onclick="signInWithGoogle()">Sign in with Google</button>
        <form id="login-form">
          <input type="email" id="email" placeholder="Email" />
          <input type="password" id="password" placeholder="Password" />
          <button type="submit">Sign in</button>
        </form>
      </div>
    )}
  </div>
  
  <script>
    import { supabase } from '../lib/supabase.js';
    
    async function signInWithGoogle() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
    }
    
    async function signOut() {
      await supabase.auth.signOut();
      location.reload();
    }
    
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (!error) location.reload();
    });
  </script>
</body>
</html>
```

## 3. Middleware untuk Proteksi Route

Dalam Astro, kita tidak memiliki middleware seperti di Next.js, tetapi kita bisa membuat proteksi route menggunakan beberapa pendekatan:

### A. Fungsi Proteksi di Setiap Halaman

```astro
---
// src/pages/protected-page.astro
import { getSession } from "@auth/astro";

const session = await getSession(Astro.request);

if (!session) {
  // Redirect ke halaman login
  return Astro.redirect('/login');
}
---

<html>
<body>
  <h1>Halaman Proteksi</h1>
  <p>Hanya pengguna yang sudah login yang bisa mengakses halaman ini</p>
</body>
</html>
```

### B. Komponen Layout Proteksi

```astro
// src/layouts/ProtectedLayout.astro
---
import { getSession } from "@auth/astro";

const session = await getSession(Astro.request);

if (!session) {
  return Astro.redirect('/login');
}

const { title } = Astro.props;
---

<!DOCTYPE html>
<html>
<head>
  <title>{title}</title>
</head>
<body>
  <nav>
    <a href="/">Home</a>
    <a href="/dashboard">Dashboard</a>
    <a href="/api/auth/signout">Logout</a>
  </nav>
  
  <main>
    <slot />
  </main>
</body>
</html>
```

## 4. Security Best Practices di Astro

### A. Validasi Input

Selalu validasi input dari pengguna sebelum memprosesnya:

```javascript
// utils/validation.js
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function sanitizeInput(input) {
  return input.replace(/[<>]/g, '');
}
```

### B. Content Security Policy (CSP)

Tambahkan header keamanan di halaman:

```astro
---
// Contoh di layout utama
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.google.com; style-src 'self' 'unsafe-inline';",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};
---

<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Secure App</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

### C. Protecting Sensitive Data

Jangan pernah menyertakan API keys atau informasi sensitif dalam kode klien:

```javascript
// JANGAN lakukan ini:
const apiKey = "sk-1234567890"; // Tidak aman!

// LAKUKAN ini:
const API_KEY = import.meta.env.VITE_API_KEY; // Server-side only
```

### D. Cross-Site Request Forgery (CSRF) Protection

Jika menggunakan form, pastikan untuk mengimplementasikan CSRF token:

```javascript
// utils/csrf.js
import { nanoid } from 'nanoid';

export function generateCSRFToken() {
  return nanoid();
}

export function verifyCSRFToken(token, expectedToken) {
  return token === expectedToken;
}
```

### E. Session Management

Pastikan session diatur dengan aman:

```javascript
// Contoh pengaturan cookie yang aman
const secureCookie = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000 // 24 jam
};
```