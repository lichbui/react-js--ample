import React, { Component } from "react";
import { connect } from "react-redux";
import { getNotesAction } from "../../actions/note";

class ViewNote extends Component {
  constructor(props) {
    super(props);

    this.id = -1;
    if (props.match.params && props.match.params.id) {
      this.id = props.match.params.id;
    }
  }

  UNSAFE_componentWillMount() {
    const { noteReducer, getNotes } = this.props;
    const { data } = noteReducer;
    if (!data.length) {
      getNotes();
    }
  }

  render() {
    const { noteReducer } = this.props;
    const { data } = noteReducer;
    if (!data[this.id]) {
      return <div>Not found</div>;
    }

    return (
      <div>
        <h1>Note Detail</h1>
        <p>{data[this.id]}</p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getNotes: () => dispatch(getNotesAction())
});

const mapStateToProps = state => ({
  noteReducer: state.noteReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewNote);
