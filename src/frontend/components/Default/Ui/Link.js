// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link as ReactRouterLink } from 'react-router';

class Link extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    currentLanguage: PropTypes.string.isRequired
  }

  render() {
    const { to, currentLanguage } = this.props;
    const linkProps = {...this.props};
    let newToURL = `/${currentLanguage}/${to}`;

    delete linkProps.dispatch;
    delete linkProps.currentLanguage;

    if (to === '/' || to.indexOf('http') !== -1) {
      newToURL = to;
    }

    return (
      <ReactRouterLink {...linkProps} to={newToURL} />
    );
  }
}

export default connect(state => ({
  currentLanguage: state.language.currentLanguage
}), null)(Link);
