---
sidebar_position: 5
---

# Interaktivitas dengan React

## Pembelajaran yang akan dicapai

- Memahami Astro Islands Architecture
- Integrasi React dengan Astro (FOKUS REACT SAJA)
- Client directives: kapan pakai apa
- useState & useEffect dalam Astro
- Best practices React di Astro

---

## 1. Setup React

```bash
npx astro add react
```

Ini akan:

- Install `@astrojs/react`, `react`, `react-dom`
- Update `astro.config.mjs` dengan React adapter
- Ready untuk membuat komponen React

---

## 2. Astro Islands Architecture

**Concept:** Sebagian besar halaman adalah HTML statis (cepat), hanya "island" tertentu yang interaktif.

```jsx title="src/pages/index.astro"
---
import Counter from '../components/Counter.jsx';
---

<html>
  <body>
    <!-- HTML statis - tidak ada JavaScript -->
    <h1>Welcome to My Blog</h1>
    <p>Halo dari HTML statis!</p>

    <!-- "Island" - komponen React dengan JavaScript -->
    <Counter client:load />
  </body>
</html>
```

---

## 3. Client Directives: Kontrol Loading

Astro punya 4 client directives untuk mengontrol kapan komponen React di-load:

### `client:load` - Load Segera

```jsx
<!-- Di-load dan hydrate saat halaman pertama kali dimuat -->
<Counter client:load />
```

**Gunakan untuk:** Komponen yang visible immediately / critical

### `client:visible` - Load saat Visible

```jsx
<!-- Di-load hanya saat komponen masuk viewport -->
<Analytics client:visible />
```

**Gunakan untuk:** Komponen di bottom page atau below fold

### `client:idle` - Load saat Browser Idle

```jsx
<!-- Di-load setelah browser selesai render halaman utama -->
<ChatWidget client:idle />
```

**Gunakan untuk:** Komponen non-critical yang bisa ditunggu

### `client:only` - Client-Side Render

```jsx
<!-- Render hanya di client, tidak ada SSR -->
<Dashboard client:only="react" />
```

**Gunakan untuk:** Dynamic apps yang butuh client-side state sepenuhnya

---

## 4. Membuat Komponen React Pertama

**src/components/Counter.jsx:**

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <p className="count-display">Count: {count}</p>

      <div className="button-group">
        <button
          onClick={() => setCount(count + 1)}
          className="btn btn-increment"
        >
          +
        </button>

        <button
          onClick={() => setCount(count - 1)}
          className="btn btn-decrement"
        >
          -
        </button>

        <button onClick={() => setCount(0)} className="btn btn-reset">
          Reset
        </button>
      </div>
    </div>
  );
}
```

### CSS untuk komponen:

```jsx
// Tambahkan di file yang sama atau import dari CSS file
export default function Counter() {
  const styles = `
    .counter {
      padding: 2rem;
      background: #f3f4f6;
      border-radius: 8px;
      max-width: 300px;
      text-align: center;
    }
    
    .count-display {
      font-size: 2rem;
      font-weight: bold;
      color: #1f2937;
      margin: 0 0 1rem 0;
    }
    
    .button-group {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
    }
    
    .btn {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .btn-increment {
      background: #10b981;
      color: white;
    }
    
    .btn-increment:hover {
      background: #059669;
    }
    
    .btn-decrement {
      background: #ef4444;
      color: white;
    }
    
    .btn-decrement:hover {
      background: #dc2626;
    }
    
    .btn-reset {
      background: #6b7280;
      color: white;
    }
    
    .btn-reset:hover {
      background: #4b5563;
    }
  `;

  // Return JSX
  return (
    <div className="counter">
      <style>{styles}</style>
      {/* ... rest of component */}
    </div>
  );
}
```

### Menggunakan Counter di halaman:

```jsx
---
// src/pages/demo.astro
import Counter from '../components/Counter.jsx';
---

<html>
  <body>
    <h1>Interactive Counter Demo</h1>
    <Counter client:load />
  </body>
</html>
```

---

## 5. Props dari Astro ke React

**src/components/TodoList.jsx:**

```jsx
import { useState } from "react";

export default function TodoList({ title, initialItems = [] }) {
  const [todos, setTodos] = useState(
    initialItems.map((item, i) => ({ id: i, text: item, done: false }))
  );
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list">
      <h2>{title}</h2>

      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Tambah todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? "done" : ""}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Menggunakan dengan props:

```jsx
---
import TodoList from '../components/TodoList.jsx';

const defaultTodos = ['Learn Astro', 'Learn React', 'Build something'];
---

<html>
  <body>
    <TodoList
      client:visible
      title="My Tasks"
      initialItems={defaultTodos}
    />
  </body>
</html>
```

---

## 6. Multiple React Komponen

```jsx title="src/pages/dashboard.astro"
---
import Counter from '../components/Counter.jsx';
import TodoList from '../components/TodoList.jsx';
import DarkModeToggle from '../components/DarkModeToggle.jsx';
---

<html>
  <body>
    <header>
      <h1>Dashboard</h1>
      <DarkModeToggle client:load /> <!-- Load immediately for UX -->
    </header>

    <main>
      <section>
        <Counter client:visible /> <!-- Load saat visible -->
      </section>

      <section>
        <TodoList client:idle /> <!-- Load saat idle -->
      </section>
    </main>
  </body>
</html>
```

---

## 7. Hooks Pattern

React hooks yang sering dipakai:

```jsx
import { useState, useEffect, useRef, useCallback } from "react";

export default function DataFetcher() {
  // State
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  // Effect untuk fetch data
  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Run once

  // Effect untuk log count
  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]); // Run ketika count berubah

  // Ref untuk DOM access
  const inputRef = useRef(null);

  // Callback untuk optimize
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={handleClick}>Count: {count}</button>
      <input ref={inputRef} type="text" />
    </div>
  );
}
```

---

## 📋 Challenge Sesi Ini

1. **Buat komponen `SearchBox.jsx`** dengan:

   - Input field untuk search
   - Filter dari array yang dikirim via props
   - Display hasil search

2. **Buat komponen `DarkModeToggle.jsx`** dengan:

   - Toggle button untuk dark/light mode
   - Simpan preference ke localStorage
   - Update CSS dinamis

3. **Combine:** Gunakan `client:visible` dan `client:idle` di halaman yang sama untuk optimization

---

## ⚠️ Penting: Vue & Svelte Sebagai Catatan

Astro juga support Vue dan Svelte, caranya sama:

```bash
npx astro add vue
npx astro add svelte
```

Tapi di sesi ini fokus ke React. Vue & Svelte bisa dipelajari sendiri dengan pola yang sama.

---

## Ringkasan

✓ Astro Islands = HTML statis + interactive components  
✓ Client directives untuk control loading  
✓ React components dengan JSX  
✓ Props flow dari Astro ke React  
✓ Hooks: useState, useEffect, useRef, useCallback  
✓ Optimization dengan client:visible & client:idle

**Sesi selanjutnya:** Data management & forms!
