var express = require('express');
var router = express.Router();
const {ObjectId} = require('mongodb');

/* GET  listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function (req, res) {
  console.log(req.body);
  try {
    const db = req.app.locals.db;
    const newReview = {
      _id: new ObjectId(),
      restaurantName: req.body.restaurantName,
      rating: req.body.rating,
      notes: req.body.notes,
      tags: req.body.tags
    };

    console.log(newReview);
    const name = req.body.name;
    const existingUser = await db.collection('Users').findOne({ name: name });
    if(!existingUser) {
        // If the user doesn't exist, create a new user
        const newUser = {
          _id: new ObjectId(),
          name: req.body.name,
          posts: []
  
        };
        await db.collection('Users').insertOne(newUser)
    }


    const addedReview = await db.collection('Review').insertOne(newReview)
    await db.collection('Users').updateOne(
        { name: name },  // Match user by their name
        { $push: { posts: addedReview.insertedId }}
    )


    res.send('Sucessfully created new Review')
  } catch(error){
    console.log(error)
  }
})
module.exports = router;