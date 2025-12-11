---
sidebar_position: 7
---

# Advanced MDX Component (Interactive UI)

Sekarang Shoelace sudah terintegrasi. Di sesi ini, kita akan memanfaatkan kekuatan tersebut untuk membuat **Reusable Components** yang bisa dipakai berulang kali di dokumentasi Anda.

Tujuannya agar penulis dokumentasi (Anda di masa depan) tidak perlu menulis kode impor panjang (`import SlButton from ...`) di setiap file MDX. Kita akan daftarkan komponen ini secara global agar bisa langsung dipanggil.

Target UI yang akan kita buat:

1.  **File Tree:** Struktur folder visual.
2.  **Feature Card:** Kartu fitur grid.
3.  **Status Badge:** Label status (Beta/Stable/Deprecated).

---

## Materi: MDX Global Scope

Secara default, komponen React harus diimpor di setiap file `.mdx` yang membutuhkannya.
Namun, Docusaurus memiliki fitur **MDX Components Scope**. Kita bisa mendaftarkan komponen ke dalam "kamus global" sehingga di file Markdown kita cukup menulis:

```jsx
<FileTree>...</FileTree>
```

Tanpa perlu `import FileTree from ...`.

---

## Praktik: Building Components

### Langkah 1: Membuat Komponen Feature Card

Kita buat komponen React murni yang membungkus `SlCard` Shoelace agar lebih mudah dipakai.

Buat file: `src/components/MDX/FeatureCard.js`

```javascript title="src/components/MDX/FeatureCard.js"
import React from "react";
import SlCard from "@shoelace-style/shoelace/dist/react/card";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon";

export default function FeatureCard({
  title,
  icon,
  children,
  variant = "primary",
}) {
  return (
    <SlCard
      className={`feature-card feature-card--${variant}`}
      style={{ marginBottom: "1rem", height: "100%" }}
    >
      <div
        slot="header"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        {icon && <SlIcon name={icon} style={{ fontSize: "1.2rem" }} />}
        <strong style={{ fontSize: "1.1rem" }}>{title}</strong>
      </div>
      <div style={{ color: "var(--sl-color-neutral-600)", lineHeight: "1.6" }}>
        {children}
      </div>
    </SlCard>
  );
}
```

### Langkah 2: Membuat Komponen File Tree

Shoelace memiliki komponen `Tree`. Kita akan bungkus agar mudah mendefinisikan file.

Buat file: `src/components/MDX/FileTree.js`

```javascript title="src/components/MDX/FileTree.js"
import React from "react";
import SlTree from "@shoelace-style/shoelace/dist/react/tree";
import SlTreeItem from "@shoelace-style/shoelace/dist/react/tree-item";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon";

// Komponen helper untuk item
export const FileItem = ({
  name,
  isFolder = false,
  expanded = false,
  children,
}) => {
  return (
    <SlTreeItem expanded={expanded}>
      <SlIcon name={isFolder ? "folder" : "file-earmark"} slot="expand-icon" />
      <SlIcon
        name={isFolder ? "folder" : "file-earmark"}
        slot="collapse-icon"
      />
      {name}
      {children}
    </SlTreeItem>
  );
};

export default function FileTree({ children }) {
  return (
    <div
      style={{
        border: "1px solid var(--sl-color-neutral-200)",
        borderRadius: "8px",
        padding: "1rem",
        background: "var(--sl-color-neutral-50)",
      }}
    >
      <SlTree>{children}</SlTree>
    </div>
  );
}
```

### Langkah 3: Mendaftarkan Komponen Secara Global

Ini langkah kuncinya. Kita perlu "menyuntikkan" komponen di atas ke _scope_ MDX global.

1.  Buka folder `src/theme`. Jika belum ada, buat folder `theme` di dalam `src`.
2.  Buat file `src/theme/MDXComponents.js`.
    _Nama file ini sakral. Docusaurus otomatis mencari file ini untuk override._

```javascript title="src/theme/MDXComponents.js"
import React from "react";
// Import komponen asli Docusaurus
import MDXComponents from "@theme-original/MDXComponents";

// Import komponen custom kita
import FeatureCard from "@site/src/components/MDX/FeatureCard";
import FileTree, { FileItem } from "@site/src/components/MDX/FileTree";

// Import komponen Shoelace langsung (opsional, jika ingin pakai raw components global)
import SlButton from "@shoelace-style/shoelace/dist/react/button";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon";
import SlBadge from "@shoelace-style/shoelace/dist/react/badge";

export default {
  // Pertahankan komponen bawaan
  ...MDXComponents,

  // Daftarkan Custom Components
  FeatureCard,
  FileTree,
  FileItem,

  // Daftarkan Shoelace Components (alias)
  Button: SlButton,
  Icon: SlIcon,
  Badge: SlBadge,
};
```

### Langkah 4: Menggunakan Komponen Global

Sekarang, mari kita update file dokumentasi tanpa melakukan import manual.

Buka file `docs/intro.md` (atau buat baru `docs/demo-components.md`).

```markdown
---
title: Demo Komponen Canggih
sidebar_position: 2
---

# Komponen Interaktif

Halaman ini menggunakan komponen global yang didaftarkan di `src/theme/MDXComponents.js`. Tidak perlu import manual!

## 1. Struktur Project (File Tree)

Berikut adalah struktur folder project kita:

<FileTree>
  <FileItem name="my-docs" isFolder expanded>
    <FileItem name="docs" isFolder>
      <FileItem name="intro.md" />
      <FileItem name="tutorial-dasar" isFolder />
    </FileItem>
    <FileItem name="src" isFolder expanded>
      <FileItem name="components" isFolder />
      <FileItem name="pages" isFolder />
    </FileItem>
    <FileItem name="docusaurus.config.js" />
  </FileItem>
</FileTree>

## 2. Feature Cards

Grid layout untuk menampilkan fitur utama.

<div className="row">
  <div className="col col--6">
    <FeatureCard title="High Performance" icon="lightning-charge">
      Menggunakan Rspack untuk build time super cepat. Lebih cepat dari Webpack.
    </FeatureCard>
  </div>
  <div className="col col--6">
    <FeatureCard title="Web Components" icon="box-seam">
      Terintegrasi dengan <strong>Shoelace</strong>. Komponen UI modern yang framework-agnostic.
    </FeatureCard>
  </div>
</div>

## 3. Status Badges

Fitur ini sedang dalam tahap <Badge variant="success" pill>Stable</Badge> namun modul X masih <Badge variant="warning" pill>Beta</Badge>.

<br/>

<Button variant="primary" outline>
  <Icon slot="prefix" name="download" />
  Download Source Code
</Button>
```

---

### Verifikasi Sesi 6

1.  **Restart Server** (`npm start`). Karena kita membuat file `src/theme/MDXComponents.js` (file sistem), restart diperlukan agar Docusaurus mendeteksinya.
2.  Buka halaman demo yang baru dibuat.
3.  Pastikan:
    - **File Tree** muncul dengan ikon folder/file.
    - **Feature Cards** muncul bersebelahan (karena class `col col--6` bawaan Infima).
    - **Badge** dan **Button** muncul tanpa perlu baris `import` di file MDX tersebut.

Selamat! Anda sekarang memiliki **Design System** sendiri di dalam dokumentasi. Penulis konten cukup fokus pada isi, dan memanggil komponen visual semudah menulis tag HTML.

Selanjutnya di **Sesi 7**, kita akan membahas **Swizzling** (mengubah komponen internal Docusaurus) dan melakukan tuning styling lebih lanjut.
