import '../globalTest';
import contentHelper from '../../src/lib/content';

const enFixture = loadFixture('content/i18n/en.json');
const esFixture = loadFixture('content/i18n/es.json');

describe('@Content', () => {
  let req;
  let res;
  let next;

  beforeEach(function() {
    req = {};
    res = {
      content: sinon.spy(),
      __: enFixture
    };
    next = sinon.spy();
  });

  it('should be a function', () => {
    assert.typeOf(contentHelper, 'function', 'contentHelper should be a function');
  });

  describe('#content', () => {
    it('should be a function on the response object', function() {
      contentHelper(req, res, next);

      assert.isDefined(res.content, 'response should have content property');
      assert.typeOf(res.content, 'function', 'content property should be a function');
    });

    it('should return english content', function() {
      contentHelper(req, res, next);

      const actualResult = res.content('Foo.bar.hello');
      const expectedResult = 'Hi';

      assert.isTrue(actualResult === expectedResult, 'actualResult should say "Hi"');
    });

    it('should return spanish content', function() {
      contentHelper(req, res, next);

      res.__ = esFixture;

      const actualResult = res.content('Foo.bar.hello');
      const expectedResult = 'Hola';

      assert.isTrue(actualResult === expectedResult, 'actualResult should say "Hola"');
    });
  });
});
