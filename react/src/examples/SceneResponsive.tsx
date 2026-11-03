import { useState, useEffect } from 'react';
import { Scene, Layer, Canvas2d } from 'scrollsequence/react';
import manifestBlue from '../manifests/dna-blue-no-depth/scrollsequence-manifest.json';
import manifestRed from '../manifests/dna-red-no-depth/scrollsequence-manifest.json';

export default function SceneResponsive() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Spacer before sequence */}
      <section className="h-[50vh] flex flex-col items-center justify-center text-center px-4 text-neutral-400">
        <p className="text-lg">Scroll down to start sequence ↓</p>
        <p className="mt-2 text-sm text-neutral-500">
          Resize your browser across 768px to switch between Mobile (Red) and Desktop (Blue).
        </p>
      </section>

      {/* Pinned Responsive Scene */}
      <Scene>
        <Layer>
          <Canvas2d
            mediaGroups={[
              isDesktop
                ? {
                    type: 'manifest',
                    rootDir: 'https://cdn.scrollsequence.com/2026-09/dna-blue/',
                    imageSizes: manifestBlue.imageSizes,
                  }
                : {
                    type: 'manifest',
                    rootDir: 'https://cdn.scrollsequence.com/2026-09/dna-red/',
                    imageSizes: manifestRed.imageSizes,
                  },
            ]}
          />
        </Layer>
        <Layer placement="center center">
          <div className="text-center px-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              {isDesktop ? 'Desktop Experience (Blue)' : 'Mobile Experience (Red)'}
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-neutral-300">
              {isDesktop
                ? 'Loading the blue image sequence for desktop viewports (≥ 768px)'
                : 'Loading the red image sequence for mobile viewports (< 768px)'}
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

