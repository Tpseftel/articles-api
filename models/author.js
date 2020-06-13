const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const  mongooose = require('mongoose');

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const author_schema = new mongooose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 250,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
        validate: {
            validator: validateEmail,
            message: 'Validation Error: This is not a valid email! '
        }
    },
});

author_schema.methods.generateAuthToken = function () {
    // FIXME: Add private key from config
    // const private_key = config.get('jwtPrivateKey');
    const token = jwt.sign({ name: this.name }, 'private_key', { expiresIn: '1h' });
    return token;
};

const Author = mongooose.model('Author', author_schema);

function validateAuthor(author) { 
    const schema = Joi.object({
        name: Joi.string().min(3).max(250).required(),
        password: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email()
    });
    return schema.validate(author);
}

module.exports.Author = Author;
module.exports.validateAuthor = validateAuthor;
