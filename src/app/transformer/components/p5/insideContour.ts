import type p5 from "p5";
import { myQuadraticVertex, myVertex } from "@/components/p5/myQuadraticVertex";

/**
 * Defines the vertices for an inner contour, shaped like an inverted "U" or a staple.
 * This is intended to be used between `beginContour()` and `endContour()` in p5.js
 * to create a cutout within a larger shape (like the inner part of the transformer core).
 * The vertices are drawn in a counter-clockwise direction.
 *
 * @param {p5} p - The p5.js instance.
 * @param {number} centerX - The x-coordinate of the parent shape's center.
 * @param {number} centerY - The y-coordinate of the parent shape's center.
 * @param {number} width - The width of the parent shape.
 * @param {number} height - The height of the parent shape.
 * @param {number} radius - The radius for the single rounded corner.
 * @param {number} thickness - The thickness of the parent shape's frame.
 */
const insideContour = (
  p: p5,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  radius: number,
  thickness: number
): void => {
  // Calculate the coordinates for the inner cutout area.
  const innerTop = centerY - height / 4;
  const innerLeft = centerX - width / 4;
  const innerRight = innerLeft + width / 2;
  const cornerY = innerTop + height / 2 - thickness;
  const startX = innerLeft + thickness;

  // --- Define the contour path ---

  // 1. Start at the top-left of the cutout.
  myVertex(p, startX, innerTop);

  // 2. Draw a line down to the point just before the corner starts to curve.
  myVertex(p, startX, cornerY - radius);

  // 3. Draw the rounded bottom-left corner.
  myQuadraticVertex(p, startX, cornerY, startX + radius, cornerY);

  // 4. Draw a horizontal line to the bottom-right of the cutout.
  myVertex(p, innerRight, cornerY);

  // 5. Draw a line straight up to the top-right of the cutout to complete the shape.
  myVertex(p, innerRight, innerTop);
};

export default insideContour;
