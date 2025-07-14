import type p5 from "p5";

/**
 * Draws a grid of dots on the canvas to serve as a background.
 *
 * @param {p5} p - The p5.js instance.
 */
const drawDotGrid = (p: p5) => {
  // --- Configuration for the grid ---
  const dotColor = p.color(100, 100, 110, 150); // A semi-transparent grey for the dots
  const backgroundColor = p.color(25, 25, 30); // A dark charcoal for the canvas background
  const spacing = 40; // The distance between each dot, in pixels
  const dotSize = 2; // The diameter of each dot, in pixels

  // Set the canvas background color.
  p.background(backgroundColor);

  // Disable outlines and set the fill color for the dots.
  p.noStroke();
  p.fill(dotColor);

  // Loop through the canvas width and height with the defined spacing.
  for (let x = 0; x < p.width; x += spacing) {
    for (let y = 0; y < p.height; y += spacing) {
      // Draw a small circle (ellipse) at each grid point.
      p.ellipse(x, y, dotSize, dotSize);
    }
  }
};

export default drawDotGrid;
