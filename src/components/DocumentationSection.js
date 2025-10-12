import React from 'react';
import Link from '@docusaurus/Link';
import DocusaurusIcon from './icons/DocusaurusIcon';
import ViteIcon from './icons/ViteIcon';
import WebpackIcon from './icons/WebpackIcon';
import ParcelIcon from './icons/ParcelIcon';
import DocsifyIcon from './icons/DocsifyIcon';
import RegexIcon from './icons/RegexIcon';

const documentationTopics = [
  {
    title: "Docusaurus",
    link: "/docusaurus/intro",
    Icon: DocusaurusIcon,
    description:
      "Panduan lengkap untuk membangun situs dokumentasi modern dengan cepat menggunakan Docusaurus, dari nol hingga online.",
  },
  {
    title: "Vite",
    link: "/vite/intro",
    Icon: ViteIcon,
    description:
      "Pelajari Vite, alat pengembangan web generasi baru yang memberikan pengalaman pengembangan secepat kilat.",
  },
  {
    title: "Webpack",
    link: "/webpack/intro",
    Icon: WebpackIcon,
    description:
      "Kuasai Webpack, bundler modul paling kuat untuk mengoptimalkan dan mengelola aset proyek JavaScript Anda.",
  },
  {
    title: "Parcel",
    link: "/parcel/intro",
    Icon: ParcelIcon,
    description:
      "Mulai cepat dengan Parcel, bundler aplikasi web tanpa konfigurasi yang menyederhanakan proses pengembangan Anda.",
  },
  {
    title: "Docsify",
    link: "/docsify/intro",
    Icon: DocsifyIcon,
    description:
      "Buat situs dokumentasi yang ringan dan cepat secara dinamis tanpa proses build statis menggunakan Docsify.",
  },
  {
    title: "Regex",
    link: "/regex/intro",
    Icon: RegexIcon,
    description:
      "Pelajari Regular Expressions (Regex) dari dasar untuk pencarian dan manipulasi teks yang kuat dan efisien.",
  },
  // Untuk menambahkan topik baru, cukup salin blok di atas, buat komponen ikonnya, dan impor di sini.
];

export default function DocumentationSection() {
  return (
    <section className="documentation-section" id="fetch-this">
      <div className="documentation-container">
        <div className="documentation-header">
          <h2 className="documentation-title">Dokumentasi</h2>
          <p className="documentation-subtitle">
            Pilih salah satu topik di bawah ini untuk memulai perjalanan belajar Anda di dunia JavaScript modern.
          </p>
        </div>
        <div className="documentation-grid">
          {documentationTopics.map((topic, idx) => (
            <Link to={topic.link} className="documentation-card" key={idx}>
              <topic.Icon />
              <div className="card-content">
                <h3 className="card-title">{topic.title}</h3>
                <p className="card-text">{topic.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
