// Dependencies
import React, { PropTypes } from 'react';

// Utils
import { loadComponent } from '../../lib/utils/frontend';

// Components
const Header = loadComponent('Global/Header');

class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="App">
        <Header />

        {this.props.children}
      </div>
    );
  }
}

export default App;
