import TemperatureConverter from './unitConverters/TemperatureConverter';
import DistanceConverter from './unitConverters/DistanceConverter';
import AngleConverter from './unitConverters/AngleConverter';
import PressureConverter from './unitConverters/PressureConverter';
import SpeedConverter from './unitConverters/SpeedConverter';
import Units from './Units';

const findTypeOfUnit = (unit) => {
  const unitTypes = Object.entries(Units);
  for (let i = 0; i < unitTypes.length; i++) {
    const [unitType, supportedUnits] = unitTypes[i];
    const [foundUnit] = Object.values(supportedUnits).filter(
      (supportedUnit) => supportedUnit === unit
    );
    if (foundUnit) {
      return unitType;
    }
  }
  return null;
};

class ConverterFactory {
  convert(value, unit) {
    const type = findTypeOfUnit(unit);
    switch (type) {
      case 'Distance':
        return new DistanceConverter().convert(value, unit);
      case 'Temperature':
        return new TemperatureConverter().convert(value, unit);
      case 'Angle':
        return new AngleConverter().convert(value, unit);
      case 'Pressure':
        return new PressureConverter().convert(value, unit);
      case 'Speed':
        return new SpeedConverter().convert(value, unit);
      default:
        throw new Error(`Unsupported unit: ${unit}`);
    }
  }
}

export default new ConverterFactory();
