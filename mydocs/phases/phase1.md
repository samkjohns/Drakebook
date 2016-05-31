# Phase 1: User Authentication, User Model and JSON API

## Rails
### Models
* User

### Controllers
* Api::UsersController (create, show, update)
* Api::SessionsController (create, destroy)

### Views
* users/show.json.jbuilder
* session/show.json.jbuilder

## Flux
### Views (React Components)
* App
  * SessionForm
  * LandingPagePlaceholder

### Stores
* SessionStore
  * isUserLoggedIn
  * getCurrentUser

### Actions
* SessionActions
  * receiveCurrentUser
  * removeCurrentUser

### ApiUtil
* SessionApiUtil
  * login
  * logout
  * fetchCurrentUser

## Gems/Libraries
* BCrypt (Gem)
