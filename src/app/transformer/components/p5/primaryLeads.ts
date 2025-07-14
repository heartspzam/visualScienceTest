import type p5 from "p5";

/**
 * Draws the two horizontal connection lines (leads) for the primary coil,
 * extending from the left side of the transformer core.
 *
 * @param {p5} p - The p5.js instance.
 * @param {number} centerX - The x-coordinate of the transformer core's center.
 * @param {number} centerY - The y-coordinate of the transformer core's center.
 * @param {number} width - The width of the transformer core.
 * @param {number} height - The height of the transformer core.
 * @param {number} thickness - The thickness of the transformer core's frame.
 */
const drawPrimaryLeads = (
  p: p5,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  thickness: number
): void => {
  // Calculate the X coordinates for the leads.
  // The lines start at the left edge of the core...
  const leftX1 = centerX - width / 2;
  // ...and extend outwards to the left.
  const leftX2 = leftX1 - thickness * 2;

  // Calculate the Y coordinates for the top and bottom leads.
  const topY = centerY - thickness * 2;
  const bottomY = centerY + height / 4;

  // Draw the top and bottom leads.
  p.line(leftX1, topY, leftX2, topY);
  p.line(leftX1, bottomY, leftX2, bottomY);
};

export default drawPrimaryLeads;
