var React = require('react'),
    SessionStore = require('../stores/SessionStore'),
    SessionApiUtil = require('../util/SessionApiUtil'),
    Feed = require('./Feed'),
    SessionView = require('./SessionView');

var Home = module.exports = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var component;
    // debugger
    if (!SessionStore.currentUserHasBeenFetched()) {
      component = "None";
    } else if (SessionStore.isUserLoggedIn()) {
      component = "Feed";
    } else {
      component = "SessionView";
    }
    return { component: component };
    // return SessionStore.isUserLoggedIn() ?
    // { component: "Feed" } : { component : "SessionView" };
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

  buildFeed: function () {
    return < Feed />;
  },

  buildSessionView: function() {
    return < SessionView />;
  },

  render: function () {
    // debugger
    // component = this.state.component === "Feed" ? this.buildFeed() : this.buildSessionView();

    switch (this.state.component) {
      case "None":
        return <div></div>;
      case "Feed":
        return this.buildFeed();
      default:
        return this.buildSessionView();
    }
  }
});
