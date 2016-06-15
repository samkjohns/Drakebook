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
            <h2>Connect with other drakes and the world around you on Drakebook.</h2>
            <div className="group">
              <img src={window.drakeImages.iconPhotos}></img>
              <strong>Share whats new</strong>
              <p>from friends in News Feed.</p>
            </div>
            <div className="group">
              <img src={window.drakeImages.iconTimeline}></img>
              <strong>See photos and updates</strong>
              <p>in your life on Timeline.</p>
            </div>
            <div className="search-fix group">
              <img src={window.drakeImages.iconSearch}></img>
              <strong className="search-fix">Find more</strong>
              <p>of what you are looking for with Drakebook Search.</p>
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
