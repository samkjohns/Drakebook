var React = require('react');

var SearchResultIndexItem = module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  goToProfile: function (event) {
    event.stopPropagation();
    this.context.router.push("/users/" + this.props.result.id);
  },

  render: function () {
    return(
      <div className="search-result-item-pane group" onClick={this.goToProfile}>
        <img src={window.drakeImages.default.profile} />
        <li className="search-result-username">
          {this.props.result.username}
        </li>
      </div>
    );
  }
});
