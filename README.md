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

### Phase 1: Backend setup and Frontend User Authentication (with API) (1 day)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin (both on the same page)
- [ ] blank landing page after signin

### Phase 2: Profile View and Drakeships Model (1.5 days)

**Objective:** Notes can be created, read, edited and destroyed through
the API.

- [ ] create `Note` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for notes (`NotesController`)
- [ ] jBuilder views for notes
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Notes can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each note component, building out the flux loop as needed.
  - [ ] `NotesIndex`
  - [ ] `NoteIndexItem`
  - [ ] `NoteForm`
- [ ] save Notes to the DB when the form loses focus or is left idle
  after editing.

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Notebooks (1 day)

**Objective:** Notes belong to Notebooks, and can be viewed by notebook.

- [ ] create `Notebook` model
- build out API, Flux loop, and components for:
  - [ ] Notebook CRUD
  - [ ] adding notes requires a notebook
  - [ ] moving notes to a different notebook
  - [ ] viewing notes by notebook
- Use CSS to style new views

Phase 3 adds organization to the Notes. Notes belong to a Notebook,
which has its own `Index` view.

### Phase 6: Tags (1.5 days)

**Objective:** Notes can be tagged with multiple tags, and tags are searchable.

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching tags for notebook
  - [ ] adding tags to notebook
  - [ ] creating tags while adding to notebooks
  - [ ] searching notebooks by tag
- [ ] Style new elements

### Phase 7: Allow Complex Styling in Notes (0.5 days)

**objective:** Enable complex styling of notes.

- [ ] Integrate `react-quill` (based on Quill.js).
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Search through notes for blocks of text
- [ ] Pagination / infinite scroll for Notes Index
- [ ] Set reminders on notes
- [ ] Changelogs for Notes
- [ ] Multiple sessions

[phase-one]: ./mydocs/phases/phase1.md
[phase-two]: ./mydocs/phases/phase2.md
[phase-three]: ./mydocs/phases/phase3.md
[phase-four]: ./mydocs/phases/phase4.md
[phase-five]: ./mydocs/phases/phase5.md
