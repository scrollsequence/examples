import { Scene, Layer, Canvas2d } from 'scrollsequence/react';
import manifest from '../manifests/dna-blue-no-depth/scrollsequence-manifest.json';

export default function SceneToggleActions() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Spacer before sequence */}
      <section className="h-[50vh] flex flex-col items-center justify-center text-center px-4 text-neutral-400">
        <h2 className="text-xl font-semibold text-white">Scroll down to test Toggle Actions ↓</h2>
        <p className="mt-2 text-sm max-w-lg text-neutral-400">
          Instead of scrubbing opacity frame-by-frame, <code className="text-blue-400">autoplay</code> inside{' '}
          <code className="text-blue-400">onScroll</code> triggers time-based animations (`play`, `reverse`, `reset`)
          when crossing scroll thresholds.
        </p>
      </section>

      {/* Pinned Scene with Toggle Action Content Animations */}
      <Scene
        triggerStart={1}
        triggerEnd={0}
        contentAnimations={{
          onScroll: [
            // 1. Continuous progress bar (scrubbed 0 -> 1)
            {
              selector: '.scene-progress-bar',
              track: {
                0: { width: '0%' },
                1: { width: '100%' },
              },
            },
            // 2. Card 1: Plays in at 15%, reverses out at 55%
            {
              selector: '.toggle-card-1',
              track: {
                0: { autoAlpha: 0, y: '40px', scale: 0.92 },
                1: { autoAlpha: 1, y: '0px', scale: 1 },
              },
              options: {
                duration: 0.45,
                ease: 'easeOut',
              },
              autoplay: {
                start: 0.15,
                end: 0.55,
                onEnter: 'play',
                onLeave: 'reverse',
                onEnterBack: 'play',
                onLeaveBack: 'reverse',
              },
            },
            // 3. Card 2: Plays in at 55%, resets instantly at 90%
            {
              selector: '.toggle-card-2',
              track: {
                0: { autoAlpha: 0, y: '40px', scale: 0.92 },
                1: { autoAlpha: 1, y: '0px', scale: 1 },
              },
              options: {
                duration: 0.45,
                ease: 'easeOut',
              },
              autoplay: {
                start: 0.55,
                end: 0.9,
                onEnter: 'play',
                onLeave: 'reset',
                onEnterBack: 'play',
                onLeaveBack: 'reverse',
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

        {/* Top Progress Bar with Threshold Markers (15%, 55%, 90%) */}
        <Layer placement="top left">
          <div className="w-full bg-neutral-900/90 backdrop-blur-sm border-b border-white/10 pb-6 pt-2 px-0 relative">
            <div className="w-full h-1.5 bg-neutral-800 relative">
              <div className="scene-progress-bar h-full bg-blue-500" />
              {/* Threshold ticks */}
              <div className="absolute top-0 bottom-0 left-[15%] w-0.5 bg-emerald-400">
                <span className="absolute top-2.5 -translate-x-1/2 text-[10px] font-mono text-emerald-400 whitespace-nowrap">
                  15% (Card 1 Start)
                </span>
              </div>
              <div className="absolute top-0 bottom-0 left-[55%] w-0.5 bg-amber-400">
                <span className="absolute top-2.5 -translate-x-1/2 text-[10px] font-mono text-amber-400 whitespace-nowrap">
                  55% (Swap)
                </span>
              </div>
              <div className="absolute top-0 bottom-0 left-[90%] w-0.5 bg-rose-400">
                <span className="absolute top-2.5 -translate-x-1/2 text-[10px] font-mono text-rose-400 whitespace-nowrap">
                  90% (Card 2 End)
                </span>
              </div>
            </div>
          </div>
        </Layer>

        {/* Threshold-Triggered Cards */}
        <Layer placement="center center">
          <div className="w-full max-w-3xl px-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="toggle-card-1 p-6 rounded-2xl bg-neutral-900/85 backdrop-blur-md border border-emerald-500/30 shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                <span>Card 01</span>
                <span>0.15 → 0.55</span>
              </div>
              <h3 className="text-xl font-bold text-white">Smooth Play & Reverse</h3>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                Triggers <code className="text-emerald-300">play</code> at 15% and smoothly{' '}
                <code className="text-emerald-300">reverse</code>s out at 55% over 0.45s.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-neutral-400">
                play / reverse / play / reverse
              </div>
            </div>

            {/* Card 2 */}
            <div className="toggle-card-2 p-6 rounded-2xl bg-neutral-900/85 backdrop-blur-md border border-amber-500/30 shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                <span>Card 02</span>
                <span>0.55 → 0.90</span>
              </div>
              <h3 className="text-xl font-bold text-white">Play & Instant Reset</h3>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                Triggers <code className="text-amber-300">play</code> at 55% and snaps to{' '}
                <code className="text-amber-300">reset</code> immediately when crossing 90%.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-neutral-400">
                play / reset / play / reverse
              </div>
            </div>
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

