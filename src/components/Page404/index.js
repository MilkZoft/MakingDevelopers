// Dependencies
import React from 'react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

class Page404 extends Component {
  render() {
    const title = 'MakingDevelopers';

    return (
      <div>
        <Helmet title={title} />

        <h1>404 Page Not Found</h1>
      </div>
    );
  }
}

// Redux state
export default connect(state => ({}), null)(Page404);
