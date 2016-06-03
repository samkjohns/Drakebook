var React = require('react'),
    Search = require('./Search'),
    PostsIndex = require('./PostsIndex');

var Feed = module.exports = React.createClass({
  render: function () {
    return(
      <div>
        < Search />
        < PostsIndex />
      </div>
    );
  }
});
