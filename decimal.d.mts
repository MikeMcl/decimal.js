// Type definitions for the ES module, decimal.mjs.
//
// Its named exports are the Decimal and DecimalLite constructors, and a function for each Decimal
// prototype method, which takes the Decimal as its first argument, e.g. `add(x, y)` is `x.add(y)`.
//
// Example:
//
//   import { DecimalLite, add } from "decimal.js"
//
//   let d: DecimalLite = add(new DecimalLite(1), 2);

import { Decimal } from './decimal.js';

export { Decimal };
export default Decimal;

export type Value = Decimal.Value | DecimalLite;

// A Decimal constructor whose prototype only has `toString`, `valueOf` and `toJSON`.
export declare class DecimalLite {
  readonly d: number[];
  readonly e: number;
  readonly s: number;

  constructor(n: Value);

  toJSON(): string;
  toString(): string;
  valueOf(): string;

  static clone(object?: Decimal.Config): typeof DecimalLite;
  static config(object: Decimal.Config): typeof DecimalLite;
  static isDecimal(object: any): object is DecimalLite;
  static set(object: Decimal.Config): typeof DecimalLite;

  static readonly precision: number;
  static readonly rounding: Decimal.Rounding;
  static readonly toExpNeg: number;
  static readonly toExpPos: number;
  static readonly minE: number;
  static readonly maxE: number;
  static readonly crypto: boolean;
  static readonly modulo: Decimal.Modulo;

  static readonly ROUND_UP: 0;
  static readonly ROUND_DOWN: 1;
  static readonly ROUND_CEIL: 2;
  static readonly ROUND_FLOOR: 3;
  static readonly ROUND_HALF_UP: 4;
  static readonly ROUND_HALF_DOWN: 5;
  static readonly ROUND_HALF_EVEN: 6;
  static readonly ROUND_HALF_CEIL: 7;
  static readonly ROUND_HALF_FLOOR: 8;
  static readonly EUCLID: 9;
}

export declare function DecimalLite(n: Value): DecimalLite;

export declare function absoluteValue<T extends DecimalLite>(x: T): T;
export declare function abs<T extends DecimalLite>(x: T): T;

export declare function ceil<T extends DecimalLite>(x: T): T;

export declare function clampedTo<T extends DecimalLite>(x: T, min: Value, max: Value): T;
export declare function clamp<T extends DecimalLite>(x: T, min: Value, max: Value): T;

export declare function comparedTo<T extends DecimalLite>(x: T, n: Value): number;
export declare function cmp<T extends DecimalLite>(x: T, n: Value): number;

export declare function cosine<T extends DecimalLite>(x: T): T;
export declare function cos<T extends DecimalLite>(x: T): T;

export declare function cubeRoot<T extends DecimalLite>(x: T): T;
export declare function cbrt<T extends DecimalLite>(x: T): T;

export declare function decimalPlaces<T extends DecimalLite>(x: T): number;
export declare function dp<T extends DecimalLite>(x: T): number;

export declare function dividedBy<T extends DecimalLite>(x: T, n: Value): T;
export declare function div<T extends DecimalLite>(x: T, n: Value): T;

export declare function dividedToIntegerBy<T extends DecimalLite>(x: T, n: Value): T;
export declare function divToInt<T extends DecimalLite>(x: T, n: Value): T;

export declare function equals<T extends DecimalLite>(x: T, n: Value): boolean;
export declare function eq<T extends DecimalLite>(x: T, n: Value): boolean;

export declare function floor<T extends DecimalLite>(x: T): T;

export declare function greaterThan<T extends DecimalLite>(x: T, n: Value): boolean;
export declare function gt<T extends DecimalLite>(x: T, n: Value): boolean;

export declare function greaterThanOrEqualTo<T extends DecimalLite>(x: T, n: Value): boolean;
export declare function gte<T extends DecimalLite>(x: T, n: Value): boolean;

export declare function hyperbolicCosine<T extends DecimalLite>(x: T): T;
export declare function cosh<T extends DecimalLite>(x: T): T;

export declare function hyperbolicSine<T extends DecimalLite>(x: T): T;
export declare function sinh<T extends DecimalLite>(x: T): T;

export declare function hyperbolicTangent<T extends DecimalLite>(x: T): T;
export declare function tanh<T extends DecimalLite>(x: T): T;

export declare function inverseCosine<T extends DecimalLite>(x: T): T;
export declare function acos<T extends DecimalLite>(x: T): T;

export declare function inverseHyperbolicCosine<T extends DecimalLite>(x: T): T;
export declare function acosh<T extends DecimalLite>(x: T): T;

export declare function inverseHyperbolicSine<T extends DecimalLite>(x: T): T;
export declare function asinh<T extends DecimalLite>(x: T): T;

export declare function inverseHyperbolicTangent<T extends DecimalLite>(x: T): T;
export declare function atanh<T extends DecimalLite>(x: T): T;

export declare function inverseSine<T extends DecimalLite>(x: T): T;
export declare function asin<T extends DecimalLite>(x: T): T;

export declare function inverseTangent<T extends DecimalLite>(x: T): T;
export declare function atan<T extends DecimalLite>(x: T): T;

export declare function isFinite<T extends DecimalLite>(x: T): boolean;

export declare function isInteger<T extends DecimalLite>(x: T): boolean;
export declare function isInt<T extends DecimalLite>(x: T): boolean;

export declare function isNaN<T extends DecimalLite>(x: T): boolean;

export declare function isNegative<T extends DecimalLite>(x: T): boolean;
export declare function isNeg<T extends DecimalLite>(x: T): boolean;

