// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import * as actions from './actions';

// Components
import Post from '../../components/Blog/Post';
import Posts from '../../components/Blog/Posts';

// Utils
import { isDefined } from '../../../lib/utils/is';

class Blog extends React.Component {
  static propTypes = {
    __: PropTypes.object.isRequired,
    day: PropTypes.number,
    loadAllPosts: PropTypes.func,
    loadSinglePost: PropTypes.func,
    month: PropTypes.number,
    slug: PropTypes.string,
    year: PropTypes.number
  };

  render() {
    const { __, router, loadAllPosts, loadSinglePost } = this.props;

    let component = <Posts loadAllPosts={loadAllPosts} params={router.params} />;

    if (isDefined(router.params.slug)) {
      component = <Post loadSinglePost={loadSinglePost} params={router.params} />;
    }

    return (
      <div className="Blog">
        <h1>Blog {__.Site.language}</h1>

        {component}
      </div>
    );
  }
}

export default connect(state => ({
  __: state.content.__
}), actions)(Blog);
