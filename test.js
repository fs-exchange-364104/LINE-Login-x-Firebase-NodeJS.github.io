const app = require('express')();
const async = require('async');

const lineUtil = require('./lib/lineUtil');
const firsebaseUtil = require('./lib/firebaseUtil');

require('dotenv').config();

// Line Login
app.use("/line/login",
  (req, res, next) => {
    // 首次登入要求取得權限
    res.location('https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1570726184&redirect_uri=http://localhost:5050/line/login/callback&state=abcde&scope=openid%20profile');
    res.sendStatus(302);
  });

// Line Login Success and callback
app.use("/line/login/callback",
  (req, res, next) => {
    res.send('ddd');
    async.waterfall([
      function (callback) {
        // Line 登入成功取得 access_token 
        lineUtil.getLineToken(req.query.code).then((result) => {
          callback(null, result.access_token);
        })

      },
      function (accessToken, callback) {
        // 使用 accessToken 取得 Line 的 userId
        console.log(accessToken);
        lineUtil.getLineProfile(accessToken).then((result) => {
          // 取得 profile Line 帳戶資訊 
          callback(null, result.userId);
        })
      },
      function (userId, callback) {
        // arg1 now equals 'three'
        console.log(userId);
        callback(null, 'done');
      }
    ], function (err, result) {
      // result now equals 'done'
    });

  });

// 取得 Line 帳戶資訊
app.use("/profile",
  (req, res, next) => {
    const accessToken = req.query.accessToken;
    lineUtil.getLineProfile(accessToken).then((result) => {
      // 取得 profile Line 帳戶資訊 
      res.send(result);
    })
  });

// 拿取 userId 做 Firebase 登入
app.use("/firebase/login",
  (req, res, next) => {
    const userId = req.query.userId;
    firsebaseUtil.firebaseLogin(userId).then((result) => {
      // 取得 profile Line 帳戶資訊 
      res.send(result);
    })
  });






app.listen(process.env.PORT || 5000, () => {
  console.log(`server is listening to ${process.env.PORT || 5000}...`);
});



