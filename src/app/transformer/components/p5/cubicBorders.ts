import type p5 from "p5";
import { myVertex, myQuadraticVertex } from "@/components/p5/myQuadraticVertex";
import { Config } from "./rectConfig";

/**
 * Draws the extruded top and right faces of the transformer core to create a
 * faux-3D or "cubic" perspective effect.
 *
 * @param {p5} p - The p5.js instance.
 * @param {Config} config - The main configuration object for styling and geometry.
 */
const cubicBorders = (p: p5, config: Config): void => {
  // Destructure and assign core geometric properties for readability.
  const { center, size, radius, thickness } = config.core;
  const centerX = center.x;
  const centerY = center.y;
  const width = size.w;
  const height = size.h;

  // --- Calculate Coordinates ---
  // Clamp the radius to prevent visual glitches.
  const r = radius;
  // Calculate the boundaries of the front face.
  const left = centerX - width / 2;
  const right = centerX + width / 2;
  const top = centerY - height / 2;
  const bottom = centerY + height / 2;

  // Calculate the boundaries of the "extruded" or back faces.
  const extTop = top - thickness;
  const extRight = right + thickness;
  const extBottom = bottom - thickness;
  // The inner-top corner of the extruded face.
  const v2_x = left + thickness;

  // Set the fill for the shaded sides.
  p.fill(120);
  // Begin drawing the custom polygon for the extruded faces.
  p.beginShape();

  // --- Define the Shape's Vertices ---
  // The path starts at the front-top-left corner...
  myVertex(p, left, top);
  // ...goes back to the inner-top-left corner of the extrusion...
  myVertex(p, v2_x, extTop);
  // ...across the top extruded face...
  myVertex(p, extRight - r, extTop);
  // ...rounds the back-top-right corner...
  myQuadraticVertex(p, extRight, extTop, extRight, extTop + r);
  // ...down the back-right edge...
  myVertex(p, extRight, extBottom - r);
  // ...rounds the back-bottom-right corner...
  myQuadraticVertex(p, extRight, extBottom, extRight - r, extBottom);
  // ...connects to the front-bottom-right corner...
  myVertex(p, right, bottom);
  // ...then traces back up and around the front-top-right corner to close the shape.
  myVertex(p, right, top + r);
  myQuadraticVertex(p, right, top, right - r, top);

  p.endShape();

  // Draw the final perspective line connecting the front-top-right corner
  // to the back-top-right corner, completing the 3D illusion.
  p.line(right - r, top, extRight - r, extTop);
};

export default cubicBorders;
