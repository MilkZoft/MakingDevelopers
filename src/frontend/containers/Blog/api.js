// Utils
import { apiFetch } from '../../../lib/utils/api';

class BlogApi {
  static getAllPosts(language) {
    const query = {
      language
    };

    return apiFetch('blog/posts', {}, query);
  }

  static getSinglePost(day, month, year, slug, language) {
    const query = {
      slug,
      day,
      month,
      year,
      language
    };

    return apiFetch('blog/post', {}, query);
  }
}

export default BlogApi;
