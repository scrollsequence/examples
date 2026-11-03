import { useState, useRef } from 'react';
import { Scene, Layer, Canvas2d, SceneHandle } from 'scrollsequence/react';
import manifestBlue from '../manifests/dna-blue-no-depth/scrollsequence-manifest.json';
import manifestRed from '../manifests/dna-red-no-depth/scrollsequence-manifest.json';

export default function SceneProgressControl() {
  // Imperative ref handle (high-performance 60+ FPS, zero React re-renders)
  const sceneRef = useRef<SceneHandle>(null);
  const [displayVal, setDisplayVal] = useState<string>('scroll');

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Floating Interactive Test Panel for React */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900/95 backdrop-blur-md border border-neutral-700 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 text-xs font-sans max-w-md w-[92vw] sm:w-[460px]">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <span className="font-semibold text-neutral-200">Scene Progress Control (via useRef)</span>
          <button
            onClick={() => {
              sceneRef.current?.progress(null);
              setDisplayVal('scroll');
            }}
            className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-3 py-1 rounded-md cursor-pointer font-medium transition-colors"
          >
            Reset to Scroll
          </button>
        </div>

        {/* Manual Scrub Slider via Ref */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-neutral-400 font-medium">Slider:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            defaultValue="0"
            aria-label="Scene progress control slider"
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              sceneRef.current?.progress(val);
              setDisplayVal(val.toFixed(3));
            }}
            className="flex-1 accent-blue-500 cursor-pointer"
          />
          <span className="font-mono text-neutral-300 w-12 text-right">{displayVal}</span>
        </div>
      </div>

      {/* Spacer before sequence */}
      <section className="h-[60vh] flex flex-col items-center justify-center text-center px-4 text-neutral-400">
        <h2 className="text-xl font-semibold text-white">Scene Progress Control ↓</h2>
        <p className="mt-2 text-sm max-w-lg">
            Try to control scene progress via slider. Can be mapped to any custom progress.
        </p>
      </section>
      {/* Pinned Scene with Content Animations */}
      <Scene
        ref={sceneRef}
        contentAnimations={{
          onScroll: [
            {
              selector: '.animation-attached-to-global-scene-progress',
              track: {
                0: { width: 'calc(0% + 2px)' },
                1: { width: 'calc(100% - 2px)' },
              },
            },
          ],
        }}
      >
        <Layer>
          <Canvas2d
            disableDepthmaps={true}
            mediaGroups={[
              {
                type: 'manifest',
                rootDir: 'https://cdn.scrollsequence.com/2026-09/dna-blue/',
                imageSizes: manifestBlue.imageSizes,
                contentAnimations: {
                  onScroll: [
                    {
                      selector: '.animation-attached-to-first-media-group',
                      track: {
                        0: { opacity: 0, y: '100px', scale: 0.8 },
                        0.25: { opacity: 1, y: 0, scale: 1 },
                        0.75: { opacity: 1, y: 0, scale: 1 },
                        1: { opacity: 0, y: '-100px', scale: 0.8 },
                      },
                    },
                  ],
                },
              },
              {
                type: 'manifest',
                rootDir: 'https://cdn.scrollsequence.com/2026-09/dna-red/',
                imageSizes: manifestRed.imageSizes,
              },
            ]}
          />
        </Layer>
        {/* Global Progress Bar Layer */}
        <Layer placement="top left">
          <div className="w-full">
            <div className="animation-attached-to-global-scene-progress h-1 bg-red-500" />
          </div>
        </Layer>

        {/* Dynamic Animated Text Layer */}
        <Layer placement="center center">
          <div className="animation-attached-to-first-media-group text-center px-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Animate Any HTML Content
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-neutral-300">
              Sync typography, UI layers, and progress indicators directly to scroll
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
