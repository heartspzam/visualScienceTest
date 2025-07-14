/**
 * Defines the properties required by the SliderControl component.
 * @interface SliderControlProps
 * @property {string} label - The text label displayed above the slider.
 * @property {string} [unit] - An optional unit of measurement (e.g., "V", "A") displayed next to the value.
 * @property {number} min - The minimum value of the slider.
 * @property {number} max - The maximum value of the slider.
 * @property {number} step - The increment value for each step of the slider.
 * @property {number} value - The current value of the slider.
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} onChange - The callback function triggered when the slider's value changes.
 */
interface SliderControlProps {
  label: string;
  unit?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A reusable component that renders a styled range slider with a label
 * and a real-time value display.
 * @param {SliderControlProps} props - The props for the component.
 * @returns {JSX.Element} The rendered slider control.
 */
export default function SliderControl({
  label,
  unit = "",
  min,
  max,
  step,
  value,
  onChange,
}: SliderControlProps) {
  return (
    <div className="w-full">
      {/* Header section containing the label and the current value display */}
      <div className="flex justify-between items-center mb-2 text-white">
        <label className="font-medium text-gray-300">{label}</label>
        <div className="bg-gray-700 text-white text-sm font-semibold px-3 py-1 rounded-md">
          <span>{value}</span>
          {/* Conditionally render the unit if it's provided */}
          {unit && <span className="ml-1 text-gray-400">{unit}</span>}
        </div>
      </div>
      {/* The HTML range input element, styled to match the application's theme */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb"
      />
    </div>
  );
}
