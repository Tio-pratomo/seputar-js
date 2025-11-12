---
sidebar_position: 9
---

# Authentication & Security

## Pembelajaran yang akan dicapai

- Basic security concepts
- API authentication (JWT)
- Environment variables protection
- Common vulnerabilities & prevention
- CORS & CSRF protection

---

## 1. Basic Security Concepts

### Don'ts:

- ✗ Hardcode secrets di code
- ✗ Send passwords di query params
- ✗ Trust user input
- ✗ Expose internal APIs

### Dos:

- ✓ Use HTTPS always
- ✓ Validate input
- ✓ Hash passwords
- ✓ Use environment variables

---

## 2. JWT Authentication

**src/pages/api/login.js:**

```javascript
export async function POST({ request }) {
  const { email, password } = await request.json();

  // Validasi
  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  // Cari user di database
  const user = await db.users.findOne({ email });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 401,
    });
  }

  // Verify password
  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    import.meta.env.SECRET_KEY,
    { expiresIn: "24h" }
  );

  return new Response(JSON.stringify({ token, user: { id: user.id, email } }));
}
```

**Client-side:**

```jsx title="src/components/LoginForm.jsx"
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      return;
    }

    // Simpan token ke localStorage
    localStorage.setItem("token", data.token);

    // Redirect ke dashboard
    window.location.href = "/dashboard";
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 3. Protected Routes

```jsx title="src/pages/dashboard.astro"
---
// Validasi token di server

const token = Astro.cookies.get('token').value;

if (!token) {
  return Astro.redirect('/login');
}

try {
  const decoded = jwt.verify(token, import.meta.env.SECRET_KEY);
  const user = await db.users.findById(decoded.userId);
} catch (err) {
  return Astro.redirect('/login');
}
---

<html>
  <body>
    <h1>Welcome, {user.email}!</h1>
  </body>
</html>
```

---

## 4. Input Validation & Sanitization

```javascript title="src/pages/api/comment.js"
import { z } from "zod";
import DOMPurify from "dompurify";

const CommentSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  content: z.string().min(1).max(5000),
});

export async function POST({ request }) {
  const data = await request.json();

  // Validasi schema
  try {
    const validated = CommentSchema.parse(data);
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid input" }), {
      status: 400,
    });
  }

  // Sanitize HTML
  const cleanContent = DOMPurify.sanitize(data.content);

  // Simpan ke database
  await db.comments.create({
    ...validated,
    content: cleanContent,
  });

  return new Response(JSON.stringify({ success: true }));
}
```

---

## 5. Environment Variables Protection

**.env.local** (jangan commit):

```
DATABASE_URL=postgres://...
SECRET_KEY=your-secret-key
STRIPE_SECRET_KEY=sk_...
```

**astro.config.mjs:**

```javascript
export default defineConfig({
  env: {
    server: ["DATABASE_URL", "SECRET_KEY", "STRIPE_SECRET_KEY"],
    client: ["PUBLIC_API_URL"], // Hanya public vars
  },
});
```

**Akses di code:**

```javascript
// ✓ Safe - server-only
const dbUrl = import.meta.env.DATABASE_URL;

// ✗ Exposed to client!
const secretKey = import.meta.env.SECRET_KEY;
```

---

## 6. CORS & CSRF Protection

```javascript title="src/pages/api/protected.js"
export async function POST({ request }) {
  // Check origin
  const origin = request.headers.get("origin");
  if (origin !== import.meta.env.ALLOWED_ORIGIN) {
    return new Response(JSON.stringify({ error: "CORS error" }), {
      status: 403,
    });
  }

  // Check CSRF token
  const token = request.headers.get("x-csrf-token");
  if (!token || token !== request.cookies.get("csrf").value) {
    return new Response(JSON.stringify({ error: "CSRF token invalid" }), {
      status: 403,
    });
  }

  // Process request
  return new Response(JSON.stringify({ success: true }));
}
```

---

## 7. Password Hashing

```bash
npm install bcryptjs
```

```javascript
import bcrypt from "bcryptjs";

// Hash password saat register
const hashedPassword = await bcrypt.hash(password, 10);
await db.users.create({ email, password: hashedPassword });

// Verify saat login
const isValid = await bcrypt.compare(password, user.password);
```

---

## 📋 Challenge

1. **Implement JWT login** dengan token storage
2. **Protect API route** dengan authentication
3. **Add input validation** dengan Zod
4. **Setup CORS** untuk specific origins

---

## Ringkasan

✓ JWT untuk stateless authentication  
✓ Input validation & sanitization  
✓ Environment variables untuk secrets  
✓ CORS & CSRF protection  
✓ Password hashing dengan bcrypt  
✓ Protected routes dengan token verification
