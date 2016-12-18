// Dependencies
import React from 'react';
import { Link } from 'react-router';

class Page404 extends React.Component {
  render() {
    return (
      <div className="Page404">
        <h1>404 Error</h1>
        <p>Go back</p>
        <Link to="/" className="btn btn-primary">Home</Link>
      </div>
    );
  }
}

export default Page404;
