import $config from './config';
import { minify } from 'html-minifier';
import form from './form';
import utils from './utils';

export default {
  ceil,
  checkbox,
  compress,
  email,
  flash,
  gt,
  gte,
  hidden,
  icon,
  input,
  is,
  isNot,
  json,
  label,
  lowercase,
  lt,
  lte,
  now,
  password,
  radio,
  reverse,
  select,
  submit,
  textarea,
  token,
  uppercase
};

function ceil(number) {
  return Math.ceil(parseFloat(number));
}

function checkbox(options) {
  if (utils.Type.isDefined(options.hash)) {
    options.hash.type = 'checkbox';

    return form.createInput(options.hash);
  }

  return false;
}

function compress(content) {
  if (!$config().html.minify) {
    return content.fn(this);
  }

  return minify(content.fn(this), {
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true
  });
}

function email(options) {
  if (utils.Type.isDefined(options.hash)) {
    options.hash.id = 'email';
    options.hash.type = 'email';
    options.hash.name = 'email';
    options.hash.maxlength = '80';
    options.hash.pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';

    return form.createInput(options.hash);
  }

  return false;
}

function flash(value) {
  return value || '';
}

function gt(value1, value2, options) {
  return value1 > value2 ? options.fn(this) : options.inverse(this);
}

function gte(value1, value2, options) {
  return value1 >= value2 ? options.fn(this) : options.inverse(this);
}

function hidden(options) {
  if (utils.Type.isDefined(options.hash)) {
    options.hash.type = 'hidden';

    return form.createInput(options.hash);
  }

  return false;
}

function icon(icon) {
  return `<i class="fa ${icon}"></i>`;
}

function input(options) {
  if (utils.Type.isDefined(options.hash)) {
    return form.createInput(options.hash);
  }

  return false;
}

function is(variable, value, options) {
  return variable && variable === value ? options.fn(this) : options.inverse(this);
}

function isNot(variable, value, options) {
  return !variable || variable !== value ? options.fn(this) : options.inverse(this);
}

function json(content) {
  return JSON.stringify(content);
}

function label(options) {
  if (utils.Type.isDefined(options.hash)) {
    return form.createLabel(options.hash, options.hash.text ? options.hash.text : '');
  }

  return false;
}

function lowercase(str) {
  return str.toLowerCase();
}

function lt(value1, value2, options) {
  return value1 < value2 ? options.fn(this) : options.inverse(this);
}

function lte(value1, value2, options) {
  return value1 <= value2 ? options.fn(this) : options.inverse(this);
}

function now() {
  return new Date();
}

function password(options) {
  if (utils.Type.isDefined(options.hash)) {
    options.hash.id = 'password';
    options.hash.type = 'password';
    options.hash.name = 'password';

    return form.createInput(options.hash);
  }

  return false;
}

function radio(options) {
  if (utils.Type.isDefined(options.hash)) {
    options.hash.type = 'radio';

    return form.createInput(options.hash);
  }

  return false;
}

function reverse(str) {
  return str.split('').reverse().join('');
}

function select(options) {
  if (utils.Type.isDefined(options.hash)) {
    return form.createSelect(options.hash);
  }

  return false;
}

function submit(options) {
  if (utils.Type.isDefined(options.hash)) {
    options.hash.type = 'submit';

    if (utils.Type.isUndefined(options.hash.class)) {
      options.hash.class = 'submit';
    } else {
      options.hash.class += ' submit';
    }

    return form.createInput(options.hash);
  }

  return false;
}

function textarea(options) {
  if (utils.Type.isDefined(options.hash)) {
    return form.createTextarea(options.hash);
  }

  return false;
}

function token(securityToken) {
  const options = {};

  if (utils.Type.isDefined(securityToken)) {
    options.type = 'hidden';
    options.name = 'securityToken';
    options.value = securityToken;

    return form.createInput(options);
  }

  return false;
}

function uppercase(str) {
  return str.toUpperCase();
}
