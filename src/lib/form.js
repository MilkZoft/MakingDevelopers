import { md5 } from './utils/security';

export function createInput(attrs) {
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

  Object.keys(attrs).forEach(attr => {
    let value = attrs[attr];

    if (attr === 'name') {
      value = md5(value);
    }

    if (value !== '') {
      html += `${attr}="${value}" `;
    }
  });

  html += ' />';

  return html;
}

export function createTextarea(attrs) {
  let html = '<textarea ';
  let content = '';
  let i = 0;
  const type = attrs.type;
  const hasClass = attrs.hasOwnProperty('class');

  if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
    html += 'class="textarea"';
  }

  const elements = Object.keys(attrs);

  elements.forEach(attr => {
    i++;

    let value = attrs[attr];

    if (attr === 'name') {
      value = md5(value);
    }

    if (attr === 'value' && value !== '') {
      content = value;
    } else if (value !== '') {
      html += i === elements.length - 1 ? `${attr}="${value}"` : `${attr}="${value}" `;
    }
  });

  html += `>${content}</textarea>`;

  return html;
}

export function createSelect(attrs) {
  let options;
  const type = attrs.type;
  const hasClass = attrs.hasOwnProperty('class');
  let html = '<select ';
  let value;
  let i = 0;


  if (attrs.hasOwnProperty('options')) {
    options = attrs.options.split('|');
    delete attrs.options;
  }

  if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
    html += 'class="select" ';
  }

  const elements = Object.keys(attrs);

  elements.forEach(attr => {
    i++;

    let value = attrs[attr];

    if (attr === 'name') {
      value = md5(value);
    }

    if (attr !== 'value' && value !== '') {
      html += i === elements.length - 1 ? `${attr}="${value}"` : `${attr}="${value}" `;
    }
  });

  html += '>';

  options.forEach(option => {
    if (option.indexOf(':') > -1) {
      value = option.substr(0, option.indexOf(':'));
      option = option.substr(option.indexOf(':') + 1);

      html += `<option value="${value}">${option}</option>`;
    } else {
      html += `<option>${option}</option>`;
    }
  });

  html += '</select>';

  return html;
}

export function createLabel(attrs, text) {
  let html = '<label ';

  Object.keys(attrs).forEach(attr => {
    const value = attrs[attr];

    html += `${attr}="${value}" `;
  });

  html += `>${text}</label>`;

  return html;
}
