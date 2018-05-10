const app = require('express')();
var admin = require("firebase-admin");

var serviceAccount = require("./quapni-auth-firebase-adminsdk.json");
const lineUtil = require('./lib/lineUtil');

require('dotenv').config();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quapni-auth.firebaseio.com"
});

// Line Login
app.use("/login",
  (req, res, next) => {
    // 首次登入要求取得權限
    res.location('https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1570726184&redirect_uri=http://localhost:5050/callback&state=abcde&scope=openid%20profile');
    res.sendStatus(302);
  });

// Line Login Success and callback
app.use("/login/callback",
  (req, res, next) => {
    lineUtil.getLineToken(req.query.code).then((result) => {
      // 取得 access_token 
      res.send(result);
    })
  });

  // 取得 Line 帳戶資訊
app.use("/profile",
  (req, res, next) => {
    const accessToken=req.query.accessToken;
    console.log(accessToken);
    lineUtil.getLineProfile(accessToken).then((result) => {
      // 取得 profile Line 帳戶資訊 
      res.send(result);
    })
  });


app.listen(process.env.PORT || 5000, () => {
  console.log(`server is listening to ${process.env.PORT || 5000}...`);
});



