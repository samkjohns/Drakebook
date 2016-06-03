var React = require('react'),
    Search = require('./Search'),
    SessionStore = require("../stores/SessionStore"),
    PostsIndex = require('./PostsIndex');

var Feed = module.exports = React.createClass({
  render: function () {
    return(
      <div>
        < Search />
        < a href={"#/users/" + SessionStore.currentUser().id}>(profile link)</a>
        < PostsIndex />
      </div>
    );
  }
});
