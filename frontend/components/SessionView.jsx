var React = require('react'),
    SessionForm = require('./SessionForm');

var SessionView = module.exports = React.createClass({
  render: function () {
    return (
      <div className="session-view">
        <header className="session-header">
          <nav className="session-nav">
            <h1 className="group">drakebook</h1>
            < SessionForm formType="login" />
          </nav>
        </header>

        <div className="session-body">
          <div className="propaganda">
            <h2>Connect with other drakes and the world around you on Drakebook.</h2>
            <div className="group">
              <img src={window.drakeImages.iconPhotos}></img>
              <strong>Share what's new</strong>
              <p>from friends in News Feed.</p>
            </div>
            <div className="group">
              <img src={window.drakeImages.iconTimeline}></img>
              <strong>See photos and updates</strong>
              <p>in your life on Timeline.</p>
            </div>
            <div className="search-fix group">
              <img src={window.drakeImages.iconSearch}></img>
              <strong className="search-fix">Find more</strong>
              <p>of what you're looking for with Drakebook Search.</p>
            </div>
          </div>
          <div className="signup-wrapper">
            <h2>Sign Up</h2>
            <p>It's free and always will be.</p>
            < SessionForm formType="signup" />
          </div>
        </div>

      </div>
    );
  }
});
