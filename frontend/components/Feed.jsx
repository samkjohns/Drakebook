var React = require('react'),
    Search = require('./Search'),
    SessionStore = require("../stores/SessionStore"),
    PostsIndex = require('./PostsIndex');

var Feed = module.exports = React.createClass({
  render: function () {
    return(
      <div className="feed-parent-pane">
        < Search />
        <div className="feed-pane">
          < PostsIndex type={"Feed"} />
        </div>
      </div>
    );
  }
});
