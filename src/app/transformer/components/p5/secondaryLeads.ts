import type p5 from "p5";

/**
 * Draws the two horizontal connection lines (leads) for the secondary coil,
 * extending from the right side of the transformer core.
 *
 * @param {p5} p - The p5.js instance.
 * @param {number} centerX - The x-coordinate of the transformer core's center.
 * @param {number} centerY - The y-coordinate of the transformer core's center.
 * @param {number} width - The width of the transformer core.
 * @param {number} height - The height of the transformer core.
 * @param {number} thickness - The thickness of the transformer core's frame.
 */
const drawSecondaryLeads = (
  p: p5,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  thickness: number
): void => {
  // --- Top Secondary Lead ---
  // Calculate the X coordinates for the top lead line.
  // It starts just outside the core and extends to the right.
  const rightX1 = centerX + width / 2 + thickness;
  const rightX2 = centerX + width / 2 + thickness * 3;
  // Calculate the Y coordinate for the top lead.
  const topY = centerY - thickness * 2;

  p.line(rightX1, topY, rightX2, topY);

  // --- Bottom Secondary Lead ---
  // Calculate the Y coordinate for the bottom lead.
  const bottomY = centerY + height / 4;
  // The line starts partway across the right vertical member of the core.
  const bottomX1 = centerX + width / 4;
  // It extends to the same outer x-position as the top lead.
  const bottomX2 = centerX + width / 2 + thickness * 3;

  p.line(bottomX1, bottomY, bottomX2, bottomY);
};

export default drawSecondaryLeads;
