var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function (req, res) {
  try {
    const db = req.app.locals.db;
    const newMemory = {
      title: req.body.title,
      memory: req.body.memory,
      authorId: new ObjectId(req.body.authorId),
      day: req.body.day,
    };

    await db.collection('memories').insertOne(newMemory);
    
    res.send('good!');
  } catch (error) {
    console.log(error);
  }
});

router.put('/', async function (req, res) {
  try {
    const db = req.app.locals.db;

    await db.collection('memories').updateOne(
      { _id: new ObjectId(req.body.memoryID) },
      {
        $set: {
          title: req.body.title,
          memory: req.body.memory,
          day: req.body.day,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:id', async function (req, res) {
  console.log(req.params.id);
  try {
    const db = req.app.locals.db;

    await db
      .collection('memories')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    res.send('good');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
