// Helpers
import { getPagination } from '../../lib/pagination';

// Utils
import { forEach } from '../../lib/utils/object';
import { getCurrentApp } from '../../lib/utils/url';

export default (req, res, next) => {
  // * Application name & model
  const app = 'content';
  const appModel = `${app}Model`;

  // CRUD Views
  const createView = `app/${app}/dashboard/create`;
  const readView = `app/${app}/dashboard/read`;
  const updateView = `app/${app}/dashboard/update`;

  // Urls
  const currentApp = getCurrentApp(req.originalUrl, true);
  const dashboardAppUrl = `${res.basePath}/dashboard/${currentApp}`;
  const paginationUrl = `${dashboardAppUrl}/page/`;

  // * Methods
  res[`${app}Dashboard`] = {
    createAction,
    readAction,
    updateAction,
    deleteAction,
    removeAction,
    restoreAction
  };

  return next();

  /**
   * Create
   *
   * @returns {void} void
   */
  function createAction() {
    res.profileAllowed(connectedUser => {
      res.content(`Dashboard.modules.${currentApp}`, true);

      // Setting some vars
      res.renderScope.set('section', res.content('name'));

      if (res.isPost()) {
        // Retreiving all post data
        const post = res.getAllPost();

        // Trying to save the post
        res[appModel].dashboard().saveRow(post, (result, errors) => {
          // Do we have some errors?
          if (errors === 'exists') {
            res[appModel].dashboard().getSchema(schema => {
              // The post was added correclty
              schema.alert = {
                type: 'warning',
                icon: 'times',
                message: res.content('messages.add.exists')
              };

              res.renderScope.set('schema', schema);
              res.render(createView, res.renderScope.get());
            });
          } else if (errors) {
            // Getting the schema to re-render the form.
            res[appModel].dashboard().getSchema(schema => {
              schema.alert = {
                type: 'danger',
                icon: 'times',
                message: res.content('messages.add.fail')
              };

              // Assigning the error messages to the schema
              forEach(errors, error => {
                if (schema[error]) {
                  schema[error].errorMessage = errors[error];
                }
              });

              res.renderScope.set('schema', schema);
              res.renderScope.set('flashData', post);
              res.render(createView, res.renderScope.get());
            });
          } else if (result) {
            // Removing cache for content.
            res.cache.remove(`content(${post.language})`);

            // Getting the schema to re-render the form.
            res[appModel].dashboard().getSchema(schema => {
              // The post was added correclty
              schema.alert = {
                type: 'info',
                icon: 'check',
                message: res.content('messages.add.success')
              };

              res.renderScope.set('schema', schema);
              res.render(createView, res.renderScope.get());
            });
          }
        });
      } else {
        res[appModel].dashboard().getSchema(schema => {
          res.renderScope.set('schema', schema);
          res.render(createView, res.renderScope.get());
        });
      }
    });
  }

  /**
   * Read
   *
   * @returns {void} void
   */
  function readAction() {
    res.profileAllowed(connectedUser => {
      res.content('Dashboard.table', true);

      if (res.isPost()) {
        const searchTerm = res.post('search', false, true);
        const deleteAction = res.post('deleteAction', false, true);
        const removeAction = res.post('removeAction', false, true);
        const restoreAction = res.post('restoreAction', false, true);
        const rows = res.post('rows', false, true);
        const action = deleteAction
          ? 'deleteAction'
          : removeAction
            ? 'removeAction'
            : 'restoreAction';

        if (rows && deleteAction || removeAction || restoreAction) {
          res[appModel].dashboard()[action](rows, () => {
            res.redirect(dashboardAppUrl);
          });
        } else {
          res[appModel].dashboard().search(searchTerm, tableSchema => {
            res.renderScope.set('tableSchema', tableSchema);
            res.renderScope.set('searching', searchTerm);

            res.render(readView, res.renderScope.get());
          });
        }
      } else {
        res[appModel].dashboard().count(total => {
          res[appModel].dashboard().getRows(total, tableSchema => {
            res.renderScope.set('tableSchema', tableSchema);
            res.renderScope.set('pagination', getPagination(req.params, total, paginationUrl));

            res.render(readView, res.renderScope.get());
          });
        });
      }
    });
  }

  /**
   * Update
   *
   * @returns {void} void
   */
  function updateAction() {
    res.profileAllowed(connectedUser => {
      res.content(`Dashboard.modules.${currentApp}`, true);

      // Setting some vars
      res.renderScope.set('section', res.content('name'));

      if (res.isPost()) {
        // Retreiving all post data
        const post = res.getAllPost();

        // Trying to update the post
        res[appModel].dashboard().updateRow(post, (result, errors) => {
          if (errors) {
            // Getting the schema to re-render the form.
            res[appModel].dashboard().getSchema(schema => {
              schema.alert = {
                type: 'danger',
                icon: 'times',
                message: res.content('messages.update.fail')
              };

              // Assigning the error messages to the schema
              forEach(errors, error => {
                if (schema[error]) {
                  schema[error].errorMessage = errors[error];
                }
              });

              res.renderScope.set('schema', schema);
              res.renderScope.set('flashData', post);
              res.renderScope.set('currentId', res.currentId);

              res.render(updateView, res.renderScope.get());
            });
          } else if (result) {
            // Removing cache for content.
            res.cache.remove(`content(${post.language})`);

            // Getting the schema to re-render the form.
            res[appModel].dashboard().getSchema(schema => {
              // The post was added correclty
              schema.alert = {
                type: 'info',
                icon: 'check',
                message: res.content('messages.update.success')
              };

              res.renderScope.set('flashData', post);
              res.renderScope.set('currentId', res.currentId);
              res.renderScope.set('schema', schema);

              res.render(updateView, res.renderScope.get());
            });
          }
        });
      } else {
        res[appModel].dashboard().getRow(res.currentId, post => {
          res[appModel].dashboard().getSchema(schema => {
            res.renderScope.set('currentId', res.currentId);
            res.renderScope.set('flashData', post);
            res.renderScope.set('schema', schema);

            res.render(updateView, res.renderScope.get());
          });
        });
      }
    });
  }

  /**
   * Delete
   *
   * @returns {void} void
   */
  function deleteAction() {
    res.profileAllowed(connectedUser => {
      const id = res.currentId;

      res[appModel].dashboard().deleteRow(id, () => {
        res.redirect(`${res.basePath}/dashboard/${currentApp}`);
      });
    });
  }

  function removeAction() {
    res.profileAllowed(connectedUser => {
      const id = res.currentId;

      res[appModel].dashboard().removeRow(id, () => {
        res.redirect(`${res.basePath}/dashboard/${currentApp}`);
      });
    });
  }

  function restoreAction() {
    res.profileAllowed(connectedUser => {
      const id = res.currentId;

      res[appModel].dashboard().restoreRow(id, () => {
        res.redirect(`${res.basePath}/dashboard/${currentApp}`);
      });
    });
  }
};
