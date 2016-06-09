var React = require('react'),
    PostsStore = require('../stores/PostsStore'),
    PostsActions = require('../actions/PostsActions'),
    SessionStore = require('../stores/SessionStore'),
    CommentForm = require('./CommentForm'),
    PostForm = require('./PostForm');

var Post = module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      editing: false
    };
  },

  getComments: function () {
    return PostsStore.commentsForPost(this.props.post.id);
  },

  finishEditing: function () {
    this.setState({ editing: false });
  },

  commentRender: function (comment, key) {
    return(
      <li key={key} className="comment-pane group">
        <img src={window.drakeImages.default.profile} />
        <div className="comment-box">
          <span className="comment-content group">
            <a>{comment.author.username}</a>
            <p>{comment.body}</p>
          </span>

          <span className="comment-buttons">
            <a>Like</a>
            <a>Reply</a>
          </span>
        </div>
      </li>
    );
  },

  goToProfile: function (event) {
    this.context.router.push("/users/" + this.props.post.author.authorId);
  },

  handleDelete: function (event) {
    event.preventDefault();
    PostsActions.removePost(this.props.post.id);
  },

  handleEdit: function (event) {
    event.preventDefault();
    this.setState({ editing: true });
  },

  render: function () {
    var buttons = <div/>;
    if (this.props.post.author.authorId === SessionStore.currentUser().id) {
      buttons = (
        <div className="modify-post-buttons group">
          <button className="edit-post-button" onClick={this.handleEdit}>
            Edit
          </button>
          <button className="delete-post-button" onClick={this.handleDelete}>
            Delete
          </button>
        </div>
      );
    }

    var postBody;
    if (this.state.editing) {
      postBody = (
        < PostForm post={this.props.post} type={"edit"} finishEditing={this.finishEditing} />
      );
      // $('body').addClass('modal');
    } else {
      postBody = (
        <p className="post-body">
          {this.props.post.body}
        </p>
      );
    }

    return(
      <li className="post-pane group">
        <section className="post-content-pane group">
          <section className="post-author group">
            <img src={window.drakeImages.default.profile} onClick={this.goToProfile} />
            <a onClick={this.goToProfile} className="post-author">
              {this.props.post.author.username}
            </a>
            {buttons}
          </section>

          {postBody}
        </section>

        <section className="post-buttons-pane group">
          <ul className="post-buttons group">
            <li>Like</li>
            <li>Comment</li>
          </ul>
        </section>

        <section className="comments-index-pane">
          {this.getComments().map(function (comment, key){
            return this.commentRender(comment, key);
          }.bind(this) )}
        </section>

        < CommentForm post={this.props.post} finishEditing={this.finishEditing} />
      </li>
    );
  }
});
