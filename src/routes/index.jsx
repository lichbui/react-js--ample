import React from "react";
import { Route, Switch } from "react-router";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Login from "./Login";
import Note from "./Note";
import ViewNote from "./Note/viewNode";
import AddNote from "./Note/addNote";

const routes = (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/note" component={Note} />
      <PrivateRoute exact path="/note/detail/:id" component={ViewNote} />
      <PrivateRoute exact path="/note/add" component={AddNote} />
      <Route component={Home} />
    </Switch>
  </>
);

export default routes;
