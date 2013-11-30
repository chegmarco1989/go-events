
// handles inbound user messages
api.on_inbound_message = function (cmd) {
    var msg = cmd.msg;
    api.request("outbound.reply_to", {
        content: "Echoing: " + msg.content,
        in_reply_to: msg.message_id,
        continue_session: true,
    }, function (response) {
        // do nothing with response
    });
    api.done();
}

// handles inbound events (acks, delivery reports, etc)
api.on_inbound_event = function (cmd) {
    var event = cmd.msg;
    api.done();
}

// handles unknown commands
api.on_unknown_command = function (cmd) {
    api.log_info("Received unknown command: " + JSON.stringify(cmd));
    api.done();
}