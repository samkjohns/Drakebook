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

  handleGuestLogin: function (evnt) {
    evnt.preventDefault();
    SessionActions.login({
      username: "Aubrey Drake Graham",
      password: "password"
    });
  },

  buttonElement: function () {
    var _helper = function() {
      return this.props.formType === "login" ? "Log In" : "Sign Up";
    }.bind(this);

    return(
      <button onClick={this.submit} className={this.props.formType+"-button"}>
        {_helper()}
      </button>
    );
  },

  render: function () {
    var form;

    if (this.props.formType === "login") {
      form = (
        <form>
          <div className="login-labels group">
            <label htmlFor="username">Username</label>
            <label htmlFor="password">Password</label>
          </div>

          <div className="login-input-buttons group">
            <input id="username" type="text" onChange={this.handleChange} />
            <input id="password" type="password" onChange={this.handleChange} />
            {this.buttonElement()}
            < button onClick={this.handleGuestLogin} className="guest-login">
              Guest Login
            </ button >
          </div>
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
