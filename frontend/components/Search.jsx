var React = require('react'),
    SessionActions = require('../actions/SessionActions'),
    SessionStore = require('../stores/SessionStore'),
    SearchStore = require('../stores/SearchStore'),
    SearchActions = require('../actions/SearchActions'),
    SearchResultsIndex = require('./SearchResultsIndex'),
    DrakeshipRequestsIndex = require('./DrakeshipRequestsIndex');

var Search = module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { search: "", results: [] };
  },

  componentDidMount: function () {
    this.searchListener = SearchStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.searchListener.remove();
  },

  onChange: function () {
    console.log("in on change");
    this.setState({ results: SearchStore.searchResults() });
  },

  redirectToHome: function () {
    this.context.router.push("/");
  },

  redirectToProfile: function () {
    this.context.router.push("/users/" + SessionStore.currentUser().id);
  },

  handleSearchChange: function (event) {
    this.setState({ search: event.currentTarget.value });
    if (this.state.search) {
      SearchActions.searchUsers(this.state.search);
    }
  },

  render: function () {
    console.log("results length: " + this.state.results);
    return(
      <header className="search-header">
        <nav className="search-nav">
          <div className="search-nav-left">
            <img onClick={this.redirectToHome} src={window.drakeImages.iconDrakebook} />
            <input type="text" onChange={this.handleSearchChange} placeholder="Search Drakes" />
            < SearchResultsIndex results={this.state.results} />
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
