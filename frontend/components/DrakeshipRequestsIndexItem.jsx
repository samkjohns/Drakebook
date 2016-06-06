var React = require('react');

var DrakeshipRequestsIndexItem = module.exports = React.createClass({
  render: function () {
    return(
      <div className="drakeship-request-item group">
        <div className="drakeship-requester group">
          <img src={window.drakeImages.default.profile} />
          <a onClick={this.goToProfile}>{this.props.request.username}</a>
        </div>

        <div className="drakeship-buttons group">
          <button onClick={this.confirmRequest}>Confirm</button>
          <button onClick={this.deleteRequest}>Delete Request</button>
        </div>
      </div>
    )
  }
});
