/**
 * Represents the set of calculated output values for the transformer simulation.
 * @interface TransformerResults
 */
export interface TransformerResults {
  transformerType: string;
  primaryCurrent: number;
  primaryPower: number;
  secondaryVoltage: number;
  secondaryCurrent: number;
  secondaryPower: number;
}

/**
 * Calculates the electrical properties of an ideal transformer.
 * This function assumes 100% efficiency (primary power equals secondary power).
 *
 * @param {number} primaryVoltage - The voltage applied to the primary coil (Vp).
 * @param {number} primaryTurns - The number of turns in the primary coil (Np).
 * @param {number} secondaryTurns - The number of turns in the secondary coil (Ns).
 * @param {number} loadResistance - The resistance of the load connected to the secondary coil (R_load), in Ohms.
 * @returns {TransformerResults} An object containing the calculated results.
 */
export function calculateTransformerResults(
  primaryVoltage: number,
  primaryTurns: number,
  secondaryTurns: number,
  loadResistance: number
): TransformerResults {
  // Assign clear variable names for readability
  const Np = primaryTurns;
  const Ns = secondaryTurns;
  const Vp = primaryVoltage;

  // Calculate secondary voltage using the transformer turns ratio formula: Vs = Vp * (Ns / Np)
  const secondaryVoltage = Vp * (Ns / Np);

  // Calculate secondary current using Ohm's Law: Is = Vs / R
  const secondaryCurrent = secondaryVoltage / loadResistance;

  // Calculate the power in the secondary coil: Ps = Vs * Is
  const secondaryPower = secondaryVoltage * secondaryCurrent;

  // For an ideal transformer, primary power is equal to secondary power.
  const primaryPower = secondaryPower;

  // Calculate primary current: Ip = Pp / Vp. Handle division by zero if Vp is 0.
  const primaryCurrent = Vp > 0 ? primaryPower / Vp : 0;

  // Determine the type of transformer based on the turns ratio.
  let transformerType = "Isolation"; // Default type when Ns equals Np
  if (Ns > Np) transformerType = "Step-Up";
  if (Ns < Np) transformerType = "Step-Down";

  return {
    transformerType,
    primaryCurrent,
    primaryPower,
    secondaryVoltage,
    secondaryCurrent,
    secondaryPower,
  };
}
