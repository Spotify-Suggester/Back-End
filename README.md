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
      username: "gsgarces",
      id: 5,
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
