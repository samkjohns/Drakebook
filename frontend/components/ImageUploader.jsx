var React = require('react'),
    ProfileStore = require('../stores/ProfileStore'),
    ProfileActions = require('../actions/ProfileActions');

var ImageUploader = module.exports = React.createClass({
  getInitialState: function () {
    return {
      imageFile: null,
      imageUrl: null
    }
  },

  updateFile: function (evnt) {
    evnt.preventDefault();

    var file = evnt.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  submit: function (evnt) {
    evnt.preventDefault();

    var formData = new FormData();
    formData.append('user[profile_photo]', this.state.imageFile);
    ProfileActions.updatePhoto(ProfileStore.profile().id, formData);
    this.props.close();
  },

  handleClick: function (evnt) {
    if (evnt.target.id === "modal-div") {
      this.props.close();
    }
  },

  render: function () {
    return(
      <div
        className="file-upload-modal" id="modal-div"
        onClick={this.handleClick}
      >
        <form id="modal-form">
          <img src={this.state.imageUrl} id="modal-img" />
          <input type="file" onChange={this.updateFile} id="modal-input" />
          <button onClick={this.submit} id="modal-button">
            Update
          </button>
        </form>
      </div>
    );
  }
});
