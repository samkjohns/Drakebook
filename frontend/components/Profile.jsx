var React = require('react'),
    ProfileApiUtil = require('../util/ProfileApiUtil'),
    ProfileActions = require('../actions/ProfileActions'),
    ProfileStore = require("../stores/ProfileStore"),
    PostsActions = require('../actions/PostsActions'),
    Search = require('./Search'),
    DrakeToggle = require('./DrakeToggle');

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
      ProfileActions.fetchProfileInfo(this.getUserId(this.props));
    }
  },

  componentWillUnmount: function () {
    this.profileListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    console.log("receiving props");
    var oldUserId = this.getUserId(this.props);
    var newUserId = this.getUserId(newProps);
    debugger
    if (oldUserId !== newUserId) {
      ProfileActions.fetchProfileInfo(newUserId);
      PostsActions.fetchPostsForUser(newUserId);
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


    // the tabs for subroutes
    var drakeCount = this.state.profile.drakeships ?
      this.state.profile.drakeships.length : 0;

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

    var drakeToggle = <div/>;
    if (SessionStore.currentUser().id !== ProfileStore.profile().id) {
      drakeToggle = < DrakeToggle userId={this.props.userId} />;
    }

    return(
      <div className="profile-parent-container group">
        < Search />
        <div className="profile-pane group">
          <div className="cover-photo-pane group" >
            <img src={window.drakeImages.default.cover} className="cover-photo" />
          </div>

          <div className="avatar-photo-pane group">
            <img src={window.drakeImages.default.profile} className="avatar-photo" />
          </div>

          <h2 className="username">{this.state.profile.username}</h2>

          {drakeToggle}

          <nav className="profile-nav group">
            <ul className="profile-nav-links group">
              {photos}
              {drakes}
              {about}
              {timeline}
            </ul>
          </nav>
        </div>

        <div className="profile-children group">
          {this.props.children}
        </div>
      </div>
    );
  }
});
