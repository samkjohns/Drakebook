var React = require('react'),
    Search = require('./Search'),
    SessionStore = require("../stores/SessionStore"),
    PostsIndex = require('./PostsIndex');

var Feed = module.exports = React.createClass({
  getInitialState: function () {
    return { searchDisplayed: false };
  },

  handleClick: function (evnt) {
    if (
      evnt.target.id !== "search-input" &&
      !evnt.target.id.startsWith('search-results')
    ) {
      this.setState({ searchDisplayed: false });
    }
  },

  display: function () {
    if (!this.state.searchDisplayed) {
      this.setState({ searchDisplayed: true });
    }
  },

  render: function () {
    return(
      <div className="feed-parent-pane" onClick={this.handleClick}>
        < Search displayed={this.state.searchDisplayed} display={this.display} />
        <div className="feed-pane">
          < PostsIndex type={"Feed"} />
        </div>
      </div>
    );
  }
});
