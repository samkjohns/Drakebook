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

  goToProfile: function (evnt) {
    this.context.router.push("/users/" + this.props.post.author.authorId);
  },

  goToWall: function (evnt) {
    this.context.router.push("/users/" + this.props.post.postable.id);
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

    var goToCommenter = function () {
      this.context.router.push("/users/" + comment.author.authorId);
    }.bind(this);

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
          <a onClick={goToCommenter}>{comment.author.username}</a>
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
    var editButton = <div/>;
    var deleteButton = <div/>
    var fullDelete = (
      <button className="delete-post-button" onClick={this.handleDelete.bind(this, this.props.post)}>
        Delete
      </button>
    );

    if (this.isPostAuthor(this.props.post)) {
      editButton = (
        <button className="edit-post-button" onClick={this.handleEdit}>
          Edit
        </button>
      );
      deleteButton = fullDelete;

    } else if (
      this.props.post.postable.type === "User" &&
      this.props.post.postable.id === SessionStore.currentUser().id
    ) { deleteButton = fullDelete; }

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

    var wallArrow = <div/>;
    if (this.props.post.postable.username &&
        this.props.post.author.authorId !== this.props.post.postable.id)
    {
      wallArrow = (
        <div className="">
          <span className="wall-arrow"></span>
          <a onClick={this.goToWall}>{this.props.post.postable.username}</a>
        </div>
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
            {wallArrow}
            <div className="modify-post-buttons group">
              {deleteButton}
              {editButton}
            </div>
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
