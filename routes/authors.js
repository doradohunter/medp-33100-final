var express = require('express');
var router = express.Router();
//const {ObjectId} = require('mongodb')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async function (req, res) {
    try {
        const db = req.app.locals.db;
        const newAccount = {
            username: req.body.username,
            email: req.body.email,
        }
        await db.collection('authors')
            .insertOne(newAccount)
        console.log('account successfully added!')
        res.send('account successfully added!')
    } catch (error) {
        console.log('error when adding new account!')
    }

})

module.exports = router;