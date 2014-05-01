var Lab = require('lab');
server = require("./chat");


Lab.test('Obtaining a valid token', function (done) {
  var options = {
          method: "POST",
          url: "/connect",
          payload: {
              username: "Test User",
              room: "Test Room"
          }
      };
    server.inject(options, function(response) {
        var result = response.result,
        payload = options.payload;
        Lab.expect(response.statusCode).to.equal(200);
        Lab.expect(result).to.have.length.above(0);
        done();
    });
});
