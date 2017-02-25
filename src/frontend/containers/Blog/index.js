// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Utils
import { loadComponent } from '../../../lib/utils/frontend';

// Components
const Posts = loadComponent('Blog/Posts');

class Blog extends React.Component {
  static propTypes = {
    isMobile: PropTypes.bool
  };

  render() {
    const {
      isMobile,
      router
    } = this.props;

    return (
      <div className={`Blog ${isMobile ? 'mobile' : ''}`}>
        <Posts params={router.params} />
      </div>
    );
  }
}

export default connect(state => ({
  isMobile: state.device.isMobile
}), null)(Blog);
