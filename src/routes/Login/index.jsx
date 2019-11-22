import React, { Component } from "react";
import { connect } from "react-redux";
import { loginAction } from "../../actions/login";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "../../configs/actionType";
import { isLogin } from "../../ultils/common";

class Login extends Component {
  constructor(props) {
    super(props);
    this.loading = false;
    this.state = {
      showError: false,
      error: ""
    };
  }

  componentWillMount() {
    const { history } = this.props;
    if (isLogin()) {
      history.push("/note");
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    const { loginReducer } = props;
    const { type, error } = loginReducer;
    const { history } = this.props;
    switch (type) {
      case LOGIN_SUCCESS: {
        // redirect
        history.push("/note");
        break;
      }

      case LOGIN_FAIL: {
        // show error
        this.setState({
          showError: true,
          error: error
        });
        this.loading = false;
        break;
      }

      default:
    }
  }

  handleClickLogin = () => {
    if (this.loading) {
      return;
    }

    this.loading = true;
    const data = {
      email: "test",
      name: "test"
    };

    const { login } = this.props;

    login(data);
  };

  render() {
    const { showError, error } = this.state;
    return (
      <div>
        {showError && <p>{error}</p>}
        <button onClick={this.handleClickLogin}>Login</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginReducer: state.loginReducer
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(loginAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
