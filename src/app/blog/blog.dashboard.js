import path from 'path';
import { glob } from '../../lib/utils/files';
import * as Blog from './blog.model';

const formView = 'app/blog/dashboard/form';
const resultsView = 'app/blog/dashboard/results';

export default (req, res, next) => {
  // Setting layout
  res.renderScope.default({
    layout: 'dashboard.hbs'
  });

  // Getting the action
  const action = req.params.action;

  res.blogDashboard = {
    add,
    edit,
    results
  };

  return next();

  function add() {
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

  function edit() {
    res.render(formView, res.renderScope.get());
  }

  function results() {
    res.profileAllowed(userInfo => {
      res.render(resultsView, res.renderScope.get());
    });
  }
};
