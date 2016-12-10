// Dependencies
import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <h1>Homepage2</h1>
        <p>Lorem ipsum...</p>
        <Link to="about" className="btn btn-primary">About</Link>
      </div>
    );
  }
}

export default Home;
