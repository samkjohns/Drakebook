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
      editing: false,
      commentEditing: null
    };
  },

  getComments: function () {
    return PostsStore.commentsForPost(this.props.post.id);
  },

  finishEditing: function () {
    this.setState({ editing: false });
  },

  finishCommentEditing: function () {
    this.setState({ commentEditing: null });
  },

  goToProfile: function (event) {
    this.context.router.push("/users/" + this.props.post.author.authorId);
  },

  handleDelete: function (post, event) {
    event.preventDefault();
    PostsActions.removePost(post.id);
  },

  handleEdit: function (event) {
    event.preventDefault();
    this.setState({ editing: true });
  },

  handleCommentEdit: function (comment, event) {
    this.setState({ commentEditing: comment });
  },

  isPostAuthor: function (post) {
    return post.author.authorId === SessionStore.currentUser().id;
  },

  commentRender: function (comment, key) {
    var buttons = <div/>;
    if (this.isPostAuthor(comment)) {
      buttons = (
        <div className="comment-buttons">
          <a onClick={this.handleCommentEdit.bind(this, comment)}>
            Edit
          </a>

          <a onClick={this.handleDelete.bind(this, comment)}>
            Delete
          </a>
        </div>
      );
    }

    var postBody;
    if (this.state.commentEditing && this.state.commentEditing.id === comment.id) {
      postBody = (
        <CommentForm
          type="edit"
          post={comment}
          finishEditing={this.finishCommentEditing}
        />
      );
    } else {
      postBody = (
        <span className="comment-content group">
          <a>{comment.author.username}</a>
          <p>{comment.body}</p>
        </span>
      );
    }

    return(
      <li key={key} className="comment-pane group">
        <img src={window.drakeImages.default.profile} />
        <div className="comment-box">
          {postBody}
        </div>
        {buttons}
      </li>
    );
  },

  render: function () {
    var buttons = <div/>;
    if (this.isPostAuthor(this.props.post)) {
      buttons = (
        <div className="modify-post-buttons group">
          <button className="edit-post-button" onClick={this.handleEdit}>
            Edit
          </button>
          <button className="delete-post-button" onClick={this.handleDelete.bind(this, this.props.post)}>
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

        < CommentForm post={this.props.post} finishEditing={this.finishCommentEditing} />
      </li>
    );
  }
});