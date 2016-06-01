var React = require('react');
    SessionActions = require('../actions/SessionActions');

var SessionForm = module.exports = React.createClass({
  getInitialState: function () {
    return {
      username: "",
      password: "",
      confirm: ""
    };
  },

  componentDidMount: function () {

  },

  _info: function () {
    return {
      username: this.state.username,
      password: this.state.password
    };
  },

  submit: function () {
    if (this.props.formType === "login")
    { SessionActions.login(this._info()); }
    else if (this.state.password === this.state.confirm) {
      SessionActions.signup(this._info());
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
          <table>
            <tbody>
              <tr>
                <td><label htmlFor="username">Username</label></td>
                <td><label htmlFor="password">Password</label></td>
                <td><label htmlFor="confirm">Confirm Password</label></td>
              </tr>
              <tr>
                <td><input id="username" type="text" onChange={this.handleChange} /></td>
                <td><input id="password" type="password" onChange={this.handleChange} /></td>
                <td><input id="confirm" type="password" onChange={this.handleChange} /></td>
                <td>{this.buttonElement()}</td>
              </tr>
            </tbody>
          </table>
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
