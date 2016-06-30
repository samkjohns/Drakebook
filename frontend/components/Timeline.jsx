var React = require('react'),
    ProfileStore = require('../stores/ProfileStore'),
    IntroBlurb = require('./IntroBlurb'),
    PostsIndex = require('./PostsIndex');

var Timeline = module.exports = React.createClass({
  getInitialState: function () {
    return { profile: {} };
  },

  componentDidMount: function () {
    this.profileListener = ProfileStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.profileListener.remove();
  },

  onChange: function () {
    this.setState({
      profile: ProfileStore.profile()
    });
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  goToProfile: function (drake, evnt) {
    this.context.router.push("/users/" + drake.id);
  },

  render: function () {
    var displayedDrakes = this.state.profile.drakeships ?
      this.state.profile.drakeships.slice(0, 9) : [];

    return(
      <div className="timeline-pane group">
        <section className="left-timeline-pane group">
          <label className="timeline-friends-label">
            Drakes
          </label>
          <ul className="timeline-friends-index">
            {displayedDrakes.map(function (drake, idx) {
              var className = "";
              if ([2, 5, 8].indexOf(idx) === 0) {
                className += "last-col";
              }

              if ([6, 7, 8].indexOf(idx) === 0) {
                className += " last-row";
              }

              return (
                <li
                  key={"timeline-friends-index-item-"+idx}
                  className={className}
                >
                  <img
                    src={drake.profile_photo_url}
                    onClick={this.goToProfile.bind(this, drake)}
                  />
                  <label className="timeline-friends-index-item-label">
                    {drake.username}
                  </label>
                </li>
              );
            }.bind(this))}
          </ul>
        </section>

        <section className="main-timeline-pane group">
          < PostsIndex type={"Timeline"} />
        </section>
      </div>
    );
  }
});
