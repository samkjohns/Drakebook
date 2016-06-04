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
    if (userId) {
      ProfileApiUtil.fetchProfileInfo(this.getUserId(this.props));
    }
  },

  componentWillUnmount: function () {
    this.profileListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    oldUserId = this.getUserId(this.props);
    newUserId = this.getUserId(newProps);

    if (oldUserId !== newUserId) {
      ProfileApiUtil.fetchProfileInfo(newUserId);
    }
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  linkTo: function (route) {
    this.context.router.push(route);
    // this.setSelectedSubroute(route);
  },

  render: function () {
    var profileRoute = "/users/" + this.getUserId(this.props);
    var photos, drakes, about, timeline;
    var selectedRoute = this.props.location.pathname;
    // console.log(selectedRoute);

    photos = selectedRoute.endsWith('photos') ?
      <a onClick={this.linkTo.bind(this, profileRoute + "/photos")}
        className="selected">Photos</a> :
      <a onClick={this.linkTo.bind(this, profileRoute + "/photos")}
        className="">Photos</a>

    // console.log(this.state.profile);
    var drakeCount = this.state.profile.drakeships ?
      this.state.profile.drakeships.length : 0;
    // console.log("drake count: " + drakeCount);
    drakes = selectedRoute.endsWith('drakes') ?
      <a onClick={this.linkTo.bind(this, profileRoute + "/drakes")}
        className="selected">Drakes <span className="count">{drakeCount}</span></a> :
      <a onClick={this.linkTo.bind(this, profileRoute + "/drakes")}
        className="">Drakes <span className="count">{drakeCount}</span></a>

    about = selectedRoute.endsWith('about') ?
      <a onClick={this.linkTo.bind(this, profileRoute + "/about")}
        className="selected">About</a> :
      <a onClick={this.linkTo.bind(this, profileRoute + "/about")}
        className="">About</a>

    var timeRegxp = /^\/users\/[0-9]+$/;
    timeline = timeRegxp.test(selectedRoute) ?
      <a onClick={this.linkTo.bind(this, profileRoute)}
        className="selected">Timeline</a> :
      <a onClick={this.linkTo.bind(this, profileRoute )}
        className="">Timeline</a>

    return(
      <div className="profile-parent-container">
        < Search />
        <div className="profile-pane group">
          <div className="cover-photo-pane group" >
            <img src={window.drakeImages.default.cover} className="cover-photo" />
          </div>

          <div className="avatar-photo-pane group">
            <img src={window.drakeImages.default.profile} className="avatar-photo" />
          </div>

          <h2 className="username">{this.state.profile.username}</h2>

          <nav className="profile-nav group">
            <ul className="profile-nav-links group">
              {photos}
              {drakes}
              {about}
              {timeline}
            </ul>
          </nav>
        </div>

        <div className="profile-children">
          {this.props.children}
        </div>
      </div>
    );
  }
});

// <a onClick={this.linkTo.bind(this, profileRoute + "/photos")}>Photos</a>
// <a onClick={this.linkTo.bind(this, profileRoute + "/drakes")}>Drakes</a>
// <a onClick={this.linkTo.bind(this, profileRoute + "/about")}>About</a>
// <a onClick={this.linkTo.bind(this, profileRoute)}>Timeline</a>
