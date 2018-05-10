const request = require('request');

require('dotenv').config();

/**
 * Line Login 並取得 access_token
 * @param code 
 */
const getLineToken = (code) => {
  return new Promise((resolve, reject) => {
    const formData = {
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.LINE_LOGIN_CALLBACK_URL,
      client_id: process.env.LINE_LOGIN_CHANNEL_ID,
      client_secret: process.env.LINE_LOGIN_CHANNEL_SECRET
    }
    request.post({ url: 'https://api.line.me/oauth2/v2.1/token', form: formData }, (err, httpResponse, body) => {
      if (err) {
        console.error('login failed:', err);
        reject(err);
      } console.log(process.env.PORT);
      // 登入成功並取得 access_token 回傳
      resolve(JSON.parse(body));
    });
  });
}

const getLineProfile = (accessToken) => {
  return new Promise((resolve, reject) => {
    request.get({
      url: 'https://api.line.me/v2/profile',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }, (err, httpResponse, body) => {
      if (err) {
        console.error('login failed:', err);
        reject(err);
      } console.log(process.env.PORT);
      // 登入成功並取得 access_token 回傳
      resolve(JSON.parse(body));
    });
  });
}

module.exports = { getLineToken, getLineProfile };

