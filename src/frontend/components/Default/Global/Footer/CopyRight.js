// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Utils
import { loadComponent } from '../../../../../lib/utils/frontend';

// Components
const Link = loadComponent('Ui/Link');

class CopyRight extends React.Component {
  static propTypes = {
    __: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="CopyRight">
        Copyright © <Link to="#">MakingDevelopers</Link>. 2017 • All rights reserved.
      </div>
    );
  }
}

export default connect(state => ({
  __: state.content.__
}), null)(CopyRight);
