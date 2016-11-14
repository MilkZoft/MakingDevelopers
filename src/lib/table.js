// Utils
import { isDefined } from './utils/is';
import { content, exists, forEach } from './utils/object';

// Helpers
import { openForm, closeForm } from './form';
import { icon, submit } from './handlebars';

const ignoredFields = ['language'];

export function createTable(tableSchema) {
  const {
    __,
    currentDashboardApp,
    basePath,
    theme = 'grey',
    fields,
    data
  } = tableSchema;

  const deleteOptions = {
    hash: {
      id: 'deleteAction',
      name: 'deleteAction',
      value: content('Dashboard.table.delete', __),
      class: 'btn dark',
      onclick: `return confirm('${content('Dashboard.table.actions.delete.question', __)}')`
    }
  };

  const removeOptions = {
    hash: {
      id: 'removeAction',
      name: 'removeAction',
      value: content('Dashboard.table.remove', __),
      class: 'btn danger',
      onclick: `return confirm('${content('Dashboard.table.actions.remove.question', __)}')`
    }
  };

  const restoreOptions = {
    hash: {
      id: 'restoreAction',
      name: 'restoreAction',
      value: content('Dashboard.table.restore', __),
      class: 'btn success',
      onclick: `return confirm('${content('Dashboard.table.actions.restore.question', __)}')`
    }
  };

  let html = openForm({
    action: `${basePath}/dashboard/${currentDashboardApp}`,
    method: 'post',
    class: 'results'
  });

  if (data.length > 0) {
    html += `<table class="table ${theme}">`;
    html += _getTHead(fields, __);
    html += _getTBody(data, fields, basePath, currentDashboardApp, __);
    html += '</table>';
  } else {
    html += `<div class="noData">${content('Dashboard.table.noData', __)}</div>`;
  }

  html += `
    <div class="actions">
      ${submit(deleteOptions)}
      ${submit(removeOptions)}
      ${submit(restoreOptions)}
    </div>
  `;

  html += closeForm();

  return html;
}

/* Private functions */

function _getTHead(fields, __) {
  let html;

  html = '<thead><tr><th><input class="tableCheckboxAll" type="checkbox" /></th>';

  forEach(fields, field => {
    let className = 'row';

    if (isDefined(fields[field]) && fields[field].center) {
      className = 'center';
    }

    if (!exists(field, ignoredFields)) {
      html += `<th class="${className}">${fields[field].label}</th>`;
    }
  });

  html += `<th class="center">${content('Dashboard.table.action', __)}</th></tr></thead>`;

  return html;
}

function _getTBody(data, fields, basePath, currentDashboardApp, __) {
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
    let firstField = true;

    // If has a specific background...
    if (isDefined(row.bg)) {
      bg = row.bg;

      delete row.bg;
    }

    html += `<tr class="${bg}">`;

    forEach(row, field => {
      let className = 'row';

      if (field === 'id') {
        id = row[field];
      }

      if (firstField) {
        html += `
          <td class="center">
            <input class="tableCheckbox" type="checkbox" name="rows" value="${id}" />
          </td>
        `;

        firstField = false;
      }

      // Icons for state
      restore = '';
      remove = icon('trash');
      deleteAction = 'delete';
      update = icon('pencil');

      if (isDefined(fields[field]) && fields[field].center) {
        className = 'center';
      }

      if (field === 'state' && row[field] === 'deleted') {
        restore = icon('undo');
        remove = icon('times');
        deleteAction = 'remove';
        update = '';

        // Translating the state...
        row[field] = content(`Dashboard.table.${row[field]}`, __);
      }

      if (field === 'title' && isDefined(row.language)) {
        row[field] = `<span class="flag ${row.language}"></span> &nbsp;&nbsp; ${row[field]}`;
      }

      if (!exists(field, ignoredFields)) {
        html += `<td class="${className}">${row[field]}</td>`;
      }
    });

    html += `
      <td class="center">
        <a title="${content('Dashboard.table.edit', __)}" href="${dashboardUrl}/update/${id}">
          ${update}
        </a>
        ${!restore ? '&nbsp;' : ''}
        <a
          class="${deleteAction}"
          title="${content('Dashboard.table.delete', __)}"
          href="${dashboardUrl}/${deleteAction}/${id}"
        >
          ${remove}
        </a>
        ${restore ? '&nbsp;' : ''}
        <a title="${content('Dashboard.table.restore', __)}" href="${dashboardUrl}/restore/${id}">
          ${restore}
        </a>
      </td>
      </tr></tr>
    `;
  });

  html += '</tbody>';

  return html;
}
