var admin = require('firebase-admin');

var serviceAccount = require('../service-account.json');

require('dotenv').config();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fs-exchange-364104-default-rtdb.asia-southeast1.firebasedatabase.app'
});

const firebaseLogin = (userId) => {
  return new Promise((resolve, reject) => {
    const firebaseUid = userId;
    admin.auth().getUser(firebaseUid).then(function (userRecord) {
      console.log('Successfully fetched user data:', userRecord.toJSON());
      resolve(userRecord.toJSON());
    }).catch((error) => {
      if (error.code === 'auth/user-not-found') {
        return admin.auth().createUser({
          uid: firebaseUid,
          displayName: '',
          photoURL: 'https://profile.line-scdn.net/0hQqmRF8L2Dl5QKyIyWnFxCWxuADMnBQgWKE1GbXd-WDl-EkpbbEkVa318UGwvTEAMPxgVOicoBDt9',
          //email: body.email
        }).then(function (userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log('Successfully created new user:', userRecord.uid);
          resolve(userRecord);
        })
          .catch(function (error) {
            console.log('Error creating new user:', error);
            reject(error);
          });;
      }
      console.log('Error:', error);
      reject(error);
    });
  });
}

module.exports = { firebaseLogin };
