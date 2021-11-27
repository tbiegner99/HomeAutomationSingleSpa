import moment from 'moment';
import ConvertableValue from './ConvertableValue';
import Units from './Units';

const asRadians = (angle) =>
  new ConvertableValue(angle, Units.Angle.DEGREES).convertToValue(Units.Angle.RADIANS);

const asDegrees = (angle) =>
  new ConvertableValue(angle, Units.Angle.RADIANS).convertToValue(Units.Angle.DEGREES);

const normalize = (value, min, max) => {
  let ret = value;
  while (ret < min) ret += max;
  while (ret >= max) ret -= max;
  return ret;
};
const normalizeHour = (value) => normalize(value, 0, 24);
const normalizeAngle = (angle) => normalize(angle, 0, 360);

/* http://www.edwilliams.org/sunrise_sunset_algorithm.htm */

class SunsetCalculator {
  constructor(lat, long, date = moment()) {
    this.date = moment(date);
    this.latitude = lat;
    this.longitude = long;
  }

  calculateDayOfYear() {
    return this.date.dayOfYear();
  }

  getLongitudeHours() {
    if (!this.tvalues) {
      const longitudeHour = this.longitude / 15;
      this.longitudeHour = longitudeHour;
      const N = this.calculateDayOfYear();
      this.tvalues = {
        trise: N + (6 - longitudeHour) / 24,
        tset: N + (18 - longitudeHour) / 24
      };
    }
    return this.tvalues;
  }

  getMeanAnomaly() {
    const { trise, tset } = this.getLongitudeHours();
    return {
      mrise: 0.9856 * trise - 3.289,
      mset: 0.9856 * tset - 3.289
    };
  }

  getSunsTrueLongitude() {
    if (!this.lvalues) {
      const calculateTrueLongitude = (M) =>
        normalizeAngle(
          M + 1.916 * Math.sin(asRadians(M)) + 0.02 * Math.sin(asRadians(2 * M)) + 282.634
        );
      const { mrise, mset } = this.getMeanAnomaly();
      this.lvalues = {
        lrise: calculateTrueLongitude(mrise),
        lset: calculateTrueLongitude(mset)
      };
    }
    return this.lvalues;
  }

  getRightAscension(Lvalues) {
    const { lrise, lset } = Lvalues;
    const computeAscension = (L) =>
      normalizeAngle(asDegrees(Math.atan(0.91764 * Math.tan(asRadians(L)))));
    return {
      rarise: computeAscension(lrise),
      raset: computeAscension(lset)
    };
  }

  normalizeRightAscensionToSameQuadrant() {
    const Lvalues = this.getSunsTrueLongitude();
    const { lrise, lset } = Lvalues;
    const { rarise, raset } = this.getRightAscension(Lvalues);
    const getValueInQuadrant = (value) => Math.floor(value / 90) * 90;
    return {
      qrarise: rarise + (getValueInQuadrant(lrise) - getValueInQuadrant(rarise)),
      qraset: raset + (getValueInQuadrant(lset) - getValueInQuadrant(raset))
    };
  }

  getRightAscensionInHours() {
    const { qrarise, qraset } = this.normalizeRightAscensionToSameQuadrant();
    if (!this.rahValues) {
      this.rahValues = {
        rahSet: qraset / 15,
        rahRise: qrarise / 15
      };
    }
    return this.rahValues;
  }

  getZenithInRadians() {
    return asRadians((90 * 60 + 50) / 60); // 90deg 50 minutes
  }

  getDeclination(Lvalue) {
    const sinDec = 0.39782 * Math.sin(asRadians(Lvalue));
    return {
      sinDec,
      cosDec: Math.cos(Math.asin(sinDec))
    };
  }

  getLocalHourAngle(declination) {
    const { sinDec, cosDec } = declination;
    const zenith = this.getZenithInRadians();
    const latitude = asRadians(this.latitude);
    const cosH = (Math.cos(zenith) - sinDec * Math.sin(latitude)) / (cosDec * Math.cos(latitude));
    if (Math.abs(cosH) > 1) {
      throw new Error('youre at the poles, the sun never rises/sets!');
    }
    return cosH;
  }

  getLocalHourAngleHours() {
    const { lrise, lset } = this.getSunsTrueLongitude();
    const cosHrise = this.getLocalHourAngle(this.getDeclination(lrise));
    const cosHset = this.getLocalHourAngle(this.getDeclination(lset));
    return {
      hrise: (360 - asDegrees(Math.acos(cosHrise))) / 15,
      hset: asDegrees(Math.acos(cosHset)) / 15
    };
  }

  getLocalMeanTime() {
    const { hrise, hset } = this.getLocalHourAngleHours();
    const { rahRise, rahSet } = this.getRightAscensionInHours();
    const { trise, tset } = this.getLongitudeHours();
    const getMeanTime = (h, ra, t) => h + ra - 0.06571 * t - 6.622;
    return {
      Trise: getMeanTime(hrise, rahRise, trise),
      Tset: getMeanTime(hset, rahSet, tset)
    };
  }

  getMeanTimeInUTC() {
    const { Trise, Tset } = this.getLocalMeanTime();
    const getTimeFromHour = (tValue) => {
      const normalizedHour = normalizeHour(tValue - this.longitudeHour);
      const hourToTime = moment()
        .utc()
        .startOf('day')
        .add(normalizedHour, 'hours');
      return hourToTime.local();
    };
    const sunrise = getTimeFromHour(Trise);
    let sunset = getTimeFromHour(Tset);
    if (sunset.isBefore(sunrise)) {
      // this can happen because timezone offset carries time into next day
      // the normalized time would return the current day early in the morning
      sunset = sunset.add(1, 'days');
    }

    return {
      sunrise,
      sunset
    };
  }

  calculate() {
    const { sunrise, sunset } = this.getMeanTimeInUTC();
    const daylight = moment.duration(sunset.diff(sunrise));
    return {
      sunrise,
      sunset,
      daylight
    };
  }
}

export default SunsetCalculator;
