import { useEffect, useRef } from 'react';
import { Scene, Layer, Canvas2d, SceneHandle } from 'scrollsequence/react';
import manifest from '../manifests/handmove/scrollsequence-manifest.json';

export default function MouseControl() {
    const sceneRef = useRef<SceneHandle>(null);
    const progressTextRef = useRef<HTMLSpanElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const rafIdRef = useRef<number | null>(null);
    const latestProgressRef = useRef<number>(0);
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    useEffect(() => {
        const handlePointerMove = (e: MouseEvent | PointerEvent) => {
            if (!hasMouse) return;
            const height = window.innerHeight;
            if (height <= 0) return;
            // Mouse at top (clientY = 0) => progress = 0
            // Mouse at bottom (clientY = height) => progress = 1
            const progress = Math.min(1, Math.max(0, e.clientY / height));
            latestProgressRef.current = progress;

            if (rafIdRef.current === null) {
                rafIdRef.current = requestAnimationFrame(() => {
                    rafIdRef.current = null;
                    const current = latestProgressRef.current;

                    // Scrub scene frame imperatively
                    sceneRef.current?.progress(current);

                    // Update HUD directly for zero-latency 60-144 FPS
                    if (progressTextRef.current) {
                        progressTextRef.current.textContent = current.toFixed(3);
                    }
                    if (progressBarRef.current) {
                        progressBarRef.current.style.width = `${(current * 100).toFixed(1)}%`;
                    }
                });
            }
        };

        window.addEventListener('pointermove', handlePointerMove);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
        };
    }, []);
    return (
        <main>
            <Scene 
                ref={sceneRef} 
                scenePosition={hasMouse ? "flow" : "sticky" } // use to reduce container height
            >
                <Layer>
                    <Canvas2d
                        depthMapsTilt={0.28}
                        mediaGroups={[{
                            type: 'manifest',
                            rootDir: 'https://cdn.scrollsequence.com/2026-09/handmove/',
                            imageSizes: manifest.imageSizes,
                            contentAnimations: {
                                onScroll: [{ selector: '.track-hand-and-animate', track: { 0: { translateY: '0px' }, 1: { translateY: '100%' } } }],
                            },
                        }]}
                    />
                </Layer>
                <Layer placement="center center">
                    <div className="track-hand-and-animate">
                        {hasMouse
                            ?
                            <MouseCard progressTextRef={progressTextRef} progressBarRef={progressBarRef} />
                            :
                            <TouchCard />
                        }
                    </div>
                </Layer>
            </Scene>
        </main>
    );
}


// --- Component A: Mouse Controller Card ---
function MouseCard({ progressTextRef, progressBarRef }: { progressTextRef: any, progressBarRef: any }) {
    return (
        <div className="w-[320px] sm:w-[350px] rounded-2xl bg-neutral-950/70 backdrop-blur border border-purple-500/30 p-5 shadow-[0_0_35px_rgba(168,85,247,0.25)] text-white text-left font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /><strong className="tracking-wide uppercase text-[11px] opacity-80">Scrollsequence</strong></span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono">Mouse Active • 60 FPS</span>
            </div>
            <div className="py-3 space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold bg-linear-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">Mouse Control</h2>
                <p className="text-xs text-neutral-300 leading-relaxed">Move mouse to scrub frames & tilt</p>
            </div>
            <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                    <span>Controller: <strong className="text-emerald-300">Mouse</strong></span>
                    <span>Progress: <strong className="text-white"><span ref={progressTextRef}></span></strong></span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800/80 rounded-full overflow-hidden border border-neutral-700/60">
                    <div
                        ref={progressBarRef}
                        className="h-full bg-linear-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-[width] duration-75 ease-out rounded-full"
                        style={{ width: '0%' }}
                    />
                </div>
            </div>
            <div className="pt-3 mt-2 flex items-center justify-between text-[11px] text-neutral-400 border-t border-white/5">
                <span className="flex items-center gap-1 text-neutral-300">
                    Depth tilt active
                </span>
            </div>
        </div>
    );
}
// --- Component B: Touch-Scroll Controller Card ---
function TouchCard() {
    return (
        <div className="w-[320px] sm:w-[350px] rounded-2xl bg-neutral-950/70 backdrop-blur-2xl border border-amber-500/30 p-5 shadow-[0_0_35px_rgba(245,158,11,0.25)] text-white text-left font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" /><strong className="tracking-wide uppercase text-[11px] opacity-80">Warning</strong></span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-300 font-mono">No Mouse</span>
            </div>
            <div className="py-3 space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold bg-linear-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">Touch Control</h2>
                <p className="text-xs text-neutral-300 leading-relaxed">No mouse detected. Scrub sequence by scrolling page</p>
            </div>
        </div>
    );
}