"use client";

import { useState, useEffect, ReactNode } from "react";

/**
 * Defines the properties for the DraggablePanel component.
 * @interface DraggablePanelProps
 * @property {string} title - The text to display in the panel's header.
 * @property {ReactNode} children - The content to be rendered inside the panel.
 * @property {() => void} [onReset] - An optional callback function for a reset button. If provided, the button is displayed.
 * @property {{ x: number; y: number }} initialPosition - The starting position of the panel.
 * @property {boolean} [isDraggable=true] - Determines if the panel can be dragged.
 */
interface DraggablePanelProps {
  title: string;
  children: ReactNode;
  onReset?: () => void;
  initialPosition: { x: number; y: number };
  isDraggable?: boolean;
}

/**
 * A reusable UI component that creates a panel that can be dragged around the screen.
 * @param {DraggablePanelProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered draggable panel or null if not ready.
 */
export default function DraggablePanel({
  title,
  children,
  onReset,
  initialPosition,
  isDraggable = true,
}: DraggablePanelProps) {
  // State to track the panel's current top/left position.
  const [position, setPosition] = useState(initialPosition);
  // State to ensure the component only renders on the client after initial position is set.
  const [isReady, setIsReady] = useState(false);
  // State to track whether the panel is currently being dragged.
  const [isDragging, setIsDragging] = useState(false);
  // State to store the offset between the mouse click and the panel's top-left corner.
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  /**
   * Effect to safely set the initial position on the client-side,
   * preventing server-side rendering mismatches.
   */
  useEffect(() => {
    setPosition(initialPosition);
    setIsReady(true);
  }, [initialPosition]);

  /**
   * Handles the mouse down event on the panel's header to initiate dragging.
   * @param {React.MouseEvent<HTMLDivElement>} e - The mouse event.
   */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent dragging if the feature is disabled or if the user clicks on an interactive element.
    if (!isDraggable || (e.target as HTMLElement).closest("input, button")) {
      return;
    }
    setIsDragging(true);
    // Calculate and store the offset from the panel's corner to the mouse pointer.
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  /**
   * Effect to manage the dragging logic by adding and removing window-level event listeners.
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If not dragging, do nothing.
      if (!isDragging) return;
      // Update the panel's position based on the mouse movement and the initial offset.
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };
    const handleMouseUp = () => setIsDragging(false);

    // Only add listeners when dragging starts.
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    // Cleanup function: remove event listeners when the component unmounts or dragging stops.
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Avoid rendering on the server or before the client-side position is confirmed.
  if (!isReady) return null;

  return (
    <div
      className="absolute w-72 select-none rounded-lg bg-[#191e28e6] p-4 font-sans text-white shadow-lg backdrop-blur-sm"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      <div
        className="flex cursor-move items-center justify-between pb-4"
        onMouseDown={handleMouseDown}
      >
        <h2 className="text-lg font-bold">{title}</h2>
        {/* Conditionally render the reset button if the onReset prop is provided */}
        {onReset && (
          <button
            onClick={onReset}
            className="cursor-pointer rounded bg-[#3c5a98] px-3 py-1 text-sm font-bold transition-colors hover:bg-[#4c70b8]"
          >
            Reset
          </button>
        )}
      </div>
      {/* Render any content passed as children to the component */}
      {children}
    </div>
  );
}
