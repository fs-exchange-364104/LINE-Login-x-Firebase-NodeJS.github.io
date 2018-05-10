const express= require('express');
const router = express.Router();

const lineLoginCtrl = require('../controllers/lineLogin.controller');

// Line Login
router.get("/",
  (req, res, next) => {
    // 首次登入要求取得權限
    res.location('https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1570726184&redirect_uri=http://localhost:5050/login/callback&state=abcde&scope=openid%20profile');
    res.sendStatus(302);
  });

// Line Login Success and callback
router.get("/callback", lineLoginCtrl.lineToken);

module.exports = router;
