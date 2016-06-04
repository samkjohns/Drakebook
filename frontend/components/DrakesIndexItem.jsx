var React = require('react'),
    ProfileStore = require('../stores/ProfileStore');

var DrakesIndexItem = module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  goToProfile: function () {
    this.context.router.push("/users/" + this.props.user.id);
  },

  render: function () {
    return(
      <div className="drakes-item-pane">
        <img src={window.drakeImages.default.profile} />
        <a onClick={this.goToProfile}>{this.props.user.username}</a>
      </div>
    );
  }
});
