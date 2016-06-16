var React = require('react'),
    SearchResultsIndexItem = require('./SearchResultsIndexItem');

var SearchResultsIndex = module.exports = React.createClass({
  render: function () {
    if (this.props.results.length === 0) {
      return <div/>;
    }

    return(
      <div className="search-results-pane group">
        {this.props.results.map(function (result, idx) {
          return(
            < SearchResultsIndexItem
              result={result}
              key={idx}
              id={"search-results-"+idx}
            />
          );
        })}
      </div>
    );
  }
});
