// Dependencies
import React from 'react';

// Utils
import { loadComponent } from '../../../../../lib/utils/frontend';

// Components
const Link = loadComponent('Ui/Link');

class Logo extends React.Component {
  render() {
    return (
      <div className="Logo">
        <Link to="/">
          <span className="text">
            <span className="making">Making</span>
            <span className="developers">Developers</span>
          </span>
        </Link>
      </div>
    );
  }
}

export default Logo;
