import { useEffect } from "react";
import type p5 from "p5";

/**
 * Custom React hook for embedding a p5.js sketch into a React component.
 *
 * This hook handles the dynamic import of p5.js, creates the sketch instance,
 * and properly cleans up the p5 instance when the component unmounts. It can
 * also provide the created p5.js instance back to the calling component via a
 * callback, which is useful for performance optimizations like manual redraws.
 *
 * @param sketch - The p5.js sketch function that defines the drawing behavior.
 * @param containerRef - React ref to the HTML div element that will contain the p5 canvas.
 * @param setP5Instance - Optional callback/state setter that receives the created p5 instance.
 *
 * @example
 * // Example of a performance-optimized sketch that only redraws when state changes.
 * ```tsx
 * import { useRef, useState, useEffect } from 'react';
 * import { useP5Sketch } from '@/components/useP5Sketch';
 * import type p5 from 'p5';
 *
 * function MyOptimizedSketch() {
 * const containerRef = useRef<HTMLDivElement>(null);
 * const [p5Instance, setP5Instance] = useState<p5 | null>(null);
 * const [diameter, setDiameter] = useState(50);
 *
 * const sketch = (p: p5) => {
 * p.setup = () => {
 * p.createCanvas(400, 400);
 * p.noLoop(); // Stop the continuous draw loop
 * };
 *
 * p.draw = () => {
 * p.background(220);
 * p.ellipse(p.width / 2, p.height / 2, diameter, diameter);
 * };
 * };
 *
 * // Pass the state setter to the hook
 * useP5Sketch(sketch, containerRef, setP5Instance);
 *
 * // Redraw the sketch only when the diameter or p5 instance changes
 * useEffect(() => {
 * if (p5Instance) {
 * p5Instance.redraw();
 * }
 * }, [diameter, p5Instance]);
 *
 * return (
 * <div>
 * <div ref={containerRef} />
 * <input
 * type="range"
 * min="10"
 * max="200"
 * value={diameter}
 * onChange={(e) => setDiameter(Number(e.target.value))}
 * />
 * </div>
 * );
 * }
 * ```
 */
export function useP5Sketch(
  sketch: (p: p5) => void,
  containerRef: React.RefObject<HTMLDivElement>,
  // Optional callback to get the p5 instance back into the component's state.
  setP5Instance?: (instance: p5) => void
) {
  useEffect(() => {
    let p5Instance: p5 | null = null;
    let isMounted = true;

    // Dynamically import p5.js to support server-side rendering.
    import("p5").then(p5Module => {
      // Ensure the component is still mounted and the container exists.
      if (!isMounted || !containerRef.current) return;

      const P5 = p5Module.default;
      // Create the new p5 instance.
      p5Instance = new P5(sketch, containerRef.current!);

      // If the setter function is provided, pass the instance back to the component.
      if (setP5Instance && p5Instance) {
        setP5Instance(p5Instance);
      }
    });

    // Cleanup function to run when the component unmounts.
    return () => {
      isMounted = false;
      if (p5Instance) {
        // Properly remove the p5 sketch to prevent memory leaks.
        p5Instance.remove();
      }
    };
  }, [sketch, containerRef, setP5Instance]);
}
