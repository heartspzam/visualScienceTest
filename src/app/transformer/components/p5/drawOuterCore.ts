import type p5 from "p5";
import { vRect } from "./vRect";
import insideContour from "./insideContour";
import { Config } from "./rectConfig";

/**
 * Draws the main C-shaped outer core of the transformer.
 * It achieves this by first defining a large rounded rectangle and then
 * creating a smaller "hole" or "contour" inside it.
 *
 * @param {p5} p - The p5.js instance.
 * @param {Config} config - The main configuration object for styling and geometry.
 */
export const drawOuterCore = (p: p5, config: Config) => {
  // Destructure necessary properties from the configuration.
  const { center, size, radius, thickness, outerColor } = config.core;

  // Set the fill color for the core.
  p.fill(outerColor);

  // Begin defining a custom shape.
  p.beginShape();

  // 1. Define the outer boundary of the shape as a clockwise rounded rectangle.
  vRect(p, center.x, center.y, size.w, size.h, radius, "cw");

  // 2. Begin defining an inner contour, which will be cut out from the main shape.
  p.beginContour();

  // 3. Define the path of the cutout (the inverted U-shape).
  //    This must be drawn in the opposite direction (counter-clockwise) to the outer shape.
  insideContour(p, center.x, center.y, size.w, size.h, radius, thickness);

  // 4. End the definition of the inner contour.
  p.endContour();

  // 5. Finalize the shape, closing the path and applying the cutout.
  p.endShape(p.CLOSE);
};
