var React = require('react'),
    SessionStore = require('../stores/SessionStore'),
    ProfileStore = require('../stores/ProfileStore'),
    ProfileActions = require('../actions/ProfileActions');

var IntroBlurb = module.exports = React.createClass({
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
    this.setState({ focused: event.currentTarget.className });
  },

  handleBlur: function (event) {
    event.preventDefault();
    var profile = this.state.profile;
    profile[this.state.focused] = event.currentTarget.value;
    ProfileActions.updateProfileInfo(profile);
    this.setState({ focused: "" });
  },

  displayNames: {
    "intro": "Intro",
    "current_city": "Lives in",
    "hometown": "From",
    "birth_date": "Birthday",
    "workplace": "Works at",
    "email": "Email",
    "phone_number": "Phone number",
    "high_school": "Went to",
    "college": "Went to",
    "college_major": "Studied",
    "name_pronunciation": "Name pronunciation"
  },

  fieldTypes: function () {
    return {
      current_city: { img: window.drakeImages.iconIntroLocation },
      hometown: { img: window.drakeImages.iconIntroHometown },
      birth_date: { type: "date", img: window.drakeImages.iconCake },
      workplace: { img: window.drakeImages.iconIntroWork },
      email: { type: "email", img: window.drakeImages.iconMail },
      phone_number: { type: "tel", img: window.drakeImages.iconPhone },
      high_school: { img: window.drakeImages.iconIntroSchool },
      college: { img: window.drakeImages.iconIntroSchool },
      college_major: { img: window.drakeImages.iconIntroSchool },
      name_pronunciation: { img: window.drakeImages.iconIntroSound }
    };
  },

  _unSnakeCase: function (phrase) {
    var lowered = phrase.split("_").map(function (word) {
      return word.toLowerCase();
    });
    // lowered[0] = lowered[0].replace(/^[a-z]/, lowered[0][0].toUpperCase());
    return lowered.join(' ');
  },

  _blurbKeys: function () {
    return Object.keys(this.displayNames);
  },

  buildBlurbForm: function () {
    var blurb = [];

    this._blurbKeys().map(function (key, idx) {
      // console.log("building " + key);
      if (["id", "username", "intro", "drakeships", "pendingDrakeships"].indexOf(key) < 0) {
        var img, type;
        img = this.fieldTypes()[key].img ? this.fieldTypes()[key].img : window.drakeImages.iconIntroGlobe;
        type = this.fieldTypes()[key].type ? this.fieldTypes()[key].type : "text";

        if (this.state.profile[key] && this.state.focused !== key) {
          blurb.push(
            <div className="blurb-line-item">
              <img src={img} />
              <li
                id={idx}
                className={key}
                onClick={this.handleClick}
              >
                {this.displayNames[key] + ": " + this.state.profile[key]}
              </li>
            </div>
          );

        } else if (this.state.focused === key) {
          blurb.push(
            <div className="blurb-line-item">
              <img src={img} />
              <li>{key+": "}
                <input
                  type={type}
                  id={idx}
                  className={key}
                  onBlur={this.handleBlur} onSubmit={this.handleBlur}
                  defaultValue={this.state.profile[key]}
                />
              </li>
            </div>
          );

        } else {
          blurb.push(
            <div className="blurb-line-item">
              <img src={img} />
              <label className="blurb-edit-link" onClick={this.handleClick} id={idx} className={key} >
                {"Add your " + this._unSnakeCase(key)}
              </label>
            </div>
          );
        }
      }
    }.bind(this));

    return blurb;
  },

  buildBlurbView: function () {
    var count = 0;
    var i = 0;
    var blurbs = [];
    var keys = Object.keys(this.fieldTypes());

    for (var i = 0; count < 5 && i < keys.length; i++) {
      var key = keys[i];
      if (this.state.profile[key]) {
        var img;
        img = this.fieldTypes()[key].img ? this.fieldTypes()[key].img : "";

        blurbs.push(
          <div className="blurb-line-item">
            <img src={img} />
            <li id={i} className={key}>
              {this.displayNames[key] + ": " + this.state.profile[key]}
            </li>
          </div>
        );
        count++;
      }
    }

    return blurbs;
  },

  buildIntroForm: function () {
    if (this.state.profile.intro && this.state.focused !== "blurb-intro") {
      return(
        <div className="blurb-intro" onClick={this.handleClick}>
          {this.state.profile.intro}
        </div>
      );

    } else if (this.state.focused === "blurb-intro") {
      return(
        <div className="blurb-intro" onBlur={this.handleBlur} onSubmit={this.handleBlur}>
          <input type="textarea" defaultValue={this.state.profile.intro} />
        </div>
      );

    } else {
      return(
        <div className="blurb-intro" onClick={this.handleClick}>
          <a>Introduce yourself</a>
        </div>
      );

    }
  },

  buildIntroView: function () {
    return(
      <div className="blurb-intro">
        {this.state.profile.intro}
      </div>
    );
  },

  render: function () {
    var form, intro;
    if (SessionStore.currentUser().id === ProfileStore.profile().id) {
      form = (
        <form className="intro-blurb-form">
          {this.buildBlurbForm()}
        </form>
      );
      intro = this.buildIntroForm();

    } else {
      form = (
        <form className="intro-blurb-view">
          {this.buildBlurbView()}
        </form>
      );
      intro = this.buildIntroForm();
    }

    return(
      <div className="intro-pane">
        <div className="intro-blurb-box group">
          <header className="intro-blurb-header group">
            <div className="intro-blurb-header-left">
              <img src={window.drakeImages.iconIntroGlobe}/>
              <h4>Intro</h4>
            </div>
            <div className="intro-blurb-header-right">
              {intro}
            </div>
          </header>

          <section className="blurb-items">
            {form}
          </section>
        </div>
      </div>
    );
  }
});
