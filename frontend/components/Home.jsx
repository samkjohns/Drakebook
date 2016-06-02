var React = require('react'),
    SessionStore = require('../stores/SessionStore'),
    SessionApiUtil = require('../util/SessionApiUtil'),
    Profile = require('./Profile'),
    SessionView = require('./SessionView');

var Home = module.exports = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return SessionStore.isUserLoggedIn() ?
    { component: "Profile" } : { component : "SessionView" };
  },

  onChange: function () {
    this.setState(this.getStateFromStore());
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.onChange);
    SessionApiUtil.fetchCurrentUser(function () {
      console.log("current user fetched");
    });
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  buildProfile: function () {
    return < Profile userId={SessionStore.currentUser().id} />;
  },

  buildSessionView: function() {
    return < SessionView />;
  },

  render: function () {
    component = this.state.component === "Profile" ? this.buildProfile() : this.buildSessionView();
    return component;
  }
});
