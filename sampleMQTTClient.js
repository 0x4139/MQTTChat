var mqtt = require('mqtt')

client = mqtt.createClient(1883, 'test.mosquitto.org');

client.subscribe('room/test-room/join');

client.on('message', function (topic, message) {
  console.log(message);
});
