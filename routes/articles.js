const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
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