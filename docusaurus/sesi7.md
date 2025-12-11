---
sidebar_position: 8
---

# Advanced Customization & Swizzling

Sesi 7 akan fokus ke **Swizzling** (override komponen React bawaan Docusaurus) dan menyiapkan styling yang _future-proof_ untuk menyambut Docusaurus v4.

Dengan ini, navbar, sidebar, dan layout docs bisa dikustom lebih dalam tanpa kehilangan kemampuan upgrade.

## Materi: Swizzling & Future Styling

Swizzling di Docusaurus berarti membuat versi alternatif dari komponen tema bawaan di bawah `src/theme`, sehingga Docusaurus memprioritaskan komponen Anda dibanding versi asli tema.

Teknik ini cocok ketika CSS saja tidak cukup (misalnya ingin mengubah struktur DOM, menambah tombol baru, atau menyisipkan Shoelace di dalam layout docs/nav).

CLI `docusaurus swizzle` menyediakan cara cepat menghasilkan wrapper yang meng-import komponen asli lewat alias `@theme-original/...`, sehingga Anda bisa membungkusnya tanpa memutus jalur upgrade.

Docusaurus juga menyediakan _future flag_ `future.v4.useCssCascadeLayers` yang mengaktifkan plugin CSS Cascade Layers untuk mengatur prioritas layer CSS bawaan vs custom Anda, sehingga konflik CSS global jauh berkurang saat kustomisasi makin kompleks.

---

## Praktik: Swizzle DocSidebar (Wrap, Bukan Eject)

Target pertama: **Docs Sidebar**. Kita akan menambah header kecil + area aksi tanpa mengubah logika core.

1. Jalankan perintah swizzle (wrap, aman untuk upgrade):

   ```bash
   npx docusaurus swizzle @docusaurus/theme-classic DocSidebar --wrap
   ```

   Ini akan membuat file `src/theme/DocSidebar/index.js` yang membungkus komponen asli.

2. Buka `src/theme/DocSidebar/index.js`, lalu ubah isi menjadi seperti berikut:

   ```javascript
   import React from "react";
   import DocSidebarOriginal from "@theme-original/DocSidebar";
   import SlButton from "@shoelace-style/shoelace/dist/react/button";

   export default function DocSidebarWrapper(props) {
     return (
       <div className="docs-sidebar-wrapper">
         <div className="docs-sidebar-header">
           <strong>Documentation</strong>
           <SlButton
             variant="primary"
             size="small"
             outline
             style={{ marginTop: "0.5rem", width: "100%" }}
             onClick={() =>
               window.open(
                 "https://github.com/your-org/your-repo/issues/new",
                 "_blank"
               )
             }
           >
             Beri Feedback
           </SlButton>
         </div>

         <DocSidebarOriginal {...props} />
       </div>
     );
   }
   ```

3. Tambahkan sedikit CSS di `src/css/custom.css` agar sidebar header tampak rapi:

   ```css
   .docs-sidebar-wrapper {
     display: flex;
     flex-direction: column;
     gap: 0.75rem;
   }

   .docs-sidebar-header {
     padding: 0.75rem 0.75rem 0.25rem;
     border-bottom: 1px solid var(--ifm-color-emphasis-200);
   }
   ```

Sekarang setiap halaman docs akan memiliki tombol Shoelace di atas sidebar (misalnya untuk feedback/GitHub issue), tanpa menyentuh internal logic Docusaurus.

---

## Praktik: Swizzle Navbar Item (Inject Komponen Khusus)

Untuk optimasi navbar (misalnya menambah tombol “Try Demo” dengan Shoelace dan perilaku khusus), alih-alih mengganti seluruh navbar, cukup swizzle **NavbarItem**.

1. Swizzle dengan wrap:

   ```bash
   npx docusaurus swizzle @docusaurus/theme-classic NavbarItem --wrap
   ```

2. Di `src/theme/NavbarItem/index.js`, bungkus item tertentu berdasarkan props:

   ```javascript
   import React from "react";
   import NavbarItemOriginal from "@theme-original/NavbarItem";
   import SlButton from "@shoelace-style/shoelace/dist/react/button";

   export default function NavbarItemWrapper(props) {
     // Contoh: item dengan label "Get Started" akan dirender sebagai Shoelace button
     if (props.label === "Get Started") {
       return (
         <SlButton
           variant="primary"
           size="small"
           style={{ marginLeft: "0.75rem" }}
           onClick={() => (window.location.href = props.to || "/docs/intro")}
         >
           {props.label}
         </SlButton>
       );
     }

     return <NavbarItemOriginal {...props} />;
   }
   ```

3. Di `src/config/navbar.js`, pastikan ada item dengan `label: 'Get Started'`:
   ```javascript
   {
     type: 'docSidebar',
     sidebarId: 'tutorialSidebar',
     position: 'left',
     label: 'Get Started',
   },
   ```

Dengan pola ini, Anda bisa meng-upgrade Docusaurus dengan aman, karena logika utama navbar masih memakai komponen asli dan Anda hanya melakukan transformasi di “wrapper”.

---

## Praktik: Aktifkan CSS Cascade Layers (Opsional v4-ready)

Jika styling makin kompleks (Shoelace, Tailwind, custom CSS), layer CSS bisa saling bertabrakan. Docusaurus 3.8 memperkenalkan flag `future.v4.useCssCascadeLayers` untuk mengaktifkan plugin `@docusaurus/plugin-css-cascade-layers` yang membungkus CSS bawaan dalam layer terpisah, sehingga CSS custom Anda (tanpa layer) punya prioritas jelas.

1. Di `docusaurus.config.js`, aktifkan flag ini:

   ```javascript
   const config = {
     // ...config lain
     future: {
       experimental_faster: true,
       v4: {
         useCssCascadeLayers: true,
       },
     },
   };
   export default config;
   ```

2. Setelah ini, jika ada konflik style, Anda bisa menambahkan selector biasa di `custom.css` dan ia akan lebih mudah menimpa Infima karena berada di layer yang berbeda dan di-load setelahnya.

Jika langkah-langkah di atas sudah berjalan (sidebar ter-wrap, navbar punya button khusus, build tetap mulus), kita bisa lanjut ke sesi berikutnya (Sesi 8: Search & UX pencarian) atau Anda bisa minta fokus khusus, misalnya swizzling `CodeBlock` untuk integrasi playground interaktif.
