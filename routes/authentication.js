const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const { Author } = require('../models/author');
const express = require('express');
const router = express.Router();

// Login Author
router.post('/', async (req, res) => {
    // Check if User input is valid
    const { error } = validate(req.body);
    if (error) return res.status(400).send('Invalid Email or Password.');

    const author = await Author.findOne({ email: req.body.email });
    if (!author) return res.status(400).send('Invalid Email or Password.');

    const valid_password = await bcrypt.compare(req.body.password, author.password);
    if(!valid_password) return res.status(400).send('Invalid Email or Password.');

    const token = author.generateAuthToken();
    res.send(token);

});

function validate(req) { 
    const schema = Joi.object({
        password: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email()
    });
    return schema.validate(req);
}

module.exports = router;