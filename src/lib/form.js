// Utils
import { forEach, keys } from './utils/object';

export function openForm(attrs) {
  let html = '<form ';

  html += _getAttrs(attrs);

  html += '>';

  return html;
}

export function closeForm() {
  return '</form>';
}

export function createInput(attrs) {
  if (!attrs) {
    return '';
  }

  let html = '<input ';
  const type = attrs.type;
  const hasType = attrs.hasOwnProperty('type');
  const hasClass = attrs.hasOwnProperty('class');

  if (!hasType) {
    html += 'type="text" ';
  }

  if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
    html += 'class="input" ';
  }

  html += _getAttrs(attrs);

  html += ' />';

  return html;
}

export function createTextarea(attrs) {
  if (!attrs) {
    return '';
  }

  let html = '<textarea ';
  const type = attrs.type;
  const hasClass = attrs.hasOwnProperty('class');

  if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
    html += 'class="textarea"';
  }

  html += _getAttrs(attrs, 'textarea');

  return html;
}

export function createSelect(attrs) {
  if (!attrs) {
    return '';
  }

  let options;
  const type = attrs.type;
  const hasClass = attrs.hasOwnProperty('class');
  let html = '<select ';

  if (attrs.hasOwnProperty('options')) {
    options = attrs.options.split('|');
    delete attrs.options;
  }

  if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
    html += 'class="select" ';
  }

  html += _getAttrs(attrs, 'select');
  html += '>';
  html += _getOptions(options, attrs);
  html += '</select>';
  html = html.replace(' >', '>');

  return html;
}

export function createLabel(attrs, text) {
  if (!attrs) {
    return '';
  }

  let html = '<label ';
  const parts = text.split('|');

  html += _getAttrs(attrs);

  if (parts.length > 1) {
    html += `>${parts[0]} <span class="errorMessage">${parts[1]}</label>`;
  } else {
    html += `>${text}</label>`;
  }

  return html;
}

/* Private functions */

function _getAttrs(attrs, type) {
  const elements = keys(attrs);
  let html = '';
  let content = '';
  let i = 0;

  if (type === 'textarea') {
    forEach(elements, attr => {
      i++;

      const value = attrs[attr];

      if (attr === 'value' && value !== '') {
        content = value;
      } else if (value !== '') {
        html += i === elements.length - 1 ? `${attr}="${value}"` : `${attr}="${value}" `;
      }
    });

    html += `>${content}</textarea>`;
  } else if (type === 'select') {
    forEach(elements, attr => {
      i++;

      const value = attrs[attr];

      if (attr !== 'value' && value !== '') {
        html += i === elements.length - 1 ? `${attr}="${value}" ` : `${attr}="${value}" `;
      }
    });
  } else {
    forEach(attrs, attr => {
      const value = attrs[attr];

      if (value !== '') {
        html += `${attr}="${value}" `;
      }
    });
  }

  return html;
}

function _getOptions(options, attrs) {
  let html = '';
  let value;

  forEach(options, option => {
    if (option.indexOf(':') > -1) {
      value = option.substr(0, option.indexOf(':'));
      option = option.substr(option.indexOf(':') + 1);

      let selected = '';

      if (value === attrs.selectedOption) {
        selected = ' selected';
      }

      html += `<option value="${value}"${selected}>${option}</option>`;
    } else {
      html += `<option>${option}</option>`;
    }
  });

  return html;
}
