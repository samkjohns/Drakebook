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

  // drakeshipStatus: function () {
  //
  //   var self = this;
  //   // check if a list of drakes has the user being viewed
  //   function listHasViewing(drakeList) {
  //     if (!drakeList) { return false; }
  //     return !!drakeList.find(function (drake) {
  //       return drake.id === self.state.viewingUser.id;
  //     });
  //   }
  //
  //   var currentDrakes = this.state.currentUser.drakeships,
  //       pendingDrakes = this.state.currentUser.pendingDrakeships;
  //
  //   if (listHasViewing(currentDrakes)) {
  //     return "accepted";
  //
  //   } else if(listHasViewing(pendingDrakes)) {
  //     return "pending";
  //
  //   } return "undraked";
  // },

  drakeshipStatus: function () {
    var isAcceptedDrake = false;
    var currentUser = this.state.currentUser;
    var userBeingViewed = this.state.viewingUser;

    for (var i = 0; i < currentUser.drakeships.length; i++) {
      if (currentUser.drakeships[i].id === userBeingViewed.id) {
        return "accepted";
      }
    }

    for (var j = 0; j < currentUser.pendingDrakeships.length; j++) {
      var drakeship = currentUser.pendingDrakeships[j];
      if (drakeship.recipient.id === userBeingViewed.id) {
        return "pending sent";
      } else if (drakeship.requester.id === userBeingViewed.id) {
        return "pending received";
      }
    }

    return "undraked";
  },

  handleClick: function () {
    var userId = this.state.currentUser.id;
    var drakeId = this.state.viewingUser.id;

    if (this.drakeshipStatus() === "undraked") {
      DrakeshipActions.requestDrake(userId, drakeId);

    } else if (this.drakeshipStatus() === "pending received") {
      // confirm
      DrakeshipActions.confirmDrake(
        this.state.currentUser,
        this.state.viewingUser
      );

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
      else if (status === "pending sent") { message = "Cancel Drake Request"; }
      else if (status === "pending received") { message = "Confirm Drake Request"; }
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
