import path from 'path';
import { now, day, month, year } from '../../lib/utils/date';
import { glob } from '../../lib/utils/files';
import { isDefined } from '../../lib/utils/is';
import blogModel from './blog.model';

const formView = 'blog/dashboard/form';
const resultsView = 'blog/dashboard/results';
let emptyElements;
let post = {};

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
        if (res.isPost()) {
          post = res.post([
            'title',
            'slug',
            'excerpt:html',
            'content:html',
            'codes',
            'tags',
            'author',
            'language',
            'activeComments',
            'state'
          ]);

          emptyElements = res.validate([
            'title',
            'slug',
            'excerpt',
            'content',
            'tags',
            'author'
          ], 'empty');

          post.createdAt = now();
          post.day = day();
          post.month = month();
          post.year = year();

          res.renderScope.set('message', res.content('messages.add.success'));

          if (emptyElements) {
            res.renderScope.set('message', res.getContentFromTemplate(
              {'input': emptyElements},
              res.content('messages.add.empty')
            ));

            res.renderScope.set('flashData', post);

            res.render(formView, res.renderScope.get());
          } else {
            blogModel.save(post, state => {
              if (isDefined(state[0][0].error)) {
                if (state[0][0].error === 'exists:post') {
                  res.renderScope.set('message', res.content('messages.add.exists'));
                  res.renderScope.set('flashData', post);
                } else {
                  res.renderScope.set('message', res.content('messages.add.fail'));
                }
              }

              res.render(formView, res.renderScope.get());
            });
          }
        } else {
          res.render(formView, res.renderScope.get());
        }
      } else {
        res.redirect('/');
      }
    });
  }

  function edit() {
    res.render(formView, res.renderScope.get());
  }

  function results() {
    res.render(resultsView, res.renderScope.get());
  }
};
