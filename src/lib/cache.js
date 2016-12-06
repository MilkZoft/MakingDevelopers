// Dependencies
import redis from 'redis';

// Configuration
import { $cache } from './config';

// Utils
import { isJson, isObject } from './utils/is';
import { parseJson, stringify } from './utils/object';
import { md5 } from './utils/security';

export default (req, res, next) => {
  // Methods
  res.cache = {
    exists: Cache().exists,
    get: Cache().get,
    remove: Cache().remove,
    set: Cache().set
  };

  return next();
};

export function Cache(isUnitTest) {
  let cacheClient;

  if (!isUnitTest) {
    // Creating Redis Client
    cacheClient = redis.createClient($cache().port, $cache().host);
  }

  // Methods
  return {
    exists,
    get,
    remove,
    set
  };

  function exists(key, callback) {
    cacheClient.exists(_getCacheKey(key), (error, reply) => {
      if ($cache().enable) {
        if (error) {
          console.log('Redis Error:', error); // eslint-disable-line no-console
        }

        return callback(reply);
      } else {
        return callback(false);
      }
    });
  }

  function get(key, callback) {
    if ($cache().enable) {
      cacheClient.get(_getCacheKey(key), (error, reply) => {
        if (error) {
          console.log('Redis Error:', error); // eslint-disable-line no-console
        }

        return callback(isJson(reply) ? parseJson(reply) : reply);
      });
    } else {
      return callback(false);
    }
  }

  function remove(key, callback) {
    if ($cache().enable) {
      cacheClient.del(_getCacheKey(key));
    }

    return false;
  }

  function set(key, value, expirationTime) {
    if ($cache().enable) {
      cacheClient.set(_getCacheKey(key), isObject(value) ? stringify(value) : value);

      _expire(key, expirationTime);
    }

    return false;
  }

  function _expire(key, expirationTime) {
    if ($cache().enable) {
      cacheClient.expire(_getCacheKey(key), expirationTime || $cache().expirationTime);
    }

    return false;
  }

  function _getCacheKey(key) {
    return md5(key);
  }
}
