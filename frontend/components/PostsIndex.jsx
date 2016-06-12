var React = require('react'),
    PostsActions = require('../actions/PostsActions'),
    ProfileStore = require('../stores/ProfileStore'),
    Post = require('./Post'),
    PostForm = require('./PostForm'),
    PostsStore = require('../stores/PostsStore');

var PostsIndex = module.exports = React.createClass({
  getInitialState: function () {
    return {
      posts: PostsStore.posts()
    }
  },

  componentDidMount: function () {
    // console.log("PostsIndex (" + this.props.type + ") mounting");
    this.listenSwitch(this.props);
  },

  componentWillUnmount: function () {
    this.postsListener.remove();
    this.profileListener && this.profileListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    this.componentWillUnmount();
    this.listenSwitch(newProps);
  },

  listenSwitch: function (props) {
    if (props.type === "Timeline") {
      this.listenToPostsStore();
    } else {
      this.listenToFeedStore();
    }
  },

  onPostsChange: function () {
    this.setState({ posts: PostsStore.posts() });
  },

  listenToPostsStore: function () {
    this.postsListener = PostsStore.addListener(this.onPostsChange);
    this.profileListener = ProfileStore.addListener(function () {
      PostsActions.fetchPostsForUser(ProfileStore.profile().id);
    });
  },

  // Temporarily using PostsStore
  // while I check to see if I need a FeedStore at all
  listenToFeedStore: function () {
    this.postsListener = PostsStore.addListener(this.onPostsChange);
    PostsActions.fetchFeedForUser(SessionStore.currentUser().id);
  },

  render: function () {
    return(
      <div className="posts-index-pane">
        < PostForm type={"post"} location={this.props.type} />
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
