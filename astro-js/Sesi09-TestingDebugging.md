---
sidebar_position: 10
---

# Testing, Debugging & Best Practices

## Pembelajaran yang akan dicapai

- Unit testing dengan Vitest
- Browser DevTools
- Astro Dev Toolbar
- Common debugging issues
- Code organization best practices

---

## 1. Setup Vitest

```bash
npx astro add vitest
```

Ini akan install `vitest` dan create `vitest.config.ts`

---

## 2. Unit Testing

**tests/example.test.ts:**

```typescript
import { expect, test } from "vitest";

test("math works", () => {
  expect(2 + 2).toBe(4);
});

// Test component
import Counter from "../src/components/Counter.jsx";
import { render, screen } from "@testing-library/react";

test("Counter increments", () => {
  render(<Counter />);
  const button = screen.getByText("+");
  button.click();
  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

**package.json:**

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

**Run tests:**

```bash
npm test          # Run once
npm test -- --watch  # Watch mode
npm run test:ui   # UI dashboard
```

---

## 3. Testing Utilities

```typescript
import { describe, it, expect, beforeEach } from "vitest";

describe("Blog Post", () => {
  let post: any;

  beforeEach(() => {
    post = { title: "Test Post", slug: "test-post" };
  });

  it("should have a title", () => {
    expect(post.title).toBe("Test Post");
  });

  it("should generate correct URL", () => {
    const url = `/blog/${post.slug}`;
    expect(url).toBe("/blog/test-post");
  });
});
```

---

## 4. Browser DevTools

**Open DevTools:**

- F12 atau Right-click → Inspect

**Useful tabs:**

- **Elements**: DOM structure
- **Console**: Errors & logs
- **Network**: API calls
- **Application**: localStorage, cookies
- **Performance**: Speed profiling

**Common checks:**

```javascript
// In Console
window.__ASTRO_ASSETS__; // Check assets
fetch("/api/posts"); // Test API
localStorage.getItem("token"); // Check storage
```

---

## 5. Astro Dev Toolbar

**Features:**

- 🔍 **Inspect**: Click element → component info
- 📊 **Audit**: Performance & accessibility check
- ⚙️ **Settings**: Toggle features

**Keyboard shortcut:**

- `Ctrl + Shift + D` = Toggle toolbar

---

## 6. Debugging Techniques

### Log dengan console:

```astro
---
const data = await fetch('/api/posts').then(r => r.json());
console.log('Posts:', data);  // Log to terminal
---
```

### Breakpoints:

```javascript
// In DevTools Console
debugger; // Pause execution
```

### Error boundaries:

```jsx
// src/components/ErrorBoundary.jsx
import { Component } from "react";

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }

    return this.props.children;
  }
}
```

---

## 7. Code Organization Best Practices

### Folder structure:

```
src/
├── components/
│   ├── shared/       # Reusable komponen
│   ├── blog/         # Blog-specific komponen
│   └── react/        # React-specific
├── layouts/
├── pages/
├── styles/
├── utils/            # Helper functions
├── types/            # TypeScript types
└── content/
```

### Naming conventions:

```
- Components: PascalCase (BlogCard.astro)
- Utils: camelCase (formatDate.ts)
- Constants: UPPER_SNAKE_CASE (MAX_ITEMS)
- Files: kebab-case atau PascalCase
```

---

## 8. Common Issues & Solutions

| Issue                        | Solution                         |
| ---------------------------- | -------------------------------- |
| Props tidak ter-pass         | Check import dan casing          |
| React component tidak muncul | Add `client:` directive          |
| CSS tidak apply              | Check scoping & specificity      |
| API 404                      | Check route path & file location |
| Type errors                  | Enable strict TypeScript         |
| Performance slow             | Check Network tab & file sizes   |

---

## 9. Performance Profiling

```bash
# Analyze bundle size
npm install -D webpack-bundle-analyzer

# Build analysis
npm run build -- --analyze
```

---

## 📋 Challenge

1. **Write tests** untuk 3 komponen
2. **Use DevTools** untuk debug halaman
3. **Reorganize codebase** dengan best practices folder structure
4. **Setup ESLint** untuk code quality

---

## Ringkasan

✓ Vitest untuk unit testing  
✓ Browser DevTools untuk debugging  
✓ Astro Dev Toolbar untuk development  
✓ Error boundaries untuk error handling  
✓ Code organization best practices  
✓ Performance profiling tools
