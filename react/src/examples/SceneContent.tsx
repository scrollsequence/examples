import { Scene, Layer, Canvas2d } from 'scrollsequence/react';
import manifestBlue from '../manifests/dna-blue-no-depth/scrollsequence-manifest.json'
import manifestRed from '../manifests/dna-red-no-depth/scrollsequence-manifest.json'

export default function SceneContent() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Spacer before sequence */}
      <section className="h-[50vh] flex flex-col items-center justify-center text-center px-4 text-neutral-400">
        <h2 className="text-xl font-semibold text-white">Scroll down to start sequence ↓</h2>
        <p className="mt-2 text-sm max-w-lg">
          We have two media groups. The <i>progress bar</i> is attached to the global Scene timeline,
          and the <i>content animation</i> is attached to the media group.
        </p>
      </section>

      {/* Pinned Scene with Content Animations */}
      <Scene
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
        triggerStart={1}
        triggerEnd={0}
      >
        <Layer>
          <Canvas2d
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
                isReverse: true, // second media group plays backwards
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
