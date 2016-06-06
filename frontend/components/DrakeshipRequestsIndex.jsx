var React = require('react'),
    SessionStore = require('../stores/SessionStore'),
    DrakeshipRequestsIndexItem = require('./DrakeshipRequestsIndexItem');

var DrakeshipRequestsIndex = module.exports = React.createClass({
  getInitialState: function () {
    return { requests: [] };
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  onChange: function () {
    this.setState({
      requests: SessionStore.currentUser().pendingDrakeships;
    });
  },

  render: function () {
    return(
      <div className="drakeship-requests-index group">
        {this.state.requests.map(function (request) {
          return < DrakeshipRequestsIndexItem key={request.id} request={request} />;
        })}
      </div>
    );
  }
});
