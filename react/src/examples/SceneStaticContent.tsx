import { Scene, Layer, Canvas2d } from 'scrollsequence/react';
import manifest from '../manifests/dna-blue-no-depth/scrollsequence-manifest.json';

export default function SceneStaticContent() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Spacer before sequence */}
      <section className="h-[50vh] flex flex-col items-center justify-center text-center px-4 text-neutral-400">
        <p className="text-lg">Scroll down to start sequence ↓</p>
        <p className="mt-2 text-sm text-neutral-500 max-w-md">
          The Scene uses a negative bottom margin (-mb-[1500px]) so the following relative section scrolls directly over the pinned canvas.
        </p>
      </section>

      {/* Pinned Scene with negative bottom margin matching its 1500px scroll duration */}
      <Scene
        duration={1500}
        className="-mb-[1500px]"
        contentAnimations={{
          onScroll: [
            {
              selector: '.scene-hero-intro',
              track: {
                0: { opacity: 1, y: '0px', scale: 1 },
                0.2: { opacity: 0, y: '-60px', scale: 0.95 },
              },
            },
          ],
        }}
      >
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

        {/* Initial Hero Layer that fades out as static content scrolls in */}
        <Layer placement="center center">
          <div className="scene-hero-intro text-center px-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Pinned Scene + Static Content
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-neutral-300">
              Keep scrolling — normal page content will glide over this pinned sequence
            </p>
          </div>
        </Layer>
      </Scene>

      {/* Relative container that overlaps and scrolls over the pinned Scene */}
      <section className="relative z-10 min-h-[1500px] max-w-5xl mx-auto px-6 py-24 flex flex-col justify-between pointer-events-none">
        <div className="max-w-md p-6 rounded-2xl bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-2xl pointer-events-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
            01 / Overlap Layout
          </span>
          <h2 className="mt-2 text-2xl font-bold">Depth Through Motion</h2>
          <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
            Applying <code className="text-blue-300">-mb-[1500px]</code> on the Scene pulls this{' '}
            <code className="text-blue-300">relative z-10</code> container directly over the sticky canvas timeline.
          </p>
        </div>

        <div className="max-w-md self-end p-6 rounded-2xl bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-2xl pointer-events-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
            02 / Native Flow
          </span>
          <h2 className="mt-2 text-2xl font-bold">Natural Document Scroll</h2>
          <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
            Your cards, grids, and interactive components scroll at normal page speed while the background sequence scrubs at 60 FPS.
          </p>
        </div>

        <div className="max-w-md p-6 rounded-2xl bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-2xl pointer-events-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
            03 / Seamless Handoff
          </span>
          <h2 className="mt-2 text-2xl font-bold">Synchronized Unpinning</h2>
          <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
            Matching <code className="text-blue-300">min-h-[1500px]</code> to the Scene duration ensures the background unpins right as this section finishes.
          </p>
        </div>
      </section>

      {/* Spacer after sequence */}
      <section className="h-screen flex items-center justify-center text-neutral-400">
        <p className="text-lg">Sequence ended, continue reading...</p>
      </section>
    </main>
  );
}

