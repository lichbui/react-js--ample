import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import loginReducer from "./loginReducer";
import noteReducer from "./noteReducer";

const rootReducer = history =>
  combineReducers({
    loginReducer,
    noteReducer,
    router: connectRouter(history)
  });

export default rootReducer;
