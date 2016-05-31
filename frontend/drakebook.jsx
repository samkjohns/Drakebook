var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    HashHistory = ReactRouter.HashHistory;

var App = React.createClass({
  render: function () {
    return(
      <div>
        <h1>Drakebook</h1>
        {this.props.children}
      </div>
    );
  }
});

var Router = (
  < Router >
    < Route path="/" component={App} >
      < IndexRoute component={App} />
    </ Route >
  </ Router >
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    ReactDOM.render(Router, document.getElementById('drakebook'));
  }
);
