import { Canvas2d } from 'scrollsequence/react';
import manifest from '../manifests/dna-blue-no-depth/scrollsequence-manifest.json'

export default function CanvasMinimal() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Spacer before sequence */}
      <section className="h-[50vh] flex items-center justify-center text-neutral-400">
        <p className="text-lg">Scroll down to start sequence ↓</p>
      </section>

      {/* Scroll-driven canvas scrubbing */}
      <Canvas2d
        mediaGroups={[
          {
            type: 'manifest',
            rootDir: 'https://cdn.scrollsequence.com/2026-09/dna-blue/',
            imageSizes: manifest.imageSizes,
          },
        ]}
      />

      {/* Spacer after sequence */}
      <section className="h-screen flex items-center justify-center text-neutral-400">
        <p className="text-lg">Sequence ended, continue reading...</p>
      </section>
    </main>
  );
}
