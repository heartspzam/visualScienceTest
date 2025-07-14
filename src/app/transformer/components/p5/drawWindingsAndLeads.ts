import type p5 from "p5";
import coil from "./coil";
import drawPrimaryLeads from "./primaryLeads";
import drawSecondaryLeads from "./secondaryLeads";
import { Config } from "./rectConfig";

/**
 * Draws the primary and secondary coil windings and their corresponding connection leads.
 * The number of windings is determined by the `primaryTurns` and `secondaryTurns` parameters.
 *
 * @param {p5} p - The p5.js instance.
 * @param {Config} config - The main configuration object for styling and geometry.
 * @param {number} primaryTurns - The number of windings to draw for the primary coil.
 * @param {number} secondaryTurns - The number of windings to draw for the secondary coil.
 */
export const drawWindingsAndLeads = (
  p: p5,
  config: Config,
  primaryTurns: number,
  secondaryTurns: number
) => {
  // Destructure necessary properties from the configuration for easier access.
  const { center, size, radius, thickness } = config.core;
  const { primaryColor, secondaryColor } = config.windings;

  // --- Draw Primary Side ---

  // Set the stroke color for the primary coil.
  p.stroke(primaryColor);
  // Loop to draw each winding of the primary coil.
  for (let i = 0; i < primaryTurns; i++) {
    coil(p, center.x, center.y, size.w, size.h, radius, thickness, i);
  }
  // Ensure the color is set correctly for the leads and draw them.
  p.stroke(primaryColor);
  drawPrimaryLeads(p, center.x, center.y, size.w, size.h, thickness);

  // --- Draw Secondary Side ---

  // Set the stroke color for the secondary coil.
  p.stroke(secondaryColor);
  // Calculate the center X-coordinate for the secondary coil, placing it on the right limb of the core.
  const secondaryX = center.x + size.w / 2 + size.w / 4;
  // Loop to draw each winding of the secondary coil.
  for (let i = 0; i < secondaryTurns; i++) {
    coil(p, secondaryX, center.y, size.w, size.h, radius, thickness, i);
  }
  // Ensure the color is set correctly for the leads and draw them.
  p.stroke(secondaryColor);
  drawSecondaryLeads(p, center.x, center.y, size.w, size.h, thickness);
};
