// Dependencies
import React, { PropTypes } from 'react';

class Icon extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired
  }

  render() {
    const { type, className } = this.props;
    const iconProps = {...this.props};

    delete iconProps.type;
    delete iconProps.className;

    return (
      <i className={`fa fa-${type} ${className}`} {...iconProps} />
    );
  }
}

export default Icon;
