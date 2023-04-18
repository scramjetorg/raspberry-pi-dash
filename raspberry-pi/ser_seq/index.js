const express = require('express');
const expressWs = require('express-ws');
const ws = require('ws');
var http = require('http');
const { Readable } = require('stream');

module.exports =[
  { requires: "pipe", contentType: 'text/plain' },
  function(input) {
  async function reader() {
    for await (const chunk of input) {
      console.log("loopik");
      try {
        counter = 0;
        wsServer.clients.forEach(function (client) {
          // if (client !== ws && client.readyState === WebSocket.OPEN) {
          //   console.log("test1");
          //   client.send(data);
          // } 
          client.send(chunk);
        });
        }
        catch{}}
  }
  const app = express();
  const wsServer = new ws.Server({ noServer: true });
  wsServer.on('connection', socket => {
    console.log("connected");
    socket.on('message', message => console.log('server recevied: %s', message));
});

const server = app.listen(3000);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
  reader();
  return input;
  }
];
