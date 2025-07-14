import { myVertex, myQuadraticVertex } from "@/components/p5/myQuadraticVertex";
import type p5 from "p5";

/**
 * Draws a rectangle with optional rounded corners by defining its vertices.
 * This function is intended to be called between p5's `beginShape()` and `endShape()` calls.
 * It can draw the vertices in either a clockwise or counter-clockwise direction,
 * which is useful for creating complex shapes with holes.
 *
 * @param {p5} p - The p5.js instance.
 * @param {number} centerX - The x-coordinate of the rectangle's center.
 * @param {number} centerY - The y-coordinate of the rectangle's center.
 * @param {number} width - The total width of the rectangle.
 * @param {number} height - The total height of the rectangle.
 * @param {number} [radius=0] - The corner radius. A value of 0 creates sharp corners.
 * @param {"cw" | "ccw"} [direction="cw"] - The direction to draw the vertices (clockwise or counter-clockwise).
 */
export function vRect(
  p: p5,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  radius: number = 0,
  direction: "cw" | "ccw" = "cw"
) {
  // Calculate the four outer boundaries of the rectangle.
  const left = centerX - width / 2;
  const top = centerY - height / 2;
  const right = centerX + width / 2;
  const bottom = centerY + height / 2;

  // Clamp the radius to ensure it's not larger than half the width or height.
  const r = Math.min(radius, width / 2, height / 2);

  // --- Case 1: Sharp corners (no radius) ---
  if (r <= 0) {
    const corners = [
      { x: left, y: top },
      { x: right, y: top },
      { x: right, y: bottom },
      { x: left, y: bottom },
    ];

    // Reverse the order of vertices for counter-clockwise drawing.
    if (direction === "ccw") {
      corners.reverse();
    }
    // Add each corner as a simple vertex.
    corners.forEach(corner => myVertex(p, corner.x, corner.y));
    return;
  }

  // --- Case 2: Rounded corners ---
  if (direction === "cw") {
    // Top edge
    myVertex(p, left + r, top);
    myVertex(p, right - r, top);
    // Top-right corner
    myQuadraticVertex(p, right, top, right, top + r);
    // Right edge
    myVertex(p, right, bottom - r);
    // Bottom-right corner
    myQuadraticVertex(p, right, bottom, right - r, bottom);
    // Bottom edge
    myVertex(p, left + r, bottom);
    // Bottom-left corner
    myQuadraticVertex(p, left, bottom, left, bottom - r);
    // Left edge
    myVertex(p, left, top + r);
    // Top-left corner
    myQuadraticVertex(p, left, top, left + r, top);
  } else {
    // Counter-clockwise
    // Bottom edge
    myVertex(p, left + r, bottom);
    myVertex(p, right - r, bottom);
    // Bottom-right corner
    myQuadraticVertex(p, right, bottom, right, bottom - r);
    // Right edge
    myVertex(p, right, top + r);
    // Top-right corner
    myQuadraticVertex(p, right, top, right - r, top);
    // Top edge
    myVertex(p, left + r, top);
    // Top-left corner
    myQuadraticVertex(p, left, top, left, top + r);
    // Left edge
    myVertex(p, left, bottom - r);
    // Bottom-left corner
    myQuadraticVertex(p, left, bottom, left + r, bottom);
  }
}
