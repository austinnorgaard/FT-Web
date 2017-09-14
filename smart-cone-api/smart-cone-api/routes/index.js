var express = require('express');
var router = express.Router();

// const io_singleton = require("../io_singleton.js");

// var io_single = new io_singleton.IOSingleton();
// var io = io_single.getIo();

// var my_socket;
var io = require('socket.io').listen(4001);
var currentSocket = null;

io.sockets.on('connection', function (socket) {
    console.log('Connection!');
    currentSocket = socket;
    socket.on('test', function(data) {
        console.log('test hit!');
        console.log(data);
    });
});




/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

cone_data = {
    cones: [
        {
            "name": "Start Cone",
            "ip_address": "192.168.1.11",
            "id": 1
        },
        {
            "name": "Cone 1",
            "ip_address": "192.168.1.12",
            "id": 2
        },
        {
            "name": "Cone 2",
            "ip_address": "192.168.1.13",
            "id": 3
        },
        {
            "name": "Cone 3",
            "ip_address": "192.168.1.14",
            "id": 4
        },
        {
            "name": "Cone 4",
            "ip_address": "192.168.1.15",
            "id": 5
        }
    ]
}
// mapping from player -> cone list they are running
player_session_data = []

router.post('/set_player_data', function(req, res, next) {
    console.log('SetPlayerData');
    player_session_data = req.body.sessions;
    console.log(player_session_data);
    if (player_session_data.length === 0) {
        console.log("Player session state is empty!");
    } else {
        console.log("Entries for " + player_session_data.length + " player(s) found.");
    }

    res.end();
});

router.get('/get_player_data', function(req, res, next) {
    res.end(JSON.stringify(player_session_data));
});

router.get('/get_cones', function(req, res, next) {
    res.end(JSON.stringify(cone_data, null, '\t'));
});

player_data = {
    players: [
        {
            "name" : "Keaton",
            "id": 1,
        },
        {
            "name": "Tom Brady",
            "id": 2
        }
    ]
}

router.get('/get_players', function(req, res, next) {
    res.end(JSON.stringify(player_data, null, '\t'));
});

router.get('/test', function(req, res, next) {
    currentSocket.emit('test2', {message: 'This message from the API!'});
    res.end();
});

router.get('/get_session_state', function(req, res, next) {

});

module.exports = router;
