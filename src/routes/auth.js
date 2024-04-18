const express = require('express');
const router = express.Router();
const { signup, signin, validUser } = require('../controller/auth');




router.get('/',( req, res, next)=>{
    console.log('done');
    res.status(200).json({ status: 'Done'});
});

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/userValid', validUser);

module.exports = router;
