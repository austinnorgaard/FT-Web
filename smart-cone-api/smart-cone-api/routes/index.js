var express = require('express');
var router = express.Router();

// we are creating a server that other cones can connect
// to in order to report events like taps
var io = require('socket.io').listen(3001);

console.log('setting up SmartConeApi server');
var currentSocket = null;
var serverSocket = null;

// fires every time a cone connects to us
io.on('connection', function (socket) {
    currentSocket = socket;
    console.log('Connection!');

    currentSocket.on('test', function(data) {
        console.log('test hit!');
        console.log(data);
    });
    
    currentSocket.on('tap', function(data) {
        console.log('Cone tapped!');

        // check to see if we should trigger a cone
        if (player_session_data === null) {
            console.log('Player Session Data was null!');
            return;
        }
        console.log('Checking we need to trigger cone id: ' + data.cone_id);

        for(i = 0; i < player_session_data.length; i++) {
            // for every player, check if this current cone_is set to
            // triggered, if we find one we flip, then inform the front
            // end so they can update
            
            for(j = 0; j < player_session_data[i].cones.length;  j++) {

                if (player_session_data[i].cones[j].cone.id === data.cone_id &&
                    player_session_data[i].cones[j].triggered === false) {
                    console.log('Found a cone which hasnt been flipped yet!');
                    player_session_data[i].cones[j].triggered = true;
                    
                    serverSocket.emit('cone_state_changed');

                    return;
                }
            }
        }
    });
});

// SECTION FOR CLIENT -> FRONT-END SOCKET
// var socket = require('socket.io-client')('http://192.168.1.11:3002');

// socket.on('connect', function() {
//     console.log('Connection to front-end server.');
// });

var io_s = require('socket.io')(3002);

io_s.on('connection', function(socket) {
    console.log('Got a connection from front end');
    serverSocket = socket;
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
var player_session_data = null;

router.post('/set_player_data', function(req, res, next) {
    console.log('SetPlayerData');
    console.log(req.body);
    player_session_data = req.body;
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
