// import { apiEndpoint, apiOptions } from '../../lib/utils/api';

export default class BlogApi {
  static getAllPosts() {
    const getPromise = async() => {
      try {
        // const response = await fetch(fetchEndpoint('blog/posts'), fetchOptions());
        const response = {};
        return response.json();
      } catch (e) {
        throw e;
      }
    };

    return getPromise();
  }
}
