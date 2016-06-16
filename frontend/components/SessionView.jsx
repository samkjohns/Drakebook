var React = require('react'),
    ErrorsStore = require('../stores/ErrorsStore'),
    ErrorActions = require('../actions/ErrorActions'),
    SessionActions = require('../actions/SessionActions'),
    SessionForm = require('./SessionForm');

var SessionView = module.exports = React.createClass({
  getInitialState: function () {
    return {
      signup: [],
      login: []
    };
  },

  componentDidMount: function () {
    this.errorsListener = ErrorsStore.addListener(this.onErrors);
  },

  componentWillUnmount: function () {
    this.errorsListener.remove();
  },

  onErrors: function () {
    this.setState({
      signup: ErrorsStore.messages("signup"),
      login: ErrorsStore.messages("login")
    });
  },

  render: function () {
    var loginErrorsModal = <div/>;
    var signupErrorsModal = <div/>;

    if (this.state.login.length > 0) {
      loginErrorsModal = (
        <div className="errors-modal-pane login-errors-pane">
          <ul className="login-errors group">
            {this.state.login.map(function (message, key) {
              return <li key={key}>{message}</li>;
            }.bind(this))}
          </ul>
        </div>
      );
    }

    if (this.state.signup.length > 0) {
      signupErrorsModal = (
        <div className="errors-modal-pane signup-errors-pane">
          <ul className="signup-errors group">
            {this.state.signup.map(function (message, key) {
              return <li key={key}>{message}</li>;
            }.bind(this))}
          </ul>
        </div>
      );
    }

    return (
      <div className="session-view">
        <header className="session-header">
          <nav className="session-nav">
            <h1 className="group">drakebook</h1>
            < SessionForm formType="login" />
            {loginErrorsModal}
          </nav>
        </header>

        <div className="session-body">
          <div className="propaganda">
            <div className="group">
              <a href="http://www.github.com/samkjohns">
                <img src={window.drakeImages.iconGithub}></img>
                <label>Github</label>
              </a>
            </div>
            <div className="group">
              <a href="https://www.linkedin.com/in/sam-johns-07249876">
                <img src={window.drakeImages.iconLinkedin}></img>
                <label>Linkedin</label>
              </a>
            </div>
            <div className="search-fix group">
              <a href="#">
                <img src={window.drakeImages.iconPersonal}></img>
                <label>Portfolio</label>
              </a>
            </div>
          </div>
          <div className="signup-wrapper">
            <h2>Sign Up</h2>
            <p>It is free and always will be.</p>
            < SessionForm formType="signup" />
            {signupErrorsModal}
          </div>
        </div>

      </div>
    );
  }
});
