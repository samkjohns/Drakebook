var React = require('react'),
    ProfileStore = require('../stores/ProfileStore'),
    DrakeshipActions = require('../actions/DrakeshipActions');

var DrakesIndexItem = module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  goToProfile: function () {
    this.context.router.push("/users/" + this.props.user.id);
  },

  handleUndrakeship: function () {
    DrakeshipActions.undrake(this.props.userId, this.props.user.id);
  },

  render: function () {
    var undrake = <div></div>;
    if (SessionStore.currentUser().id === ProfileStore.profile().id) {
      undrake = (
        <div className="drakes-item-right group">
          <button className="undrake-button" onClick={this.handleUndrakeship}>Undrake</button>
        </div>
      );
    }

    return(
      <div className="drakes-item-pane group">
        <div className="drakes-item-left group">
          <img src={window.drakeImages.default.profile} />
          <a onClick={this.goToProfile}>{this.props.user.username}</a>
        </div>

        {undrake}
      </div>
    );
  }
});
