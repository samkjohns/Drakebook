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
    this.searchListener = SearchStore.addListener(this.setStateFromStore);
  },

  componentWillUnmount: function () {
    this.searchListener.remove();
  },

  setStateFromStore: function () {
    this.setState({ results: SearchStore.searchResults() });
  },

  redirectToHome: function () {
    this.context.router.push("/");
  },

  redirectToProfile: function () {
    this.context.router.push("/users/" + SessionStore.currentUser().id);
  },

  handleSearchChange: function (event) {
    this.setState(
      { search: event.currentTarget.value },
      this.makeSearchQuery
    );
  },

  handleBlur: function (event) {
    this.setState({ results: [] });
  },

  handleFocus: function () {
    this.makeSearchQuery();
  },

  makeSearchQuery: function () {
    // console.log("in makeSearchQuery; search is " + this.state.search);
    if (this.state.search) {
      SearchActions.searchUsers(this.state.search);
    } else {
      this.setState({ results: [] })
    }
  },

  render: function () {
    var searchResults = <div/>;
    if (this.state.search) {
      searchResults = < SearchResultsIndex results={this.state.results} />;
    }

    return(
      <header className="search-header">
        <nav className="search-nav">
          <div className="search-nav-left">
            <img onClick={this.redirectToHome} src={window.drakeImages.iconDrakebook} />
            <input
              type="text"
              onChange={this.handleSearchChange}
              onFocus={this.handleFocus}
              placeholder="Search Drakes"
            />
            {searchResults}
          </div>

          <ul className="search-icons group">
            <li className="current-user-thumb group" onClick={this.redirectToProfile}>
              <img src={window.drakeImages.default.profile}/>
              <label>{SessionStore.currentUser().username}</label>
            </li>
            <li className="icon-items"><DrakeshipRequestsIndex/></li>
            <li className="icon-items"><img src={window.drakeImages.iconMessages} /></li>
            <li className="icon-items"><img src={window.drakeImages.iconNotifications} /></li>
            <li><button onClick={SessionActions.logout}>Logout</button></li>
          </ul>

        </nav>
      </header>
    );
  }
});
