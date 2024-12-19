var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async function (req, res) {
    console.log(req.body);
    // res.send('sucessfully created post'); //is sent at end to client
    try {
        const db = req.app.locals.db;
        const newPost = {
            img: req.body.image,
            title: req.body.title,
            story: req.body.story,
            brand: req.body.brand
        }
        await db.collection('Posts')
            .insertOne(newPost);
        
    } catch (error) {
        console.log(error);
    }
    res.send('Successful!')
})

router.put('/', async function (req, res) {
    try {
        const db = req.app.locals.db;
        
        await db.collection('Posts')
            .updateOne(newPost);
        
    } catch (error) {
        console.log(error);
    }
    res.send('Successful!')
})

module.exports = router;
