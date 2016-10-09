// Dependencies
import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

class Page404 extends Component {
  static propTypes = {
    __: PropTypes.object.isRequired
  };

  render() {
    // Getting props
    const { __ } = this.props;

    return (
      <div>
        <Helmet title={__.Site.title} />

        <h1>{__.Site.errors.error404}</h1>
      </div>
    );
  }
}

// Redux state
export default connect(state => ({
  __: state.language.__
}), null)(Page404);
