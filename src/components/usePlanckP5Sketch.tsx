/**
 * Custom React hook for embedding a p5.js sketch with Planck.js physics into a React component.
 *
 * This hook combines p5.js for rendering with Planck.js for 2D physics simulation.
 * It handles the dynamic import of p5.js, creates both the p5 sketch instance and
 * Planck.js world, and properly cleans up all instances when the component unmounts.
 *
 * @param sketch - The p5.js sketch function that receives p5 instance, planck module, and physics world
 * @param containerRef - React ref to the HTML div element that will contain the p5 canvas
 * @param gravity - Optional gravity vector for the physics world (defaults to downward gravity)
 *
 * @example
 * ```tsx
 * import { useRef } from 'react';
 * import { usePlanckP5Sketch } from '@/components/usePlanckP5Sketch';
 * import type p5 from 'p5';
 * import * as planck from 'planck';
 *
 * function PhysicsSketch() {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *
 *   const sketch = (p: p5, planck: typeof import('planck'), world: planck.World) => {
 *     let ground: planck.Body;
 *     let box: planck.Body;
 *
 *     p.setup = () => {
 *       p.createCanvas(400, 400);
 *
 *       // Create ground body
 *       ground = world.createBody({
 *         type: 'static',
 *         position: planck.Vec2(200, 350)
 *       });
 *       ground.createFixture(planck.Box(100, 20));
 *
 *       // Create falling box
 *       box = world.createBody({
 *         type: 'dynamic',
 *         position: planck.Vec2(200, 50)
 *       });
 *       box.createFixture(planck.Box(20, 20), 1);
 *     };
 *
 *     p.draw = () => {
 *       p.background(220);
 *
 *       // Step physics simulation
 *       world.step(1/60);
 *
 *       // Draw bodies
 *       p.push();
 *       p.translate(200, 200);
 *       p.scale(1, -1);
 *
 *       // Draw ground
 *       p.fill(100);
 *       p.rect(-100, -10, 200, 20);
 *
 *       // Draw box
 *       const pos = box.getPosition();
 *       p.fill(255, 0, 0);
 *       p.rect(pos.x - 10, pos.y - 10, 20, 20);
 *       p.pop();
 *     };
 *   };
 *
 *   usePlanckP5Sketch(sketch, containerRef);
 *
 *   return <div ref={containerRef} />;
 * }
 * ```
 */
import { useEffect } from "react";
import type p5 from "p5";
import * as planck from "planck";

export function usePlanckP5Sketch(
  sketch: (p: p5, planck: typeof import("planck"), world: planck.World) => void,
  containerRef: React.RefObject<HTMLDivElement>,
  gravity: planck.Vec2 = new planck.Vec2(0, 10)
) {
  useEffect(() => {
    let p5Instance: p5 | null = null;
    let world: planck.World | null = null;
    let isMounted = true;

    import("p5").then(p5Module => {
      if (!isMounted || !containerRef.current) return;
      const P5 = p5Module.default;
      world = new planck.World(gravity);
      const wrappedSketch = (p: p5) => {
        sketch(p, planck, world!);
      };
      p5Instance = new P5(wrappedSketch, containerRef.current!);
    });

    return () => {
      isMounted = false;
      if (p5Instance) {
        p5Instance.remove();
      }
      if (world) {
        // Clean up all bodies in the world
        for (let body = world.getBodyList(); body; body = body.getNext()) {
          if (!world.isLocked()) {
            world.destroyBody(body);
          }
        }
      }
    };
  }, [sketch, containerRef, gravity]);
}
