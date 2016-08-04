// Global vars
let renderOptions = {};
let defaultOptions = {};

export default (req, res, next) => {
  res.renderScope = {
    default: defaultScope,
    get,
    set
  };

  return next();

  /**
   * Sets default templates options
   *
   * @param {object} scope Scope
   * @returns {void} void
   */
  function defaultScope(scope) {
    defaultOptions = scope;
    renderOptions = scope;
  }

  /**
   * Retrieves the template options
   *
   * @param {string} key Key
   * @returns {string} render option
   */
  function get(key) {
    let scope;

    if (!key) {
      scope = renderOptions;
      renderOptions = defaultOptions;

      return scope;
    }

    return renderOptions[key] || false;
  }

  /**
   * Set a value in the renderOptions
   *
   * @param {string} key Key
   * @param {mixed} value Value
   * @returns {void} void
   */
  function set(key, value) {
    renderOptions[key] = value;
  }
};
