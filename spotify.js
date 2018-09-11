var SpotifyWebApi = require('spotify-web-api-node');
// credentials are optional

var spotifyApi = new SpotifyWebApi({
    clientId: '2fb62a66825d461fb960bcbce9a0f41d',
    clientSecret: '2191a946950742e3b0919379434ed78b '
  });


 // Search tracks whose artist's name contains 'Love'
spotifyApi.searchTracks('artist:Love')
.then(function(data) {
  console.log('Search tracks by "Love" in the artist name', data.body);
}, function(err) {
  console.log('Something went wrong!', err);
});
