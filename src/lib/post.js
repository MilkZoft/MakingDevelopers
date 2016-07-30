import { $security } from './config';
import { now } from './utils/date';
import { isArray, isDefined } from './utils/is';
import { md5 } from './utils/security';
import { escapeString, removeHTML } from './utils/string';

let postData = {};

export default (req, res, next) => {
  res.action = action;
  res.debug = debug;
  res.getAllPost = getAllPost;
  res.getContentFromTemplate = getContentFromTemplate;
  res.isGet = isGet;
  res.isPost = isPost;
  res.post = post;
  res.refreshSecurityToken = refreshSecurityToken;
  res.validate = validate;
  res.validateSecurityToken = validateSecurityToken;

  return next();

  function action() {
    return req.params.action === 'add' || req.params.action === 'edit' ? req.params.action : 'results';
  }

  function debug(letiable) {
    res.send(letiable);
  }

  function getAllPost(options) {
    const values = {};

    validateSecurityToken();

    if (!isDefined(options)) {
      options = {
        exclude: [
          md5('register'),
          md5('securityToken')
        ]
      };
    }

    postData.forEach((value, key) => {
      if (options.exclude.length > 0) {
        const exists = options.exclude.filter(option => {
          return option === key;
        });

        if (!exists) {
          values[key] = value;
        }
      } else {
        values[key] = value;
      }
    });

    refreshSecurityToken();

    return values;
  }

  function getContentFromTemplate(template, messageTemplate) {
    // const interpolation = ({ template }) => `${messageTemplate)}`;
    // return _.template(messageTemplate)(template);
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
      inputs.forEach(input => {
        value = postData[md5(input)];
        filter = input.split(':');
        fn = input.split('|');

        if (fn[1] === 'now') {
          input = input.replace('|now', '');
          value = now();
        }

        if (filter[1]) {
          input = input.replace(`:${filter[1]}`, '');
          value = postData[md5(input)];

          if (filter[1] !== 'html') {
            value = utils[filter[1]](value);
          }
        }

        posts[input] = value;
      });

      return posts;
    }

    if (isDefined(postData[md5(input)])) {
      value = postData[md5(input)];

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

    inputs.forEach(input => {
      if (!validation || validation === 'empty') {
        if (postData[md5(input)] === '') {
          element.push(input);
          return;
        }
      }
    });

    return element.length > 0 ? element[0] : false;
  }

  function validateSecurityToken() {
    if ($security().validateSecurityToken) {
      postData = false;

      if (res.session('securityToken') === req.body[md5('securityToken')]) {
        postData = req.body;
      }
    } else {
      postData = req.body;
    }
  }
};
