var React = require('react'),
    ProfileStore = require('../stores/ProfileStore'),
    DrakesIndexItem = require('./DrakesIndexItem');

var DrakesIndex = module.exports = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var drakes = ProfileStore.profile().drakeships || []
    return { drakes: drakes };
  },

  onChange: function () {
    this.setState(this.getStateFromStore());
  },

  componentDidMount: function () {
    console.log("in component did mount");
    this.profileListener = ProfileStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.profileListener.remove();
  },

  render: function () {
    // console.log("Drakes: " + this.state.drakes);
    return(
      <div className="drakes-index-pane group">
        <header className="drakes-index-header group">
          <img src={window.drakeImages.iconDrakesGray} />
          <h3>Drakes</h3>
        </header>
        <ul className="drakes-index group">
          {this.state.drakes.map(function (drake) {
            return < DrakesIndexItem user={drake} key={drake.id} userId={this.props.params.userId} />;
          }.bind(this))}
        </ul>
      </div>
    );
  }
});
