// NPM Dependencies
import path from 'path';

// Local dependencies
import { glob } from '../../lib/utils/files';

// Model
import * as Blog from './blog.model';

// Global vars
const formView = 'app/blog/dashboard/form';
const resultsView = 'app/blog/dashboard/results';

export default (req, res, next) => {
  // Setting layout
  res.renderScope.default({
    layout: 'dashboard.hbs'
  });

  // Getting the action
  const action = req.params.action;

  // Methods
  res.blogDashboard = {
    add,
    edit,
    results
  };

  return next();

  /**
   * Create
   *
   * @returns {void} void
   */
  function create() {
    res.profileAllowed(userInfo => {
      res.content('Dashboard.modules.blog', true);

      res.renderScope.set('userInfo', userInfo);

      res.renderScope.set('multimedia', glob(path.join(__dirname, '../../public/images/uploads')));
      res.renderScope.set('section', action === 'add' ? res.content('action') : res.content('name'));

      if (userInfo) {
        Blog.getSchema(schema => {
          res.renderScope.set('schema', schema);
          res.render(formView, res.renderScope.get());
        });
      }
    });
  }

  /**
   * Read
   *
   * @returns {void} void
   */
  function read() {
    res.profileAllowed(userInfo => {
      res.render(resultsView, res.renderScope.get());
    });
  }

  /**
   * Update
   *
   * @returns {void} void
   */
  function update() {
    res.profileAllowed(userInfo => {
      res.render(formView, res.renderScope.get());
    });
  }

  /**
   * Delete
   *
   * @returns {void} void
   */
  function delete() {
    res.profileAllowed(userInfo => {
      res.render(formView, res.renderScope.get());
    });
  }
};
