var Hapi = require('hapi');
var jwt = require('jsonwebtoken');
var server = Hapi.createServer('0.0.0.0', 5445);
var mqtt = require('mqtt');

var client = mqtt.createClient(1883, 'test.mosquitto.org');
var privateKey = 'VODKAPUTINBALALAIKA';

var invalidTokenMSG={
  message:"Your token is invalid"
};

var requestOK={
  message:"OK"
};

server.route({
    method: 'POST',
    path: '/connect',
    handler: function (request, reply) {
      client.publish('room/'+request.payload.room+'/join', request.payload.username);
      reply(jwt.sign(request.payload,privateKey));
    }
});

server.route({
    method: 'POST',
    path: '/typing',
    handler: function (request, reply) {
      jwt.verify(request.payload.token, privateKey, function(err, decoded) {
        if(err){
            reply(invalidTokenMSG);
            return;
          }
        client.publish('room/'+decoded.room+'/typing', decoded.username);
        reply(requestOK);
      });
   }
});

server.route({
    method: 'POST',
    path: '/message',
    handler: function (request, reply) {
      jwt.verify(request.payload.token, privateKey, function(err, decoded) {
        if(err){
          reply(invalidTokenMSG);
          return;
        }

        client.publish('room/'+decoded.room+'/message', decoded.username+':'+decoded.message);
        reply(requestOK);
      });
   }
});

if (!module.parent) {
    server.start(function() {
        console.log("MQTTChat started", server.info.uri);
    });
}
module.exports = server
