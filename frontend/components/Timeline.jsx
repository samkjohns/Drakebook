var React = require('react'),
    SessionStore = require('../stores/SessionStore'),
    ProfileStore = require('../stores/ProfileStore'),
    ProfileApiUtil = require('../util/ProfileApiUtil'),
    PostsIndex = require('./PostsIndex');

var Timeline = module.exports = React.createClass({
  getInitialState: function () {
    return {
      profile: {},
      focused: ""
    };
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

  handleClick: function (event) {
    event.preventDefault();
    // console.log(event.currentTarget.value);
    debugger
    this.setState({ focused: event.currentTarget.className });
  },

  handleBlur: function (event) {
    var profile = this.state.profile;
    profile[focused] = event.currentTarget.className;
    ProfileActions.updateProfile(profile);
    this.setState({ focused: "" });
  },

  buildBlurbForm: function () {
    var blurb = [];
    Object.keys(this.state.profile).map(function (key, idx) {
      console.log("building " + key);
      if (["id", "username", "drakeships", "pendingDrakeships"].indexOf(key) < 0) {
        if (this.state.profile[key]) {
          blurb.push(<li id={idx} className={key}>{key + ": " + this.state.profile[key]}</li>);

        } else if (this.state.focused === key) {
          var type;
          switch (key) {
            case "intro":
              type = "textarea";
              break;

            case "email":
              type = "email";
              break;

            case "phone_number":
              type = "tel";
              break;

            default:
              type = "text";
          }

          blurb.push(
            <li>{key+": "}
              <input type={type} id={idx} onBlur={this.handleBlur} className={key} />
            </li>
          );

        } else {
          blurb.push(
            <label className="blurb-edit-link" onClick={this.handleClick} id={idx} className={key} >
              {"Add your " + key}
            </label>
          );
        }

      }
      if (idx >= 6) { return; }
    }.bind(this));

    return blurb;
  },

  render: function () {
    return(
      <div className="timeline-pane group">
        <section className="left-timeline-pane group">
          <div className="intro-blurb-box group">
            <header className="intro-blurb-header">
              <img src={window.drakeImages.iconGlobe}/>
              <h4>Intro</h4>
            </header>

            <form className="intro-blurb-form">
              {this.buildBlurbForm()}
            </form>
          </div>
        </section>

        < PostsIndex />
      </div>
    );
  }
});
