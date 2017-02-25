// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Utils
import {
  loadComponent,
  setClass
} from '../../../../../lib/utils/frontend';

// Components
const Icon = loadComponent('Ui/Icon');
const Link = loadComponent('Ui/Link');

class MainNav extends React.Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  render() {
    const { isMobile } = this.props;

    const mobileClass = setClass(isMobile, ' mobile');
    let hiddenClass = '';
    let hiddenToggleClass = ' hidden';

    if (isMobile) {
      hiddenClass = setClass(this.state.showMenu, '', ' hidden');
      hiddenToggleClass = '';
    }

    return (
      <nav className="MainNav">
        <div className="wrapper">
          <div className={`toggle${hiddenToggleClass}`}>
            <Link to="#" onClick={this.handleToggleClick}>
              <Icon type="bars" />
            </Link>
          </div>

          <ul className={`menu${mobileClass}${hiddenClass}`}>
            <li><Link to="#">Temas</Link></li>
            <li><Link to="#">Cursos</Link></li>
            <li><Link to="#">Login</Link></li>
            <li><Link to="#">Registro</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(state => ({
  isMobile: state.device.isMobile
}), null)(MainNav);
