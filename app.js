var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://appxc.com');
const repl = require('repl');
var myteleid =  ''+parseInt(Math.random() * 99999);
console.log('my teleid',myteleid,"\nusage: send('text','peer teleid')" );


repl.start('> ').context.send = function(text,peerteleid){
  client.publish(''+peerteleid, text+ ' from '+myteleid);
  return 'ok'
};

client.on('connect', function () {
  client.subscribe(myteleid);
});

client.on('message', function (topic, message) {
  console.log('received:',message.toString());
});