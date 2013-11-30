// Go TPS
// A simple timesheet application

// imports

var vumigo = require("vumigo_v01");
var jed = require("jed");

if (typeof api === "undefined") {
    // testing hook (supplies api when it is not passed in by the real sandbox)
    var api = this.api = new vumigo.dummy_api.DummyApi();
}

var Promise = vumigo.promise.Promise;
var success = vumigo.promise.success;
var Choice = vumigo.states.Choice;
var ChoiceState = vumigo.states.ChoiceState;
var FreeText = vumigo.states.FreeText;
var EndState = vumigo.states.EndState;
var InteractionMachine = vumigo.state_machine.InteractionMachine;
var StateCreator = vumigo.state_machine.StateCreator;


function GoEventsStateCreator() {
    var self = this;

    // hook called after config is read
    self.on_config_read = function(event){
        // pass
    };

    // The first state to enter
    StateCreator.call(self, 'first_name');

    // state creators

    self.add_state(new EndState(
        "hello",
        "Hello!",
        "hello"
    ));
}

// launch app
var states = new GoEventsStateCreator();
var im = new InteractionMachine(api, states);
im.attach();
