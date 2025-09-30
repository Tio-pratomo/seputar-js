import React from 'react';
import Link from '@docusaurus/Link';
import DocusaurusIcon from './icons/DocusaurusIcon';
import ViteIcon from './icons/ViteIcon';

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
