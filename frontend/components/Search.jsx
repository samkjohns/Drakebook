var React = require('react'),
    SessionActions = require('../actions/SessionActions');

var Search = module.exports = React.createClass({
  getInitialState: function () {
    return { search: "" };
  },

  render: function () {
    return(
      <header className="search-header">
        <nav className="search-nav">
          <div>
            <img src={window.drakeImages.iconDrakebook} />
            <input type="text" onChange={this.handleSearchChange} placeholder="Search Drakes" />
          </div>
          <ul className="group">
            <li><img src={window.drakeImages.iconDrakes} /></li>
            <li><img src={window.drakeImages.iconMessages} /></li>
            <li><img src={window.drakeImages.iconNotifications} /></li>
            <li><button onClick={SessionActions.logout}>Logout</button></li>
          </ul>
        </nav>
      </header>
    );
  }
});