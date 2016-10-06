// NPM Dependencies
import path from 'path';

// Local dependencies
import { glob } from '../../lib/utils/files';

// Model
import * as Blog from './blog.model';

// Global vars
const createView = 'app/blog/dashboard/create';
const readView = 'app/blog/dashboard/read';
const updateView = 'app/blog/dashboard/update';
const deleteView = 'app/blog/dashboard/delete';

export default (req, res, next) => {
  // Setting layout
  res.renderScope.default({
    layout: 'dashboard.hbs'
  });

  // Getting the action
  const action = req.params.action;

  // Methods
  res.blogDashboard = {
    createAction,
    readAction,
    updateAction,
    deleteAction
  };

  return next();

  /**
   * Create
   *
   * @returns {void} void
   */
  function createAction() {
    res.profileAllowed(userInfo => {
      res.content('Dashboard.modules.blog', true);

      res.renderScope.set('userInfo', userInfo);

      res.renderScope.set('multimedia', glob(path.join(__dirname, '../../public/images/uploads')));
      res.renderScope.set('section', action === 'add' ? res.content('action') : res.content('name'));

      if (userInfo) {
        Blog.getSchema(schema => {
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
    res.profileAllowed(userInfo => {
      res.render(readView, res.renderScope.get());
    });
  }

  /**
   * Update
   *
   * @returns {void} void
   */
  function updateAction() {
    res.profileAllowed(userInfo => {
      res.render(updateView, res.renderScope.get());
    });
  }

  /**
   * Delete
   *
   * @returns {void} void
   */
  function deleteAction() {
    res.profileAllowed(userInfo => {
      res.render(deleteView, res.renderScope.get());
    });
  }
};
