import Converter from './BaseConverter';
import Units from '../Units';

const PASCALS_PER_INHG = 3386.39;

class PressureConverter extends Converter {
  constructor() {
    super('Pressure');
  }

  toStandardUnit(value, sourceUnit) {
    return this.toPascals(value, sourceUnit);
  }

  fromStandardUnit(value, targetUnit) {
    return this.fromPascals(value, targetUnit);
  }

  toPascals(value, unit) {
    switch (unit) {
      case Units.Pressure.PASCALS:
        return value;
      case Units.Pressure.MILLIBARS:
        return value * 100;
      case Units.Pressure.INCHES_OF_MERCURY:
        return PASCALS_PER_INHG * value;
      default:
        throw Error(`Unsupported unit: ${unit}`);
    }
  }

  fromPascals(value, targetUnit) {
    switch (targetUnit) {
      case Units.Pressure.PASCALS:
        return value;
      case Units.Pressure.MILLIBARS:
        return value / 100;
      case Units.Pressure.INCHES_OF_MERCURY:
        return (1 / PASCALS_PER_INHG) * value;
      default:
        throw Error(`Unsupported unit: ${targetUnit}`);
    }
  }
}
export default PressureConverter;
