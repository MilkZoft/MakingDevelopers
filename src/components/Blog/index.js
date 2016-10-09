// Dependencies
import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

class Blog extends Component {
  static propTypes = {
    __: PropTypes.object.isRequired
  };

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

// Redux state
export default connect(state => ({
  __: state.language.__
}), null)(Blog);
