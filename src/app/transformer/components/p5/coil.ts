import type p5 from "p5";
import { myQuadraticVertex, myVertex } from "@/components/p5/myQuadraticVertex";

/**
 * Draws a single loop of a wire coil around one of the transformer's limbs.
 * The shape is a complex curve designed to look like a wire wrapping around the core.
 *
 * @param {p5} p - The p5.js instance.
 * @param {number} centerX - The x-coordinate for the center of the coil's limb.
 * @param {number} centerY - The y-coordinate for the center of the transformer core.
 * @param {number} width - The width of the transformer core.
 * @param {number} height - The height of the transformer core.
 * @param {number} radius - The corner radius of the core, used for calculating curves.
 * @param {number} thickness - The thickness of the core, used for calculating curves.
 * @param {number} [index=0] - The zero-based index of the coil, used to stack multiple coils vertically.
 */
const coil = (
  p: p5,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  radius: number,
  thickness: number,
  index: number = 0
): void => {
  // --- Configuration & Calculations ---
  const COIL_GAP = 20; // The vertical distance between each coil winding.
  // Apply a vertical offset based on the coil's index to stack them.
  const yOffset = -COIL_GAP * index;

  // Calculate key coordinates for the coil's path.
  const coilLeft = centerX - width / 2; // The leftmost point of the coil.
  const coilRightPost = centerX - width / 4; // The right side of the limb being wrapped.
  const coilBottomY = centerY + height / 4 + yOffset; // The bottom-most Y position.
  const coilTopArcY = centerY + height / 4 - radius + yOffset; // Y-pos for the top of an arc.
  const coilPreCurveY = centerY + height / 4 - thickness + yOffset; // Y-pos before a curve.
  const coilFinalCurveY = centerY + height / 4 - thickness - radius + yOffset; // Y-pos for the final curve.

  // --- Drawing the Coil Shape ---
  p.noFill(); // Coils are outlines, not filled shapes.
  p.beginShape(); // Start defining the custom vertex-based shape.

  // 1. Start on the left side, slightly above the main bottom curve.
  myVertex(p, coilLeft, coilBottomY - radius * 1.5);
  // 2. Create a wide curve for the bottom-left part of the winding.
  myQuadraticVertex(
    p,
    coilLeft - radius * 2.1,
    coilBottomY,
    coilLeft,
    coilBottomY
  );
  // 3. Draw the straight bottom section of the winding.
  myVertex(p, coilRightPost - radius * 2, coilBottomY);
  // 4. Create the curve that goes from the bottom up and around the front of the core limb.
  myQuadraticVertex(
    p,
    coilRightPost + radius,
    coilBottomY,
    coilRightPost + radius * 1.5,
    coilTopArcY
  );
  // 5. Draw the short, visible top section of the winding.
  myVertex(p, coilRightPost + thickness + radius, coilPreCurveY);
  // 6. Create the final curve that appears to go over the top and behind the core limb.
  myQuadraticVertex(
    p,
    coilRightPost + thickness + radius,
    coilFinalCurveY,
    coilRightPost + thickness,
    coilFinalCurveY
  );

  p.endShape(); // Finalize the shape.
};

export default coil;
