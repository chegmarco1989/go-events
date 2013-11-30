var fs = require("fs");
var assert = require("assert");
var vumigo = require("vumigo_v01");
var app = require("../lib/echoapp");


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
        app.api.config_store.config = {
            "events": [
                {"name":"JoziHub"},
                {"name":"Christmas Party"}
            ]
        };        
        tester = new vumigo.test_utils.ImTester(app.api, {async: true});
    });

   

    describe("if user chooses JoziHub", function  () {
        it("should go to JoziHub firstname state", function (done) {
            var p = tester.check_state({
                user: null,
                content: null,
                next_state: "jozihub-name",
                response: "Please enter your firstname"
            });
            p.then(done, done);
        });
        
    });


});

