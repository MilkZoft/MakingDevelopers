// Local dependencies
import { pick } from './utils/object';

export default (req, res, next) => {
  let contentBase;

  res.content = content;

  return next();

  /**
   * Returns content from given key
   *
   * @param {string} contentKey Content Key
   * @param {string} base Base to shortcut the keys
   * @returns {string} Content
   */
  function content(contentKey, base) {
    if (base) {
      contentBase = contentKey;
    } else if (contentBase && pick(contentKey, res.__) === contentKey) {
      contentKey = `${contentBase}.${contentKey}`;
    }

    return pick(contentKey, res.__);
  }
};
