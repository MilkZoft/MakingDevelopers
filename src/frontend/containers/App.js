import React, { PropTypes } from 'react';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App;
