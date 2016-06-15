# Drakebook

[live][heroku]

[heroku]: http://thedrakebook.herokuapp.com/
[Screenshot][screenshot]
[screenshot]: [./docs/screenshot.png]

Drakebook is a web application inspired by Facebook. It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Flux architectural framework on the front end.

## Features & Implementation

### Single-Page App

Drakebook is an entirely single-page app, meaning all Javascript is sent down in a single GET request, and the page is dynamically rendered with AJAX afterward.

The page listens to a `SessionStore`, which stores the user's logged-in status. If the user is not logged in, it renders the `SessionView` (a hybrid login / signup view); if the user is logged in, it renders the user's content. Logged-in status is checked with an AJAX call to the Api::SessionsController on the backend, which either renders a JSON view of the logged-in user, or an empty object.

### User Profiles and Drakeships

  Users are stored in the database with their profile information in a users table. They're associated with other users through a `drakeships` (ie, friendship) join table. Because the table joins users to users, a user's `drakes` essentially represent the combination of that user's `received_drakes` and `requested_drakes` (where `request_status` is `accepted`). This necessitates a custom query.

  Rendering a user's profile (in the `Profile` component) requires a `ProfileStore`; when the component mounts, the user's relevant profile information is fetched from the server. This includes the user's `drakes` and `pendingDrakeships`; both of these lists are necessary to calculate the `SessionStore.currentUser()`'s relationship with the user whose profile is being viewed. Because there are many places where the current user's list of `drakes` becomes necessary, the server also sends those lists when rendering the current user.

### Posts

  Posts have a corresponding posts table in the database. The table has an `author_id` foreign key pointing to the User who authored the post, a `body` column, and also a polymorphic `postable_id` and `postable_type` pointing to the thing the post was posted to (either a User / User's wall or on a Post – making it a comment).

  On the front end, I have the following components: `PostsIndex`, `Post`, `PostForm`, and `CommentForm`. Because posts can appear on either a `Feed` or a `Timeline`, and because posts can be edited as well as created, most of these components are used in several places. `PostsIndex`, for instance, has a `type` in its props indicating whether it represents posts on a specific user's `Timeline`, or on their `Feed`. Both `PostForm` and `CommentForm` can either create a new Post or edit an existing one.

  `PostsIndex` listens to a `PostsStore` and calls the appropriate fetches from the server depending on its type. For a `Timeline`, that fetch is routed to `posts#index`; for a `Feed`, the corresponding controller action is `posts#feed`, which sends down posts that would be appropriate to appear on the given user's feed.

### Search

  The custom route `api/search` corresponds to the `users#search` action, which expects a query in its params and sends down a list of users (a max of 10) whose usernames match the query. Every time the `Search` input changes, an AJAX call is made to this action, and the `Search` component renders the results – unless the input is empty. `SearchIndexItems` link to the shown user's `Profile`.

## Future directions for the project

  There are three important features that haven't been implemented yet: Likes, Tags, and file upload. I also would like to implement notifications, privacy controls, and instant messaging.

### Likes

  Users should have the ability to like posts. Posts should display the number of likes they have.

### Tags

  When composing a post, a user should be able to tag their drakes in the post. This makes the post viewable by the tagged users' drakes as well as the author's drakes; it also notifies the tagged users.

### File upload

  Users should be able to upload photos in at least three contexts: to change their profile photo, their cover photo, and to upload photos to their Timeline. Timeline photos would simply be a post with an attached image. Photos should also be browsable by user.

### Notifications

  When certain events of interest occur, a user should receive a notification. This is already implemented for Drake Requests; however, it can be generalized through the use of a notifications table in the database. The table would have a `notified_user_id` as well as additional columns specifying the type of notification. Once a user need no longer be shown a notification, the entry could be deleted from the database or simply modified in a `seen` column.

### Privacy controls

  Users should be able to customize who can and cannot see their posts and their Timeline. By default, posts are viewable only by their drakes, but users can make their posts public or restrict them from being viewed by groups or individuals.

### Instant Messaging

  User should be able to message each other in real time and receive notifications when they do. Messages would require their own table in the database.
