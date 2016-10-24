// Dependencies
import path from 'path';

// Utils
import { glob } from '../../lib/utils/files';
import { forEach } from '../../lib/utils/object';

// Application name
const app = 'blog';

// CRUD Views
const createView = `app/${app}/dashboard/create`;
const readView = `app/${app}/dashboard/read`;
const updateView = `app/${app}/dashboard/update`;

export default (req, res, next) => {
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
        res.BlogModel.savePost(post, (result, errors) => {
          // Do we have some errors?
          if (errors === 'exists') {
            res.BlogModel.getSchema(schema => {
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
            res.BlogModel.getSchema(schema => {
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
            res.BlogModel.getSchema(schema => {
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
        res.BlogModel.getSchema(schema => {
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

      res.BlogModel.getAllPosts(tableSchema => {
        res.renderScope.set('tableSchema', tableSchema);

        res.render(readView, res.renderScope.get());
      });
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
        res.BlogModel.updatePost(post, (result, errors) => {
          if (errors) {
            // Getting the schema to re-render the form.
            res.BlogModel.getSchema(schema => {
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
            res.BlogModel.getSchema(schema => {
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
        res.BlogModel.getPost(res.currentId, post => {
          res.BlogModel.getSchema(schema => {
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

      res.BlogModel.deletePost(id, () => {
        res.redirect(`${res.basePath}/dashboard/blog`);
      });
    });
  }

  function removeAction() {
    res.profileAllowed(connectedUser => {
      const id = res.currentId;

      res.BlogModel.removePost(id, () => {
        res.redirect(`${res.basePath}/dashboard/blog`);
      });
    });
  }

  function restoreAction() {
    res.profileAllowed(connectedUser => {
      const id = res.currentId;

      res.BlogModel.restorePost(id, () => {
        res.redirect(`${res.basePath}/dashboard/blog`);
      });
    });
  }
};
