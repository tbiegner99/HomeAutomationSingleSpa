import Converter from './BaseConverter';
import Units from '../Units';

const FEET_PER_METER = 3.28084;
const FEET_PER_MILE = 5280;

class DistanceConverter extends Converter {
  constructor() {
    super('Distance');
  }

  toStandardUnit(value, sourceUnit) {
    return this.toMeters(value, sourceUnit);
  }

  fromStandardUnit(value, targetUnit) {
    return this.fromMeters(value, targetUnit);
  }

  toMeters(value, unit) {
    switch (unit) {
      case Units.Distance.CENTIMETERS:
        return value / 100;
      case Units.Distance.METERS:
        return value;
      case Units.Distance.KILOMETERS:
        return value * 1000;
      case Units.Distance.FEET:
        return (1 / FEET_PER_METER) * value;
      case Units.Distance.INCHES:
        return FEET_PER_METER * 12 * value;
      case Units.Distance.MILES:
        return this.toMeters(value * FEET_PER_MILE, Units.Distance.FEET);
      default:
        throw Error(`Unsupported unit: ${unit}`);
    }
  }

  fromMeters(value, targetUnit) {
    switch (targetUnit) {
      case Units.Distance.CENTIMETERS:
        return value * 100;
      case Units.Distance.METERS:
        return value;
      case Units.Distance.KILOMETERS:
        return value / 1000;
      case Units.Distance.FEET:
        return FEET_PER_METER * value;
      case Units.Distance.INCHES:
        return this.fromMeters(value, Units.Distance.FEET) * 12;
      case Units.Distance.MILES:
        return this.fromMeters(value, Units.Distance.FEET) / FEET_PER_MILE;
      default:
        throw Error(`Unsupported unit: ${targetUnit}`);
    }
  }
}
export default DistanceConverter;
