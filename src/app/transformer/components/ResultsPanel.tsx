"use client";

import DraggablePanel from "@/components/DraggablePanel";
import ResultRow from "@/components/ResultRow";

/**
 * Defines the properties required by the ResultsPanel component.
 * @interface ResultsPanelProps
 * @property {string} transformerType - The type of transformer (e.g., "Step-Up", "Step-Down").
 * @property {number} primaryCurrent - The calculated current in the primary coil.
 * @property {number} primaryPower - The calculated power in the primary coil.
 * @property {number} secondaryVoltage - The calculated voltage in the secondary coil.
 * @property {number} secondaryCurrent - The calculated current in the secondary coil.
 * @property {number} secondaryPower - The calculated power in the secondary coil.
 */
interface ResultsPanelProps {
  transformerType: string;
  primaryCurrent: number;
  primaryPower: number;
  secondaryVoltage: number;
  secondaryCurrent: number;
  secondaryPower: number;
}

/**
 * A component that displays the calculated results of the transformer simulation.
 * It is presented within a styled panel, which can be configured to be draggable.
 * @param {ResultsPanelProps} props - The props for the component.
 * @returns {JSX.Element} The rendered results panel.
 */
export default function ResultsPanel({
  transformerType,
  primaryCurrent,
  primaryPower,
  secondaryVoltage,
  secondaryCurrent,
  secondaryPower,
}: ResultsPanelProps) {
  return (
    // Uses a DraggablePanel for consistent UI, but is set to be static here.
    <DraggablePanel
      title="Simulation Results"
      initialPosition={{ x: 32, y: 32 }}
      isDraggable={false}
    >
      {/* Section for displaying the transformer type */}
      <div className="mb-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
          <span className="text-sm text-gray-400">Transformer Type</span>
          <span className="font-mono text-base text-yellow-300">
            {transformerType}
          </span>
        </div>
      </div>

      {/* Section for displaying detailed numerical results */}
      <div className="space-y-1">
        <ResultRow
          label="Secondary Voltage"
          value={secondaryVoltage}
          unit="V"
        />
        <ResultRow
          label="Secondary Current"
          value={secondaryCurrent}
          unit="A"
        />
        <ResultRow label="Secondary Power" value={secondaryPower} unit="W" />
        <ResultRow label="Primary Current" value={primaryCurrent} unit="A" />
        <ResultRow label="Primary Power" value={primaryPower} unit="W" />
      </div>
    </DraggablePanel>
  );
}
