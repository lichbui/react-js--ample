import React from "react";

import { connect } from "react-redux";
import { addNoteAction } from "../../actions/note";
import AddFrom from "../../components/addForm";
import { ADD_NOTE_FAIL, ADD_NOTE_SUCCESS } from "../../configs/actionType";

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.loading = false;
    this.state = {
      showError: false,
      error: ""
    };
  }

  componentWillReceiveProps(props) {
    const { noteReducer } = props;
    const { type, error } = noteReducer;
    const { history } = this.props;
    switch (type) {
      case ADD_NOTE_SUCCESS: {
        // redirect
        history.push("/note");
        break;
      }

      case ADD_NOTE_FAIL: {
        // show error
        this.setState({
          showError: true,
          error: error
        });

        console.log("Add failed");
        this.loading = false;
        break;
      }

      default:
    }
  }

  saveData = value => {
    let { addNote } = this.props;

    if (this.loading) {
      return;
    }

    this.loading = true;

    if (!value) {
      this.setState({
        showError: false,
        error: "Note is empty"
      });

      return;
    }

    addNote({ content: value });
  };

  render() {
    const { showError, error } = this.state;
    return (
      <div className="App">
        <h1>Add Note</h1>
        <div>
          {showError && <p>{error}</p>}
          <AddFrom saveData={this.saveData} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noteReducer: state.noteReducer
});

const mapDispatchToProps = dispatch => ({
  addNote: data => dispatch(addNoteAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNote);
