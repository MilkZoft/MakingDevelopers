import '../globalTest';
import utils from '../../src/lib/utils';

describe('@Utils', () => {
  it('should be an object', () => {
    assert.typeOf(utils, 'Object', 'utils should be an object');
  });

  // Date functions
  describe('@Date', () => {
    describe('#day', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Date.day, 'function', 'day should be a function');
      });

      it('should return the current day', () => {
        const actualResult = parseInt(utils.Date.day());

        assert.isTrue(
          actualResult > 0 && actualResult <= 31,
          'should be a valid day'
        );
      });
    });

    describe('#isDay', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Date.isDay, 'function', 'isDay should be a function');
      });
    });

    describe('#isMonth', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Date.isMonth, 'function', 'isMonth should be a function');
      });
    });

    describe('#isYear', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Date.isYear, 'function', 'isYear should be a function');
      });
    });

    describe('#month', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Date.month, 'function', 'month should be a function');
      });
    });

    describe('#now', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Date.now, 'function', 'now should be a function');
      });
    });

    describe('#year', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Date.year, 'function', 'year should be a function');
      });
    });
  });

  // Device functions
  describe('@Device', () => {
    describe('#isDesktop', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Device.isDesktop, 'function', 'isDesktop should be a function');
      });
    });

    describe('#isMobile', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Device.isMobile, 'function', 'isMobile should be a function');
      });
    });

    describe('#getCurrentDevice', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Device.getCurrentDevice, 'function', 'getCurrentDevice should be a function');
      });
    });
  });

  // Object functions
  describe('@Object', () => {
    describe('#buildContentJson', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Object.buildContentJson, 'function', 'buildContentJson should be a function');
      });

      it('should build a json from vendo content', () => {
        const content = [
          {
            name: 'site.language',
            value: 'en'
          },
          {
            name: 'site.title',
            value: 'Bar'
          },
          {
            name: 'site.meta.abstract',
            value: 'Foo'
          }
        ];

        const expectedResult = {
          site: {
            language: 'en',
            title: 'Bar',
            meta: {
              abstract: 'Foo'
            }
          }
        };

        const actualResult = utils.Object.buildContentJson(content);

        assert.deepEqual(
          actualResult,
          expectedResult,
          'actualResult should match expectedResult'
        );
      });
    });

    describe('#pick', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Object.pick, 'function', 'pick should be a function');
      });
    });

    describe('#stringify', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Object.stringify, 'function', 'stringify should be a function');
      });
    });
  });

  // Type functions
  describe('@Type', () => {
    describe('#isArray', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Type.isArray, 'function', 'isArray should be a function');
      });
    });

    describe('#isDefined', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Type.isDefined, 'function', 'isDefined should be a function');
      });

      it('should return true if a variable is defined', () => {
        const test = 'Foo';

        assert.isTrue(
          utils.Type.isDefined(test),
          'test variable should be defined'
        );
      });

      it('should return false if a variable is undefined', () => {
        let test;

        assert.isFalse(
          utils.Type.isDefined(test),
          'test variable should be defined'
        );
      });
    });

    describe('#isFunction', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Type.isFunction, 'function', 'isFunction should be a function');
      });
    });

    describe('#isJson', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Type.isJson, 'function', 'isJson should be a function');
      });
    });

    describe('#isNumber', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Type.isNumber, 'function', 'isNumber should be a function');
      });
    });

    describe('#isObject', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Type.isObject, 'function', 'isObject should be a function');
      });

      it('should return true if a variable is object', () => {
        const test = {
          foo: 'Foo'
        };

        assert.isTrue(
          utils.Type.isObject(test),
          'test variable should be an object'
        );
      });
    });

    describe('#isString', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Type.isString, 'function', 'isString should be a function');
      });
    });

    describe('#isUndefined', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Type.isUndefined, 'function', 'isUndefined should be a function');
      });
    });
  });

  // Security functions
  describe('@Security', () => {
    describe('#encrypt', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Security.encrypt, 'function', 'encrypt should be a function');
      });

      it('should return a encrypted salted string', () => {
        const expectedResult = '46ca42396183e65569beb1d62c36afb171d1d300';
        const actualResult = utils.Security.encrypt('foo');

        assert.isTrue(actualResult === expectedResult, 'should be a hash');
      });
    });

    describe('#md5', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Security.md5, 'function', 'md5 should be a function');
      });
    });

    describe('#sha1', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Security.sha1, 'function', 'sha1 should be a function');
      });
    });
  });

  // String functions
  describe('@String', () => {
    describe('#clean', () => {
      it('should be a function', () => {
        assert.typeOf(utils.String.clean, 'function', 'clean should be a function');
      });

      it('should clean a string', () => {
        const str = '<p>Foo</p>';
        const expectedResult = 'Foo';

        assert.isTrue(
          utils.String.clean(str) === expectedResult,
          'the string should be cleaned'
        );
      });

      it('should return false when the string is undefined', () => {
        let str;

        assert.isFalse(
          utils.String.clean(str),
          'should return false'
        );
      });
    });

    describe('#escape', () => {
      it('should be a function', () => {
        assert.typeOf(utils.String.escape, 'function', 'escape should be a function');
      });
    });

    describe('#randomCode', () => {
      it('should be a function', () => {
        assert.typeOf(utils.String.randomCode, 'function', 'randomCode should be a function');
      });
    });

    describe('#removeHTML', () => {
      it('should be a function', () => {
        assert.typeOf(utils.String.removeHTML, 'function', 'removeHTML should be a function');
      });
    });
  });

  // Url functions
  describe('@Url', () => {
    describe('#getParamsFromUrl', () => {
      it('should be a function', () => {
        assert.typeOf(utils.Url.getParamsFromUrl, 'function', 'getParamsFromUrl should be a function');
      });
    });
  });
});
