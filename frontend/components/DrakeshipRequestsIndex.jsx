var React = require('react'),
    SessionStore = require('../stores/SessionStore'),
    DrakeshipRequestsIndexItem = require('./DrakeshipRequestsIndexItem');

var DrakeshipRequestsIndex = module.exports = React.createClass({
  getInitialState: function () {
    return {
      potentialDrakes: this.getPotentialDrakes(),
      displayed: false
    };
  },

  componentDidMount: function () {
    window.RequestsIndex = this;
    this.sessionListener = SessionStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  onChange: function () {
    // pendingDrakeships is a list of users

    this.setState({
      potentialDrakes: this.getPotentialDrakes()
    });
  },

  display: function () {
    this.setState({ displayed: !this.state.displayed });
  },

  getPotentialDrakes: function () {
    var pendingDrakeships = SessionStore.currentUser().pendingDrakeships;
    var requestedDrakeships = [];

    pendingDrakeships.forEach(function (drakeship) {
      if (drakeship.recipient.id === SessionStore.currentUser().id) {
        requestedDrakeships.push(drakeship.requester);
      }
    }.bind(this));

    return requestedDrakeships;
  },

  render: function () {
    // console.log(this.state.displayed);
    var index;
    if (this.state.displayed) {
      index = (
        <div className="drakeship-requests-index-display group">
          <h4>Friend Requests</h4>
          <ul>
            {this.state.potentialDrakes.map(function (potDrake) {
              return < DrakeshipRequestsIndexItem key={potDrake.id} potentialDrake={potDrake} />;
            })}
          </ul>
        </div>
      );
    } else {
      index = <ul></ul>;
    }

    var reqBadge;
    if (this.state.potentialDrakes && this.state.potentialDrakes.length > 0) {
      reqBadge = <label className="requests-badge">{this.state.potentialDrakes.length}</label>;
    } else {
      reqBadge = <label/>;
    }

    return(
      <div className="drakeship-requests-index group" onClick={this.display}>
        <img src={window.drakeImages.iconDrakes} />
        {reqBadge}
        {index}
      </div>
    );
  }
});
