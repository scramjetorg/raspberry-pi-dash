const ws = require('ws');
const PassThrough = require('stream');


const topic = "topic";

module.exports = async function (input){
	const client = new ws('ws://localhost:3000');

	async function reader(client) {
		for await (const chunk of input) {
			client.send(chunk);
		}
  	}

	client.on('open', function open() {
		client.send('something');
	  });


  	client.on('message', function message(data) {
		console.log('client received: %s', data);
	  });

return input;
}