import '../globalTest';
import {
  $appName,
  $baseUrl,
  $cache,
  $config,
  $dashboard,
  $db,
  $html,
  $languages,
  $security,
  $serverPort,
  $session,
  $social,
  $views,
  $webpack
} from '../../src/lib/config';

describe('@Config', () => {
  describe('#$appName', () => {
    it('should be a function', () => {
      assert.typeOf($appName, 'function', '$appName should be a function');
    });
  });

  describe('#$baseUrl', () => {
    it('should be a function', () => {
      assert.typeOf($baseUrl, 'function', '$baseUrl should be a function');
    });
  });

  describe('#$cache', () => {
    it('should be a function', () => {
      assert.typeOf($cache, 'function', '$cache should be a function');
    });
  });

  describe('#$config', () => {
    it('should be a function', () => {
      assert.typeOf($config, 'function', '$config should be a function');
    });
  });

  describe('#$dashboard', () => {
    it('should be a function', () => {
      assert.typeOf($dashboard, 'function', '$dashboard should be a function');
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

  describe('#$social', () => {
    it('should be a function', () => {
      assert.typeOf($social, 'function', '$social should be a function');
    });
  });

  describe('#$views', () => {
    it('should be a function', () => {
      assert.typeOf($views, 'function', '$views should be a function');
    });
  });

  describe('#$webpack', () => {
    it('should be a function', () => {
      assert.typeOf($webpack, 'function', '$webpack should be a function');
    });
  });
});
