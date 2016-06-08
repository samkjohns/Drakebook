var React = require('react'),
    SessionStore = require('../stores/SessionStore'),
    DrakeshipActions = require('../actions/DrakeshipActions');

var DrakeToggle = module.exports = React.createClass({
  getInitialState: function () {
    return {
      currentUser: SessionStore.currentUser(),
      viewingUser: ProfileStore.profile()
    }
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(function () {
      // console.log("Setting currentUser state");
      this.setState({ currentUser: SessionStore.currentUser() });
    }.bind(this));

    this.profileListener = ProfileStore.addListener(function () {
      // console.log("Setting profile state");
      this.setState({ viewingUser: ProfileStore.profile() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
    this.profileListener.remove();
  },

  // this checks if the current user (stored in SessionStore) has the user whose
  //  profile is currently being viewed (stored in ProfileStore) as a "drake"
  hasDrakeship: function () {
    var currentDrakes = this.state.currentUser.drakeships;
    return !!currentDrakes.find(function (drake) {
      return drake.id === this.state.viewingUser.id;
    });
  },

  drakeshipStatus: function () {

    var self = this;
    function listHasViewing(drakeList) {
      if (!drakeList) { return false; }
      return !!drakeList.find(function (drake) {
        return drake.id === self.state.viewingUser.id;
      });
    }

    var currentDrakes = this.state.currentUser.drakeships,
        pendingDrakes = this.state.currentUser.pendingDrakeships;
    // debugger
    // console.log("currentDrakes: " + currentDrakes);
    // console.log("pendingDrakes: " + pendingDrakes);

    if (listHasViewing(currentDrakes)) {
      return "accepted";

    } else if(listHasViewing(pendingDrakes)) {
      return "pending";

    } return "unfriended";
  },

  handleClick: function () {
    var userId = this.state.currentUser.id;
    var drakeId = this.state.viewingUser.id;

    if (this.drakeshipStatus() === "unfriended") {
      DrakeshipActions.requestDrake(userId, drakeId);

    } else {
      DrakeshipActions.undrake(userId, drakeId)
    }
  },

  render: function () {
    var currentUser = SessionStore.currentUser();

    if (!currentUser || currentUser.id === this.props.userId) {
      return <div></div>;

    } else {
      var message;
      var status = this.drakeshipStatus();
      if (status === "accepted") { message = "Remove Drake"; }
      else if (status === "pending") { message = "Cancel Drake Request"; }
      else { message = "Request Drake"; }
      // console.log(status + " :: " + message);

      return(
        <div className="drake-toggle-button" onClick={this.handleClick}>
          <button>{message}</button>
        </div>
      );
    }
  }
});
