"use client";

import { useEffect, useState } from "react";
import SliderControl from "../../../components/Slider";
import DraggablePanel from "@/components/DraggablePanel";

/**
 * Defines the properties required by the ControlPanel component.
 * @interface ControlPanelProps
 * @property {number} primaryTurns - The current number of turns in the primary coil.
 * @property {(turns: number) => void} setPrimaryTurns - Function to update the primary turns.
 * @property {number} secondaryTurns - The current number of turns in the secondary coil.
 * @property {(turns: number) => void} setSecondaryTurns - Function to update the secondary turns.
 * @property {number} primaryVoltage - The current voltage of the primary coil.
 * @property {(voltage: number) => void} setPrimaryVoltage - Function to update the primary voltage.
 * @property {() => void} reset - Function to reset all simulation parameters to their default values.
 */
interface ControlPanelProps {
  primaryTurns: number;
  setPrimaryTurns: (turns: number) => void;
  secondaryTurns: number;
  setSecondaryTurns: (turns: number) => void;
  primaryVoltage: number;
  setPrimaryVoltage: (voltage: number) => void;
  reset: () => void;
}

/**
 * A component that provides UI controls (sliders) for adjusting the transformer simulation parameters.
 * @param {ControlPanelProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered control panel or null if the position is not yet calculated.
 */
export default function ControlPanel({
  primaryTurns,
  setPrimaryTurns,
  secondaryTurns,
  setSecondaryTurns,
  primaryVoltage,
  setPrimaryVoltage,
  reset,
}: ControlPanelProps) {
  /**
   * State to hold the calculated initial position of the panel.
   * Initialized to null to prevent rendering on the server where `window` is not available.
   */
  const [panelPosition, setPanelPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  /**
   * This effect runs only once on the client-side after the component mounts.
   * It safely calculates the initial position of the panel based on the window's width,
   * preventing server-side rendering errors.
   */
  useEffect(() => {
    setPanelPosition({ x: window.innerWidth - 300, y: 32 });
  }, []);

  /**
   * Prevents the component from rendering until its initial position has been
   * calculated on the client. This ensures there's no layout shift or flash
   * of un-positioned content.
   */
  if (!panelPosition) {
    return null;
  }

  return (
    <DraggablePanel
      title={"Control Panel"}
      onReset={reset}
      initialPosition={panelPosition}
    >
      <div className="space-y-6">
        {/* Slider for controlling the primary voltage */}
        <SliderControl
          label="Primary Voltage"
          unit="V"
          min={0}
          max={100}
          step={1}
          value={primaryVoltage}
          onChange={e => setPrimaryVoltage(Number(e.target.value))}
        />
        {/* Slider for controlling the number of primary windings */}
        <SliderControl
          label="Primary Windings"
          min={1}
          max={7}
          step={1}
          value={primaryTurns}
          onChange={e => setPrimaryTurns(Number(e.target.value))}
        />
        {/* Slider for controlling the number of secondary windings */}
        <SliderControl
          label="Secondary Windings"
          min={1}
          max={7}
          step={1}
          value={secondaryTurns}
          onChange={e => setSecondaryTurns(Number(e.target.value))}
        />
      </div>
    </DraggablePanel>
  );
}
