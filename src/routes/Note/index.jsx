import React from "react";

import { connect } from "react-redux";
import { getNotesAction } from "../../actions/note";
import List from "../../components/list";

class Note extends React.Component {
  UNSAFE_componentWillMount() {
    const { noteReducer, getNotes } = this.props;
    const { data } = noteReducer;
    if (!data.length) {
      getNotes();
    }
  }

  onClickItem = index => () => {
    const { history } = this.props;
    history.push(`/note/detail/${index}`);
  };

  render() {
    const { noteReducer, history } = this.props;
    const { data, isFetching } = noteReducer;
    return (
      <div className="App">
        <h1>Todo List</h1>
        <div>
          {isFetching && <p>Loading Notes...</p>}

          <button
            onClick={() => {
              history.push("/note/add");
            }}
          >
            Add new
          </button>
          {data.length ? (
            <List data={data} onClickItem={this.onClickItem} />
          ) : (
            <div style={{ color: "red" }}>Empty notes</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noteReducer: state.noteReducer
});

const mapDispatchToProps = dispatch => ({
  getNotes: () => dispatch(getNotesAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);
