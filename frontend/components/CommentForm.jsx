var React = require('react');

var CommentForm = module.exports = React.createClass({

  getInitialState: function () {
    return this.props.type === "edit" ?
      { body: this.props.post.body } : { body: "" };
  },

  onChange: function () {
    this.setState({ body: event.currentTarget.value });
  },

  render: function () {
    return(
      <div className="comment-form-pane">
        <form className="comment-form">
          <textarea />
        </form>
      </div>
    );
  }

});
