var React = require('react'),
    SessionStore = require('../stores/SessionStore');

var Post = module.exports = React.createClass({
  render: function () {
    return(
      <li className="post-pane">
        <section className="post-author group">
          <img src={window.drakeImages.default.profile} />
          <a className="post-author">{this.props.post.author.username}</a>
        </section>

        <p className="post-body">
          {this.props.post.body}
        </p>

        <div className="post-buttons-pane">
          <ul className="post-buttons">
            <li>Like</li>
            <li>Comment</li>
          </ul>
        </div>
      </li>
    );
  }
});
