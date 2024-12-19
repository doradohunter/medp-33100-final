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
    console.log('async put called')
    console.log(req.body);
    try {
        const db = req.app.locals.db;
        await db.collection('Posts')
            .updateOne(
                {img: req.body.img},
                {$set: {title: req.body.title}}
            )
        await db.collection('Posts')
            .updateOne(
                {img: req.body.img},
                {$set: {story: req.body.story}}
            );
    } catch (error) {
        console.log(error);
    }
    res.send('Successful!')
})

router.delete('/', async function (req, res) {
   console.log('this function is being called')
    try{
        const db = req.app.locals.db;
        await db.collection('Posts')
            .deleteOne(
            {img: req.body.img}
            )
    } catch (error){
        console.log(error)
    }
    res.send('Success!')
})

module.exports = router;


