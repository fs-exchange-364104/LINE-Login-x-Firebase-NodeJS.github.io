const app = require('express')();
const lineLogin = require('./route/lineLogin.route');


require('dotenv').config();


app.use('/line/login', lineLogin);



app.listen(process.env.PORT || 5000, () => {
  console.log(`server started on ${process.env.PORT || 5000} PORT`);
});
