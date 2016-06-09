var React = require('react'),
    Modal = require('react-modal'),
    PostForm = require('./PostForm');

var styles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    width             : '100%',
    height            : '100%',
    backgroundColor   : 'rgba(0, 0, 0, .5)'
  },

  content : {
    position                   : 'absolute',
    'z-index': 999,
    border                     : 'none',
    background                 : 'transparent',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : 'none',
    outline                    : 'none',
    padding                    : '20px'
  }
};

var EditPostModal = module.exports = React.createClass({
  getInitialState: function () {
    return {
      modalIsOpen: true
    };
  },

  closeModal: function () {
    this.setState({ modalIsOpen: false });
  },

  render: function () {
    return(
      <Modal isOpen={true} className="modal">
        < PostForm type={"edit"} post={this.props.post} className="edit-modal-pane" />
      </Modal>
    );
    // return(
    //   <div>
    //     < PostForm type={"edit"} post={this.props.post} className="edit-modal-pane" />
    //   </div>
    // );
  }
});
