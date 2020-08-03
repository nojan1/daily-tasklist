const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient
const taskRouter = require('./tasks');

const connectionString = process.env.MONGO_CONNECTIONSTRING || 'mongodb://192.168.1.3:27017';
const port = process.env.PORT || 3000;
const app = express();

// serve static assets normally
app.use(express.static(__dirname + '/../dist'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
// app.get('*', function (request, response) {
//   response.sendFile(path.resolve(__dirname, 'index.html'));
// });

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('daily-tasks');

        app.use('/tasks', taskRouter(db));

        app.listen(port);
        console.log("server started on port " + port);
    });

