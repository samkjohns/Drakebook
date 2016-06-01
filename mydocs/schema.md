# Schema Information

## users
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
username          | string    | not null, indexed, unique
password_digest   | string    | not null
session_token     | string    | not null, indexed, unique
profile_photo_path| string    | not null
cover_photo_path  | string    | not null
birth_date        | date      |
workplace         | string    |

## drakeships
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
requester_id      | integer   | not null, foreign key (references users), indexed
recipient_id      | integer   | not null, foreign key (references users), indexed
relationship_type | string    | not null
request_status    | string    | not null ("accepted", "rejected", or "pending")

## posts
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
author_id     | integer   | not null, foreign key (references users), indexed
postable_id   | integer   | not null, foreign key (polymorphic reference), indexed
postable_type | string    | not null, polymorphic type
body          | text      | not null

## photos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
post_id     | integer   | not null, foreign key (references posts), indexed
path        | string    | not null

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
post_id     | integer   | not null, foreign key (references posts), indexed
liker_id    | string    | not null, foreign key (references users), indexed

## taggings
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
name          | string    | not null
post_id       | integer   | not null, foreign key (references posts), indexed
tagged_user_id| integer   | not null, foreign key (references users), indexed

## conversations
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key

## conversation_participants
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
conversation_id | integer   | not null, foreign key (references conversations), indexed
user_id         | integer   | not null, foreign key (references users), indexed

## messages
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
author_id       | integer   | not null, foreign key (references users), indexed
conversation_id | integer   | not null, foreign key (references conversations), indexed
body            | text      | not null
photo_path      | string    |
