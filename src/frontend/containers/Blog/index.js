// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Utils
import { loadComponent } from '../../../lib/utils/frontend';

// Components
const Posts = loadComponent('Blog/Posts');

class Blog extends React.Component {
  static propTypes = {
    __: PropTypes.object.isRequired,
    isMobile: PropTypes.bool
  };

  render() {
    const {
      __,
      isMobile,
      router
    } = this.props;

    return (
      <div className={`Blog ${isMobile ? 'mobile' : ''}`}>
        <h1>Blog - {__.Site.language}</h1>

        <Posts params={router.params} />
      </div>
    );
  }
}

export default connect(state => ({
  __: state.content.__,
  isMobile: state.device.isMobile
}), null)(Blog);
