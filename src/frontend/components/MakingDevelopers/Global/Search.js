// Dependencies
import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };

    this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
  }

  handleSearchIconClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    return (
      <div className="Search">
        <input
          className={`search ${this.state.expanded ? 'expanded' : ''}`}
          type="text"
          name="Search"
          placeholder="Search"
        />
        <i
          className={`icon fa fa-search ${this.state.expanded ? 'iconExpanded' : ''}`}
          aria-hidden="true"
          onClick={this.handleSearchIconClick}
        />
      </div>
    );
  }
}

export default Search;
