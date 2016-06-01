var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    HashHistory = ReactRouter.HashHistory,
    SessionView = require('./components/SessionView'),
    SessionStore = require('./stores/SessionStore');

var App = React.createClass({
  getInitialState: function () {
    return {message: "logged out"};
  },

  componentDidMount: function () {
    SessionStore.addListener(function () {
      var message = SessionStore.isUserLoggedIn() ?
      "logged in" : "logged out";
      this.setState({message: message});
    }.bind(this));
  },

  render: function () {
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
});

var Router = (
  <Router history={HashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SessionView}/>
      <Route path="/signin" component={SessionView} />
    </Route>
  </Router>
);
// <Route path="/users/:userId" component={Profile} onEnter={_ensureLoggedIn} />


function _ensureLoggedIn(nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn() {
    if (!SessionStore.isUserLoggedIn()) { replace('/login'); }
    asyncDoneCallback();
  }
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    ReactDOM.render(
      Router,
      document.getElementById('drakebook')
    );
  }
);
