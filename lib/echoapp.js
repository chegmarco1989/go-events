// Go TPS
// A simple timesheet application

// imports

var vumigo = require("vumigo_v01");

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
    StateCreator.call(self, 'state-hello');

    // state creators

    self.add_creator("choose_event_creator", function() {
        var events_list = im.config.events;

        var choices = [];
        for(var i=0;i<events.length;i++) {
            var value = events_list[i];
            choices[i] = new Choice(value, value);
        }

        return new ChoiceState(
            "choose_event",
            function(choice) {
                return {
                    "JoziHub": "jozihub-name",
                    "Christmas Party": "christmas-1",
                }[choice.value];
            },
            "Select a match:",
            choices);
    });

    var fname = new FreeText('jozihub-name', 'jozihub-surname', 'Please enter your firstname');
    var surname = new FreeText('jozihub-surname', 'jozihub-end', 'Please enter your surname');
    var surname = new EndState('jozihub-end', 'Thanks - bye!', null, {onexit: function(){

    }});
    
    self.add_state(fname);
    self.add_state(surname);


}

// launch app
var states = new GoEventsStateCreator();
var im = new InteractionMachine(api, states);
im.attach();
