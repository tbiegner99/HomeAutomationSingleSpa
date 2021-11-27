import moment from 'moment';
import SunsetCalculator from './SunsetCalculator';
import { LATITUDE, LONGITUDE } from './Constants';

class Utilities {
  static async ignoreErrors(promise) {
    try {
      return await promise;
    } catch (error) {
      return null;
    }
  }

  static isNight() {
    const now = moment();
    const { sunrise, sunset } = new SunsetCalculator(LATITUDE, LONGITUDE).calculate();
    return now.isAfter(sunset) || now.isBefore(sunrise);
  }
}

export default Utilities;
