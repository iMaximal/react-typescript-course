const http = require('http');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);

const middleware = (request, response) => {
  response.sendFile(path.join(__dirname, '../build/index.html'));
};

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '../build')));

app.use('*', middleware);

server.listen(PORT);
