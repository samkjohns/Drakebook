var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    HashHistory = ReactRouter.hashHistory,
    Modal = require('react-modal'),
    SessionApiUtil = require('./util/SessionApiUtil.js'),
    SessionStore = require('./stores/SessionStore'),
    SessionView = require('./components/SessionView'),
    Profile = require("./components/Profile"),
    ProfileDetail = require('./components/ProfileDetail'),
    Home = require('./components/Home'),
    PostsIndex = require('./components/PostsIndex'),
    IntroBlurb = require('./components/IntroBlurb'),
    Timeline = require('./components/Timeline'),
    DrakesIndex = require('./components/DrakesIndex');

var App = React.createClass({
  getInitialState: function () {
    return {message: "logged out"};
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  redirectToSignup: function () {
    if (SessionStore.currentUserHasBeenFetched() && !SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },

  componentDidMount: function () {
    SessionStore.addListener(this.redirectToSignup);
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

      <IndexRoute component={Home}/>
      <Route path="/signin" component={SessionView} onEnter={_ensureLoggedOut} />

      <Route path="/users/:userId" component={Profile} onEnter={_ensureLoggedIn} >
        < IndexRoute component={Timeline} />
        < Route path="/users/:userId/about" component={IntroBlurb} />
        < Route path="/users/:userId/drakes" component={DrakesIndex} />
      </ Route >

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
