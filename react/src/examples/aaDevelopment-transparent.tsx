import { Scene, Layer, Canvas2d } from 'scrollsequence/react';
//import manifest from '../hacker-transp2/scrollsequence-manifest.json'

// Background removal study: 
// step 1: remove background
// https://fal.ai/models/pixelcut/video-background-removal

// Commented out, because we don't have the hacker transp on cdn and i don't want it here.

export default function AaDevelopmentTranparent() {
  return (
    <main className="min-h-screen bg-red-950 text-white">

      <section className="h-[50vh] flex items-center justify-center text-neutral-400">
        <p className="text-lg">Autoplay ↓</p>
      </section>
      {/*
      <Scene>
        <Layer placement="center center">
          <div className="text-center px-4">
            <h1 className="text-8xl font-extrabold tracking-tight example">
              Cinematic Scroll
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-neutral-300">
              60 FPS Hardware-Accelerated Scrubbing
            </p>
          </div>
        </Layer>
        <Layer>
          <Canvas2d
            mediaGroups={[
              {
                type: 'manifest',
                //rootDir: 'https://cdn.scrollsequence.com/2026-09/dna-blue/', // (root url is the same, here we load with depthmaps)
                rootDir: '../src/hacker-transp2/',
                imageSizes: manifest.imageSizes, // has depthmaps in manifest
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
                        }
                    ]
                },
              },
            ]}
          />
        </Layer>
      </Scene>
      */}


      <section className="h-screen flex items-center justify-center text-neutral-400">
        <p className="text-lg">Sequence ended, continue reading...</p>
      </section>
    </main>
  );
}
