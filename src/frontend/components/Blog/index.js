// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import * as actions from '../../actions/blogActions';

class Blog extends React.Component {
  static propTypes = {
    posts: PropTypes.array
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    const { loadAllPosts } = this.props;

    loadAllPosts();
  }

  renderPosts(posts) {
    const items = posts.map((post, index) => {
      return (
        <div className="post" key={index}>
          <h2>{post.title}</h2>
        </div>
      );
    });

    return items;
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="Blog">
        <h1>Blog</h1>

        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default connect(state => ({
  posts: state.blog.posts
}), actions)(Blog);
