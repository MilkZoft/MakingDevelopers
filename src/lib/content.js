import utils from './utils';

export default (req, res, next) => {
  let contentBase;

  res.content = content;

  return next();

  function content(contentKey, base) {
    if (base) {
      contentBase = contentKey;
    } else if (contentBase && utils.Object.pick(contentKey, res.__) === contentKey) {
      contentKey = `${contentBase}.${contentKey}`;
    }

    return utils.Object.pick(contentKey, res.__);
  }
};
