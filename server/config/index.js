module.exports = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'go-dutch',
  mongodb_uri: process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/go-dutch',
  auth0_signup_url: process.env.NODE_ENV === 'production' ? process.env.AUTH0_SIGNUP_URL : 'https://dreamingmonkey.au.auth0.com/dbconnections/signup',
  auth0_login_url: process.env.NODE_ENV === 'production' ? process.env.AUTH0_LOGIN_URL : 'https://dreamingmonkey.au.auth0.com/oauth/ro',
  auth0_client_id: process.env.NODE_ENV === 'production' ? process.env.AUTH0_CLIENT_ID : 'TbHzK1zgP9mMH8qvoEWCN87HglMeZNxp',
}
