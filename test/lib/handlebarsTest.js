import '../globalTest';
import {
  checkbox,
  compress,
  email,
  flash,
  hidden,
  icon,
  input,
  password,
  radio,
  renderMedia,
  renderSchema,
  renderSearch,
  renderTable,
  select,
  submit,
  textarea,
  token
} from '../../src/lib/handlebars';

describe('@Handlebars', () => {
  describe('#checkbox', () => {
    it('should be a function', () => {
      assert.typeOf(checkbox, 'function', 'checkbox should be a function');
    });
  });

  describe('#compress', () => {
    it('should be a function', () => {
      assert.typeOf(compress, 'function', 'compress should be a function');
    });
  });

  describe('#email', () => {
    it('should be a function', () => {
      assert.typeOf(email, 'function', 'email should be a function');
    });
  });

  describe('#flash', () => {
    it('should be a function', () => {
      assert.typeOf(flash, 'function', 'flash should be a function');
    });
  });

  describe('#hidden', () => {
    it('should be a function', () => {
      assert.typeOf(hidden, 'function', 'hidden should be a function');
    });
  });

  describe('#icon', () => {
    it('should be a function', () => {
      assert.typeOf(icon, 'function', 'icon should be a function');
    });
  });

  describe('#input', () => {
    it('should be a function', () => {
      assert.typeOf(input, 'function', 'input should be a function');
    });
  });

  describe('#password', () => {
    it('should be a function', () => {
      assert.typeOf(password, 'function', 'password should be a function');
    });
  });

  describe('#radio', () => {
    it('should be a function', () => {
      assert.typeOf(radio, 'function', 'radio should be a function');
    });
  });

  describe('#renderMedia', () => {
    it('should be a function', () => {
      assert.typeOf(renderMedia, 'function', 'renderMedia should be a function');
    });
  });

  describe('#renderSchema', () => {
    it('should be a function', () => {
      assert.typeOf(renderSchema, 'function', 'renderSchema should be a function');
    });
  });

  describe('#renderSearch', () => {
    it('should be a function', () => {
      assert.typeOf(renderSearch, 'function', 'renderSearch should be a function');
    });
  });

  describe('#renderTable', () => {
    it('should be a function', () => {
      assert.typeOf(renderTable, 'function', 'renderTable should be a function');
    });
  });

  describe('#select', () => {
    it('should be a function', () => {
      assert.typeOf(select, 'function', 'select should be a function');
    });
  });

  describe('#submit', () => {
    it('should be a function', () => {
      assert.typeOf(submit, 'function', 'submit should be a function');
    });
  });

  describe('#textarea', () => {
    it('should be a function', () => {
      assert.typeOf(textarea, 'function', 'textarea should be a function');
    });
  });

  describe('#token', () => {
    it('should be a function', () => {
      assert.typeOf(token, 'function', 'token should be a function');
    });
  });
});
