import _ from 'lodash';

let renderOptions = {};
let defaultOptions = {};

export default (req, res, next) => {
  res.renderScope = {
    default: defaultScope,
    get,
    set
  };

  return next();

  function defaultScope(scope) {
    defaultOptions = scope;
    renderOptions = _.cloneDeep(defaultOptions);
  }

  function get(key) {
    let scope;

    if (!key) {
      scope = _.cloneDeep(renderOptions);
      renderOptions = _.cloneDeep(defaultOptions);

      return scope;
    }

    return renderOptions[key] || false;
  }

  function set(key, value) {
    renderOptions[key] = value;
  }
};
