const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://appxc.com');
const repl = require('repl');
const myteleid =  ''+Math.floor(Math.random() * 8999+1000);
const avatars = require('./avatar')();


console.log('my teleid',myteleid,"\nusage: send('text','peer teleid')");
var myavatar = avatars[Math.floor(Math.random() * 999) % avatars.length]

var replcontext = repl.start(`[${myteleid}]${myavatar}> `).context;

replcontext.lastsender = ""
replcontext.send = function(text,peerteleid){
  client.publish(''+peerteleid,`[${myteleid}]${myavatar} says: ${text}`);
};

replcontext.reply = function(text){
  if(replcontext.lastsender!=""){
    replcontext.send(text,replcontext.lastsender)
  }else{
    console.log('no target to reply.')
  }
};

client.on('connect', function () {
  client.subscribe(myteleid);
});

client.on('message', function (topic, message) {
  var msgstring = message.toString()
  savesender(msgstring)
  console.log(`\n\x1b[22;32m [${(new Date).toString()}]\n\x1b[22;36m ${msgstring}\x1b[0m`)
});

function savesender(msgstring){
  replcontext.lastsender = msgstring.substr(1,4)
  console.log(replcontext.lastsender)
}