export declare function isPositive<T extends DecimalLite>(x: T): boolean;
export declare function isPos<T extends DecimalLite>(x: T): boolean;

export declare function isZero<T extends DecimalLite>(x: T): boolean;

export declare function lessThan<T extends DecimalLite>(x: T, n: Value): boolean;
export declare function lt<T extends DecimalLite>(x: T, n: Value): boolean;

export declare function lessThanOrEqualTo<T extends DecimalLite>(x: T, n: Value): boolean;
export declare function lte<T extends DecimalLite>(x: T, n: Value): boolean;

export declare function logarithm<T extends DecimalLite>(x: T, n?: Value): T;
export declare function log<T extends DecimalLite>(x: T, n?: Value): T;

export declare function minus<T extends DecimalLite>(x: T, n: Value): T;
export declare function sub<T extends DecimalLite>(x: T, n: Value): T;

export declare function modulo<T extends DecimalLite>(x: T, n: Value): T;
export declare function mod<T extends DecimalLite>(x: T, n: Value): T;

export declare function naturalExponential<T extends DecimalLite>(x: T): T;
export declare function exp<T extends DecimalLite>(x: T): T;

export declare function naturalLogarithm<T extends DecimalLite>(x: T): T;
export declare function ln<T extends DecimalLite>(x: T): T;

export declare function negated<T extends DecimalLite>(x: T): T;
export declare function neg<T extends DecimalLite>(x: T): T;

export declare function plus<T extends DecimalLite>(x: T, n: Value): T;
export declare function add<T extends DecimalLite>(x: T, n: Value): T;

export declare function precision<T extends DecimalLite>(x: T, includeZeros?: boolean): number;
export declare function sd<T extends DecimalLite>(x: T, includeZeros?: boolean): number;

export declare function round<T extends DecimalLite>(x: T): T;

export declare function sine<T extends DecimalLite>(x: T): T;
export declare function sin<T extends DecimalLite>(x: T): T;

export declare function squareRoot<T extends DecimalLite>(x: T): T;
export declare function sqrt<T extends DecimalLite>(x: T): T;

export declare function tangent<T extends DecimalLite>(x: T): T;
export declare function tan<T extends DecimalLite>(x: T): T;

export declare function times<T extends DecimalLite>(x: T, n: Value): T;
export declare function mul<T extends DecimalLite>(x: T, n: Value): T;

export declare function toBinary<T extends DecimalLite>(x: T, significantDigits?: number): string;
export declare function toBinary<T extends DecimalLite>(x: T, significantDigits: number, rounding: Decimal.Rounding): string;

export declare function toDecimalPlaces<T extends DecimalLite>(x: T, decimalPlaces?: number): T;
export declare function toDecimalPlaces<T extends DecimalLite>(x: T, decimalPlaces: number, rounding: Decimal.Rounding): T;
export declare function toDP<T extends DecimalLite>(x: T, decimalPlaces?: number): T;
export declare function toDP<T extends DecimalLite>(x: T, decimalPlaces: number, rounding: Decimal.Rounding): T;

export declare function toExponential<T extends DecimalLite>(x: T, decimalPlaces?: number): string;
export declare function toExponential<T extends DecimalLite>(x: T, decimalPlaces: number, rounding: Decimal.Rounding): string;

export declare function toFixed<T extends DecimalLite>(x: T, decimalPlaces?: number): string;
export declare function toFixed<T extends DecimalLite>(x: T, decimalPlaces: number, rounding: Decimal.Rounding): string;

export declare function toFraction<T extends DecimalLite>(x: T, max_denominator?: Value): [numerator: T, denominator: T];

export declare function toHexadecimal<T extends DecimalLite>(x: T, significantDigits?: number): string;
export declare function toHexadecimal<T extends DecimalLite>(x: T, significantDigits: number, rounding: Decimal.Rounding): string;
export declare function toHex<T extends DecimalLite>(x: T, significantDigits?: number): string;
export declare function toHex<T extends DecimalLite>(x: T, significantDigits: number, rounding?: Decimal.Rounding): string;

export declare function toJSON<T extends DecimalLite>(x: T): string;

export declare function toNearest<T extends DecimalLite>(x: T, n: Value, rounding?: Decimal.Rounding): T;

export declare function toNumber<T extends DecimalLite>(x: T): number;

export declare function toOctal<T extends DecimalLite>(x: T, significantDigits?: number): string;
export declare function toOctal<T extends DecimalLite>(x: T, significantDigits: number, rounding: Decimal.Rounding): string;

export declare function toPower<T extends DecimalLite>(x: T, n: Value): T;
export declare function pow<T extends DecimalLite>(x: T, n: Value): T;

export declare function toPrecision<T extends DecimalLite>(x: T, significantDigits?: number): string;
export declare function toPrecision<T extends DecimalLite>(x: T, significantDigits: number, rounding: Decimal.Rounding): string;

export declare function toSignificantDigits<T extends DecimalLite>(x: T, significantDigits?: number): T;
export declare function toSignificantDigits<T extends DecimalLite>(x: T, significantDigits: number, rounding: Decimal.Rounding): T;
export declare function toSD<T extends DecimalLite>(x: T, significantDigits?: number): T;
export declare function toSD<T extends DecimalLite>(x: T, significantDigits: number, rounding: Decimal.Rounding): T;

export declare function toString<T extends DecimalLite>(x: T): string;

export declare function truncated<T extends DecimalLite>(x: T): T;
export declare function trunc<T extends DecimalLite>(x: T): T;

export declare function valueOf<T extends DecimalLite>(x: T): string;
