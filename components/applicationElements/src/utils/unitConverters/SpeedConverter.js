import Converter from './BaseConverter';
import Units from '../Units';

const KNOTS_PER_MPS = 1.943844;
const FPS_PER_MPS = 3.281;
const MPH_PER_MPS = 2.237;

class SpeedConverter extends Converter {
  constructor() {
    super('Speed');
  }

  toStandardUnit(value, sourceUnit) {
    return this.toMetersPerSecond(value, sourceUnit);
  }

  fromStandardUnit(value, targetUnit) {
    return this.fromMetersPerSecond(value, targetUnit);
  }

  toMetersPerSecond(value, unit) {
    switch (unit) {
      case Units.Speed.METERS_PER_SECOND:
        return value;
      case Units.Speed.KILOMETERS_PER_HOUR:
        return value / 3.6;
      case Units.Speed.KNOTS:
        return value / KNOTS_PER_MPS;
      case Units.Speed.FEET_PER_SECOND:
        return value / FPS_PER_MPS;
      case Units.Speed.MILES_PER_HOUR:
        return value / MPH_PER_MPS;
      default:
        throw Error(`Unsupported unit: ${unit}`);
    }
  }

  fromMetersPerSecond(value, targetUnit) {
    switch (targetUnit) {
      case Units.Speed.METERS_PER_SECOND:
        return value;
      case Units.Speed.KILOMETERS_PER_HOUR:
        return value * 3.6;
      case Units.Speed.KNOTS:
        return value * KNOTS_PER_MPS;
      case Units.Speed.FEET_PER_SECOND:
        return value * FPS_PER_MPS;
      case Units.Speed.MILES_PER_HOUR:
        return value * MPH_PER_MPS;
      default:
        throw Error(`Unsupported unit: ${targetUnit}`);
    }
  }
}
export default SpeedConverter;
