
var SpotifyWebApi = require('spotify-web-api-node');

 spotifyResults = function () {  
// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
    clientId: '2fb62a66825d461fb960bcbce9a0f41d',
    clientSecret: '2191a946950742e3b0919379434ed78b',
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
.then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
  });
}
    // Save the access token so that it's used in future calls


 module.exports = spotifyResults() 


