const express = require('express');
const expressWs = require('express-ws');
const ws = require('ws');
const { Readable } = require('stream');
const path = require("path");
const port = process.env.PORT || 3000;

const reactBuild = path.join(__dirname, "client", "build");
module.exports = [
{ requires: "pi", contentType: "text/plain" },
  function (input) {
    async function reader() {
      for await (const chunk of input) {
        try {
          if (wsServer.clients.length === 0) await new Promise(res => wsServer.once("connection", res))
        
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
