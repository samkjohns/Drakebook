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
    if (this.props.type === "login")
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
    return(
      <button onClick={this.submit}>
        {this.props.formType}
      </button>
    );
  },

  render: function () {
    var form;
    if (this.props.formType === "login") {
      form = (
        <form>
          <input id="username" type="text" onChange={this.handleChange} />
          <input id="password" type="password" onChange={this.handleChange} />
          {this.buttonElement()}
        </form>
      );
    } else {
      form = (
        <form>
          <input id="username" type="text" onChange={this.handleChange} />
          <input id="password" type="password" onChange={this.handleChange} />
          <input id="confirm" type="password" onChange={this.handleChange} />
          {this.buttonElement()}
        </form>
      );
    }

    return(
      <div className={this.props.formType + "-pane"}>
        {form}
      </div>
    );
  }
});
