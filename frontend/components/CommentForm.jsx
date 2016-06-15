var React = require('react'),
    PostsActions = require('../actions/PostsActions');

var CommentForm = module.exports = React.createClass({

  getInitialState: function () {
    return this.props.type === "edit" ?
      { body: this.props.post.body } : { body: "" };
  },

  onChange: function (event) {
    this.setState({ body: event.currentTarget.value });
  },

  submit: function (event) {
    event.preventDefault();

    var postableId = this.props.post.id;

    if (this.props.type === "edit"){
      PostsActions.updatePost({
        id: postableId,
        body: this.state.body
      });
    } else {
      PostsActions.createPost({
        post: {
          body: this.state.body,
          postable_type: "Post",
          postable_id: postableId
        }
      });
    }

    this.setState({ body: "" });
    this.props.finishEditing && this.props.finishEditing();
  },

  render: function () {
    var paneClass = this.props.type === "edit" ? "edit-comment-pane" : "post-comment-pane";
    var mainClass = this.props.type === "edit" ? "edit-comment" : "post-comment";

    return(
      <div className={paneClass}>
        <form className={mainClass}>
          <img src={window.drakeImages.default.profile} />
          <textarea onChange={this.onChange} value={this.state.body} />
          <div className="comment-buttons-pane group">
            <button onClick={this.submit}>
              {this.props.type === "edit" ? "Save" : "Post"}
            </button>
          </div>
        </form>
      </div>
    );
  }

});
