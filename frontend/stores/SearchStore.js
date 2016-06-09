var AppDispatcher = require('../dispatcher/Dispatcher.js'),
    Store = require('flux/utils').Store,
    SearchConstants = require('../constants/SearchConstants');

var SearchStore = new Store(AppDispatcher);

var _searchResults = [];

SearchStore.searchResults = function () {
  return _searchResults.slice();
}

SearchStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SearchConstants.RESULTS_RECEIVED:
      _searchResults = payload.results;
      SearchStore.__emitChange();
      break;
  }
}

window.SearchStore = SearchStore;
module.exports = SearchStore;
