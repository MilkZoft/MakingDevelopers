import '../../globalTest';
import {
  isDesktop,
  isMobile,
  getCurrentDevice
} from '../../../src/lib/utils/device';

describe('@Device', () => {
  describe('#isDesktop', () => {
    it('should be a function', () => {
      assert.typeOf(isDesktop, 'function', 'isDesktop should be a function');
    });
  });

  describe('#isMobile', () => {
    it('should be a function', () => {
      assert.typeOf(isMobile, 'function', 'isMobile should be a function');
    });
  });

  describe('#getCurrentDevice', () => {
    it('should be a function', () => {
      assert.typeOf(getCurrentDevice, 'function', 'getCurrentDevice should be a function');
    });
  });
});
