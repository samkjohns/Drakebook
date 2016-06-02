var React = require('react'),
    ProfileApiUtil = require('../util/ProfileApiUtil'),
    ProfileStore = require("../stores/ProfileStore"),
    Search = require('./Search');

var Profile = module.exports = React.createClass({
  getInitialState: function () {
    return {
      profile: {}
    };
  },

  getStateFromStore: function () {
    this.setState({
      profile: ProfileStore.profile()
    });
  },

  getUserId: function (props) {
    return props.params ? props.params.userId : props.userId;
  },

  componentDidMount: function () {
    this.profileListener = ProfileStore.addListener(
      this.getStateFromStore
    );

    var userId = this.getUserId(this.props);
    if (userId){
      ProfileApiUtil.fetchProfileInfo(this.getUserId(this.props));
    }
  },

  componentWillUnmount: function () {
    this.profileListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    ProfileApiUtil.fetchProfileInfo(getUserId(newProps));
  },

  render: function () {
    return(
      <div>
        < Search />
        <div>
          {this.state.profile.username} profile
        </div>
      </div>
    );
  }
});
