// Dependencies
import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;

    const meta = [
      {
        'name': 'description',
        'content': 'MakingDevelopers'
      }
    ];

    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={meta}
          title="MakingDevelopers"
        />
        {children}
      </div>
    );
  }
}

// Redux state
export default connect(state => ({}))(App);
