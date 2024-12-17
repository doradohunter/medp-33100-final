const express = require('express');
const { ObjectId, Timestamp, Int32 } = require("mongodb");
const router = express.Router();
const multer = require('multer');
const uploadToCloudinary = require('../config/uploadToCloudinary');

router.get('/', async function (req, res, next) {
    try {
        const db = req.app.locals.db;
        const { sort } = req.query;

        let sortOptions = { createdAt: -1 };
        if (sort) {
            const [field, order] = sort.split(':');
            sortOptions = { [field]: order === 'asc' ? 1 : -1 };
        }
        const pipeline = [];
        pipeline.push({
            $lookup: {
                from: 'users',
                localField: 'authorID',
                foreignField: '_id',
                as: 'authors'
            }
        });

        const posts = await db.collection('posts')
            .aggregate(pipeline)
            .sort(sortOptions)
            .toArray();

        res.json(posts);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/', multer().single('image'), uploadToCloudinary, async function (req, res) {
    try {
        const db = req.app.locals.db;
        const newPost = {
            content: req.body.content,
            imageUrl: req.file.cloudinaryUrl,
            createdAt: new Timestamp({ t: Math.floor(Date.now() / 1000), i: 0 }),
            authorID: new ObjectId(req.body.authorID),
        }
        await db.collection('posts')
            .insertOne(newPost)
        res.send('Successfully created post');
    } catch (error) {
        console.log(error);
    }
})

router.put('/:id', async function (req, res) {
    try {
        const db = req.app.locals.db;
        const posts = await db.collection('posts').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { content: req.body.text } }
        );
        res.send('Post updated successfully');
    } catch (err) {
        console.error('Error updating message', err);
        res.status(500).send('Error updating message');
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const posts = await db.collection('posts').deleteOne(
            { _id: new ObjectId(req.params.id) },
        );
        if (!posts) {
            console.log('Message Not Found')
        }
        console.log('Delete Success')
    } catch (err) {
        console.log('Error')
    }
});


module.exports = router;
