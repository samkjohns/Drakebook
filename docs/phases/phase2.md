# Phase 2: Flux Architecture and Profile and Drakeships CRUD (2 days)

## Rails
### Models
* Profile
* Drakeships

### Controllers
* Api::UsersController (show)
* Api::UsersDrakeshipsController (index, create, destroy, update)

### Views
* users/show.json.jbuilder
* users/drakeships
* drakeships/show.json.jbuilder


## Flux
### Views (React Components)
* Profile
  * ProfileDetail
    * FriendsIndex

### Stores
* Note

### Actions
* ApiActions.receiveAllNotes -> triggered by ApiUtil
* ApiActions.receiveSingleNote
* ApiActions.deleteNote
* NoteActions.fetchAllNotes -> triggers ApiUtil
* NoteActions.fetchSingleNote
* NoteActions.createNote
* NoteActions.editNote
* NoteActions.destroyNote

### ApiUtil
* ApiUtil.fetchAllNotes
* ApiUtil.fetchSingleNote
* ApiUtil.createNote
* ApiUtil.editNote
* ApiUtil.destroyNote

## Gems/Libraries
* Flux Dispatcher (npm)
* Twitter Bootstrap
