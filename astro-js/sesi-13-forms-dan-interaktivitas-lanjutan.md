# Forms dan Interaktivitas Lanjutan

Mengelola input pengguna melalui form dan menangani state yang kompleks adalah langkah penting dalam membangun aplikasi web yang dinamis. Sesi ini akan membahas cara menangani form, state management, dan integrasi layanan pihak ketiga di Astro.

## 1. Form Handling dan Validasi di Astro

Secara default, Astro tidak memiliki _runtime_ di sisi server yang terus berjalan, sehingga penanganan form bisa dilakukan dengan beberapa cara.

### A. Endpoint API Astro (API Routes)

Cara paling umum adalah dengan membuat endpoint API khusus untuk menerima data form.

1.  **Buat Form HTML**
    Arahkan `action` dari form ke endpoint API yang akan Anda buat.

    ```jsx title="src/pages/contact.astro"
    <form action="/api/contact" method="post">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required />

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />

      <label for="message">Message:</label>
      <textarea id="message" name="message" required></textarea>

      <button type="submit">Send</button>
    </form>
    ```

2.  **Buat Endpoint API**
    Buat file di dalam `src/pages/api/`. File ini akan mengekspor fungsi (misalnya `POST`) yang menangani request.

    ```javascript title="src/pages/api/contact.js"
    export async function POST({ request, redirect }) {
      const data = await request.formData();
      const name = data.get("name");
      const email = data.get("email");
      const message = data.get("message");

      // --- Validasi Sederhana di Server ---
      if (!name || !email || !message) {
        return new Response(
          JSON.stringify({ message: "Missing required fields" }),
          { status: 400 }
        );
      }

      // Di sini Anda bisa mengirim email, menyimpan ke database, dll.
      console.log({ name, email, message });

      // Redirect ke halaman "terima kasih" setelah berhasil
      return redirect("/thank-you");
    }
    ```

### B. Validasi di Sisi Klien

Untuk pengalaman pengguna yang lebih baik, tambahkan validasi di sisi klien menggunakan JavaScript atau atribut HTML5 (`required`, `pattern`, `minlength`). Anda bisa menggunakan library seperti `zod` untuk skema validasi yang bisa dibagikan antara klien dan server.

## 2. State Management

Untuk interaktivitas yang lebih dari sekadar _toggle_ sederhana, Anda memerlukan cara untuk mengelola _state_.

### A. State di Level Komponen (Page-level)

Untuk state yang hanya relevan di satu halaman atau komponen, gunakan UI framework (React, Svelte, Vue) di dalam sebuah Astro Island.

**Contoh dengan React `useState`:**

```jsx title="src/components/InteractiveForm.jsx"
import { useState } from "react";

export default function InteractiveForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 3) {
      setError("Name must be at least 3 characters long.");
    } else {
      setError(null);
      // Lakukan submit data
      alert(`Submitting name: ${name}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

Gunakan komponen ini di Astro dengan `<InteractiveForm client:load />`.

### B. State Global

Ketika beberapa "island" yang terpisah perlu berbagi state, Anda memerlukan solusi state management global. **Nano Stores** adalah pilihan yang direkomendasikan oleh tim Astro karena ukurannya yang sangat kecil dan framework-agnostic.

1.  **Install Nano Stores**

    ```bash
    npm install nanostores @nanostores/react # atau @nanostores/vue, dll.
    ```

2.  **Buat Store**
    Buat file untuk mendefinisikan state global Anda.

    ```javascript title="src/stores/cart.js"
    import { atom } from "nanostores";

    export const isCartOpen = atom(false);
    export const cartItems = atom([]);

    export function addItemToCart(item) {
      cartItems.set([...cartItems.get(), item]);
    }
    ```

3.  **Gunakan di Komponen (Island)**
    Dua komponen berbeda kini bisa berinteraksi dengan state yang sama.

    **`src/components/CartButton.jsx`**

    ```jsx
    import { useStore } from "@nanostores/react";
    import { isCartOpen } from "../stores/cart";

    export default function CartButton() {
      const $isCartOpen = useStore(isCartOpen);
      return <button onClick={() => isCartOpen.set(!$isCartOpen)}>Cart</button>;
    }
    ```

    **`src/components/CartFlyout.jsx`**

    ```jsx
    import { useStore } from "@nanostores/react";
    import { isCartOpen, cartItems } from "../stores/cart";

    export default function CartFlyout() {
      const $isCartOpen = useStore(isCartOpen);
      const $cartItems = useStore(cartItems);

      if (!$isCartOpen) return null;

      return <div>{/* Tampilkan isi keranjang */}</div>;
    }
    ```

## 3. Integrasi dengan Layanan Pihak Ketiga

### A. Form Submission (Netlify Forms, Formspree)

Jika Anda tidak ingin membuat backend sendiri, layanan seperti Netlify Forms atau Formspree sangat mudah diintegrasikan.

**Contoh dengan Netlify Forms:**

Cukup tambahkan atribut `data-netlify="true"` ke tag `<form>` Anda.

```html
<form name="contact" method="POST" data-netlify="true">
  <!-- Input fields -->
</form>
```

Netlify akan secara otomatis mendeteksi ini saat build dan menangani submission untuk Anda.

### B. Analytics (Google Analytics, Vercel Analytics)

Astro memiliki paket integrasi resmi untuk menambahkan skrip analytics dengan mudah dan optimal.

```bash
npx astro add vercel # atau npx astro add partytown untuk Google Analytics
```

Integrasi ini akan memastikan skrip analytics dimuat tanpa memblokir rendering halaman utama, seringkali menggunakan teknik seperti Partytown untuk memindahkannya ke web worker.

## 4. Implementasi Search Functionality

Fungsionalitas pencarian bisa diimplementasikan di sisi klien atau server.

### A. Pencarian Sisi Klien (Client-Side)

Cocok untuk situs dokumentasi atau blog dengan jumlah konten yang tidak terlalu besar.

1.  **Buat Indeks Konten saat Build**: Di sebuah halaman Astro, gunakan `Astro.glob()` untuk mengumpulkan semua data dari file Markdown/konten Anda dan menyediakannya sebagai objek JSON.
2.  **Fetch Indeks di Klien**: Di sisi klien (dalam sebuah komponen island), fetch file JSON ini.
3.  **Lakukan Pencarian**: Gunakan library seperti `fuse.js` atau logika JavaScript biasa untuk mencari di dalam data JSON berdasarkan input pengguna dan tampilkan hasilnya.

### B. Pencarian Sisi Server (Server-Side)

Untuk konten yang sangat besar atau data dari database.

1.  Buat form pencarian yang mengarah ke sebuah halaman dinamis, misalnya `/search`.
2.  Buat halaman `src/pages/search.astro` yang berjalan dalam mode SSR.
3.  Di dalam halaman tersebut, ambil query pencarian dari URL (`Astro.url.searchParams.get('q')`).
4.  Gunakan query tersebut untuk mencari di database atau layanan pencarian eksternal (seperti Algolia).
5.  Render hasilnya langsung di halaman.
