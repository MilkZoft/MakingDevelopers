// Importing APIs
import blogAPI from '../app/blog/blog.api';

// Importing Models
import blogModel from '../app/blog/blog.model';

// Importing Dashboards
import blogDashboard from '../app/blog/blog.dashboard';
import mediaDashboard from '../app/media/media.dashboard';

export default (app) => {
  // API
  app.use(blogAPI);

  // Dashboard
  app.use(blogDashboard);
  app.use(mediaDashboard);

  // Model
  app.use(blogModel);
};
