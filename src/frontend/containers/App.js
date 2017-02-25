// Dependencies
import React, { PropTypes } from 'react';

// Utils
import { loadComponent } from '../../lib/utils/frontend';

// Components
const Header = loadComponent('Global/Header/Header');
const Content = loadComponent('Global/Content/Content');
const Footer = loadComponent('Global/Footer/Footer');

class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="app">
        <Header />
        <Content content={this.props.children} />
        <Footer />
      </div>
    );
  }
}

export default App;
