const express = require('express');
const expressWs = require('express-ws');
const ws = require('ws');
var http = require('http');
const { Readable } = require('stream');
const path = require("path");
const port = process.env.PORT || 3000;
const queuingStrategy = new ByteLengthQueuingStrategy({ highWaterMark: 1 });

const reactBuild = path.join(__dirname, "client", "build");
module.exports = [
{ requires: "topic", contentType: 'application/x-ndjson' },
  function (input) {
    //const buffer = Array(10);
    async function reader() {
      for await (const chunk of input) {
        //buffer.push(chunk) > 10 && buffer.shift(), buffer
        //console.log(chunk);
        //console.log(queuingStrategy.size(chunk));
        try {
          if (wsServer.clients.length === 0) await new Promise(res => wsServer.once("connection", res))
          counter = 0;
          
          //ustaw buffer <-
          wsServer.clients.forEach(function (client) {

            client.send(JSON.stringify(chunk));
          });
        }
        catch { 
          await new Promise(res => setTimeout(res, 1000));
        }
      }
    }
    const app = express();
    
    const wsServer = new ws.Server({ noServer: true });
    wsServer.on('connection', socket => {
      console.log("connected");
      socket.on('message', message => console.log('server recevied: %s', message));
      reader();
    });

    const server = app.listen(port, () => console.log(`Listening on port ${port}`));
    server.on('upgrade', (request, socket, head) => {
      wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
      });
    });
    app.use(express.static(reactBuild));
    app.get("*", async(req,res)=>{
      res.sendFile(path.join(reactBuild, "index.html"));

    })

  
    
    return input;
  }
];