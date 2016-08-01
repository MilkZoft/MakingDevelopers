import '../../globalTest';
import {
  buildContentJson,
  pick,
  stringify
} from '../../../src/lib/utils/object';

describe('@Object', () => {
  describe('#buildContentJson', () => {
    it('should be a function', () => {
      assert.typeOf(buildContentJson, 'function', 'buildContentJson should be a function');
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

      const actualResult = buildContentJson(content);

      assert.deepEqual(
        actualResult,
        expectedResult,
        'actualResult should match expectedResult'
      );
    });
  });

  describe('#pick', () => {
    it('should be a function', () => {
      assert.typeOf(pick, 'function', 'pick should be a function');
    });
  });

  describe('#stringify', () => {
    it('should be a function', () => {
      assert.typeOf(stringify, 'function', 'stringify should be a function');
    });
  });
});
