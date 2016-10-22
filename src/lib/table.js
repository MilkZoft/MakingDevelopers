// Utils
import { isDefined } from './utils/is';
import { forEach } from './utils/object';
import { icon } from './handlebars';

export function createTable(tableData) {
  const { theme = 'grey', fields, data } = tableData;
  let html;

  html = `<table class="table ${theme}">`;
  html += getTHead(fields);
  html += getTBody(data, fields);
  html += '</table>';

  return html;
}

function getTHead(fields) {
  let html;

  html = '<thead><tr><th></th>';

  forEach(fields, field => {
    let className = 'row';

    if (isDefined(fields[field]) && fields[field].center) {
      className = 'center';
    }

    html += `<th class="${className}">${fields[field].label}</th>`;
  });

  html += '<th class="center">Acción</th></tr></thead>';

  return html;
}

function getTBody(data, fields) {
  let html;

  html = '<tbody>';

  forEach(data, row => {
    html += '<tr><td class="center"><input class="tableCheckbox" type="checkbox" /></td>';

    forEach(row, field => {
      let className = 'row';

      if (isDefined(fields[field]) && fields[field].center) {
        className = 'center';
      }
      html += `<td class="${className}">${row[field]}</td>`;
    });

    html += `<td class="center">${icon('pencil')} | ${icon('trash')}</td></tr></tr>`;
  });

  html += '</tbody>';

  return html;
}
