import '../../globalTest';
import {
  day,
  isDay,
  isMonth,
  isYear,
  month,
  now,
  year
} from '../../../src/lib/utils/date';

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

  describe('#isDay', () => {
    it('should be a function', () => {
      assert.typeOf(isDay, 'function', 'isDay should be a function');
    });
  });

  describe('#isMonth', () => {
    it('should be a function', () => {
      assert.typeOf(isMonth, 'function', 'isMonth should be a function');
    });
  });

  describe('#isYear', () => {
    it('should be a function', () => {
      assert.typeOf(isYear, 'function', 'isYear should be a function');
    });
  });

  describe('#month', () => {
    it('should be a function', () => {
      assert.typeOf(month, 'function', 'month should be a function');
    });
  });

  describe('#now', () => {
    it('should be a function', () => {
      assert.typeOf(now, 'function', 'now should be a function');
    });
  });

  describe('#year', () => {
    it('should be a function', () => {
      assert.typeOf(year, 'function', 'year should be a function');
    });
  });
});
