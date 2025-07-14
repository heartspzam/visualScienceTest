import type p5 from "p5";
import cubicBorders from "./cubicBorders";
import { Config } from "./rectConfig";
import { drawOuterCore } from "./drawOuterCore";
import { drawInnerCore } from "./drawInnerCore";
import { drawLabel } from "./drawLabel";
import { drawWindingsAndLeads } from "./drawWindingsAndLeads";

/**
 * The main drawing function that orchestrates rendering the entire transformer graphic.
 * It sets up a configuration object and calls a sequence of specialized drawing functions.
 *
 * @param {p5} p - The p5.js instance.
 * @param {number} primaryTurns - The number of windings for the primary coil.
 * @param {number} secondaryTurns - The number of windings for the secondary coil.
 */
const transformer = (
  p: p5,
  primaryTurns: number,
  secondaryTurns: number
): void => {
  /**
   * Configuration object that centralizes all styling, sizing, and positioning
   * for the transformer's components. This makes it easy to adjust the visual
   * appearance from one place.
   */
  const config: Config = {
    core: {
      center: { x: p.width / 2 - 70, y: 350 },
      size: { w: 400, h: 400 },
      thickness: 70,
      radius: 5,
      outerColor: [200], // A light gray
      innerColor: [120], // A darker gray
    },
    windings: {
      primaryColor: [0, 0, 220], // Blue
      secondaryColor: [220, 0, 0], // Red
    },
    label: {
      text: "TRANSFORMER",
      size: 24,
      color: [0], // Black
    },
    stroke: {
      weight: 2.5,
    },
  };

  // Set the stroke weight for all subsequent drawing operations.
  p.strokeWeight(config.stroke.weight);

  // --- DRAWING SEQUENCE ---

  // 1. Draw the faux-3D perspective lines.
  cubicBorders(p, config);

  // 2. Draw the main outer shape of the transformer core.
  drawOuterCore(p, config);

  // 3. Render the text label onto the core.
  drawLabel(p, config);

  // 4. Draw the inner part of the core, creating the "C" shape.
  drawInnerCore(p, config);

  // 5. Draw the primary and secondary windings and their connection leads.
  drawWindingsAndLeads(p, config, primaryTurns, secondaryTurns);
};

export default transformer;
