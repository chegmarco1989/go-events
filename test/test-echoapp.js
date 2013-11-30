var fs = require("fs");
var assert = require("assert");
var vumigo = require("vumigo_v01");
var app = require("../lib/go-tps");


describe("sandbox app.api", function() {
    // checks app was attached to api correctly
    it("should exist", function() {
        assert.ok(app.api);
    });
    it("should have an on_inbound_message method", function() {
        assert.ok(app.api.on_inbound_message);
    });
    it("should have an on_inbound_event method", function() {
        assert.ok(app.api.on_inbound_event);
    });
});


describe("GoEventsStateCreator", function() {
    var tester;

    beforeEach(function() {
        tester = new vumigo.test_utils.ImTester(app.api, {async: true});
    });

    it("should do something", function (done) {
        var p = tester.check_state({
            user: null,
            content: null,
            next_state: "thing",
            response: "^$"
        });
        p.then(done, done);
    });
});
