import { Scene, Layer, Canvas2d } from 'scrollsequence/react';
import manifest from '../manifests/dna-blue/scrollsequence-manifest.json'

export default function SceneDepth() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Spacer before sequence */}
      <section className="h-[50vh] flex items-center justify-center text-neutral-400">
        <p className="text-lg">Scroll down to start sequence ↓</p>
      </section>

      {/* Pinned Scene with Depth Map Parallax */}
      <Scene>
        <Layer>
          <Canvas2d
            mediaGroups={[
              {
                type: 'manifest',
                rootDir: 'https://cdn.scrollsequence.com/2026-09/dna-blue/',
                imageSizes: manifest.imageSizes,
              },
            ]}
          />
        </Layer>
        <Layer placement="center center">
          <div className="text-center px-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Cinematic Depth & Parallax
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-neutral-300">
              Hardware-accelerated 2.5D depth map simulation
            </p>
          </div>
        </Layer>
      </Scene>

      {/* Spacer after sequence */}
      <section className="h-screen flex items-center justify-center text-neutral-400">
        <p className="text-lg">Sequence ended, continue reading...</p>
      </section>
    </main>
  );
}
