// Constants
import { API } from '../../constants/api';

// Utils
import { apiFetch } from '../../../lib/utils/api';

class BlogApi {
  static getAllPosts(language) {
    const query = {
      language
    };

    return apiFetch(API.BLOG.POSTS, {}, query);
  }

  static getSinglePost(day, month, year, slug, language) {
    const query = {
      slug,
      day,
      month,
      year,
      language
    };

    return apiFetch(API.BLOG.POST, {}, query);
  }
}

export default BlogApi;
