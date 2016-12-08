// Constants
export const GET_POSTS = 'GET_POSTS';

// Actions
export function getPosts() {
  const serviceUrl = 'http://local.makingdevelopers.com/api/blog/posts';

  return ({ fetch }) => {
    const getPromise = async() => {
      try {
        const response = await fetch(serviceUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        return response.json();
      } catch (e) {
        throw e;
      }
    };

    return {
      type: GET_POSTS,
      payload: getPromise()
    };
  };
}
