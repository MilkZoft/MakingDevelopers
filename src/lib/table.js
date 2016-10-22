// Utils
import { isDefined } from './utils/is';
import { forEach } from './utils/object';
import { icon } from './handlebars';

export function createTable(tableData) {
  const {
    __,
    currentDashboardApp,
    basePath,
    theme = 'grey',
    fields,
    data
  } = tableData;

  let html;

  html = `<table class="table ${theme}">`;
  html += getTHead(fields, __);
  html += getTBody(data, fields, basePath, currentDashboardApp);
  html += '</table>';

  return html;
}

function getTHead(fields, __) {
  let html;

  html = '<thead><tr><th></th>';

  forEach(fields, field => {
    let className = 'row';

    if (isDefined(fields[field]) && fields[field].center) {
      className = 'center';
    }

    html += `<th class="${className}">${fields[field].label}</th>`;
  });

  html += `<th class="center">${__.Dashboard.table.action}</th></tr></thead>`;

  return html;
}

function getTBody(data, fields, basePath, currentDashboardApp) {
  let html;
  let id;

  html = '<tbody>';

  forEach(data, row => {
    let bg = '';

    // If has a specific background...
    if (isDefined(row.bg)) {
      bg = row.bg;

      delete row.bg;
    }

    html += `
      <tr class="${bg}">
        <td class="center">
          <input class="tableCheckbox" type="checkbox" />
        </td>
    `;

    forEach(row, field => {
      let className = 'row';

      if (isDefined(fields[field]) && fields[field].center) {
        className = 'center';
      }

      if (field === 'id') {
        id = row[field];
      }

      html += `<td class="${className}">${row[field]}</td>`;
    });

    html += `
      <td class="center">
        <a title="Edit" href="${basePath}/dashboard/${currentDashboardApp}/update/${id}">${icon('pencil')}</a> &nbsp;
        <a title="Delete" href="${basePath}/dashboard/${currentDashboardApp}/delete/${id}">${icon('trash')}</a>
      </td>
      </tr></tr>
    `;
  });

  html += '</tbody>';

  return html;
}
