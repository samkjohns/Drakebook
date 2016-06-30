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

    var username = this.props.user.username;
    if (username.length > 10) {
      username = username.substr(0, 10) + '...';
    }

    return(
      <div className="drakes-item-pane group">
        <div className="drakes-item-left group">
          <img src={this.props.user.profile_photo_url} />
          <a onClick={this.goToProfile}>
            {username}
          </a>
        </div>

        {undrake}
      </div>
    );
  }
});
