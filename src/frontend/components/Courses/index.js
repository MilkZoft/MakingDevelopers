// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as courseActions from '../../actions/courseActions';

class Courses extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      course: {
        title: ''
      }
    };

    this.handleOnTitleChange = this.handleOnTitleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleOnTitleChange(e) {
    const course = this.state.course;

    course.title = e.target.value;

    this.setState({
      course
    });
  }

  handleSave() {
    this.props.actions.createCourse(this.state.course);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render() {
    return (
      <div className="Courses">
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <p>Lorem ipsum...</p>

        <input type="text" onChange={this.handleOnTitleChange} value={this.state.course.title} />
        <input type="submit" onClick={this.handleSave} value="Save" />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
