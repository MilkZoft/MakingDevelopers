import '../../globalTest';
import {
  getParamsFromUrl
} from '../../../src/lib/utils/url';

describe('@Url', () => {
  describe('#getParamsFromUrl', () => {
    it('should be a function', () => {
      assert.typeOf(getParamsFromUrl, 'function', 'getParamsFromUrl should be a function');
    });
  });
});
