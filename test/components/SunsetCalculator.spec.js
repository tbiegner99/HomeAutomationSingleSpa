import SunsetCalculator from '../../src/utils/SunsetCalculator';
import ConvertableValue from '../../src/utils/ConvertableValue';
import Units from '../../src/utils/Units';

describe('Sunset calculator', () => {
  it('runs', () => {
    new SunsetCalculator(40.7259, -73.5143).calculate();
  });

  it('converter', () => {
    const result = new ConvertableValue(Math.PI / 6, Units.Angle.RADIANS).convertTo(
      Units.Angle.DEGREES
    );
    expect(result).toBeCloseTo(30);
  });
});
