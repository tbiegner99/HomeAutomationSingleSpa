import Converter from './BaseConverter';
import Units from '../Units';

class TemperatureConverter extends Converter {
  constructor() {
    super('Temperature');
  }

  toStandardUnit(value, sourceUnit) {
    return this.toCelcius(value, sourceUnit);
  }

  fromStandardUnit(value, targetUnit) {
    return this.fromCelcius(value, targetUnit);
  }

  toCelcius(value, unit) {
    switch (unit) {
      case Units.Temperature.CELCIUS:
        return value;
      case Units.Temperature.FARENHEIT:
        return (5 * (value - 32)) / 9;
      case Units.Temperature.KELVIN:
        return value - 273.15;
      default:
        throw Error(`Unsupported unit: ${unit}`);
    }
  }

  fromCelcius(value, targetUnit) {
    switch (targetUnit) {
      case Units.Temperature.CELCIUS:
        return value;
      case Units.Temperature.FARENHEIT:
        return (9 * value) / 5 + 32;
      case Units.Temperature.KELVIN:
        return value + 273.15;
      default:
        throw Error(`Unsupported unit: ${targetUnit}`);
    }
  }
}
export default TemperatureConverter;
