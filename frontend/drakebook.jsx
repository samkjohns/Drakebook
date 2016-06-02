var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    HashHistory = ReactRouter.HashHistory,
    SessionApiUtil = require('./util/SessionApiUtil.js'),
    SessionStore = require('./stores/SessionStore'),
    SessionView = require('./components/SessionView'),
    Profile = require("./components/Profile"),
    Home = require('./components/Home');

var App = React.createClass({
  getInitialState: function () {
    return {message: "logged out"};
  },

  // componentDidMount: function () {
  //   SessionStore.addListener(function () {
  //     var message = SessionStore.isUserLoggedIn() ?
  //     "logged in" : "logged out";
  //     this.setState({message: message});
  //   }.bind(this));
  // },

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
      <IndexRoute component={Home}/>
      <Route path="/signin" component={SessionView} onEnter={_ensureLoggedOut} />
      <Route path="/users/:userId" component={Profile} onEnter={_ensureLoggedIn} />
    </Route>
  </Router>
);

function _ensureLoggedIn(nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn() {
    if (!SessionStore.isUserLoggedIn()) {
      replace('/signin');
    }
    asyncDoneCallback();
  }
}

function _ensureLoggedOut(nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedOut();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedOut);
  }

  function redirectIfNotLoggedOut() {
    if (SessionStore.isUserLoggedIn()) {
      replace('/users/' + SessionStore.currentUser().id);
    }
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
