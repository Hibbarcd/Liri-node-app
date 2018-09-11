const moment = require('moment');
const bandsintown = require('bandsintown')("app_id=codingbootcamp");

const bandArgs = process.argv;
let artistName ="";
for (var i = 2; i < bandArgs.length; i++) {

    if (i > 2 && i < bandArgs.length) {
      artistName = artistName + "+" + bandArgs[i];
    }
    else {
      artistName += bandArgs[i];
    }
  }
  
bandsintown.getArtistEventList(artistName)
.then(function(events) {

    console.log(JSON.stringify(events, null, 2));
  });


 