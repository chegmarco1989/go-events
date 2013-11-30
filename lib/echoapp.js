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

//comment1

function GoEventsStateCreator() {
    var self = this;

    // hook called after config is read
    self.on_config_read = function(event){
        // pass
    };

    // The first state to enter
    StateCreator.call(self, 'choose_events');

    // state creators

    self.add_creator("choose_events", function(state_name, im) {
        var events_list = im.config.events;
        //console.log(im.config);

        var choices = [];
        for(var i=0; i < events_list.length; i++) {
            var value = events_list[i].name;
            choices[i] = new Choice(value, value);
        }

        return new ChoiceState(
            state_name,
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
    var end = new EndState('jozihub-end', 'Thanks - bye!', 'choose_events', {

        on_enter: function(){
            var im = this.im;
            
            var p = im.api_request('group.get_by_name',{
                name: 'JoziHub'
            });
            
            p.add_callback(function(reply){
                if(reply.success){
                var p = im.api_request('contacts.new', {
                    contact: {
                        msisdn: im.user_addr,
                        groups: [reply.group.key],
                        name: im.get_user_answer('jozihub-name'),
                        surname: im.get_user_answer('jozihub-surname')
                    }
                });
                return p;           
                }
            });
            return p;
        }
    });
    
    self.add_state(fname);
    self.add_state(surname);
    self.add_state(end);

}

// launch app
var states = new GoEventsStateCreator();
var im = new InteractionMachine(api, states);
im.attach();
