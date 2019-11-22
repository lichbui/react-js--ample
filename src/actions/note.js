import { AuthRequest } from "../ultils/fetch";
import { GET_NOTES_API, ADD_NOTE_API } from "../configs/api";
import {
  GET_NOTES_SUCCESS,
  GET_NOTES_FAIL,
  ADD_NOTE_FAIL,
  ADD_NOTE_SUCCESS
} from "../configs/actionType";

export const getNotesAction = () => dispatch => {
  AuthRequest.get(GET_NOTES_API, {})
    .then(response => {
      const { data } = response;
      dispatch({ type: GET_NOTES_SUCCESS, payload: data });
    })
    .catch(error => {
      dispatch({ type: GET_NOTES_FAIL, payload: error });
    });
};

export const addNoteAction = (data = {}) => dispatch => {
  AuthRequest.post(ADD_NOTE_API, data)
    .then(response => {
      const { data } = response;
      dispatch({ type: ADD_NOTE_SUCCESS, payload: data });
    })
    .catch(error => {
      dispatch({ type: ADD_NOTE_FAIL, payload: error });
    });
};
