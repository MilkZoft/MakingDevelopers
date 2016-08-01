import { $session } from './config';
import { isArray, isJson, isString, isUndefined } from './utils/is';
import { parseJson, stringify } from './utils/object';

export default (req, res, next) => {
  const cookiePrefix = $session().cookiePrefix;
  const sessionData = parseSession();

  const options = {
    domain: $session().cookieDomain,
    path: $session().path,
    maxAge: new Date(Date.now() + $session().maxAge),
    httpOnly: $session().httpOnly
  };

  const deleteOptions = {
    domain: $session().cookieDomain,
    path: $session().path,
    httpOnly: $session().httpOnly
  };

  // Methods
  res.session = session;
  res.clearSession = clearSession;
  res.destroySessions = destroySessions;

  return next();

  function parseSession() {
    const rVal = {};

    if (req.cookies) {
      Object.keys(req.cookies).forEach(key => {
        const sessionPrefix = new RegExp(`^${cookiePrefix}`);
        const isSessionCookie = key.search(sessionPrefix) !== -1;
        let value = req.cookies[key];

        if (isSessionCookie) {
          key = key.replace(sessionPrefix, '');

          if (isJson(value)) {
            value = parseJson(value);
          }

          rVal[key] = value;
        }
      });
    }

    return rVal;
  }

  function session(key, value) {
    // required params missing
    if (!key && isUndefined(value)) {
      return sessionData;
    }

    // retrieve value
    if (!value) {
      return sessionData[key];
    }

    // set value
    sessionData[key] = value;

    // set cookie
    const cookieKey = cookiePrefix + key;
    const cookieValue = isString(value) ? value : stringify(value);

    return res.cookie(cookieKey, cookieValue, options);
  }

  function clearSession(keys) {
    let cookieKey;
    const key = keys;

    if (isArray(keys)) {
      keys.forEach(key => {
        delete sessionData[key];

        cookieKey = `${cookiePrefix}${key}`;
        res.clearCookie(cookieKey, deleteOptions);
      });
    } else {
      delete sessionData[key];

      cookieKey = `${cookiePrefix}${key}`;
      res.clearCookie(cookieKey, deleteOptions);
    }
  }

  function destroySessions() {
    let cookieKey;

    if (sessionData) {
      sessionData.forEach((value, key) => {
        delete sessionData[key];

        cookieKey = `${cookiePrefix}${key}`;
        res.clearCookie(cookieKey, deleteOptions);
      });
    }

    return null;
  }
};
