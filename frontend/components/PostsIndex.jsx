var React = require('react');

var PostsIndex = module.exports = React.createClass({
  getType: function () {
    if (this.props.params && this.props.params.userId) { return "Timeline" }
    return "Feed";
  },

  render: function () {
    return <div>{this.getType()}</div>;
  }
});
