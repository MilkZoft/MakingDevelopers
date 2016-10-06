import '../globalTest';
import {
  createInput,
  createTextarea,
  createSelect,
  createLabel
} from '../../src/lib/form';

describe('@Form', () => {
  describe('#createInput', () => {
    it('should be a function', () => {
      assert.typeOf(createInput, 'function', 'createInput should be a function');
    });

    it('should create an input', () => {
      const attributes = {
        id: 'foo',
        name: 'foo',
        class: 'foo'
      };

      const actualResult = createInput(attributes);
      const expectedResult = '<input type="text" id="foo" name="62ae284823c72b9b300a413bc857cb7c" class="foo"  />';

      assert.isTrue(actualResult === expectedResult, 'actualResult should match expectedResult');
    });
  });

  describe('#createTextarea', () => {
    it('should be a function', () => {
      assert.typeOf(createTextarea, 'function', 'createTextarea should be a function');
    });

    it('should create a textarea', () => {
      const attributes = {
        id: 'foo',
        name: 'foo',
        class: 'foo',
        value: 'foo'
      };

      const actualResult = createTextarea(attributes);
      const expectedResult = '<textarea id="foo" name="62ae284823c72b9b300a413bc857cb7c" class="foo">foo</textarea>';

      assert.isTrue(actualResult === expectedResult, 'actualResult should match expectedResult');
    });
  });

  describe('#createSelect', () => {
    it('should be a function', () => {
      assert.typeOf(createSelect, 'function', 'createSelect should be a function');
    });

    it('should create a select', () => {
      const attributes = {
        id: 'foo',
        name: 'foo',
        class: 'foo',
        options: 'foo|bar|baz'
      };
      let expectedResult;

      const actualResult = createSelect(attributes);
      expectedResult = '<select id="foo" name="62ae284823c72b9b300a413bc857cb7c" class="foo">';
      expectedResult += '<option>foo</option><option>bar</option><option>baz</option>';
      expectedResult += '</select>';

      assert.isTrue(actualResult === expectedResult, 'actualResult should match expectedResult');
    });
  });

  describe('#createLabel', () => {
    it('should be a function', () => {
      assert.typeOf(createLabel, 'function', 'createLabel should be a function');
    });
  });
});
