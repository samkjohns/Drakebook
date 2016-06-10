var React = require('react');
    SessionActions = require('../actions/SessionActions'),
    ErrorActions = require('../actions/ErrorActions'),
    SessionStore = require('../stores/SessionStore');

var SessionForm = module.exports = React.createClass({
  getInitialState: function () {
    return {
      username: "",
      password: "",
      confirm: ""
    };
  },

  // componentDidMount: function () {
  //   SessionStore.addListener(this.redirectOnSubmit)
  // },

  _info: function () {
    return {
      username: this.state.username,
      password: this.state.password
    };
  },

  submit: function (event) {
    event.preventDefault();
    if (this.props.formType === "login")
    { SessionActions.login(this._info()); }
    else {
      if (this.state.password === this.state.confirm) {
        SessionActions.signup(this._info());
      } else {
        ErrorActions.errorMessage("signup", "password and confirm don't match");
      }
    }
  },

  handleChange: function (event) {
    newState = {};
    newState[event.currentTarget.id] = event.currentTarget.value;
    this.setState(newState);
  },

  buttonElement: function () {
    var _helper = function() {
      return this.props.formType === "login" ? "Log In" : "Sign Up";
    }.bind(this);

    return(
      <button onClick={this.submit}>
        {_helper()}
      </button>
    );
  },

  render: function () {
    var form;
    if (this.props.formType === "login") {
      form = (
        <form>
          <table>
            <tbody>
              <tr>
                <td><label htmlFor="username">Username</label></td>
                <td><label htmlFor="password">Password</label></td>
              </tr>
              <tr>
                <td><input id="username" type="text" onChange={this.handleChange} /></td>
                <td><input id="password" type="password" onChange={this.handleChange} /></td>
                <td>{this.buttonElement()}</td>
              </tr>
            </tbody>
          </table>
        </form>
      );
    } else {
      form = (
        <form>
          <input id="username" type="text" onChange={this.handleChange} placeholder="Username" />
          <input id="password" type="password" onChange={this.handleChange} placeholder="Password" />
          <input id="confirm" type="password" onChange={this.handleChange} placeholder="Confirm Password" />
          {this.buttonElement()}
        </form>
      );
    }

    return(
      <div className={this.props.formType + "-pane group"}>
        {form}
      </div>
    );
  }
});
