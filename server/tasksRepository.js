var ObjectId = require('mongodb').ObjectId

class TasksRepository {
    constructor(db) {
        this.collection = db.collection('tasks');
    }

    async get() {
        const tasks = await this.collection.find({
            $or: [
                { dateDo: { $eq: null } },
                {
                    dateDo: {
                        $lte: new Date(),
                    }
                }
            ]
        }).toArray();

        return tasks.filter(t =>
            t.dateDo === null || t.dateDone === null || t.dateDo > t.dateDone
        );
    }

    async markDone(taskId) {
        const task = await this.collection.findOne({ _id: ObjectId(taskId) })

        const dateDone = new Date();
        dateDone.setHours(0, 0, 0);

        const dateDo = new Date(dateDone.getTime() + (86400000 * task.repeatInterval))
        dateDo.setHours(0, 0, 0);

        await this.collection.updateOne(
            { _id: ObjectId(taskId) },
            {
                $set: {
                    dateDo,
                    dateDone
                }
            }
        );
    }
}

module.exports = TasksRepository;