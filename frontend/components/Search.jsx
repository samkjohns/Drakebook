var React = require('react'),
    SessionActions = require('../actions/SessionActions'),
    SessionStore = require('../stores/SessionStore'),
    DrakeshipRequestsIndex = require('./DrakeshipRequestsIndex');

var Search = module.exports = React.createClass({
  getInitialState: function () {
    return { search: "" };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  redirectToHome: function () {
    this.context.router.push("/");
  },

  redirectToProfile: function () {
    this.context.router.push("/users/" + SessionStore.currentUser().id);
  },

  render: function () {
    return(
      <header className="search-header">
        <nav className="search-nav">
          <div className="search-nav-left">
            <img onClick={this.redirectToHome} src={window.drakeImages.iconDrakebook} />
            <input type="text" onChange={this.handleSearchChange} placeholder="Search Drakes" />
          </div>

          <ul className="search-icons group">
            <li className="current-user-thumb group" onClick={this.redirectToProfile}>
              <img src={window.drakeImages.default.profile}/>
              <label>{SessionStore.currentUser().username}</label>
            </li>
            <li>< DrakeshipRequestsIndex /></li>
            <li><img src={window.drakeImages.iconMessages} /></li>
            <li><img src={window.drakeImages.iconNotifications} /></li>
            <li><button onClick={SessionActions.logout}>Logout</button></li>
          </ul>

        </nav>
      </header>
    );
  }
});
