import {
  GET_NOTES_SUCCESS,
  GET_NOTES_FAIL,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAIL
} from "../configs/actionType";

const defaultState = {
  data: [],
  error: "Login error",
  isFetching: true
};

export default (state = defaultState, actions) => {
  const data = actions.payload;
  state.type = actions.type;
  switch (actions.type) {
    case GET_NOTES_SUCCESS: {
      return {
        ...state,
        data,
        isFetching: false
      };
    }

    case GET_NOTES_FAIL: {
      return {
        ...state,
        error: data.message,
        isFetching: false
      };
    }

    case ADD_NOTE_SUCCESS: {
      return {
        ...state,
        data,
        isFetching: false
      };
    }

    case ADD_NOTE_FAIL: {
      return {
        ...state,
        error: data.message,
        isFetching: false
      };
    }

    default:
      return state;
  }
};
