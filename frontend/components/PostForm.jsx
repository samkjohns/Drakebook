var React = require('react'),
    SessionStore = require('../stores/SessionStore'),
    ProfileStore = require('../stores/ProfileStore'),
    PostsApiUtil = require("../util/PostsApiUtil");

// props should have either "Feed" or "Timeline"
var PostForm = module.exports = React.createClass({
  getInitialState: function () {
    return { body: "" };
  },

  onChange: function (event) {
    this.setState({ body: event.currentTarget.value });
  },

  submit: function (event) {
    event.preventDefault();

    var postableId = this.props.type === "Feed" ?
      SessionStore.currentUser().id : ProfileStore.profile().id;

    PostsApiUtil.createPost({
      post: {
        body: this.state.body,
        postable_type: "User",
        postable_id: postableId
      }
    });
  },

  render: function () {
    return(
      <div className="post-form-pane">
        <form className="post-form">
          <textarea onChange={this.onChange} rows={3} />
          <div className="buttons-pane">
            <button onClick={this.submit}>Post</button>
          </div>
        </form>
      </div>
    );
  }
});
