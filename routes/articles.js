const { Author } = require('../models/author');
const { Category } = require('../models/category');
const debug = require('debug')('app: articles router');
const express = require('express');
const { Article, validateArticle } = require('../models/article');
const router = express.Router();
const mongoose = require('mongoose');

// Get all articles
router.get('/', async (req, res) => {
    const articles = await Article.find({}).sort('title')
        .populate('category')
        .populate('author');
    res.send(articles);
});

//  Create new article
router.post('/', async (req, res) => {
    // Check if user input is valid
    const { error } = validateArticle(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if there is the given author
    const author = await Author.findById(req.body.author);
    if(!author) return res.status(404).send('Author not found');

    // Check if there is the given category
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(404).send('Category not found');

    let article = new Article({
        title: req.body.title,
        summary: req.body.summary,
        published_status: req.body.published_status,
        published_date: req.body.published_date,
        author: req.body.author,
        category: req.body.category
    });

    let saved_article = await article.save();
    res.send(saved_article);
});

// Update article
router.put('/:id', async (req, res) => {
    // Check if article id format is valid
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid article ID format.');
    }

    // Check if there is the requested article
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send('The article with the given ID was not found.');

    // Check if is valid input
    const {error} = validateArticle(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if(req.body.author){
        // Check if there is the given author
        const author = await Author.findById(req.body.author);
        if(!author) return res.status(404).send('Author not found');
    }

    if (req.body.category) {
        // Check if there is the given category
        const category = await Category.findById(req.body.category);
        if(!category) return res.status(404).send('Category not found');
    }

    const updated_article = await Article.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new:true }
    );

    res.send(updated_article);
});

module.exports = router;