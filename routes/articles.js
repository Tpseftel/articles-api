const express = require('express');
const { Article, validateArticle } = require('../models/article');
const router = express.Router();


router.get('/', async (req, res) => {
    const articles = await Article.find({}).sort('title');
    res.send(articles);
});

//  Create new article
router.post('/', async (req, res) => {
    // Check if user input is valid
    const { error } = validateArticle(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const article = new Article({
        title: req.body.title,
        summary: req.body.summary,
        published_status: req.body.published_status,
        published_date: req.body.published_date,
    });
    const saved_article = await article.save();
    
    res.send(saved_article);
});

// Update article
router.put('/:id', async (req, res) => {

});

module.exports = router;