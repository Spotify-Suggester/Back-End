# Spotify-Suggester

## Is the server live?

Check the link:
https://spotify-suggester1.herokuapp.com/

## POST Register A New User

Endpoint: `/api/auth/register`

Required:

-   username
-   password

```js
{
    username: "myUserName",
    password: "myPassword"
}
```

Returns a `200 OK` status code and the newly created user.

```js
{
  id: 1,
  username: "myUsername"
}
```

## POST Login

Endpoint: `/api/auth/login`

Required:

-   username
-   password

```js
{
    username: "myUserName",
    password: "myPassword"
}
```

Returns a `200 OK` status code, the auth web token and the spotify access token.

```js
{
  message: "Authenticated successfully",
  auth: {
      username: "username",
      id: 1,
      token: "eyJhbGciOiJIUzI ... ZmT1m0dNlzXikDU"
  },
  spotify: {
      access_token: "BQC1fXmA59FKAjLRd ... 0B8ij4EVLWYi2fWbo"
  }
}
```

Returns a `400 Bad Request` message when username and/or password do match our records, along with the error "Invalid credentials"

```js
{
  "message": "Invalid credentials"
}
```

## GET User's Favorite Songs

Endpoint: `/api/users/:id/favorites`

Returns a `200 OK` status code and list of favorite songs.

```js
{
  "favorite_songs": [
    {
      "id": "0shBLNwbMS8i903cWwnwln",
      "name": "Morning Dew - Live at Barton Hall, Cornell University, Ithaca, NY 5/8/77",
      "artist": "Grateful Dead",
      "album": "Cornell 5/8/77 (Live)",
      "image_url": "https://i.scdn.co/image/ab67616d0000b27375fcab3be9f5833d23e211f0",
      "popularity": 40,
      "duration_ms": 857213,
      "key": 7,
      "mode": 1,
      "time_signature": 4,
      "danceability": 0.456,
      "energy": 0.403,
      "instrumentalness": 0.15,
      "liveness": 0.591,
      "loudness": -13.965,
      "speechiness": 0.0383,
      "valence": 0.511,
      "tempo": 128.074
    },
  ]
}
```

Returns a `400 Bad Request` message when user id ```:id``` is not provided.

```js
{
  "message": "User not found"
}
```
