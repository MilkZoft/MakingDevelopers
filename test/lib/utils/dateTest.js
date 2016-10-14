import '../../globalTest';
import {
  day,
  month,
  now,
  year
} from '../../../src/lib/utils/date';

import {
  isDay,
  isMonth,
  isYear,
  isHour,
  isMinute,
  isSecond
} from '../../../src/lib/utils/is';

describe('@Date', () => {
  describe('#day', () => {
    it('should be a function', () => {
      assert.typeOf(day, 'function', 'day should be a function');
    });

    it('should return the current day', () => {
      const actualResult = parseInt(day());

      assert.isTrue(
        actualResult > 0 && actualResult <= 31,
        'should be a valid day'
      );
    });
  });

  describe('#month', () => {
    it('should be a function', () => {
      assert.typeOf(month, 'function', 'month should be a function');
    });

    it('should return the current month', () => {
      const actualResult = parseInt(month());

      assert.isTrue(
        actualResult > 0 && actualResult <= 12,
        'should be a valid month'
      );
    });
  });

  describe('#now', () => {
    it('should be a function', () => {
      assert.typeOf(now, 'function', 'now should be a function');
    });

    it('should return the current date', () => {
      const actualResult = now().split('.')[0].split(' ');
      const date = actualResult[0].split('-');
      const time = actualResult[1].split(':');
      const isValidYear = isYear(date[0]);
      const isValidMonth = isMonth(date[1]);
      const isValidDay = isDay(date[2]);
      const isValidHour = isHour(time[0]);
      const isValidMinute = isMinute(time[1]);
      const isValidSecond = isSecond(time[2]);

      assert.isTrue(
        isValidYear && isValidMonth && isValidDay && isValidHour && isValidMinute && isValidSecond,
        'should be a valid date YYYY-MM-DD HH:MM:SS'
      );
    });
  });

  describe('#year', () => {
    it('should be a function', () => {
      assert.typeOf(year, 'function', 'year should be a function');
    });

    it('should return the current year', () => {
      const actualResult = parseInt(year());
      const expectedResult = new Date().getFullYear();

      assert.isTrue(actualResult === expectedResult, 'should be a valid year');
    });
  });
});
