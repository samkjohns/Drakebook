# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app. Shows either the signin page or the Home page with a Feed.

## JSON API

### Users
- `GET /api/users/:id`
  - Profile info and Timeline
- `POST api/users`
- `PATCH /api/users/:id`
  - Edits profile info, including the ability to upload profile and cover photos.

### Session

- `GET api/session`
- `POST api/session`
- `DELETE api/session`

### Drakeships
- `GET /api/users/:id/drakeships`
- `POST /api/drakeships`
  - Makes a friend request. Accepts query string to specify requester and recipient.
- `PATCH /api/drakeships/:id`
  - Accepts or rejects a request.

### Posts
- `GET /api/users/:id/posts/`
  - Posts index
  - Accepts query string to specify Feed or Timeline
- `GET /api/users/:user_id/posts/:id`
  - Includes comments, likes, and any photos in the post.
- `POST /api/posts`
  - Allows photos to be uploaded
- `PATCH /api/posts/:id`
  - Allows the author to edit the content.
- `DELETE /api/posts/:id`

### Likes
- `POST /api/likes`
- `DELETE /api/likes`

### Conversations
- `GET /api/users/:user_id/conversations`
- `GET /api/users/:user_id/conversations/:id`
  - Includes recent messages in the conversation.
