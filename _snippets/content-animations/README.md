# Scrollsequence Content Animations Example

A collection of Content Animations 


## Features

- Minimal and lightweight setup with React 19 and Vite.
- Demonstrates core Scrollsequence Content Animations inside Scene and Canvas components. 
  - `<Canvas2d>`
  - `<Scene>`
- Full TypeScript support (`tsc` type checking and JSX transpilation).

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open the printed URL (typically [http://localhost:5173](http://localhost:5173)) in your browser.

### 3. Build for production

```bash
npm run build
```

This runs TypeScript type checking (`tsc`) followed by the Vite production bundle (`vite build`), outputting the production assets to the `dist/` directory.

### 4. Preview production build

```bash
npm run preview
```

## Project Structure

- `index.html` - Application HTML shell and React root mount point.
- `App.tsx` - Atomic React component rendering a Scrollsequence scene with image sequence scrubbing and text overlay.
- `vite.config.ts` - Vite configuration with `@vitejs/plugin-react`.
- `tsconfig.json` - TypeScript compiler options for strict type-checking with Vite bundler mode.
