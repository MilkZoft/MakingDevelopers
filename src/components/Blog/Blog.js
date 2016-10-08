// Dependencies
import React from 'react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

// Libs
import baseComponent from '../../lib/baseComponent';

class Blog extends Component {
  render() {
    const title = 'MakingDevelopers';

    return (
      <div>
        <Helmet title={title} />

        <h1>I'm React Blog!</h1>
      </div>
    );
  }
}

Blog = baseComponent(Blog);

export default connect(state => ({
}), null)(Blog);
