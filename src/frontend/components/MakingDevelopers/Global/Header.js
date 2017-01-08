// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Components
import Logo from './Logo';
import MainNav from './MainNav';
import SignIn from './SignIn';
import Search from './Search';

class Header extends React.Component {
  static propTypes = {
    __: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="Header">
        <div className="wrapper">
          <Logo />
          <MainNav />
          <Search />
          <SignIn />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  __: state.content.__
}), null)(Header);
