// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import * as actions from '../../../containers/Blog/actions';

// Utils
import { isFirstRender, loadComponent } from '../../../../lib/utils/frontend';

// Components
const Post = loadComponent('Blog/Post');

class Posts extends React.Component {
  static propTypes = {
    __: PropTypes.object.isRequired,
    loadPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { language = 'en', year, month, day, slug } = this.props.params;

    if (!year && !month && !day && !slug) {
      this.props.loadPosts(language);
    }
  }

  isSinglePost(params) {
    const { year, month, day, slug } = params;

    return year && month && day && slug;
  }

  renderPosts(posts) {
    return posts.map((post, key) => {
      return <Post post={post} key={key} />;
    });
  }

  render() {
    const { posts, params } = this.props;

    if (this.isSinglePost(params)) {
      return (
        <div className="posts">
          <Post {...params} />
        </div>
      );
    }

    if (isFirstRender(posts)) {
      return null;
    }

    return (
      <div className="posts">
        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default connect(state => ({
  __: state.content.__,
  posts: state.blog.posts
}), actions)(Posts);
