import UnitConverter from './UnitConverter';

class ConvertableValue {
  constructor(value, unit) {
    this.value = value;
    this.unit = unit;
  }

  convertToValue(unit) {
    return this.convertTo(unit).value;
  }

  convertTo(unit) {
    const value = UnitConverter.convert(this.value, this.unit).to(unit);
    return new ConvertableValue(value, unit);
  }

  toFixed(places) {
    const exp = 10 ** places;
    const newValue = Math.round(this.value * exp) / exp;
    return new ConvertableValue(newValue, this.unit);
  }

  round() {
    return new ConvertableValue(Math.round(this.value), this.unit);
  }
}

class Temperature extends ConvertableValue {}

class Pressure extends ConvertableValue {}

export default ConvertableValue;
export { Temperature, Pressure };
