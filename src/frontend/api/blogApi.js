import { apiFetch } from '../../lib/utils/api';

export default class BlogApi {
  static getAllPosts() {
    return apiFetch('blog/posts');
  }
}
