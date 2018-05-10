const lineLoginModule = require('../modules/lineLogin.module');

const lineToken = (req, res, next) => {
  lineLoginModule.getLineToken(req.query.code).then((result) => {
    // 取得 access_token 
    res.send(result);
  })
}

module.exports = { lineToken };
