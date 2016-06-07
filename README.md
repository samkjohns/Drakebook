# Drakebook

[Heroku link][heroku]

[heroku]: http://thedrakebook.herokuapp.com/

## Minimum Viable Product

Drakebook is a web application inspired by Facebook that will be built using Ruby on Rails and React.js. This app, at minumum, should satisfy the following criteria:

- [ ] New account creation, login, and a guest login.
- [ ] Seed data to demonstrate the site's features.
- [ ] Editable profile info, the ability to befriend other users and post on their walls, the ability to upload photos and tag them, display notifications, and the ability to comment on and like posts and photos.
- [ ] Hosting on Heroku.
- [ ] CSS styling that mirrors Facebook.

## Product Goals and Priorities

Drakebook will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account. (MVP)
- [ ] Log in / Log out, including as a Guest. (MVP)
- [ ] Edit profile info at will. (MVP)
- [ ] Upload profile and cover photos. (MVP)
- [ ] Befriend other users. (MVP)
- [ ] Create, edit, and delete posts on their own wall or their friends' walls. (MVP)
- [ ] Like posts. (MVP)
- [ ] Include photos in their posts. (MVP)
- [ ] Curate their walls by allowing them to delete unwanted posts. (MVP)
- [ ] Tag posts and photos with people and places. (expected feature, but not MVP)
- [ ] Instant message friends (expected feature, but not MVP)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./mydocs/views.md
[components]: ./mydocs/components.md
[flux-cycles]: ./mydocs/flux-cycles.md
[api-endpoints]: ./mydocs/api-endpoints.md
[schema]: ./mydocs/schema.md

## Implementation Timeline

### Phase 1: Backend Setup and Frontend User Authentication (with API) (1 day)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [x] Flux auth architecture (including a SessionForm component and SessionStore)
- [x] setup `ApiUtil` to interact with the API
- [x] test out API interaction in the console.
- [x] user signup/signin (both on the same page)

### Phase 2: Profile View and Drakeships Model (1 day)

**Objective:** "Drakeship" requests can be made and responded to. Profiles
have a link to a display page for the user's drakeships.

- [x] setup React Router
- [x] create Profile jBuilder view, component, and route
- [x] create Drakeship model
- [x] CRUD API for Drakeships (`DrakeshipsController`)
- [x] jBuilder views for Drakeships
- implement the following components (with flux loops):
  - [x] `Profile`
  - [ ] `ProfileDetail`
  - [x] `DrakeshipsIndex`
  - [x] `DrakeshipsIndexItem`

### Phase 3: User Interface (1 day)

**Objective:** "Drakeship" requests can be made by users through an interface.
(Namely, buttons on profiles and in notifications)

- Components and loops
  - [x] `DrakeshipRequestsIndex`
  - [x] `DrakeshipRequestsIndexItem`
- [x] Profile should include a drakeship request button if the current user is not in a drakeship with the user whose profile they are visiting. (CREATE)
- [ ] Profile should include an "edit" function that allows the user to enter more information. (PATCH)
  - [ ] Add more columns to the users table for more user data. Also add these columns to the users#show jBuilder view.
- [x] Navbar should include a drakeship requests notification dropdown menu, from which requests can be accepted or rejected. (PATCH)

### Phase 4 Photo upload (1 day)
**Objective:** Users can upload profile and cover photos through the browser.

(Steps to be filled out after I've watched the video lecture, but presumably there will need to be a way to store files. Database may need to be adjusted. And user input will of course be necessary.)

### Phase 5: Posts (2 days)

**Objective:** Users can author posts, either on a user profile or as a reply to another post.

- [ ] create `Post` model
- build out API, Flux loop, and components for:
  - [ ] Post CRUD
  - [ ] Posts go on a user's Timeline
    - [ ] Build `PostIndex` and `PostIndexItem`
  - [ ] Posts optionally include a photo
  - [ ] Use `PostIndex` to build a `Feed` component as well.

### Phase 6: Search (0.5 days)

**Objective:** Users should be able to find each other through the search bar, which should display real-time search results.

- [ ] Write a users_controller#index action that will find all users that match a given search.
- [ ] Build out Flux loop for the `Search` component
- [ ] Each `SearchIndexItem` should be selectable, and link to that user's profile page.

### Phase 7: Likes and Tags (1.5 days)

**Objective:** Users can like photos and posts, and tag them with/by their drakes.

- [ ] create models and tables for `Like` and `Tag`
- build out API, Flux loop, and components for:
  - [ ] Like toggles
  - [ ] Tag CRUD
  - [ ] Liking and tagging send notifications to the relevant user(s)
    - [ ] Create a `Notifications` table, model, API, and Flux loop
    - [ ] This should display new notifications

### Bonus Features (TBD)
- [ ] Private, instant messaging.
- [ ] Infinite scroll for the PostIndex component (ie the Feed and Timeline)
- [ ] Multiple sessions

[phase-one]: ./mydocs/phases/phase1.md
[phase-two]: ./mydocs/phases/phase2.md
[phase-three]: ./mydocs/phases/phase3.md
[phase-four]: ./mydocs/phases/phase4.md
[phase-five]: ./mydocs/phases/phase5.md
