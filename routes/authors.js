const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Author, validateAuthor} = require('../models/author');
const express = require('express');
const router = express.Router();


router.get('/me', auth, async (req, res) => {
    const author = await Author.findById(req.user._id).select('-password');
    res.send(author);
});

// Create new Author
router.post('/', async (req, res) => {
    const { error } = validateAuthor(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let author = await Author.findOne({ email: req.body.email });
    if (author) return res.status(400).send('User already registered.');
  

    author = new Author(_.pick(req.body, ['name', 'email', 'password']));
    // Hash password
    const salt = await bcrypt.genSalt(10);
    author.password = await bcrypt.hash(author.password, salt);
    await author.save();
  
    const token = author.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(author, ['_id', 'name', 'email']));
  });

  module.exports = router;