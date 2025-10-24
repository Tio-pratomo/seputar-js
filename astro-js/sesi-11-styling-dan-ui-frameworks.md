# Styling dan UI Frameworks di Astro

Styling adalah bagian krusial dalam membangun antarmuka yang menarik. Astro sangat fleksibel dan mendukung berbagai pendekatan styling modern, mulai dari utility-first CSS hingga preprocessor dan CSS-in-JS.

:::warning[**Perhatian**]
Disini untuk install dependensi lain menggunakan npm. Jika kalian menggunakan package manager lain **tolong disesuaikan**
:::

## 1. Setup dan Penggunaan Tailwind CSS

### Menambahkan Tailwind 4

Di Astro versi 5.2.0 atau yang lebih baru, gunakan perintah `astro add tailwind` untuk menginstal plugin resmi Vite Tailwind. Untuk menambahkan dukungan Tailwind 4 ke versi Astro yang lebih lama, ikuti instruksi di dokumentasi Tailwind untuk menambahkan plugin `@tailwindcss/vite` secara manual.

```bash
npx astro add tailwind
```

Selanjutnya, impor `tailwindcss` ke dalam `src/styles/global.css` (atau file CSS lain pilihan Anda) untuk membuat kelas-kelas Tailwind tersedia di proyek Astro Anda. File ini, termasuk impornya, akan dibuat secara default jika Anda menggunakan perintah `astro add tailwind` untuk menginstal plugin Vite.

**src/styles/global.css**

```css
@import "tailwindcss";
```

Impor file ini di halaman-halaman di mana Anda ingin Tailwind diterapkan. Ini sering dilakukan di komponen layout sehingga gaya Tailwind dapat digunakan di semua halaman yang menggunakan layout tersebut:

**src/layouts/Layout.astro**

```astro
---
import "../styles/global.css";
---
```

Untuk informasi lebih lanjut, Anda dapat mengunjungi dokumentasi resmi Astro:

