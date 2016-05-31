var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    HashHistory = ReactRouter.HashHistory,
    SessionForm = require('./components/SessionForm');

var App = React.createClass({
  render: function () {
    return(
      <div>
        <h1>Drakebook</h1>
        < SessionForm type="login" />
        {this.props.children}
      </div>
    );
  }
});

var Router = (
  < Router hashHistory={HashHistory} >
    < Route path="/" component={App} >
    </ Route >
  </ Router >
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    ReactDOM.render(Router, document.getElementById('drakebook'));
  }
);
