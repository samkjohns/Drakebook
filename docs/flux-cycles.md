# Flux Cycles

## Users Cycles

### Users API Request Actions

  * `fetchUserInfo`
    0. invoked from `ProfileDetail` `didMount`/`willReceiveProps`
    0. `GET /api/users/:id` is called
    0. `receiveUserInfo` is set as the callback

  * `updateUserInfo`
    0. invoked from `ProfileDetail`
    0. `PATCH /api/users/:id` is called
    0. `receiveUserInfo` is set as the callback

### Users API Response Actions

  * `receiveUserInfo`
    0. invoked from an API callback
    0. `UserStore` updates its `_userInfo` object and emits change.

### Store Listeners

  * `Profile` component listens for change.

## Friendships Cycles

### Friendships API Request Actions

### Friendships API Response Actions

### Store Listeners

## Posts Cycles

### Posts API Request Actions

### Posts API Response Actions

### Store Listeners

## Likes Cycles

### Likes API Request Actions

### Likes API Response Actions

### Store Listeners

## Conversations Cycles

### Conversations API Request Actions

### Conversations API Response Actions

### Store Listeners
