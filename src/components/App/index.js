// Dependencies
import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

class App extends Component {
  static propTypes = {
    __: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
  };

  render() {
    // Getting props
    const { __, children } = this.props;

    const meta = [{
      'name': 'description',
      'content': __.Site.meta.description
    }];

    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: __.Site.language }}
          meta={meta}
          title={__.Site.title}
        />

        {children}
      </div>
    );
  }
}

// Redux state
export default connect(state => ({
  __: state.language.__
}))(App);
