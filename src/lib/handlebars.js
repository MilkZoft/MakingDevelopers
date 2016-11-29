// Dependencies
import { minify } from 'html-minifier';

// Helpers
import {
  openForm,
  closeForm,
  createInput,
  createLabel,
  createSelect,
  createTextarea
} from './form';
import { createTable } from './table';

// Utils
import { isDefined, isUndefined } from './utils/is';
import { content, exists, forEach, ternary, stringify } from './utils/object';
import {
  getContentInsertOptionsHTML,
  getHiddenOptions,
  getInputOptions,
  getLabelOptions,
  getSelectOptions,
  getSubmitOptions,
  getTextareaOptions
} from './utils/options';
import { getImageFormats, getFileFormats } from './utils/files';

// Configuration
import { $html } from './config';

export function renderMedia(options) {
  const media = options.hash.media;
  const basePath = options.hash.basePath;
  let icon;

  let html = openForm({
    id: 'mediaForm',
    action: `${basePath}/dashboard/media/upload`,
    method: 'post',
    enctype: 'multipart/form-data'
  });

  html += `
    <div id="media" class="media hidden">
      <h2>Media</h2>
      <a class="closeMedia" id="closeMedia" title="Close Media"><i class="fa fa-times"></i></a>

      <div class="uploadForm">
        <input id="files" name="file" type="file">
        <input name="upload" class="btn primary" value="Upload" type="submit">
      </div>

      <div class="searchMedia">
        <input id="searchMedia" type="text" placeholder="Search media files..." />
      </div>

      <div class="files">
  `;

  let extension;
  const imageFormats = getImageFormats();
  const documentFormats = getFileFormats();

  forEach(media, file => {
    extension = file.extension;

    if (exists(extension, imageFormats)) {
      html += `
        <div class="file" style="background-image: url(${file.url})" title="${file.name} - ${file.size}">
          <div class="options">
            <a href="#" class="insert">Insert</a>
            <a target="_blank" href="${file.url}" class="download">Download</a>
          </div>
        </div>
      `;
    } else {
      if (documentFormats[extension]) {
        icon = `fa-file-${documentFormats[extension]}-o`;
      } else {
        icon = 'fa-file-text-o';
      }

      html += `
        <div class="file" title="${file.name} - ${file.size}">
          <i class="fa ${icon} ${documentFormats[extension]}"></i>

          <p>
            ${file.name} <br /><br />
            ${file.size}
          </p>

          <div class="options">
            <a href="#" class="insert">Insert</a>
            <a target="_blank" href="${file.url}" class="download">Download</a>
          </div>
        </div>
      `;
    }
  });

  html += '</div></div>';

  html += closeForm();

  return html;
}

export function renderSchema(options) {
  const basePath = options.hash.basePath;
  const __ = options.hash.__;
  const action = options.hash.action || 'create';
  const connectedUser = options.hash.connectedUser;
  const flashData = options.hash.flashData;
  const securityToken = options.hash.securityToken;
  const schema = options.hash.schema;
  const alert = schema && schema.alert || false;
  const hiddenElements = schema && schema.hiddenElements || {};

  let html = openForm({
    action: `${basePath}/dashboard/blog/create`,
    method: 'post'
  });

  if (alert) {
    html += `<div class="alert ${alert.type}">${icon(alert.icon)} ${alert.message}</div>`;
  }

  forEach(schema, field => {
    if (schema[field].render) {
      if (!exists(field, hiddenElements)) {
        const errorClass = ternary(schema[field].errorMessage, ' errorBorder');

        html += _renderFormElements(schema, __, field, errorClass, connectedUser, flashData);
      } else {
        html += hidden(getHiddenOptions(field, hiddenElements));
      }
    }
  });

  html += submit(getSubmitOptions(__, action));
  html += token(securityToken);
  html += closeForm();

  return html;
}

export function renderTable(options) {
  const tableSchema = options.hash.tableSchema;

  if (tableSchema) {
    return createTable(tableSchema);
  }

  return false;
}

export function renderSearch(options) {
  const __ = options.hash.__;
  const currentDashboardApp = options.hash.currentDashboardApp;
  const basePath = options.hash.basePath;
  const searching = options.hash.searching;

  const inputOptions = {
    id: 'search',
    name: 'search',
    placeholder: content('Dashboard.search.placeholder', __),
    maxlength: 35
  };

  const submitOptions = {
    hash: {
      id: 'submitSearch',
      name: 'searchSubmit',
      value: content('Dashboard.search.label', __),
      class: 'btn dark'
    }
  };

  const formOptions = {
    action: `${basePath}/dashboard/${currentDashboardApp}`,
    method: 'post',
    class: 'search'
  };

  let form = openForm(formOptions);
  form += createInput(inputOptions);
  form += submit(submitOptions);

  if (searching) {
    form += `
      <div class="searching">
        <strong>${content('Dashboard.search.searching', __)}:</strong> ${searching}
        <a href="${formOptions.action}">${icon('times')}</a>
      </div>
    `;
  }

  form += closeForm();

  return form;
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

/* Private functions */

function _renderFormElements(schema, __, field, errorClass, userInfo, flashData) {
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
