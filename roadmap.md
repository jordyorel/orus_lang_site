# 🛠️ Orus Website Roadmap (Astro + Tailwind + Monaco)

This roadmap guides the creation of the Orus programming language website using **Astro**, **Tailwind CSS**, and a **Monaco Editor-based playground**. The design will follow a **Rust-inspired layout** with a **dark Orus-themed aesthetic** (gold/charcoal).

---

## 📦 Tech Stack

| Layer     | Tech          | Purpose                  |
| --------- | ------------- | ------------------------ |
| Framework | Astro         | Static site generator    |
| Styling   | Tailwind CSS  | Utility-first styling    |
| Editor    | Monaco Editor | Embedded code playground |
| Hosting   | Netlify       | Deployment platform      |

---

## 🧱 Project Structure

```bash
orus-lang.org/
├── public/                    # Static assets (logo, favicon, etc.)
├── src/
│   ├── layouts/              # Base and page layouts
│   │   └── BaseLayout.astro
│   ├── components/           # Header, footer, sidebar, etc.
│   │   └── Header.astro
│   │   └── Sidebar.astro
│   ├── pages/                # Routes
│   │   ├── index.astro       # Homepage
│   │   ├── install.astro     # Install page
│   │   ├── docs/             # Unified docs section
│   │   │   ├── index.mdx
│   │   │   ├── variables.mdx
│   │   │   ├── functions.mdx
│   │   │   ├── generics.mdx
│   │   │   ├── control-flow.mdx
│   │   │   ├── error-handling.mdx
│   │   │   └── std-library.mdx
│   │   ├── play.astro        # Playground page
│   │   ├── blog/             # Optional blog
│   │   └── roadmap.astro     # Dev roadmap
│   └── styles/               # Tailwind base styles
│       └── globals.css
├── astro.config.mjs          # Astro config
├── tailwind.config.js        # Tailwind config
├── package.json              # Project config
└── README.md
```

---

## 🎨 Design & Theme

* **Background:** Charcoal (`#111111`)
* **Accent / Gold:** `#b1975b`
* **Font:** Inter or Fira Code (mono)
* **Logo:** Falcon + "Orus" (centered on dark hero banner)

---

## 📄 Page Details

### `/` – Homepage

* Hero banner with logo + tagline
* Hello world snippet (copyable)
* Key features (immutability, generics, match, etc.)
* Links to Docs & Playground

### `/install` – Installation

* Coming soon notice
* C compiler requirement
* Future: platform-specific instructions (macOS, Linux, Windows)

### `/docs` – Unified Docs

* Sidebar navigation
* MDX-based reference sections (from LANGUAGE.md)
* Syntax highlighting for Orus
* Content includes: variables, types, control flow, functions, generics, error handling, std lib overview

### `/play` – Playground

* Monaco editor
* Run button
* Output console
* Preload: `print("Hello, Orus!")`
* Future: support input, shareable links, theme switching

### `/roadmap` – Roadmap

* Import content from `ORUS_ROADMAP.md` and `COMPILATION_ROADMAP.md`
* Milestones: type system phases, package manager, WASM target

### `/community` (optional)

* GitHub links, contribution guide, Discord or forum
* Issue templates, how to report bugs

### `/blog` (optional)

* Dev logs, feature announcements, releases

---

## 🔍 Optional Features

* **Search**: Add Pagefind or Lunr.js for client-side docs search
* **Dark/light mode toggle**: Tailwind-based toggle switch
* **Accessibility & SEO**: semantic HTML, contrast ratios, Open Graph tags

---

## ✅ Next Steps

1. [ ] Create Astro project: `npm create astro@latest`
2. [ ] Install Tailwind CSS
3. [ ] Add Monaco Editor to `/play` page
4. [ ] Convert `LANGUAGE.md` into `.mdx` docs, structured into topics
5. [ ] Build layout + sidebar navigation for docs
6. [ ] Add basic dark theme styling with Tailwind
7. [ ] Add SEO metadata and favicon
8. [ ] Configure Netlify: `zola build` or `astro build`
9. [ ] Deploy and test production build

---

Let me know if you want a working starter repo scaffold!
