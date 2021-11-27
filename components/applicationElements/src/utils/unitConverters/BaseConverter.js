import Units from '../Units';

class Converter {
  constructor(type) {
    this.type = type;
  }

  convert(value, unit) {
    this.unit = unit;
    this.value = value;
    return this;
  }

  isUnitSupported(unit) {
    const validUnits = Object.values(Units[this.type]);
    return validUnits.indexOf(unit) >= 0;
  }

  toStandardUnit(value, sourceUnit) {
    throw new Error('Unimplemented');
  }

  fromStandardUnit(value, targetUnit) {
    throw new Error('Unimplemented');
  }

  to(targetUnit) {
    if (!this.isUnitSupported(targetUnit)) {
      throw new Error(`Invalid Unit conversion provided: ${targetUnit}`);
    }
    const standardValue = this.toStandardUnit(this.value, this.unit);
    return this.fromStandardUnit(standardValue, targetUnit);
  }
}
export default Converter;
