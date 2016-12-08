// Dependencies
import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

// BaseComponent
import baseComponent from '../../lib/baseComponent';

// Actions
import * as actions from './actions';

class Blog extends Component {
  static propTypes = {
    __: PropTypes.object.isRequired,
    getPosts: PropTypes.func
  };

  componentWillMount() {
    const { getPosts } = this.props;

    getPosts();
  }

  render() {
    // Getting props
    const { __ } = this.props;

    return (
      <div>
        <Helmet title={__.Site.title} />

        <h1>I'm React Blog! - {__.Site.language}</h1>
      </div>
    );
  }
}

Blog = baseComponent(Blog);

// Redux state
export default connect(state => ({
  __: state.language.__,
  information: state.blog.information,
  posts: state.blog.posts
}), actions)(Blog);
