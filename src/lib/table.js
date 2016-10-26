// Utils
import { isDefined } from './utils/is';
import { forEach } from './utils/object';
import { icon } from './handlebars';

export function createTable(tableSchema) {
  const {
    __,
    currentDashboardApp,
    basePath,
    theme = 'grey',
    fields,
    data
  } = tableSchema;

  let html;

  html = `<table class="table ${theme}">`;
  html += getTHead(fields, __);
  html += getTBody(data, fields, basePath, currentDashboardApp, __);
  html += '</table>';

  return html;
}

function getTHead(fields, __) {
  let html;

  html = '<thead><tr><th><input class="tableCheckboxAll" type="checkbox" /></th>';

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

function getTBody(data, fields, basePath, currentDashboardApp, __) {
  const dashboardUrl = `${basePath}/dashboard/${currentDashboardApp}`;
  let deleteAction;
  let html;
  let id;
  let remove;
  let restore;
  let update;

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

      // Icons for state
      restore = '';
      remove = icon('trash');
      deleteAction = 'delete';
      update = icon('pencil');

      if (isDefined(fields[field]) && fields[field].center) {
        className = 'center';
      }

      if (field === 'id') {
        id = row[field];
      }

      if (field === 'state' && row[field] === 'deleted') {
        restore = icon('undo');
        remove = icon('times');
        deleteAction = 'remove';
        update = '';

        // Translating the state...
        row[field] = __.Dashboard.table[row[field]] || `__.Dashboard.table.${row[field]}`;
      }

      html += `<td class="${className}">${row[field]}</td>`;
    });

    html += `
      <td class="center">
        <a title="${__.Dashboard.table.edit}" href="${dashboardUrl}/update/${id}">
          ${update}
        </a>
        ${!restore ? '&nbsp;' : ''}
        <a class="${deleteAction}" title="${__.Dashboard.table.delete}" href="${dashboardUrl}/${deleteAction}/${id}">
          ${remove}
        </a>
        ${restore ? '&nbsp;' : ''}
        <a title="${__.Dashboard.table.restore}" href="${dashboardUrl}/restore/${id}">
          ${restore}
        </a>
      </td>
      </tr></tr>
    `;
  });

  html += '</tbody>';

  return html;
}
