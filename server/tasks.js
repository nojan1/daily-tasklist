var express = require('express');
var router = express.Router();

module.exports = (db) => {
    const collection = db.collection('tasks');

    router.get('/', async (_, res) => {
        res.json(await collection.find({
            
        }).toArray());
    });
    
    router.post('/:taskId', (req, res) => {
    
        res.sendStatus(200);
    });
    
    return router;
};