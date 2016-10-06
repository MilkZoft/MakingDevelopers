import '../globalTest';
import {
  $config,
  $baseUrl,
  $db,
  $html,
  $languages,
  $security,
  $serverPort,
  $session,
  $views,
  $social
} from '../../src/lib/config';

describe('@Config', () => {
  describe('#$config', () => {
    it('should be a function', () => {
      assert.typeOf($config, 'function', '$config should be a function');
    });
  });

  describe('#$baseUrl', () => {
    it('should be a function', () => {
      assert.typeOf($baseUrl, 'function', '$baseUrl should be a function');
    });
  });

  describe('#$db', () => {
    it('should be a function', () => {
      assert.typeOf($db, 'function', '$db should be a function');
    });
  });

  describe('#$html', () => {
    it('should be a function', () => {
      assert.typeOf($html, 'function', '$html should be a function');
    });
  });

  describe('#$languages', () => {
    it('should be a function', () => {
      assert.typeOf($languages, 'function', '$languages should be a function');
    });
  });

  describe('#$security', () => {
    it('should be a function', () => {
      assert.typeOf($security, 'function', '$security should be a function');
    });
  });

  describe('#$serverPort', () => {
    it('should be a function', () => {
      assert.typeOf($serverPort, 'function', '$serverPort should be a function');
    });
  });

  describe('#$session', () => {
    it('should be a function', () => {
      assert.typeOf($session, 'function', '$session should be a function');
    });
  });

  describe('#$views', () => {
    it('should be a function', () => {
      assert.typeOf($views, 'function', '$views should be a function');
    });
  });

  describe('#$social', () => {
    it('should be a function', () => {
      assert.typeOf($social, 'function', '$social should be a function');
    });
  });
});
