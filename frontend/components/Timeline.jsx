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

  render: function () {
    return(
      <div className="timeline-pane group">
        <section className="left-timeline-pane group">
        </section>

        <section className="main-timeline-pane group">
          < PostsIndex type={"Timeline"} />
        </section>
      </div>
    );
  }
});
