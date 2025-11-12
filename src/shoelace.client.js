// Tema global (wajib sekali)
import "@shoelace-style/shoelace/dist/themes/light.css";

// Cherry-pick komponen yang dipakai saja (contoh: button, icon, dll)

import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/tree/tree.js";
import "@shoelace-style/shoelace/dist/components/tree-item/tree-item.js";

// Set base path ke CDN (atau ke lokasi aset lokal jika self-hosting)
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/"
);
