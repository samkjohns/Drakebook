var React = require('react'),
    ProfileStore = require('../stores/ProfileStore'),
    DrakesIndexItem = require('./DrakesIndexItem');

var DrakesIndex = module.exports = React.createClass({
  getInitialState: function () {
    return {
      drakes: []
    }
  },

  getStateFromStore: function () {
    // console.log(ProfileStore.profile());
    this.setState({ drakes: ProfileStore.profile().drakeships });
  },

  componentDidMount: function () {
    this.profileListener = ProfileStore.addListener(this.getStateFromStore);
    // ProfileApiUtil.fetchProfileInfo();
  },

  componentWillUnmount: function () {
    this.profileListener.remove();
  },

  render: function () {
    console.log("Drakes: " + this.state.drakes);
    return(
      <div className="drakes-index-pane">
        <header className="drakes-index-header group">
          <img src={window.drakeImages.iconDrakesGray} />
          <h3>Drakes</h3>
        </header>
        <ul className="drakes-index">
          {this.state.drakes.map(function (drake) {
            return < DrakesIndexItem user={drake} />;
          })}
        </ul>
      </div>
    );
  }
});
