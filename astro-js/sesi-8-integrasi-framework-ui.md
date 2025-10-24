# Integrasi Framework UI (React, Vue, Svelte, dll.)

Salah satu keunggulan terbesar Astro adalah kemampuannya untuk menggunakan komponen dari berbagai framework UI favorit Anda. Ini memungkinkan Anda untuk menambahkan interaktivitas kompleks di mana diperlukan, tanpa mengorbankan performa di seluruh situs. Konsep ini disebut **Astro Islands**.

## 1. Step-by-Step: Setup React di Proyek Astro

Mari kita coba integrasikan React. Prosesnya sangat mirip untuk framework lain seperti Vue atau Svelte.

1.  **Jalankan Perintah Integrasi**
    Astro menyediakan perintah CLI yang mudah untuk menambahkan integrasi framework.

    ```bash
    npx astro add react
    ```

    :::info[**Catatan**]
    Jika kalian pakai pnpm atau yarn **tolong disesuaikan**

    Lihat dokumentasi : [Integrasi Astro JS](https://docs.astro.build/en/guides/integrations-guide/)
    :::

    Perintah ini akan melakukan beberapa hal secara otomatis:

    - Menginstal dependensi yang diperlukan (`@astrojs/react`, `react`, `react-dom`).
    - Memperbarui file `astro.config.mjs` Anda dengan plugin React.

2.  **Buat Komponen React Pertama Anda**
    Buat file komponen seperti biasa, tetapi dengan ekstensi `.jsx` atau `.tsx`.
    Misalnya, buat `src/components/Counter.jsx`.

    **`src/components/Counter.jsx`**

    ```jsx
    import { useState } from "react";

    export default function Counter() {
      const [count, setCount] = useState(0);

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      );
    }
    ```

3.  **Gunakan Komponen React di File Astro**
    Impor komponen React Anda di dalam file `.astro` dan gunakan seperti komponen Astro biasa. Namun, ada satu langkah krusial: Anda harus menambahkan direktif `client:*`.

    **`src/pages/interactive.astro`**

    ```jsx
    ---
    import Counter from '../components/Counter.jsx';
    ---
    <html lang="en">
    <body>
      <h1>Halaman Interaktif</h1>
      <p>Komponen di bawah ini adalah sebuah "island" yang dirender oleh React.</p>

      <Counter client:load />

    </body>
    </html>
    ```

## 2. Direktif `client:*` - Kunci dari Astro Islands

Direktif `client:*` memberitahu Astro bahwa komponen ini adalah "island" yang interaktif dan perlu dikirimkan JavaScript-nya ke browser. Tanpa direktif ini, komponen React Anda hanya akan dirender sebagai HTML statis di server, tanpa interaktivitas.

Astro memberikan kontrol penuh atas **kapan** JavaScript untuk komponen tersebut dimuat:

- **`client:load`**: Memuat JavaScript komponen segera setelah halaman dimuat. Gunakan untuk elemen yang langsung terlihat dan penting (misalnya, header interaktif).
- **`client:idle`**: Menunggu hingga browser "santai" (tidak ada pekerjaan berat) sebelum memuat JavaScript. Ideal untuk komponen prioritas lebih rendah (misalnya, tombol di bawah).
- **`client:visible`**: (Paling efisien) Memuat JavaScript hanya ketika komponen masuk ke dalam viewport (terlihat di layar). Sempurna untuk komponen di bagian bawah halaman (lazy loading).
- **`client:media={query}`**: Memuat komponen hanya jika media query CSS tertentu terpenuhi (misalnya, `client:media="(max-width: 768px)"` untuk komponen mobile-only).
- **`client:only={framework}`**: Melewatkan rendering di sisi server sama sekali. Komponen hanya akan dirender di sisi klien. Berguna untuk komponen yang sangat bergantung pada API browser (misalnya, `window`).

## 3. Menggabungkan Beberapa Framework di Satu Halaman

Keajaiban Astro adalah Anda bisa melakukan ini untuk beberapa framework sekaligus dalam satu halaman.

1.  Jalankan `npx astro add vue` dan `npx astro add svelte`.

:::info[**Catatan**]
Jika kalian pakai pnpm atau yarn **tolong disesuaikan**

Lihat dokumentasi : [Integrasi Astro JS](https://docs.astro.build/en/guides/integrations-guide/)
:::

2.  Buat komponen Vue (`.vue`) dan Svelte (`.svelte`).
3.  Impor dan gunakan semuanya di halaman yang sama.

    ```jsx
    ---
    import ReactCounter from '../components/ReactCounter.jsx';
    import VueCounter from '../components/VueCounter.vue';
    import SvelteCounter from '../components/SvelteCounter.svelte';
    ---
    <h1>Multi-Framework Page</h1>

    <h2>React Island</h2>
    <ReactCounter client:visible />

    <h2>Vue Island</h2>
    <VueCounter client:visible />

    <h2>Svelte Island</h2>
    <SvelteCounter client:visible />
    ```

    Setiap "island" akan dihidrasi secara independen, hanya memuat runtime framework yang dibutuhkannya.

## 4. Optimasi Bundle Size

Meskipun Anda bisa menggunakan banyak framework, penting untuk tetap memperhatikan ukuran bundle JavaScript total.

- **Gunakan `client:visible` sebanyak mungkin**: Ini adalah cara paling efektif untuk mengurangi beban JavaScript awal.
- **Satu Framework untuk Satu Halaman**: Jika memungkinkan, cobalah untuk tetap menggunakan satu framework per halaman untuk menghindari pemuatan beberapa runtime framework (React, Vue, dll.) secara bersamaan.
- **Gunakan Komponen Astro untuk Layout**: Gunakan komponen `.astro` untuk semua bagian statis dari UI Anda (layout, teks, gambar). Hanya gunakan komponen framework UI untuk "pulau-pulau" interaktivitas yang benar-benar membutuhkannya.
- **Analisis Bundle**: Gunakan tools seperti `astro-bundle-analyzer` untuk melihat apa saja yang berkontribusi pada ukuran bundle akhir Anda dan temukan peluang untuk optimasi.

Dengan pendekatan "islands", Astro memberikan keseimbangan yang luar biasa antara kekuatan framework modern dan performa website yang sangat cepat.
