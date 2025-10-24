# Sesi 16: Testing di Astro

Memastikan kualitas dan keandalan kode adalah bagian penting dari pengembangan perangkat lunak. Sesi ini membahas cara menyiapkan lingkungan pengujian (testing) untuk proyek Astro, mulai dari unit test komponen hingga end-to-end testing.

## 1. Setup Lingkungan Testing dengan Vitest

**Vitest** adalah framework unit testing modern yang sangat cepat dan kompatibel dengan Vite, yang juga digunakan oleh Astro. Ini menjadikannya pilihan yang sangat baik untuk proyek Astro.

### Langkah-langkah Setup:

1.  **Jalankan Perintah Integrasi**
    Astro menyediakan resep untuk menambahkan Vitest dengan mudah:
    ```bash
    npx astro add vitest
    ```
    Perintah ini akan menginstal `vitest` dan membuat file konfigurasi `vitest.config.ts`.

2.  **Tambahkan Skrip ke `package.json`**
    Tambahkan skrip `test` untuk menjalankan pengujian:
    ```json
    // package.json
    "scripts": {
      "dev": "astro dev",
      "start": "astro start",
      "build": "astro build",
      "preview": "astro preview",
      "astro": "astro",
      "test": "vitest"
    }
    ```

3.  **Buat Test Pertama Anda**
    Buat folder `tests/` di root proyek Anda dan tambahkan file test pertama, misalnya `sum.test.ts`.

    ```typescript
    // tests/sum.test.ts
    import { expect, test } from 'vitest';

    function sum(a, b) {
      return a + b;
    }

    test('sum function', () => {
      expect(sum(1, 2)).toBe(3);
    });
    ```

4.  **Jalankan Test**
    ```bash
    npm test
    ```

## 2. Testing Komponen Astro dan Layout

Untuk menguji komponen Astro (`.astro`) atau komponen UI framework (React, Vue), kita memerlukan **React Testing Library** (atau varian lainnya) untuk merender komponen dan berinteraksi dengannya.

1.  **Install Dependensi Tambahan**
    ```bash
    npm install -D @testing-library/react jsdom
    ```

2.  **Konfigurasi Vitest untuk Lingkungan DOM**
    Update `vitest.config.ts` untuk mensimulasikan lingkungan browser (DOM) menggunakan `jsdom`.

    ```typescript
    // vitest.config.ts
    export default {
      test: {
        environment: 'jsdom',
      },
    };
    ```

3.  **Tulis Test untuk Komponen**
    Misalkan kita punya komponen `Greeting.astro`:
    ```astro
    ---
    // src/components/Greeting.astro
    const { name } = Astro.props;
    ---
    <h2>Hello, {name}!</h2>
    ```

    Kita bisa mengujinya seperti ini di `tests/Greeting.test.jsx`:
    ```jsx
    // tests/Greeting.test.jsx
    import { render, screen } from '@testing-library/react';
    import { expect, test } from 'vitest';
    import Greeting from '../src/components/Greeting.astro';

    test('Greeting component', () => {
      // Render komponen dengan props
      render(<Greeting name="World" />);

      // Cari elemen berdasarkan teksnya
      const headingElement = screen.getByText('Hello, World!');

      // Pastikan elemen tersebut ada di dalam dokumen
      expect(headingElement).toBeInTheDocument();
    });
    ```

## 3. End-to-End (E2E) Testing

E2E testing mensimulasikan interaksi pengguna nyata di browser. **Playwright** dan **Cypress** adalah dua pilihan utama, dan keduanya memiliki integrasi resmi dengan Astro.

### Setup dengan Playwright:

1.  **Jalankan Perintah Integrasi**
    ```bash
    npx astro add playwright
    ```
    Ini akan menginstal Playwright dan membuat file konfigurasi serta contoh test.

2.  **Tulis Test E2E**
    Playwright akan membuat file seperti `tests-e2e/example.spec.ts`.

    ```typescript
    // tests-e2e/navigation.spec.ts
    import { test, expect } from '@playwright/test';

    test('should navigate to the about page', async ({ page }) => {
      // Mulai dari halaman utama
      await page.goto('http://localhost:4321/');

      // Cari link 'About' dan klik
      await page.click('text=About');

      // Tunggu hingga halaman baru dimuat dan periksa URL-nya
      await expect(page).toHaveURL('http://localhost:4321/about');

      // Periksa apakah ada heading 'About Me' di halaman baru
      await expect(page.locator('h1')).toContainText('About Me');
    });
    ```

3.  **Jalankan Test E2E**
    Pastikan server dev Anda berjalan (`npm run dev`), lalu jalankan perintah test Playwright.

## 4. Testing API Routes

API Routes (endpoint) di Astro dapat diuji dengan mengirimkan request HTTP ke endpoint tersebut dan memeriksa responsnya. Anda bisa menggunakan library seperti `supertest` atau `node-fetch` di dalam Vitest.

**Contoh dengan `fetch`:**

Misalkan kita punya API route di `src/pages/api/hello.json.js`:
```javascript
export function GET() {
  return new Response(JSON.stringify({ message: 'Hello, World!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
```

Testnya bisa terlihat seperti ini:
```typescript
// tests/api/hello.test.ts
import { expect, test } from 'vitest';

test('GET /api/hello.json', async () => {
  // Pastikan server dev berjalan di port 4321
  const response = await fetch('http://localhost:4321/api/hello.json');
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data).toEqual({ message: 'Hello, World!' });
});
```
Dengan kombinasi unit, komponen, E2E, dan API testing, Anda bisa membangun aplikasi Astro yang kuat dan bebas dari regresi.
