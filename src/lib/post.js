// Configuration
import { $security } from './config';

// Utils
import { now } from './utils/date';
import { isArray, isDefined, isObject } from './utils/is';
import { forEach } from './utils/object';
import { escapeString, removeHTML } from './utils/string';

let postData = {};

export default (req, res, next) => {
  res.action = action;
  res.debug = debug;
  res.getAllPost = getAllPost;
  res.isGet = isGet;
  res.isPost = isPost;
  res.post = post;
  res.refreshSecurityToken = refreshSecurityToken;
  res.validate = validate;
  res.validateSecurityToken = validateSecurityToken;

  return next();

  function action() {
    return req.params.action === 'create' || req.params.action === 'edit'
      ? `${req.params.action}Action`
      : 'readAction';
  }

  function debug(variable) {
    res.send(variable);
  }

  function getAllPost(options) {
    validateSecurityToken();

    if (!isDefined(options)) {
      options = {
        exclude: [
          'register',
          'publish',
          'securityToken'
        ]
      };
    }

    if (isObject(postData)) {
      const values = {};

      forEach(postData, key => {
        if (options.exclude.length > 0) {
          const exists = options.exclude.filter(option => {
            return option === key;
          });

          if (exists.length === 0) {
            values[key] = postData[key];
          }
        } else {
          values[key] = postData[key];
        }
      });

      return values;
    }

    return false;
  }

  function isGet() {
    return req.method === 'GET';
  }

  function isPost() {
    return req.method === 'POST';
  }

  function post(input, filter) {
    const inputs = input;
    const posts = {};
    let fn;
    let value;

    if (!filter) {
      filter = 'clean';
    }

    validateSecurityToken();

    if (isArray(inputs)) {
      forEach(inputs, input => {
        value = postData[input];
        filter = input.split(':');
        fn = input.split('|');

        if (fn[1] === 'now') {
          input = input.replace('|now', '');
          value = now();
        }

        if (filter[1]) {
          input = input.replace(`:${filter[1]}`, '');
          value = postData[input];

          if (filter[1] !== 'html') {
            value = utils[filter[1]](value);
          }
        }

        posts[input] = value;
      });

      return posts;
    }

    if (isDefined(postData[input])) {
      value = postData[input];

      if (filter === 'escape') {
        value = escapeString(value);
      } else if (filter === 'clean') {
        value = escapeString(removeHTML(value));
      }

      if (value === 'yes') {
        return 1;
      }

      return value === 'no' ? 0 : value;
    }

    return false;
  }

  function refreshSecurityToken() {
    if ($security().refreshSecurityToken) {
      res.clearSession('securityToken');
    }
  }

  function validate(inputs, validation) {
    const element = [];

    forEach(inputs, input => {
      if (!validation || validation === 'empty') {
        if (postData[input] === '') {
          element.push(input);
          return;
        }
      }
    });

    return element.length > 0 ? element[0] : false;
  }

  function validateSecurityToken() {
    if ($security().validateSecurityToken) {
      postData = {};

      if (res.session('securityToken') === req.body.securityToken) {
        postData = req.body;
      }
    } else {
      postData = req.body;
    }
  }
};
