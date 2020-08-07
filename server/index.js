const express = require('express');
const ws = require('ws');
const path = require('path');
const MongoClient = require('mongodb').MongoClient
const TasksRepository = require('./tasksRepository');
const taskRouter = require('./tasks');

const connectionString = process.env.MONGO_CONNECTIONSTRING;
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/../dist'));

const handleConnection = (repo) => (socket) => {
    socket.on('message', async message => {
        try{
            const request = JSON.parse(message);
            let response = { code: 'ok', type: 'response' };

            switch(request.command) {
                case 'get':
                    response.content = await repo.get();
                    break;
                case 'markDone':
                    await repo.markDone(request.taskId);
                    response.content = request.taskId;
                    break;
                default:
                    response.code = 'badCommand';
            }

            socket.send(JSON.stringify(response)); 
        }catch {}
    });
}

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('daily-tasks');

        const repo = new TasksRepository(db);
        
        const wss = new ws.Server({ noServer: true });
        wss.on('connection', handleConnection(repo))

        app.use('/tasks', taskRouter(repo, wss));

        const server = app.listen(port);
        server.on('upgrade', (request, socket, head) => {
            wss.handleUpgrade(request, socket, head, socket => {
                wss.emit('connection', socket, request);
            });
        });

        console.log("server started on port " + port);
    });

