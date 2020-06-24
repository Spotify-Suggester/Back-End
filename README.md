# Spotify-Suggester

## Is the server live?

Check the link:
https://spotify-suggester1.herokuapp.com/

## POST Register A New User

Endpoint: `/api/auth/register`

Required in body:

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

Returns a `400 Bad Request` status code if user already exists with message: 

```js
{
  "message: "This user already exists - please log in"
}
```

## POST Login

Endpoint: `/api/auth/login`

Required in body:

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
  message: "Invalid credentials"
}
```

## GET User's Favorite Songs

Endpoint: `/api/users/:id/favorites`

Returns a `200 OK` status code and list of favorite songs.

```js
{
  favorite_songs: [
    {
      id: "0shBLNwbMS8i903cWwnwln",
      name: "Morning Dew - Live at Barton Hall, Cornell University, Ithaca, NY 5/8/77",
      artist: "Grateful Dead",
      album: "Cornell 5/8/77 (Live)",
      image_url: "https://i.scdn.co/image/ab67616d0000b27375fcab3be9f5833d23e211f0",
      popularity: 40,
      duration_ms: 857213,
      key: 7,
      mode: 1,
      time_signature: 4,
      danceability: 0.456,
      energy: 0.403,
      instrumentalness: 0.15,
      liveness: 0.591,
      loudness: -13.965,
      speechiness: 0.0383,
      valence: 0.511,
      tempo: 128.074
    },
  ]
}
```

Returns a `400 Bad Request` status code when user id ```:id``` is not provided.

```js
{
  message: "User not found"
}
```

## POST Add Song to User's Favorites

Endpoint: `/api/users/:id/favorites`

Required in body:

-   song_id

```js
{
    song_id: "6DavaRzYekSRYl0VMHnlwo",
}
```

Returns a `200 OK` status code, message and list of favorite songs.

```js
{
  message: "Song added successfully",
  favorite_songs: [
    {
      id: "6DavaRzYekSRYl0VMHnlwo",
      name: "Helpless (feat. Neil Young) - Concert Version",
      artist: "The Band",
      album: "The Last Waltz (Deluxe Version)",
      image_url: "https://i.scdn.co/image/ab67616d0000b273415e5ff0f5a631e22af127a6",
      popularity: 43,
      duration_ms: 353227,
      key: 0,
      mode: 1,
      time_signature: 4,
      danceability: 0.43,
      energy: 0.835,
      instrumentalness: 0.0000153,
      liveness: 0.99,
      loudness: -7.415,
      speechiness: 0.105,
      valence: 0.393,
      tempo: 114.186
    }
  ]
}
```

Returns a `400 Bad Request` status code if song is already a favorite song for this user along with favorite songs.

```js
{
  message: "Duplicate favorite - Song not added",
  favorite_songs: [
    {
      id: "6DavaRzYekSRYl0VMHnlwo",
      name: "Helpless (feat. Neil Young) - Concert Version",
      artist: "The Band",
      album: "The Last Waltz (Deluxe Version)",
      image_url: "https://i.scdn.co/image/ab67616d0000b273415e5ff0f5a631e22af127a6",
      popularity: 43,
      duration_ms: 353227,
      key: 0,
      mode: 1,
      time_signature: 4,
      danceability: 0.43,
      energy: 0.835,
      instrumentalness: 0.0000153,
      liveness: 0.99,
      loudness: -7.415,
      speechiness: 0.105,
      valence: 0.393,
      tempo: 114.186
    }
  ]
}
```

## DELETE Remove Song from User's Favorites

Endpoint: `/api/users/:id/favorites/:song_id`

Returns a `200 OK` status code, message and list of favorite songs.

```js
{
  message: "Song removed from favorites",
  favorite_songs: [
    {
      id: "7GI1Weh21oGJYeSbrtOyR1",
      name: "Windshield",
      artist: "Greensky Bluegrass",
      album: "If Sorrows Swim",
      image_url: "https://i.scdn.co/image/ab67616d0000b273b26aa443332e4ccd14d42c0b",
      popularity: 55,
      duration_ms: 224853,
      key: 0,
      mode: 1,
      time_signature: 4,
      danceability: 0.48,
      energy: 0.548,
      instrumentalness: 0.00502,
      liveness: 0.205,
      loudness: -9.119,
      speechiness: 0.0328,
      valence: 0.322,
      tempo: 90.109
    }
  ],
  deleted_song: 1
}
```

Returns a `200 OK` status code and list of favorites songs with message 'Song does not exist in user favorites' if song is not found in user's favorites.

```js
{
  message: "Song does not exist in user favorites",
  favorite_songs: [
    {
      id: "7GI1Weh21oGJYeSbrtOyR1",
      name: "Windshield",
      artist: "Greensky Bluegrass",
      album: "If Sorrows Swim",
      image_url: "https://i.scdn.co/image/ab67616d0000b273b26aa443332e4ccd14d42c0b",
      popularity: 55,
      duration_ms: 224853,
      key: 0,
      mode: 1,
      time_signature: 4,
      danceability: 0.48,
      energy: 0.548,
      instrumentalness: 0.00502,
      liveness: 0.205,
      loudness: -9.119,
      speechiness: 0.0328,
      valence: 0.322,
      tempo: 90.109
    }
  ]
}
```



