import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default Home;
