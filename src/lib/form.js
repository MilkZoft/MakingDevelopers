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

  Object.keys(attrs).forEach(attr => {
    const value = attrs[attr];

    if (value !== '') {
      html += `${attr}="${value}" `;
    }
  });

  html += ' />';

  return html;
}

export function createTextarea(attrs) {
  if (!attrs) {
    return '';
  }

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

    const value = attrs[attr];

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
  if (!attrs) {
    return '';
  }

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

    const value = attrs[attr];

    if (attr !== 'value' && value !== '') {
      html += i === elements.length - 1 ? `${attr}="${value}" ` : `${attr}="${value}" `;
    }
  });

  html += '>';

  options.forEach(option => {
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

  html += '</select>';

  html = html.replace(' >', '>');

  return html;
}

export function createLabel(attrs, text) {
  if (!attrs) {
    return '';
  }

  let html = '<label ';

  Object.keys(attrs).forEach(attr => {
    const value = attrs[attr];

    html += `${attr}="${value}" `;
  });

  const parts = text.split('|');

  if (parts.length > 1) {
    html += `>${parts[0]} <span class="errorMessage">${parts[1]}</label>`;
  } else {
    html += `>${text}</label>`;
  }

  return html;
}
