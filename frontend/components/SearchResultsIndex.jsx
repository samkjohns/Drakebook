var React = require('react'),
    SearchResultsIndexItem = require('./SearchResultsIndexItem');

var SearchResultsIndex = module.exports = React.createClass({
  render: function () {
    if (this.props.results.length === 0) {
      return <div/>;
    }

    return(
      <div className="search-results-pane">
        {this.props.results.map(function (result) {
          return <SearchResultsIndexItem result={result} />;
        })}
      </div>
    );
  }
});
