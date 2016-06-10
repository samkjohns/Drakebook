var React = require('react'),
    SessionStore = require('../stores/SessionStore'),
    ProfileStore = require('../stores/ProfileStore'),
    PostsActions = require('../actions/PostsActions'),
    PostsApiUtil = require("../util/PostsApiUtil");

// props should have either "Feed" or "Timeline"
var PostForm = module.exports = React.createClass({
  getInitialState: function () {
    return this.props.type === "edit" ?
      { body: this.props.post.body } : { body: "" };
  },

  onChange: function (event) {
    this.setState({ body: event.currentTarget.value });
  },

  submit: function (event) {
    event.preventDefault();

    var postableId = this.props.location === "Feed" ?
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
    this.props.finishEditing && this.props.finishEditing();
  },

  render: function () {
    var paneClass = this.props.type === "edit" ? "edit-form-pane" : "post-form-pane";
    var mainClass = this.props.type === "edit" ? "edit-form group" : "post-form group";

    return(
      <div className={paneClass}>
        <form className={mainClass}>
          <img src={window.drakeImages.default.profile} />
          <textarea onChange={this.onChange} rows={3} value={this.state.body} />
          <div className="buttons-pane">
            <button onClick={this.submit}>
              {this.props.type === "edit" ? "Save" : "Post"}
            </button>
          </div>
        </form>
      </div>
    );
  }
});

/*

<div className="buttons-pane">
  <button onClick={this.submit}>
    {this.props.type === "edit" ? "Save" : "Post"}
  </button>
</div>

*/
