/**
 * Defines the comprehensive configuration for rendering the transformer.
 * This object centralizes all parameters related to geometry, color, and text,
 * allowing for easy adjustments to the transformer's visual style.
 */
export type Config = {
  /**
   * Configuration for the main iron core of the transformer.
   */
  core: {
    /** The (x, y) coordinates for the center of the core. */
    center: { x: number; y: number };
    /** The overall width and height of the core. */
    size: { w: number; h: number };
    /** The thickness of the core's frame. */
    thickness: number;
    /** The corner radius for the core's rounded edges. */
    radius: number;
    /** The fill color for the outer part of the core, as an RGB(A) array. */
    outerColor: number[];
    /** The fill color for the inner part of the core, as an RGB(A) array. */
    innerColor: number[];
  };
  /**
   * Configuration for the primary and secondary coil windings.
   */
  windings: {
    /** The stroke color for the primary coil, as an RGB(A) array. */
    primaryColor: number[];
    /** The stroke color for the secondary coil, as an RGB(A) array. */
    secondaryColor: number[];
  };
  /**
   * Configuration for the text label displayed on the transformer.
   */
  label: {
    /** The text content of the label. */
    text: string;
    /** The font size of the label text. */
    size: number;
    /** The fill color of the label text, as an RGB(A) array. */
    color: number[];
  };
  /**
   * General stroke configuration.
   */
  stroke: {
    /** The default stroke weight used for outlines. */
    weight: number;
  };
};
