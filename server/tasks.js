var WebSocket = require('ws');
var express = require('express');
var router = express.Router();

module.exports = (repo, wss) => {
    async function updateWebsocketClients() {
        const message = JSON.stringify({
            code: 'ok',
            type: 'update',
            content: await repo.get()
        });

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    router.get('/', async (_, res) => {
        res.json(await repo.get());
    });

    router.post('/:taskId', async (req, res) => {
        try {
            await repo.markDone(req.params.taskId);
            await updateWebsocketClients();

            res.sendStatus(200);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });

    return router;
};