import _ from 'lodash';
import $config from './config';
import utils from './utils';

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
    return req.params.action === 'add' || req.params.action === 'edit' ? req.params.action : 'view';
  }

  function debug(letiable) {
    res.send(letiable);
  }

  function getAllPost(options) {
    const values = {};

    validateSecurityToken();

    if (utils.Type.isUndefined(options)) {
      options = {
        exclude: [
          utils.Security.md5('register'),
          utils.Security.md5('securityToken')
        ]
      };
    }

    _.forEach(postData, (value, key) => {
      if (options.exclude.length > 0) {
        if (!_.includes(options.exclude, key)) {
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
    return _.template(messageTemplate)(template);
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

    if (utils.Type.isArray(inputs)) {
      _.forEach(inputs, (input) => {
        value = postData[utils.Security.md5(input)];
        filter = input.split(':');
        fn = input.split('|');

        if (fn[1] === 'now') {
          input = input.replace('|now', '');
          value = utils.Date.now();
        }

        if (filter[1]) {
          input = input.replace(`:${filter[1]}`, '');
          value = postData[utils.Security.md5(input)];

          if (filter[1] !== 'html') {
            value = utils[filter[1]](value);
          }
        }

        posts[input] = value;
      });

      return posts;
    }

    if (utils.Type.isDefined(postData[utils.Security.md5(input)])) {
      value = postData[utils.Security.md5(input)];

      if (filter === 'escape') {
        value = utils.escape(value);
      } else if (filter === 'clean') {
        value = utils.String.escape(utils.String.removeHTML(value));
      }

      if (value === 'yes') {
        return 1;
      }

      return value === 'no' ? 0 : value;
    }

    return false;
  }

  function refreshSecurityToken() {
    if ($config().refreshSecurityToken) {
      res.clearSession('securityToken');
    }
  }

  function validate(inputs, validation) {
    const element = [];

    _.forEach(inputs, (input) => {
      if (!validation || validation === 'empty') {
        if (postData[utils.Security.md5(input)] === '') {
          element.push(input);
          return;
        }
      }
    });

    return element.length > 0 ? element[0] : false;
  }

  function validateSecurityToken() {
    if ($config().social.validateSecurityToken) {
      if (res.session('securityToken') === req.body[utils.Security.md5('securityToken')]) {
        postData = req.body;
      } else {
        postData = false;
      }
    } else {
      postData = req.body;
    }
  }
};
