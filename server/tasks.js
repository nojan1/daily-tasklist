var express = require('express');
var ObjectId = require('mongodb').ObjectId

var router = express.Router();

module.exports = (db) => {
    const collection = db.collection('tasks');

    router.get('/', async (_, res) => {
        const tasks = await collection.find({
            $or: [
                { dateDo: { $eq: null } },
                {
                    dateDo: {
                        $lte: new Date(),
                    }
                }
            ]
        }).toArray();

        res.json(tasks.filter(t => 
            t.dateDo === null || t.dateDone === null || t.dateDo > t.dateDone    
        ));
    });

    router.post('/:taskId', async (req, res) => {
        try {
            const task = await collection.findOne({ _id: ObjectId(req.params.taskId) })

            const dateDone = new Date();
            dateDone.setHours(0, 0, 0);

            const dateDo = new Date(dateDone.getTime() + (86400000 * task.repeatInterval))
            dateDo.setHours(0, 0, 0);

            await collection.updateOne(
                { _id: ObjectId(req.params.taskId) },
                {
                    $set: {
                        dateDo,
                        dateDone
                    }
                }
            );

            res.sendStatus(200);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });

    return router;
};