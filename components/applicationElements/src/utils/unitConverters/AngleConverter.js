import Converter from './BaseConverter';
import Units, { DirectionOrder } from '../Units';

class AngleConverter extends Converter {
  constructor() {
    super('Angle');
  }

  toStandardUnit(value, sourceUnit) {
    return this.toDegrees(value, sourceUnit);
  }

  fromStandardUnit(value, targetUnit) {
    return this.fromDegrees(value, targetUnit);
  }

  toDegrees(value, unit) {
    switch (unit) {
      case Units.Angle.DEGREES:
        return value;
      case Units.Angle.RADIANS:
        return (value * 180) / Math.PI;
      case Units.Angle.DIRECTION:
        return DirectionOrder.indexOf(value) * (360 / DirectionOrder.length);
      default:
        throw Error(`Unsupported unit: ${unit}`);
    }
  }

  fromDegrees(value, targetUnit) {
    switch (targetUnit) {
      case Units.Angle.DEGREES:
        return value;
      case Units.Angle.RADIANS:
        return (value * Math.PI) / 180;
      case Units.Angle.DIRECTION: {
        return DirectionOrder[Math.round((value % 360) / (360 / DirectionOrder.length))];
      }
      default:
        throw Error(`Unsupported unit: ${targetUnit}`);
    }
  }
}
export default AngleConverter;
