const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    // Get articles
    res.send('All articles');

});

//  Create new article
router.post('/', async (req, res) => {

});

// Update article
router.put('/:id', async (req, res) => {

});

module.exports = router;