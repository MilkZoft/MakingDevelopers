// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Utils
import { isFirstRender } from '../../../lib/utils/frontend';

class Posts extends React.Component {
  static propTypes = {
    __: PropTypes.object.isRequired,
    loadAllPosts: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired
  };

  componentWillMount() {
    const { language = 'en' } = this.props.params;

    this.props.loadAllPosts(language);
  }

  renderPosts(list) {
    return list.map((post, index) => {
      const language = post.language === 'en' ? '' : post.language;

      return (
        <div className="post" key={index}>
          <h2>
            <Link to={`${language}/blog/${post.year}/${post.month}/${post.day}/${post.slug}`}>
              {post.title}
            </Link>
          </h2>

          <p dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      );
    });
  }

  render() {
    const { list } = this.props;

    if (isFirstRender(list)) {
      return null;
    }

    return (
      <div className="posts">
        {this.renderPosts(list)}
      </div>
    );
  }
}

export default connect(state => ({
  __: state.content.__,
  list: state.blog.list
}), null)(Posts);
