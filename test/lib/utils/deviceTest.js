import '../../globalTest';
import {
  isDesktop,
  isMobile,
  getCurrentDevice
} from '../../../src/lib/utils/device';

const desktopUA = `
  UA Mozilla/5.0
  (Macintosh; Intel Mac OS X 10_11_5)
  AppleWebKit/537.36 (KHTML, like Gecko)
  Chrome/52.0.2743.82 Safari/537.36`;

const mobileUA = `
  UA Mozilla/5.0
  (iPhone; CPU iPhone OS 9_3 like Mac OS X)
  AppleWebKit/601.1.46
  (KHTML, like Gecko)
  Version/9.0
  Mobile/13E230
  Safari/601.1`;

describe('@Device', () => {
  describe('#isDesktop', () => {
    it('should be a function', () => {
      assert.typeOf(isDesktop, 'function', 'isDesktop should be a function');
    });

    it('should return true if is Desktop', () => {
      const actualResult = isDesktop(desktopUA);

      assert.isTrue(actualResult, 'isDesktop should be true');
    });

    it('should return false if is not Desktop', () => {
      const actualResult = isDesktop(mobileUA);

      assert.isFalse(actualResult, 'isDesktop should be false');
    });
  });

  describe('#isMobile', () => {
    it('should be a function', () => {
      assert.typeOf(isMobile, 'function', 'isMobile should be a function');
    });

    it('should return true if is Mobile', () => {
      const actualResult = isMobile(mobileUA);

      assert.isTrue(actualResult, 'isMobile should be true');
    });

    it('should return false if is not Mobile', () => {
      const actualResult = isMobile(desktopUA);

      assert.isFalse(actualResult, 'isMobile should be false');
    });
  });

  describe('#getCurrentDevice', () => {
    it('should be a function', () => {
      assert.typeOf(getCurrentDevice, 'function', 'getCurrentDevice should be a function');
    });

    it('should return "desktop" if is a Desktop device', () => {
      const actualResult = getCurrentDevice(desktopUA);

      assert.isTrue(actualResult === 'desktop', 'should be desktop');
    });

    it('should return "mobile" if is a Mobile device', () => {
      const actualResult = getCurrentDevice(mobileUA);

      assert.isTrue(actualResult === 'mobile', 'should be mobile');
    });
  });
});
