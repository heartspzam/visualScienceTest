import type p5 from "p5";
import { vRect } from "./vRect";
import insideContour from "./insideContour";
import { Config } from "./rectConfig";

/**
 * Draws the inner, shaded faces of the transformer core to create a 3D effect.
 * This function draws a smaller shape that represents the inside surfaces of the
 * C-shaped core, using a darker color to imply shadow and depth.
 *
 * @param {p5} p - The p5.js instance.
 * @param {Config} config - The main configuration object for styling and geometry.
 */
export const drawInnerCore = (p: p5, config: Config) => {
  // Destructure necessary properties, specifically using the darker `innerColor`.
  const { center, size, radius, thickness, innerColor } = config.core;

  // Set the fill color to the darker shade for the inner faces.
  p.fill(innerColor);

  // Begin defining the custom shape for the inner faces.
  p.beginShape();

  // 1. Define the outer boundary. Note that this rectangle is smaller
  //    (half the width and height) than the main outer core's rectangle.
  //    This creates the visible "thickness" of the core's top and left arms.
  vRect(p, center.x, center.y, size.w / 2, size.h / 2, radius, "cw");

  // 2. Begin a contour to cut out the center, same as the outer core.
  p.beginContour();

  // 3. Use the exact same inner contour path as the `drawOuterCore` function.
  //    When this contour is cut from the smaller rectangle defined above,
  //    what remains is the shape of the inner surfaces.
  insideContour(p, center.x, center.y, size.w, size.h, radius, thickness);

  // 4. End the contour definition.
  p.endContour();

  // 5. Finalize the shape.
  p.endShape(p.CLOSE);
};
