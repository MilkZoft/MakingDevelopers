// Dependencies
import path from 'path';

// Helpers
import { getPagination } from '../../lib/pagination';

// Utils
import { glob } from '../../lib/utils/files';
import { forEach } from '../../lib/utils/object';
import { getCurrentApp } from '../../lib/utils/url';

export default (req, res, next) => {
  // Application name
  const app = 'blog';

  // CRUD Views
  const createView = `app/${app}/dashboard/create`;
  const readView = `app/${app}/dashboard/read`;
  const updateView = `app/${app}/dashboard/update`;

  // Urls
  const dashboardAppUrl = `${res.basePath}/dashboard/${getCurrentApp(req.originalUrl, true)}`;
  const paginationUrl = `${dashboardAppUrl}/page/`;

  // Setting layout
  res.renderScope.default({
    layout: 'dashboard.hbs'
  });

  // Methods
  res.blogDashboard = {
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
      res.content('Dashboard.modules.blog', true);

      // Setting some vars
      res.renderScope.set('multimedia', glob(path.join(__dirname, '../../public/images/uploads')));
      res.renderScope.set('section', res.content('name'));

      if (res.isPost()) {
        // Retreiving all post data
        const post = res.getAllPost();

        // Trying to save the post
        res.BlogModel.dashboard().savePost(post, (result, errors) => {
          // Do we have some errors?
          if (errors === 'exists') {
            res.BlogModel.dashboard().getSchema(schema => {
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
            res.BlogModel.dashboard().getSchema(schema => {
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
            // Getting the schema to re-render the form.
            res.BlogModel.dashboard().getSchema(schema => {
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
        res.BlogModel.dashboard().getSchema(schema => {
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
          res.BlogModel.dashboard()[action](rows, () => {
            res.redirect(dashboardAppUrl);
          });
        } else {
          res.BlogModel.dashboard().search(searchTerm, tableSchema => {
            res.renderScope.set('tableSchema', tableSchema);
            res.renderScope.set('searching', searchTerm);

            res.render(readView, res.renderScope.get());
          });
        }
      } else {
        res.BlogModel.dashboard().countAllPosts(total => {
          res.BlogModel.dashboard().getAllPosts(total, tableSchema => {
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
      res.content('Dashboard.modules.blog', true);

      // Setting some vars
      res.renderScope.set('multimedia', glob(path.join(__dirname, '../../public/images/uploads')));
      res.renderScope.set('section', res.content('name'));

      if (res.isPost()) {
        // Retreiving all post data
        const post = res.getAllPost();

        // Trying to update the post
        res.BlogModel.dashboard().updatePost(post, (result, errors) => {
          if (errors) {
            // Getting the schema to re-render the form.
            res.BlogModel.dashboard().getSchema(schema => {
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
            // Getting the schema to re-render the form.
            res.BlogModel.dashboard().getSchema(schema => {
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
        res.BlogModel.dashboard().getPost(res.currentId, post => {
          res.BlogModel.dashboard().getSchema(schema => {
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

      res.BlogModel.dashboard().deletePost(id, () => {
        res.redirect(`${res.basePath}/dashboard/blog`);
      });
    });
  }

  function removeAction() {
    res.profileAllowed(connectedUser => {
      const id = res.currentId;

      res.BlogModel.dashboard().removePost(id, () => {
        res.redirect(`${res.basePath}/dashboard/blog`);
      });
    });
  }

  function restoreAction() {
    res.profileAllowed(connectedUser => {
      const id = res.currentId;

      res.BlogModel.dashboard().restorePost(id, () => {
        res.redirect(`${res.basePath}/dashboard/blog`);
      });
    });
  }
};
