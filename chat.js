var Hapi = require('hapi');
var jwt = require('jsonwebtoken');
var server = Hapi.createServer('0.0.0.0', 5445);

var validate = function (decodedToken, callback) {

    console.log(decodedToken);

    if (decodedToken) {
      console.log(decodedToken.accountId.toString());
    }
    return callback(null, true, decodedToken)
};

server.pack.require('hapi-auth-jwt', function (err) {

    var privateKey = 'fiphejflhaskjfajhqwouehoqwuhewqojheqwkjebqwkh';
    server.auth.strategy('token', 'jwt', { key: privateKey,  validateFunc: validate });

    server.route({
        method: 'POST',
        path: '/connect',
        handler: function (request, reply) { reply(jwt.sign(request.payload,privateKey));}
    });
});

if (!module.parent) {
    server.start(function() {
        console.log("MQTTChat started", server.info.uri);
    });
}
module.exports = server
