"use client";

import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import type p5 from "p5";
import transformer from "./p5/transformer";
import ControlPanel from "./ControlPanel";
import ResultsPanel from "./ResultsPanel";
import drawDotGrid from "./p5/drawDotGrid";
import { useP5Sketch } from "@/components/useP5Sketch";
import { calculateTransformerResults } from "./calculateTransformerResults";

/**
 * Defines the constant values for the simulation.
 * @property {number} defaultVoltage - The initial voltage applied to the primary coil.
 * @property {number} loadResistance - The resistance of the load connected to the secondary coil, in Ohms.
 */
const SIM_CONSTANTS = {
  defaultVoltage: 40,
  loadResistance: 10, // Ohms
};

/**
 * The main component for the transformer simulation. It orchestrates the UI controls,
 * the p5.js canvas for visualization, and the results display. This component is optimized
 * to only redraw the p5.js sketch when visual parameters change, saving CPU/GPU resources.
 * @returns {JSX.Element} The rendered component.
 */
export default function TransformerCanvas() {
  /**
   * A ref to the container element where the p5.js canvas will be mounted.
   */
  const containerRef = useRef<HTMLDivElement>(null!);

  // --- STATE MANAGEMENT ---

  /**
   * State for the voltage applied to the primary coil.
   */
  const [primaryVoltage, setPrimaryVoltage] = useState(
    SIM_CONSTANTS.defaultVoltage
  );

  /**
   * State for the number of turns in the primary coil.
   */
  const [primaryTurns, setPrimaryTurns] = useState(1);

  /**
   * State for the number of turns in the secondary coil.
   */
  const [secondaryTurns, setSecondaryTurns] = useState(1);

  /**
   * State to hold the p5.js instance once it's created by the custom hook.
   * This is essential for manually triggering redraws.
   */
  const [p5Instance, setP5Instance] = useState<p5 | null>(null);

  /**
   * A ref to hold the latest state values for the p5.js sketch.
   * This allows the `draw` function to access the most recent turn counts
   * without needing to be redefined, which is efficient.
   */
  const latestState = useRef({ primaryTurns, secondaryTurns });
  latestState.current = { primaryTurns, secondaryTurns };

  /**
   * Memoized calculation of the transformer's output results.
   * `useMemo` ensures these calculations only re-run when dependencies change.
   */
  const results = useMemo(
    () =>
      calculateTransformerResults(
        primaryVoltage,
        primaryTurns,
        secondaryTurns,
        SIM_CONSTANTS.loadResistance
      ),
    [primaryVoltage, primaryTurns, secondaryTurns]
  );

  // --- P5.JS SKETCH & REDRAW LOGIC ---

  /**
   * The core p5.js sketch logic, wrapped in `useCallback` for performance.
   * @param {p5} p - The p5.js instance provided by the custom hook.
   */
  const sketch = useCallback((p: p5) => {
    /**
     * The setup function for the p5.js sketch. Runs once at the beginning.
     */
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.rectMode(p.CENTER);
      p.angleMode(p.DEGREES);
      p.noSmooth(); // Disables anti-aliasing for a crisper, pixelated look

      // Stop the p5.js draw loop to prevent constant re-rendering.
      // The sketch will now only be redrawn when manually triggered.
      p.noLoop();
    };

    /**
     * The draw function for the p5.js sketch. This will now only run on-demand
     * when `p5Instance.redraw()` is called.
     */
    p.draw = () => {
      const { primaryTurns, secondaryTurns } = latestState.current;
      drawDotGrid(p);
      p.push();
      p.shearY(5);
      p.stroke(8);
      transformer(p, primaryTurns, secondaryTurns);
      p.pop();
    };

    /**
     * A p5.js event handler that resizes the canvas whenever the window is resized.
     */
    p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
  }, []);

  // Initialize the p5.js sketch and pass the state setter to get the instance back.
  useP5Sketch(sketch, containerRef, setP5Instance);

  /**
   * This effect triggers a manual redraw of the p5.js sketch whenever the
   * number of turns changes. This is the core of the performance optimization.
   */
  useEffect(() => {
    // Ensure the instance exists before trying to use it.
    if (p5Instance) {
      p5Instance.redraw();
    }
  }, [primaryTurns, secondaryTurns, p5Instance]);

  // --- JSX RENDERING ---

  return (
    <div className="w-screen h-screen m-0 p-0 overflow-hidden">
      {/* The container for the p5.js canvas */}
      <div ref={containerRef} />

      {/* The panel that displays the calculated results */}
      <ResultsPanel {...results} />

      {/* The panel with sliders and buttons to control the simulation */}
      <ControlPanel
        primaryVoltage={primaryVoltage}
        setPrimaryVoltage={setPrimaryVoltage}
        primaryTurns={primaryTurns}
        setPrimaryTurns={setPrimaryTurns}
        secondaryTurns={secondaryTurns}
        setSecondaryTurns={setSecondaryTurns}
        reset={() => {
          // Resets all state values to their defaults
          setPrimaryVoltage(SIM_CONSTANTS.defaultVoltage);
          setPrimaryTurns(1);
          setSecondaryTurns(1);
        }}
      />
    </div>
  );
}
