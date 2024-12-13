var express = require('express');
var router = express.Router();
const { ObjectId, Timestamp } = require('mongodb')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async function (req, res) {
    try {
        const db = req.app.locals.db;
        const newEntry = {
            game_name: req.body.game_name,
            image_url: req.body.image_url,
            author: req.body.author,
            platform: req.body.platform,
            entry_text: req.body.entry_text,
            date_created: new Timestamp({ t: Math.floor(Date.now() / 1000), i: 0 })
        }
        await db.collection('entries')
            .insertOne(newEntry)
        console.log('entry successfully added!')

        res.send('entry successfully added!')
    } catch (error) {
        console.log('error when adding new entry!')
    }
})

router.put('/', async function(req, res){
    console.log('pulling!~')
    try {
        const db = req.app.locals.db;
        await db.collection('entries')
            .updateOne(
                {_id: new ObjectId(req.body.id)},
                {$set: {
                    game_name: req.body.game_name,
                    image_url: req.body.image_url,
                    entry_text: req.body.entry_text,
                    date_created: new Timestamp({ t: Math.floor(Date.now() / 1000), i: 0 })
                }}
            )
        console.log(test)
    } catch (error) {
        console.log('error when updating!!!')
    }
})

router.delete('/:id', async function (req, res){
    try {
        const db = req.app.locals.db;
        await db.collection('entries')
            .deleteOne({_id: new ObjectId(req.params.id)})
    } catch (error) {
        console.log('error when deleting data!!!')
    }
})

module.exports = router;