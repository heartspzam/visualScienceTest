/**
 * Defines the properties required by the ResultRow component.
 * @interface ResultRowProps
 * @property {string} label - The descriptive label for the data (e.g., "Primary Voltage").
 * @property {number} value - The numerical value to be displayed.
 * @property {string} unit - The unit of measurement for the value (e.g., "V", "A", "W").
 */
interface ResultRowProps {
  label: string;
  value: number;
  unit: string;
}

/**
 * A stateless component designed to display a single row of data,
 * consisting of a label, a formatted value, and a unit.
 *
 * @param {ResultRowProps} props - The props for the component.
 * @returns {JSX.Element} A single `div` element representing the result row.
 */
const ResultRow = ({ label, value, unit }: ResultRowProps) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
    {/* The descriptive label for the value */}
    <span className="text-sm text-gray-400">{label}</span>
    {/* The formatted numerical value and its unit */}
    <span className="font-mono text-base text-cyan-300">
      {/* Formats the number to always show two decimal places for consistency */}
      {value.toFixed(2)} {unit}
    </span>
  </div>
);

export default ResultRow;