- [Upgrade from Tailwind 3](https://docs.astro.build/en/guides/styling/#upgrade-from-tailwind-3)
- [Legacy Tailwind 3 Support](https://docs.astro.build/en/guides/styling/#legacy-tailwind-3-support)

### Contoh Penggunaan

Setelah setup selesai, Anda bisa langsung menggunakan utility classes dari Tailwind di komponen Astro Anda.

```jsx
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Tailwind Page">
  <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold text-sky-500 mb-4">
      Styled with Tailwind CSS
    </h1>
    <p class="text-slate-700 dark:text-slate-300">
      This is a paragraph styled using Tailwind's utility classes. It supports dark mode too!
    </p>
    <button class="mt-6 bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
      Click Me
    </button>
  </div>
</BaseLayout>
```

## 2. Styling dengan Preprocessor (Sass, Less)

Jika Anda lebih suka menulis CSS dengan fitur-fitur canggih seperti variabel, nesting, dan mixin, Astro mendukung preprocessor seperti Sass dan Less.

### Setup Sass:

1.  **Install Dependensi**
    Anda hanya perlu menginstal paket Sass:

    ```bash
    npm install -D sass
    ```

2.  **Gunakan di Komponen**
    Buat file dengan ekstensi `.scss` atau `.sass`, atau tulis langsung di dalam tag `<style>` dengan menambahkan atribut `lang`.

    **Contoh dengan `<style lang="scss">`:**

    ```jsx
    ---
    const theme = {
      primaryColor: '#3498db',
      padding: '15px'
    };
    ---
    <div class="card">
      <h2 class="title">Sass Card</h2>
      <p>This card is styled with SCSS.</p>
    </div>

    <style lang="scss">
      // Variabel Sass
      $primary-color: #{theme.primaryColor};
      $border-radius: 8px;

      .card {
        padding: #{theme.padding};
        border-radius: $border-radius;
        background-color: #f9f9f9;
        border: 1px solid #ddd;

        // Nesting
        .title {
          color: $primary-color;
          border-bottom: 2px solid $primary-color;
        }
      }
    </style>
    ```

    Astro akan secara otomatis mengkompilasi kode Sass Anda menjadi CSS biasa.

## 3. CSS-in-JS Approach

Bagi developer yang datang dari ekosistem React, pendekatan CSS-in-JS (seperti Styled Components atau Emotion) mungkin lebih familiar. Anda bisa menggunakan library ini di dalam komponen UI (React, Svelte, dll.) yang Anda integrasikan sebagai Astro Islands.

### Contoh dengan Styled Components di Komponen React:

1.  **Install Dependensi**

    ```bash
    npm install styled-components
    ```

2.  **Buat Komponen React dengan Styled Components**
    Buat file `src/components/StyledButton.jsx`.

    ```jsx
    import styled from "styled-components";

    const Button = styled.button`
      background: ${(props) => (props.primary ? "palevioletred" : "white")};
      color: ${(props) => (props.primary ? "white" : "palevioletred")};
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border: 2px solid palevioletred;
      border-radius: 3px;
      cursor: pointer;

      &:hover {
        opacity: 0.9;
      }
    `;

    export default function StyledButton({ primary, children }) {
      return <Button primary={primary}>{children}</Button>;
    }
    ```

3.  **Gunakan di Halaman Astro**

    Jangan lupa direktif `client:*` agar komponen menjadi interaktif.

    ```jsx
    ---
    import StyledButton from '../components/StyledButton.jsx';
    ---
    <BaseLayout title="CSS-in-JS">
      <StyledButton client:load>Normal Button</StyledButton>
      <StyledButton primary client:load>Primary Button</StyledButton>
    </BaseLayout>
    ```

## 4. Implementasi UI Libraries (shadcn/ui, Radix UI)

UI Libraries modern seperti **shadcn/ui** dan **Radix UI** sangat populer karena menyediakan komponen _unstyled_, _accessible_, dan _composable_.

### Menggunakan shadcn/ui dengan Astro + React + Tailwind

**shadcn/ui** bukanlah library komponen biasa, melainkan kumpulan resep yang bisa Anda salin-tempel ke proyek Anda, memberikan Anda kepemilikan penuh atas kodenya.

#### Langkah-langkah Implementasi:

1.  **Pastikan sudah ada integrasi React dan Tailwind.**
    Jalankan `npx astro add react` dan `npx astro add tailwind`.

2.  **Inisialisasi `shadcn/ui`**
    Jalankan perintah `init` dari CLI `shadcn-ui`:

    ```bash
    npx shadcn-ui@latest init
    ```

    Ikuti petunjuknya. CLI akan menanyakan beberapa hal seperti path untuk komponen dan file `tailwind.config.js` Anda.

3.  **Tambahkan Komponen**
    Gunakan CLI untuk menambahkan komponen yang Anda butuhkan. Misalnya, untuk menambahkan komponen `Button` dan `Card`:

    ```bash
    npx shadcn-ui@latest add button
    npx shadcn-ui@latest add card
    ```

    Perintah ini akan membuat file-file komponen React (`.jsx`) di dalam direktori `src/components/ui/` proyek Anda.

4.  **Gunakan Komponen di Astro**
    Sekarang Anda bisa mengimpor dan menggunakan komponen-komponen ini di dalam file `.astro` Anda, sama seperti komponen React lainnya.

    ```jsx
    ---
    import { Button } from "@/components/ui/button"; // @ adalah alias path
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    ---
    <BaseLayout title="Shadcn UI">
      <Card class="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button client:visible>Deploy</Button>
        </CardFooter>
      </Card>
    </BaseLayout>
    ```

    Pendekatan ini memberikan kekuatan komponen UI yang canggih dan dapat diakses, sambil tetap mempertahankan performa luar biasa dari Astro.
