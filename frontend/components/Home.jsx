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
    window.Home = this;
    var component;

    if (!SessionStore.currentUserHasBeenFetched()) {
      component = "None";
    } else if (SessionStore.isUserLoggedIn()) {
      component = "Feed";
    } else {
      component = "SessionView";
    }

    return { component: component };
  },

  onChange: function () {
    this.setState(this.getStateFromStore());
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.onChange);
    SessionApiUtil.fetchCurrentUser();
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
    switch (this.state.component) {
      case "None":
        return <div/>;

      case "Feed":
        return this.buildFeed();

      default:
        return this.buildSessionView();
    }
  }
});
