var React = require('react'),
    ProfileStore = require('../stores/ProfileStore');

var DrakesIndex = module.exports = React.createClass({
  render: function () {
    return(
      <div className="drakes-item-pane">
        <img src={window.drakeImages.default.profile} />
        <a href={"/users/" + this.props.user.id}>{this.props.user.username}</a>
      </div>
    );
  }
});
