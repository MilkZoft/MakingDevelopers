import path from 'path';
import utils from '../../lib/utils';
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

      res.renderScope.set('multimedia', utils.Files.glob(path.join(__dirname, '../../public/images/uploads')));
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

          post.createdAt = utils.Date.now();
          post.day = utils.Date.day();
          post.month = utils.Date.month();
          post.year = utils.Date.year();

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
              if (utils.Type.isDefined(state[0][0].error)) {
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
