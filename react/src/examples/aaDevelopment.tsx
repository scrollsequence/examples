import { Scene, Layer, Canvas2d } from 'scrollsequence/react';
import manifestDepth from '../manifests/dna-blue/scrollsequence-manifest.json'
import manifestNoDepth from '../manifests/dna-red-no-depth/scrollsequence-manifest.json'

export default function AaDevelopment() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Spacer before sequence */}
      <section className="h-[50vh] flex items-center justify-center text-neutral-400">
        <p className="text-lg">Autoplay ↓</p>
      </section>

      {/* Pinned Scene with canvas background & overlay text */}
      <Scene>
        <Layer>
          <Canvas2d
            mediaGroups={[
              {
                type: 'manifest',
                rootDir: 'https://cdn.scrollsequence.com/2026-09/dna-blue/', // (root url is the same, here we load with depthmaps)
                imageSizes: manifestDepth.imageSizes, // has depthmaps in manifest
                contentAnimations: {
                    onScroll: [
                        {
                            selector: '.example',
                            track: {
                                0: {
                                    opacity: 1,
                                },
                                0.5: {
                                    opacity: 0.5,
                                },
                                1: {
                                    opacity: 0,
                                }
                            },
                            options: { // works okay-ish
                                repeat: 5,
                                //repeatType: 'reverse'
                            },
                            progressSource: "scroll", // <-- Watches page scroll: triggers once user scrolls past 0.75!
                            // autoplay: { 
                            //     start: 0.5,
                            //     end : 0.95,
                            // }
                        }
                    ]
                },
                // autoplay:true,
                autoplay: {
                    fps: 30,
                    repeat: -1,
                    repeatType: "reverse"
                },
              },
              {
                type: 'manifest',
                rootDir: 'https://cdn.scrollsequence.com/2026-09/dna-red/', // (root url is the same, here we load without depthmaps
                imageSizes: manifestNoDepth.imageSizes, // no depthmaps in manifest
              },              
            ]}
          />
        </Layer>
        <Layer placement="center center">
          <div className="text-center px-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight example">
              Cinematic Scroll
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-neutral-300">
              60 FPS Hardware-Accelerated Scrubbing
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
