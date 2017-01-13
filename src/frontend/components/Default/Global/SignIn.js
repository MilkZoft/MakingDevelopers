// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Utils
import { content } from '../../../../lib/utils/object';

class SignIn extends React.Component {
  static propTypes = {
    __: PropTypes.object.isRequired
  };

  render() {
    const { __ } = this.props;

    return (
      <div className="SignIn">
        <Link to="/login" className="btn signIn">{content('Header.signIn.label', __)}</Link>
      </div>
    );
  }
}

export default connect(state => ({
  __: state.content.__
}), null)(SignIn);
