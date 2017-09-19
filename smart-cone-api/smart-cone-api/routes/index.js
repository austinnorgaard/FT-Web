var express = require('express');
var router = express.Router();
var rp = require('request-promise');

// we are creating a server that other cones can connect
// to in order to report events like taps
var io = require('socket.io').listen(3001);

console.log('setting up SmartConeApi server');
var serverSocket = null;

// fires every time a cone connects to us
io.on('connection', function (socket) {
    socket = socket;
    console.log('Connection!');

    socket.on('test', function(data) {
        console.log('test hit!');
        console.log(data);
    });
    
    socket.on('tap', function(data) {
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

var io_s = require('socket.io')(3002);

io_s.on('connection', function(socket) {
    console.log('Got a connection from front end');
    serverSocket = socket;
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// either change to range when deployed, or keep this updated
possible_cone_ips = [
    "192.168.1.21",
    "192.168.1.22",
    "192.168.1.23"
];

cone_data = {
    cones: []
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

router.get('/reset_cones', function(req, res, next) {
    cone_data = {
        cones: []
    }

    serverSocket.emit('cone_added');

    res.end();
});

router.get('/refresh', function(req, res, next) {
    // start process of searching for cones
    possible_cone_ips.forEach((ip) => {
        // check if we already found this cone
        for(i = 0; i < cone_data.cones.length; ++i) {
            if (cone_data.cones[i].ip_address === ip)
                return;
        }
        console.log('sending to: ' + `http://${ip}:3100/probe`);
        var options = {
            uri: `http://${ip}:3100/probe`,
            json: true
        };

        rp(options)
            .then(function (data) {
                console.log('Probe successful.');
                // add data, tell front-end to re-get cones
                console.log('Adding: ' + data.name);
                cone_data.cones.push(data);
                serverSocket.emit('cone_added');

            })
            .catch(function (err) {
                console.log('Probe unsuccessful.');
            });
    });

    res.end();
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

router.get('/get_session_state', function(req, res, next) {

});

module.exports = router;
