// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Utils
import { isFirstRender } from '../../../lib/utils/frontend';

class Post extends React.Component {
  static propTypes = {
    __: PropTypes.object.isRequired,
    loadSinglePost: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    list: PropTypes.array.isRequired
  };

  componentWillMount() {
    const {
      language = 'en',
      year = '',
      month = '',
      day = '',
      slug = ''
    } = this.props.params;

    this.props.loadSinglePost(day, month, year, slug, language);
  }

  renderPost(list) {
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
      <div className="post">
        {this.renderPost(list)}
      </div>
    );
  }
}

export default connect(state => ({
  __: state.content.__,
  list: state.blog.list
}), null)(Post);
