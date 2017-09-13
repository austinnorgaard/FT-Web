var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

cone_data = {
    cones: [
        {
            "name": "Start Cone", // always include ourselves
            "ip_address": "192.168.1.11",
            "id": 1
        },
        {
            "name": "Start Cone2", // always include ourselves
            "ip_address": "192.168.1.12",
            "id": 2
        },
        {
            "name": "Start Cone3", // always include ourselves
            "ip_address": "192.168.1.13",
            "id": 3
        },
        {
            "name": "Start Cone4", // always include ourselves
            "ip_address": "192.168.1.14",
            "id": 4
        },
        {
            "name": "Start Cone5", // always include ourselves
            "ip_address": "192.168.1.15",
            "id": 5
        }
    ]
}

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

module.exports = router;
