import type p5 from "p5";
import { Config } from "./rectConfig";

/**
 * Draws a text label onto the transformer core.
 *
 * @param {p5} p - The p5.js instance.
 * @param {Config} config - The main configuration object containing label text, color, and size.
 */
export const drawLabel = (p: p5, config: Config) => {
  // Destructure core properties for position calculation.
  const { center, size } = config.core;

  // Save the current drawing style settings (like stroke weight, fill, etc.).
  p.push();

  // Apply styles specifically for the label text.
  p.strokeWeight(1); // Use a thinner stroke for the text outline.
  p.textAlign(p.CENTER); // Align the text centrally.
  p.fill(config.label.color); // Set the text color from the config.
  p.textSize(config.label.size); // Set the font size from the config.

  // Calculate the vertical position for the text on the top limb of the core.
  const yPos = center.y - (1.4 * size.h) / 4;

  // Draw the text at the calculated position.
  p.text(config.label.text, center.x, yPos);

  // Restore the previous drawing style settings.
  p.pop();
};
