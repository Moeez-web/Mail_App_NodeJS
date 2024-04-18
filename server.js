const express = require('express');
const db = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser')
const authRoute = require('./src/routes/auth');
const { tokenVerification } = require('./src/middlewares/authorization.middleware')
// const google_auth = require('./src/services/google_auth');

const app = express();
app.use(cors());
const port = 3000;
//app.use(tokenVerification);
db();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
 // just import cors and use
app.use('/api/auth', authRoute);

app.listen(port, ()=> console.log(`app listen to port ${port}`));