var Lab = require('lab');
var server = require("./chat");

Lab.test('Obtaining a valid token', function (done) {
  var options = {
          method: "POST",
          url: "/connect",
          payload: {
              username: "Test User",
              room: "TestRoom"
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

Lab.test('Calling typing without an invalid token should return a propper response', function (done) {
  var options = {
          method: "POST",
          url: "/typing",
          payload: {
              token: "SomeInvalidToken",
          }
      };
    server.inject(options, function(response) {
        Lab.expect(response.result.message).to.equal("Your token is invalid");
        done();
    });
});

Lab.test('Calling typing with an valid token should return a propper response', function (done) {
  var requestTokenOptions = {
          method: "POST",
          url: "/connect",
          payload: {
              username: "Test User",
              room: "Test Room"
          }
  };

  server.inject(requestTokenOptions, function(response) {
    var token = response.result;
    var options = {
            method: "POST",
            url: "/typing",
            payload: {
                token: token,
            }
    };

        server.inject(options, function(response) {
            Lab.expect(response.result.message).to.equal("OK");
            done();
        });
  });


});

Lab.test('Calling message without an invalid token should return a propper response', function (done) {
  var options = {
          method: "POST",
          url: "/message",
          payload: {
              token: "SomeInvalidToken",
              message: "Some Message"
          }
      };
    server.inject(options, function(response) {
        Lab.expect(response.result.message).to.equal("Your token is invalid");
        done();
    });
});

Lab.test('Calling message with an valid token should return a propper response', function (done) {
  var requestTokenOptions = {
          method: "POST",
          url: "/connect",
          payload: {
              username: "Test User",
              room: "Test Room"
          }
  };

  server.inject(requestTokenOptions, function(response) {
    var token = response.result;
    var options = {
            method: "POST",
            url: "/message",
            payload: {
                token: token,
                message: "Some Message"
            }
    };

        server.inject(options, function(response) {
            Lab.expect(response.result.message).to.equal("OK");
            done();
        });
  });


});
