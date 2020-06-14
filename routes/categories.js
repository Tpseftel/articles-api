const auth = require ('../middleware/auth');
const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();


router.get('/', auth, async (req, res) => {
    const categories = await Category.find({}).populate('articles', 'title');
    res.send(categories);
});

module.exports = router;