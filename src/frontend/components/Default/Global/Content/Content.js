// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Content extends React.Component {
  static propTypes = {
    __: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired
  };

  render() {
    const { content } = this.props;

    return (
      <div className="Content">
        <div className="wrapper">
          {content}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  __: state.content.__
}), null)(Content);
