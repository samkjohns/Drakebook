var React = require('react'),
    PostsStore = require('../stores/PostsStore'),
    SessionStore = require('../stores/SessionStore');

var Post = module.exports = React.createClass({
  getComments: function () {
    return PostsStore.commentsForPost(this.props.post.id);
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

  render: function () {
    return(
      <li className="post-pane group">
        <section className="post-content-pane group">
          <section className="post-author group">
            <img src={window.drakeImages.default.profile} />
            <a className="post-author">{this.props.post.author.username}</a>
          </section>

          <p className="post-body">
            {this.props.post.body}
          </p>
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
      </li>
    );
  }
});
