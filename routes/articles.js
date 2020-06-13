const debug = require('debug')('app: articles router');
const express = require('express');
const { Article, validateArticle } = require('../models/article');
const router = express.Router();
const mongoose = require('mongoose');


// Get all articles
router.get('/', async (req, res) => {
    const articles = await Article.find({}).sort('title')
        .populate('categories')
        .populate('author');
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
    // Check if article id format is valid
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid article ID format.');
    }

    // Check if there is the requested article
    let article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send('The article with the given ID was not found.');

    // Check if is valid input
    const {error} = validateArticle(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updated_article = await Article.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new:true }
    );

    res.send(updated_article);
});

module.exports = router;