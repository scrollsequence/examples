# dna-red — Scrollsequence Assets

This sequence was generated with the [Scrollsequence CLI](https://scrollsequence.com).

## Project Details
- **Frame Count**: 293
- **Available Sizes**: 1280px, 1920px
- **Web Root Directory**: `/dna-red/`
- **Subject Tracking**:  None
- **Vision Analysis**: ✅ Enabled
- **3D Depth Maps**: ✅ Enabled
---

> [!NOTE]
> **AI Vision Analysis Active**: Frame-by-frame scene understanding is included in the [scrollsequence-manifest.json](./scrollsequence-manifest.json) file. AI coding assistants can read this semantic timeline to build synchronized Content Animations.

## 1. Quick Start (React / Next.js)

### Method A: Lightweight Inlined Sizes (Zero extra network requests)
```tsx
import { Scene, Layer, Canvas2d } from 'scrollsequence/react';

export default function dnared() {
  return (
    <Scene>
      <Layer>
        <Canvas2d
          mediaGroups={[
            {
              type: 'manifest',
              rootDir: '/dna-red/',
              imageSizes: {
                "1280": {
                  "width": 1280,
                  "height": 720,
                  "files": {
                    "i": "1280/%04d.jpg",
                    "d": "depthmaps/%04d.jpg"
                  },
                  "frameCount": 293
                },
                "1920": {
                  "width": 1920,
                  "height": 1080,
                  "files": {
                    "i": "1920/%04d.jpg",
                    "d": "depthmaps/%04d.jpg"
                  },
                  "frameCount": 293
                }
              }
            }
          ]}
        />
      </Layer>
    </Scene>
  );
}
```

### Method B: Importing Manifest JSON
```tsx
import { Scene, Layer, Canvas2d } from 'scrollsequence/react';
import manifest from './dna-red/scrollsequence-manifest.json';

export default function dnared() {
  return (
    <Scene>
      <Layer>
        <Canvas2d
          mediaGroups={[
            {
              type: 'manifest',
              rootDir: '/dna-red/',
              imageSizes: manifest.imageSizes,
              tracking: manifest.tracking
            }
          ]}
        />
      </Layer>
    </Scene>
  );
}
```

---

## 2. Vanilla JavaScript / HTML

```html
<link rel="stylesheet" href="node_modules/scrollsequence/dist/scrollsequence.css" />

<div class="scrollsequence-scene">
  <div class="scrollsequence-layer">
    <div 
      class="scrollsequence-canvas2d"
      data-ssq-media-groups='[{"type":"manifest","rootDir":"/dna-red/","imageSizes":{"1280":{"width":1280,"height":720,"files":{"i":"1280/%04d.jpg","d":"depthmaps/%04d.jpg"},"frameCount":293},"1920":{"width":1920,"height":1080,"files":{"i":"1920/%04d.jpg","d":"depthmaps/%04d.jpg"},"frameCount":293}}}]'
    >
      <canvas></canvas>
    </div>
  </div>
</div>

<script type="module">
  import ScrollsequenceManager from 'scrollsequence';
  ScrollsequenceManager.initialize().preloadAll();
</script>
```

---

> [!TIP]
> **Enhance with 3D Depth & Subject Tracking**:
> - **Subject Tracking**: Track movement to anchor HTML elements to video objects (`--track "subject"`).
>
> Re-run anytime:
> ```bash
> npx scrollsequence vid2ssq <video> --track "subject"
> ```
> Cloud AI features require an API key. Get free credits at [members.scrollsequence.com](https://members.scrollsequence.com).
