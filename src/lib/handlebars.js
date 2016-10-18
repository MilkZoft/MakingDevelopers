// NPM Dependencies
import { minify } from 'html-minifier';

// Local Dependencies
import { createInput, createLabel, createSelect, createTextarea } from './form';
import { isDefined, isUndefined } from './utils/is';
import { exists, forEach, ternary, stringify } from './utils/object';
import {
  getContentInsertOptionsHTML,
  getHiddenOptions,
  getInputOptions,
  getLabelOptions,
  getSelectOptions,
  getSubmitOptions,
  getTextareaOptions
} from './utils/options';

// Configuration
import { $html } from './config';

function renderFormElements(schema, __, field, errorClass, userInfo, flashData) {
  let html = '<div class="inputBlock">';

  html += label(getLabelOptions(schema, field, __));

  if (field === 'content') {
    html += getContentInsertOptionsHTML();
  }

  html += '<p>';

  html += input(getInputOptions(schema, field, errorClass, userInfo, flashData), schema[field].type);
  html += textarea(getTextareaOptions(schema, field, errorClass, flashData), schema[field].type);
  html += select(getSelectOptions(schema, field, errorClass, flashData, __), schema[field].type);

  html += '</p>';
  html += '</div>';

  return html;
}

export function renderSchema(options) {
  let html = '';

  const schema = options.hash.schema;
  const userInfo = options.hash.userInfo;
  const __ = options.hash.__;
  const flashData = options.hash.flashData;
  const securityToken = options.hash.securityToken;
  const hiddenElements = schema.hiddenElements || {};
  const alert = schema.alert || false;

  if (alert) {
    html += `<div class="alert ${alert.type}">${icon(alert.icon)} ${alert.message}</div>`;
  }

  forEach(schema, field => {
    if (schema[field].render) {
      if (!exists(field, hiddenElements)) {
        const errorClass = ternary(schema[field].errorMessage, ' errorBorder');

        html += renderFormElements(schema, __, field, errorClass, userInfo, flashData);
      } else {
        html += hidden(getHiddenOptions(field, hiddenElements));
      }
    }
  });

  html += submit(getSubmitOptions(__));
  html += token(securityToken);

  return html;
}

export function ceil(number) {
  return Math.ceil(parseFloat(number));
}

export function checkbox(options) {
  if (isDefined(options.hash)) {
    options.hash.type = 'checkbox';

    return createInput(options.hash);
  }

  return false;
}

/**
 * Compress the HTML Output
 *
 * @param {object} content Handlebars content
 * @returns {string} Compressed html
 */
export function compress(content) {
  if (!$html().minify) {
    return content.fn(this);
  }

  return minify(content.fn(this), {
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true
  });
}

export function email(options) {
  if (isDefined(options.hash)) {
    options.hash.id = 'email';
    options.hash.type = 'email';
    options.hash.name = 'email';
    options.hash.maxlength = '80';
    options.hash.pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';

    return createInput(options.hash);
  }

  return false;
}

export function flash(value) {
  return value || '';
}

export function gt(value1, value2, options) {
  return ternary(value1 > value2, options.fn(this), options.inverse(this));
}

export function gte(value1, value2, options) {
  return ternary(value1 >= value2, options.fn(this), options.inverse(this));
}

export function hidden(options) {
  if (isDefined(options.hash)) {
    options.hash.type = 'hidden';

    return createInput(options.hash);
  }

  return false;
}

export function icon(icon) {
  return `<i class="fa fa-${icon}"></i>`;
}

export function input(options, type) {
  if (isDefined(type) && type === 'input' && isDefined(options.hash)) {
    return createInput(options.hash);
  } else if (isUndefined(type) && isDefined(options.hash)) {
    return createInput(options.hash);
  }

  return '';
}

export function is(variable, value, options) {
  return ternary(variable && variable === value, options.fn(this), options.inverse(this));
}

export function isNot(variable, value, options) {
  return ternary(!variable || variable !== value, options.fn(this), options.inverse(this));
}

export function json(content) {
  return stringify(content);
}

export function label(options) {
  if (isDefined(options.hash)) {
    return createLabel(options.hash, options.hash.text ? options.hash.text : '');
  }

  return '';
}

export function lowercase(str) {
  return str.toLowerCase();
}

export function lt(value1, value2, options) {
  return ternary(value1 < value2, options.fn(this), options.inverse(this));
}

export function lte(value1, value2, options) {
  return ternary(value1 <= value2, options.fn(this), options.inverse(this));
}

export function password(options) {
  if (isDefined(options.hash)) {
    options.hash.id = 'password';
    options.hash.type = 'password';
    options.hash.name = 'password';

    return createInput(options.hash);
  }

  return '';
}

export function radio(options) {
  if (isDefined(options.hash)) {
    options.hash.type = 'radio';

    return createInput(options.hash);
  }

  return '';
}

export function reverse(str) {
  return str.split('').reverse().join('');
}

export function select(options, type) {
  if (isDefined(type) && type === 'select' && isDefined(options.hash)) {
    return createSelect(options.hash);
  } else if (isUndefined(type) && isDefined(options.hash)) {
    return createSelect(options.hash);
  }

  return '';
}

export function submit(options) {
  if (isDefined(options.hash)) {
    options.hash.type = 'submit';

    if (!isDefined(options.hash.class)) {
      options.hash.class = 'submit';
    } else {
      options.hash.class += ' submit';
    }

    return createInput(options.hash);
  }

  return '';
}

export function textarea(options, type) {
  if (isDefined(type) && type === 'textarea' && isDefined(options.hash)) {
    return createTextarea(options.hash);
  } else if (isUndefined(type) && isDefined(options.hash)) {
    return createTextarea(options.hash);
  }

  return '';
}

export function token(securityToken) {
  const options = {};

  if (isDefined(securityToken)) {
    options.type = 'hidden';
    options.name = 'securityToken';
    options.value = securityToken;

    return createInput(options);
  }

  return '';
}

export function uppercase(str) {
  return str.toUpperCase();
}
