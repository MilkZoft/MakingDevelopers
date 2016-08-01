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
    renderOptions = scope;
  }

  function get(key) {
    let scope;

    if (!key) {
      scope = renderOptions;
      renderOptions = defaultOptions;

      return scope;
    }

    return renderOptions[key] || false;
  }

  function set(key, value) {
    renderOptions[key] = value;
  }
};
