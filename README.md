# Scrollsequence Examples 🎬

Interactive templates and copy-pasteable examples for [Scrollsequence](https://scrollsequence.com) — the hardware-accelerated image sequence animation library.

[![License](https://img.shields.io/badge/license-Commercial%20%2F%20Free-blue.svg)](https://scrollsequence.com)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646cff.svg)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com)

## 🚀 Quick Start

Clone this repository and explore all examples with a single command:

```bash
git clone https://github.com/scrollsequence/examples.git
cd examples

# Install all dependencies across frameworks
npm install

# Run React examples showcase
npm run dev:react

# Or run Vanilla JS examples showcase
npm run dev:vanilla
```

Browse to `http://localhost:5173` to see the interactive example showcase.

---

## 📂 Examples Directory

| Scenario | React File | Vanilla File | Difficulty | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas 2D Minimal** | [`react/src/examples/CanvasMinimal.tsx`](./react/src/examples/CanvasMinimal.tsx) | [`vanilla/canvas-minimal.html`](./vanilla/canvas-minimal.html) | Beginner | Basic scrubbing of an image sequence on scroll. |
| **Pinned Scene Showcase** | [`react/src/examples/SceneMinimal.tsx`](./react/src/examples/SceneMinimal.tsx) | [`vanilla/scene-minimal.html`](./vanilla/scene-minimal.html) | Beginner | Viewport-pinned section with text overlay layers. |
| **HTML Content Animations** | [`react/src/examples/SceneContent.tsx`](./react/src/examples/SceneContent.tsx) | Coming soon | Intermediate | Typography & progress bar synced to scroll progress. |
| **Depth Map Parallax** | [`react/src/examples/SceneDepth.tsx`](./react/src/examples/SceneDepth.tsx) | Coming soon | Intermediate | 2.5D tilt and parallax effect using depth maps. |

---

## 🤖 For AI Coding Assistants (Cursor, Claude, Copilot, ChatGPT)

If you are using an AI agent or LLM to build with Scrollsequence, reference our LLM guides:
- [`llms.txt`](./llms.txt) — High-density API prompt and reference rules.
- [`llms-full.txt`](./llms-full.txt) — Complete API cheat sheet with copy-pasteable snippets.

---

## 📦 Project Structure

```text
examples/
├── package.json         # Workspace root (single install for all frameworks)
├── llms.txt             # AI agent context
├── llms-full.txt             # AI agent context
├── react/               # React (Vite MPA + Tailwind CSS)
│   ├── src/examples/    # Pure, standalone example components
│   └── index.html       # Local showcase dashboard
└── vanilla/             # Vanilla JS (Vite MPA + Zero-build CDN)
    ├── static/          # Pure HTML + script tag (no build step)
    └── index.html       # Local showcase dashboard
```

## 📜 License
Scrollsequence is available for free with commercial upgrade options. See [scrollsequence.com](https://scrollsequence.com) for details.
