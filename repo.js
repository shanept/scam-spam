(function() {
    var calls = [];

    function addToRepo(call) {
        calls[call.sid] = call;
    }

    function removeFromRepo(sid) {
        delete calls[sid];
    }

    module.exports = {
        add: addToRepo,
        remove: removeFromRepo
    };
})();
