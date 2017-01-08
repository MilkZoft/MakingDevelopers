import '../globalTest';
import { Session } from '../../src/lib/session';

const {
  clearSession,
  destroySessions,
  parseSession,
  session
} = Session();

describe('@Session', () => {
  describe('#clearSession', () => {
    it('should be a function', () => {
      assert.typeOf(clearSession, 'function', 'clearSession should be a function');
    });
  });

  describe('#destroySessions', () => {
    it('should be a function', () => {
      assert.typeOf(destroySessions, 'function', 'destroySessions should be a function');
    });
  });

  describe('#parseSession', () => {
    it('should be a function', () => {
      assert.typeOf(parseSession, 'function', 'parseSession should be a function');
    });
  });

  describe('#session', () => {
    it('should be a function', () => {
      assert.typeOf(session, 'function', 'session should be a function');
    });
  });
});
