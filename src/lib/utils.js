import $config from './config';
import _ from 'lodash';
import dateFormat from 'date-format';
import dot from 'dot-object';
import fs from 'fs';
import security from './security';

export default {
  Date: {
    day,
    isDay,
    isMonth,
    isYear,
    month,
    now,
    year
  },
  Device: {
    isDesktop,
    isMobile,
    getCurrentDevice
  },
  Files: {
    glob
  },
  Object: {
    buildContentJson,
    pick,
    stringify
  },
  Type: {
    isArray,
    isDefined,
    isFunction,
    isJson,
    isNumber,
    isObject,
    isString,
    isUndefined
  },
  Security: {
    encrypt,
    md5,
    sha1
  },
  String: {
    clean,
    escape,
    randomCode,
    removeHTML
  },
  Url: {
    getParamsFromUrl
  }
};

// Date functions
function day() {
  return dateFormat('dd', new Date());
}

function isDay(day) {
  return isDefined(day) && day.length === 2 && !isNaN(day) && day <= 31;
}

function isMonth(month) {
  return isDefined(month) && month.length === 2 && !isNaN(month) && month <= 12;
}

function isYear(year) {
  return isDefined(year) && year.length === 4 && !isNaN(year);
}

function month() {
  return dateFormat('MM', new Date());
}

function now() {
  return dateFormat(new Date());
}

function year() {
  return dateFormat('yyyy', new Date());
}

// Device functions
function isDesktop(ua) {
  return !/mobile/i.test(ua);
}

function isMobile(ua) {
  return /mobile/i.test(ua);
}

function getCurrentDevice(ua) {
  return /mobile/i.test(ua) ? 'mobile' : 'desktop';
}

// Files functions
function glob(dir, _files, urls) {
  const files = fs.readdirSync(dir);
  let name;
  let tmp;
  let url;

  _files = _files || [];
  urls = urls || [];

  for (const i in files) {
    if (files[i] !== '.DS_Store' && files[i] !== '.gitkeep') {
      name = `${dir}/${files[i]}`;

      if (fs.statSync(name).isDirectory()) {
        glob(name, _files, urls);
      } else {
        tmp = name.split('/public/');

        if (isDefined(tmp[1])) {
          url = `${$config().baseUrl}/${tmp[1]}`;

          _files.push(name);
          urls.push(url);
        }
      }
    }
  }

  return urls;
}

// Object functions
function buildContentJson(nodes, raw) {
  const row = {};

  _.forEach(nodes, node => {
    row[node.name] = node.value;
  });

  if (!raw) {
    dot.object(row);
  }

  return row;
}

function pick(key, obj) {
  return dot.pick(key, obj) || key;
}

function stringify(value) {
  return JSON.stringify(value);
}

// Security functions
function encrypt(str) {
  return security.sha1(security.md5(str));
}

function md5(str) {
  if (isDefined(str)) {
    return security.md5(str);
  }

  return false;
}

function sha1(str) {
  if (isDefined(str)) {
    return security.sha1(str);
  }

  return false;
}

// String functions
function clean(str) {
  if (isDefined(str)) {
    return removeHTML(str).replace(/[`ª´·¨Ç~¿!#$%^&*()|+\-=?;'",<>\{\}\[\]\\]/gi, '');
  }

  return false;
}

function escape(str) {
  if (isDefined(str)) {
    return str
      .replace(/'/g, '\\\'')
      .replace(/"/g, '\\\\"')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  return false;
}

function randomCode(max, charSet) {
  let randomCode = '';
  let randomPoz;

  max = max || 12;
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < max; i++) {
    randomPoz = Math.floor(Math.random() * charSet.length);
    randomCode += charSet.substring(randomPoz, randomPoz + 1);
  }

  return randomCode;
}

function removeHTML(str) {
  if (isDefined(str)) {
    return str.replace(/(<([^>]+)>)/ig, '');
  }

  return false;
}

// Type functions
function isArray(variable) {
  return variable instanceof Array;
}

function isDefined(variable) {
  return typeof variable !== 'undefined' && variable !== null;
}

function isFunction(func) {
  return typeof func === 'function';
}

function isJson(str) {
  if (str === null) {
    return false;
  }

  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}

function isNumber(number) {
  return !isNaN(number);
}

function isObject(variable) {
  return typeof variable === 'object';
}

function isString(variable) {
  return typeof variable === 'string';
}

function isUndefined(variable) {
  return typeof variable === 'undefined' || variable === null;
}

// Url functions
function getParamsFromUrl(params) {
  params = params.split('/');
  params.shift();

  return params;
}
