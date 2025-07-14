import type p5 from "p5";

/**
 * Global variables to track the last point added to the current shape.
 * These are crucial for `myQuadraticVertex` to know its starting point,
 * as it draws a curve from the previously set point.
 * These must be initialized before `beginShape()` and updated by `myVertex` and `myQuadraticVertex`.
 */
let lastX: number;
let lastY: number;

/**
 * A tolerance value (in pixels) to determine when a curve segment is considered "flat enough."
 * Smaller values result in smoother curves but more vertices and computations.
 */
const flatnessTolerance: number = 0.5;

/**
 * A safeguard to prevent excessively deep recursion for very complex or tiny curves.
 * Limits the number of subdivisions.
 */
const maxRecursionDepth: number = 8; // A reasonable default; can be adjusted

/**
 * Helper function to calculate the perpendicular distance from a point (px, py)
 * to a line segment defined by (x1, y1) and (x2, y2).
 * This is used for the flatness check of Bezier curve segments.
 *
 * @param pInstance The p5.js instance (needed for p.dist).
 * @param px The x-coordinate of the point.
 * @param py The y-coordinate of the point.
 * @param x1 The x-coordinate of the first point of the line segment.
 * @param y1 The y-coordinate of the first point of the line segment.
 * @param x2 The x-coordinate of the second point of the line segment.
 * @param y2 The y-coordinate of the second point of the line segment.
 * @returns The distance from the point to the line segment.
 */
const getDistanceToLine = (pInstance: p5, px: number, py: number, x1: number, y1: number, x2: number, y2: number): number => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;

    if (lenSq === 0) { // Line segment is a point, calculate distance to that point
        return pInstance.dist(px, py, x1, y1);
    }

    // Calculate the projection of the point onto the line
    // t is the parameter along the line segment (0 to 1)
    const t = ((px - x1) * dx + (py - y1) * dy) / lenSq;

    // If projection is outside the segment, distance is to the closest endpoint
    if (t < 0) return pInstance.dist(px, py, x1, y1);
    if (t > 1) return pInstance.dist(px, py, x2, y2);

    // If projection is inside the segment, distance is to the line itself
    const closestX = x1 + t * dx;
    const closestY = y1 + t * dy;
    return pInstance.dist(px, py, closestX, closestY);
};

/**
 * Custom function to mimic p5.js's `vertex()` behavior.
 * In addition to adding a vertex to the current shape, it updates
 * `lastX` and `lastY` to the coordinates of the added vertex.
 * This is necessary for `myQuadraticVertex` to determine its starting point.
 *
 * This function should be used after `p.beginShape()` and before `p.endShape()`.
 *
 * @param pInstance The p5.js instance.
 * @param x The x-coordinate of the vertex.
 * @param y The y-coordinate of the vertex.
 */
export const myVertex = (pInstance: p5, x: number, y: number): void => {
    pInstance.vertex(x, y);
    lastX = x;
    lastY = y;
};

/**
 * Internal recursive function for adaptive quadratic Bezier curve subdivision.
 * It draws segments of the curve until they are flat enough or max recursion depth is reached.
 *
 * @param pInstance The p5.js instance.
 * @param x0 The x-coordinate of the start point of the current segment ($P_0$).
 * @param y0 The y-coordinate of the start point of the current segment ($P_0$).
 * @param x1 The x-coordinate of the control point of the current segment ($P_1$).
 * @param y1 The y-coordinate of the control point of the current segment ($P_1$).
 * @param x2 The x-coordinate of the end point of the current segment ($P_2$).
 * @param y2 The y-coordinate of the end point of the current segment ($P_2$).
 * @param depth The current recursion depth.
 */
const _recursiveQuadraticVertex = (pInstance: p5, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, depth: number): void => {
    // Base case: If the segment is flat enough or max depth reached, draw the end point.
    // The flatness is checked by measuring the distance of the control point to the line segment from P0 to P2.
    if (depth >= maxRecursionDepth || getDistanceToLine(pInstance, x1, y1, x0, y0, x2, y2) < flatnessTolerance) {
        pInstance.vertex(x2, y2);
        return;
    }

    // Recursive case: Subdivide the curve using de Casteljau's algorithm
    // Calculate new control points and midpoint for the two sub-curves
    const midX01 = (x0 + x1) / 2;
    const midY01 = (y0 + y1) / 2;
    const midX12 = (x1 + x2) / 2;
    const midY12 = (y1 + y2) / 2;

    const midX012 = (midX01 + midX12) / 2; // Midpoint on the actual Bezier curve
    const midY012 = (midY01 + midY12) / 2;

    // Recursively draw the first half of the curve: (P0, M01, M012)
    _recursiveQuadraticVertex(pInstance, x0, y0, midX01, midY01, midX012, midY012, depth + 1);

    // Recursively draw the second half of the curve: (M012, M12, P2)
    // Note: M012 is already drawn as the end point of the first half's base case.
    _recursiveQuadraticVertex(pInstance, midX012, midY012, midX12, midY12, x2, y2, depth + 1);
};

/**
 * Custom function to mimic p5.js's `quadraticVertex()` behavior using
 * an adaptive recursive subdivision algorithm.
 * It draws a quadratic Bezier curve from the last point set by `myVertex`
 * or a previous `myQuadraticVertex` call, to an end point (x2, y2),
 * using a control point (cx, cy).
 *
 * The curve is approximated by a series of `vertex()` calls, with the density
 * of vertices determined by the `flatnessTolerance` and `maxRecursionDepth`.
 *
 * This function should be used after `p.beginShape()` and after an initial `myVertex()` call.
 *
 * @param pInstance The p5.js instance.
 * @param cx The x-coordinate of the control point.
 * @param cy The y-coordinate of the control point.
 * @param x2 The x-coordinate of the end point of the curve.
 * @param y2 The y-coordinate of the end point of the curve.
 */
export const myQuadraticVertex = (pInstance: p5, cx: number, cy: number, x2: number, y2: number): void => {
    // The start point of the curve is the last point added (lastX, lastY)
    const x0 = lastX;
    const y0 = lastY;

    // Start the recursive drawing process for the entire curve
    _recursiveQuadraticVertex(pInstance, x0, y0, cx, cy, x2, y2, 0);

    // After the curve is drawn, update lastX and lastY to the final end point of this curve segment.
    lastX = x2;
    lastY = y2;
};


    // You can expose these if you want the user to configure them
    // setFlatnessTolerance: (tolerance: number) => { flatnessTolerance = tolerance; },
    // setMaxRecursionDepth: (depth: number) => { maxRecursionDepth = depth; },
    // For initial setup, you might need a function to reset lastX/lastY
    // or ensure myVertex is always called as the first point in beginShape
