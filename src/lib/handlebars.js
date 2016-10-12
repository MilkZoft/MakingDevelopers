// NPM Dependencies
import { minify } from 'html-minifier';

// Local Dependencies
import { createInput, createLabel, createSelect, createTextarea } from './form';
import { isDefined } from './utils/is';
import { pick, stringify } from './utils/object';
import { year, month, day } from './utils/date';

// Configuration
import { $html } from './config';

export function renderSchema(options) {
  const inputOptions = { hash: {} };
  const hiddenOptions = { hash: {} };
  const textareaOptions = { hash: {} };
  const labelOptions = { hash: {} };
  const selectOptions = { hash: {} };
  const submitOptions = { hash: {} };

  const hiddenElements = {
    createdAt: `${year()}/${month()}/${day()}`,
    year: year(),
    month: month(),
    day: day()
  };

  let html = '';

  if (options.hash) {
    const schema = options.hash.schema;
    const userInfo = options.hash.userInfo;
    const __ = options.hash.__;

    Object.keys(schema).forEach(field => {
      if (schema[field].render) {
        if (Object.keys(hiddenElements).indexOf(field) === -1) {
          html += '<div class="inputBlock">';

          const errorClass = schema[field].errorMessage ? ' errorBorder' : '';

          // Assigning input id
          inputOptions.hash.id = field;
          textareaOptions.hash.id = field;
          selectOptions.hash.id = field;

          // Assigning class name
          inputOptions.hash.class = schema[field].className + errorClass;
          textareaOptions.hash.class = schema[field].className + errorClass;
          selectOptions.hash.class = schema[field].className + errorClass;

          // Assigning name of the input
          inputOptions.hash.name = field;
          textareaOptions.hash.name = field;
          selectOptions.hash.name = field;

          // If an input is required...
          if (schema[field].required) {
            // inputOptions.hash.required = true;
            // textareaOptions.hash.required = true;
            // selectOptions.hash.required = true;
          }

          // Creating a label
          labelOptions.hash.for = field;

          if (schema[field].errorMessage) {
            labelOptions.hash.text = `
              ${pick(schema[field].label, __)}|${schema[field].errorMessage}
            `;
          } else {
            labelOptions.hash.text = pick(schema[field].label, __);
          }

          html += label(labelOptions);

          if (field === 'author') {
            inputOptions.hash.value = userInfo.username;
          }

          if (field === 'content') {
            html += `
              <div>
                <a id="insertAd" class="pointer" title="Insert Ad">
                  <i class="fa fa-google"></i>
                </a>
                <a id="insertCode" class="pointer" title="Insert Code">
                  <i class="fa fa-code"></i>
                </a>
                <a id="insertMedia" class="pointer" title="Insert Media">
                  <i class="fa fa-picture-o"></i>
                </a>
              </div>
            `;
          }

          if (schema[field].options) {
            selectOptions.hash.options = pick(schema[field].options, __);
          }

          html += '<p>';

          if (schema[field].type === 'input') {
            html += input(inputOptions);
          } else if (schema[field].type === 'textarea') {
            html += textarea(textareaOptions);
          } else if (schema[field].type === 'select') {
            html += select(selectOptions);
          }

          html += '</p>';
          html += '</div>';
        } else {
          hiddenOptions.hash.id = field;
          hiddenOptions.hash.name = field;

          hiddenOptions.hash.value = hiddenElements[field];

          html += hidden(hiddenOptions);
        }
      }
    });

    submitOptions.hash.id = 'publish';
    submitOptions.hash.class = 'btn btn-success';
    submitOptions.hash.name = 'publish';
    submitOptions.hash.value = __.Dashboard.forms.fields.save;

    html += submit(submitOptions);

    return html;
  }

  return false;
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
  return value1 > value2 ? options.fn(this) : options.inverse(this);
}

export function gte(value1, value2, options) {
  return value1 >= value2 ? options.fn(this) : options.inverse(this);
}

export function hidden(options) {
  if (isDefined(options.hash)) {
    options.hash.type = 'hidden';

    return createInput(options.hash);
  }

  return false;
}

export function icon(icon) {
  return `<i class="fa ${icon}"></i>`;
}

export function input(options) {
  if (isDefined(options.hash)) {
    return createInput(options.hash);
  }

  return false;
}

export function is(variable, value, options) {
  return variable && variable === value ? options.fn(this) : options.inverse(this);
}

export function isNot(variable, value, options) {
  return !variable || variable !== value ? options.fn(this) : options.inverse(this);
}

export function json(content) {
  return stringify(content);
}

export function label(options) {
  if (isDefined(options.hash)) {
    return createLabel(options.hash, options.hash.text ? options.hash.text : '');
  }

  return false;
}

export function lowercase(str) {
  return str.toLowerCase();
}

export function lt(value1, value2, options) {
  return value1 < value2 ? options.fn(this) : options.inverse(this);
}

export function lte(value1, value2, options) {
  return value1 <= value2 ? options.fn(this) : options.inverse(this);
}

export function password(options) {
  if (isDefined(options.hash)) {
    options.hash.id = 'password';
    options.hash.type = 'password';
    options.hash.name = 'password';

    return createInput(options.hash);
  }

  return false;
}

export function radio(options) {
  if (isDefined(options.hash)) {
    options.hash.type = 'radio';

    return createInput(options.hash);
  }

  return false;
}

export function reverse(str) {
  return str.split('').reverse().join('');
}

export function select(options) {
  if (isDefined(options.hash)) {
    return createSelect(options.hash);
  }

  return false;
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

  return false;
}

export function textarea(options) {
  if (isDefined(options.hash)) {
    return createTextarea(options.hash);
  }

  return false;
}

export function token(securityToken) {
  const options = {};

  if (isDefined(securityToken)) {
    options.type = 'hidden';
    options.name = 'securityToken';
    options.value = securityToken;

    return createInput(options);
  }

  return false;
}

export function uppercase(str) {
  return str.toUpperCase();
}
