var React = require('react'),
    PostsActions = require('../actions/PostsActions'),
    ProfileStore = require('../stores/ProfileStore'),
    Post = require('./Post'),
    PostForm = require('./PostForm'),
    PostsStore = require('../stores/PostsStore');

var PostsIndex = module.exports = React.createClass({
  getType: function () {
    if (this.props.params && this.props.params.userId) { return "Timeline" }
    return "Feed";
  },

  getInitialState: function () {
    return {
      posts: PostsStore.posts()
    }
  },

  componentDidMount: function () {
    this.postsListener = PostsStore.addListener(this.onChange);
    this.profileListener = ProfileStore.addListener(function () {
      PostsActions.fetchPostsForUser(ProfileStore.profile().id);
    });
  },

  componentWillUnmount: function () {
    this.postsListener.remove();
    this.profileListener.remove();
  },

  componentWillReceiveProps: this.componentDidMount,

  onChange: function () {
    this.setState({ posts: PostsStore.posts() });
  },

  render: function () {
    // debugger
    return(
      <div className="posts-index-pane">
        < PostForm type={this.getType()} />
        <ul className="posts-index group">
          {this.state.posts.map(function (post, key) {
            return(
              < Post key={key} post={post} />
            );
          }.bind(this))}
        </ul>
      </div>
    );
  }
});
