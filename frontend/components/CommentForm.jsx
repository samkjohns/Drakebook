var React = require('react');

var CommentForm = module.exports = React.createClass({

  getInitialState: function () {
    return this.props.type === "edit" ?
      { body: this.props.post.body } : { body: "" };
  },

  onChange: function () {
    this.setState({ body: event.currentTarget.value });
  },

  submit: function (event) {
    event.preventDefault();

    var postableId = this.props.type === "Feed" ?
      SessionStore.currentUser().id : ProfileStore.profile().id;

    if (this.props.type === "edit"){
      PostsActions.updatePost({
        id: this.props.post.id,
        body: this.state.body
      });
    } else {
      PostsActions.createPost({
        post: {
          body: this.state.body,
          postable_type: "User",
          postable_id: postableId
        }
      });
    }

    this.setState({ body: "" });
    this.props.finishEditing();
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
