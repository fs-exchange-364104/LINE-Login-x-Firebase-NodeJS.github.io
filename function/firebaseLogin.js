
const functions = require('firebase-functions');
const request = require('request-promise');
var admin = require("firebase-admin");

var serviceAccount = require("./quapni-auth-firebase-adminsdk-z98vf-4c8897c017.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quapni-auth.firebaseio.com"
});


// 使用者資訊
const body={
  access_token: 'eyJhbGciOiJIUzI1NiJ9.m2H5KRwpBgbWhsNFhquFK7BVf6mrHKYlplZBxc-0BYiVBs3cjxho6gFeRhQLew9CcFz9rT_GLvWXaAipX4dOlQLlLqWwmA9Fos6A9qkzjK50y6mYmRIMqbAwDOgLyFzkKqdFA6LI-HG0lYWNrFH8cLI8kCskjYKXKJo1ZR6L4ac.Z3NifrO1_qfh6dwvSbVq5xxwWPsl2pyiQx3vzmAVii0',
  id: 'U9b2faaa43c131432b56747ddd297175a'
}

// verifyLineToken(body);
function verifyLineToken(body) {
  return request({
    method: 'GET',
    uri: `https://api.line.me/v2/profile`,
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.f4guAj0IxW7YVGkuiwluY3zriwB6mB6y9o1bbAhdeeC12xd6d13QWNTFTtIU-9c2OfGpYoP4hzkiQTdrtY3x1DdJQ0z1It_drh_CH3zmA0L5wCHFZZIm1_kEvB9Bm9gyL9tDPkVHXpiDFhYf9TzX4S857wjcwJPBzpBm7muWY04._z-ppgla1qtx_MutP5C0AY-ZSze-6MtEqbloFBjRwUs`
    },
    json: true
  }).then((response) => {
    console.log(response);
  })
}

getFirebaseUser(body);
function getFirebaseUser(body) {
  const firebaseUid = body.id;

  return admin.auth().getUser(firebaseUid).then(function (userRecord) {
    console.log("Successfully fetched user data:", userRecord.toJSON());
  }).catch((error) => {
    if (error.code === 'auth/user-not-found') {
      return admin.auth().createUser({
        uid: firebaseUid,
        displayName: 'body.name',
        photoURL: "https://profile.line-scdn.net/0hQqmRF8L2Dl5QKyIyWnFxCWxuADMnBQgWKE1GbXd-WDl-EkpbbEkVa318UGwvTEAMPxgVOicoBDt9",
        //email: body.email
      }).then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
      })
        .catch(function (error) {
          console.log("Error creating new user:", error);
        });;
    }
    return Promise.reject(error);
  });
}
