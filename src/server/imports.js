// Importing APIs
import blogAPI from '../app/blog/blog.api';

// Importing Dashboards
import blogDashboard from '../app/blog/blog.dashboard';
import configurationDashboard from '../app/configuration/configuration.dashboard';
import contentDashboard from '../app/content/content.dashboard';
import mediaDashboard from '../app/media/media.dashboard';
import pagesDashboard from '../app/pages/pages.dashboard';

// Importing Models
import blogModel from '../app/blog/blog.model';
import configurationModel from '../app/configuration/configuration.model';
import contentModel from '../app/content/content.model';
import pagesModel from '../app/pages/pages.model';

export default (app) => {
  // API
  app.use(blogAPI);

  // Dashboard
  app.use(blogDashboard);
  app.use(configurationDashboard);
  app.use(contentDashboard);
  app.use(mediaDashboard);
  app.use(pagesDashboard);

  // Model
  app.use(blogModel);
  app.use(configurationModel);
  app.use(contentModel);
  app.use(pagesModel);
};
