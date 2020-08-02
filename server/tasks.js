var express = require('express');
var router = express.Router();

router.get('/', (_, res) => {
    res.json([
        {id: 1, title: 'Töm diskmaskin'},
        {id: 2, title: 'Töm diskmaskin'},
        {id: 3, title: 'Töm diskmaskin'},
        {id: 4, title: 'Rensa kattlåda'},
        {id: 5, title: 'Töm diskmaskin'},
        {id: 6, title: 'Töm diskmaskin'},
        {id: 7, title: 'Töm diskmaskin'},
        {id: 8, title: 'Töm diskmaskin'},
        {id: 9, title: 'Töm diskmaskin'},
    ]);
});

router.post('/:taskId', (req, res) => {

    res.sendStatus(200);
});

module.exports = router;