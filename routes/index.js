var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const db = req.app.locals.db;
        const posts = await db.collection('posts')
            .aggregate([
                {
                    $lookup: {
                        from: 'users',               
                        localField: 'authorID',      
                        foreignField: '_id',          
                        as: 'authors'              
                    }
                },
            ])
            .sort({ createdAt: -1 }) 
            .toArray();
        const canvasObjects = posts.map(post => ({
            imageUrl: post.imageUrl,  
            content: post.content,    
            author: post.authors[0]?.name || 'Unknown', 
        }));

        res.render('index', { title: 'Posts', posts, canvasObjects });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
});



module.exports = router;

