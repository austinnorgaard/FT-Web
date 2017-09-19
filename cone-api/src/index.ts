import * as http from 'http';
import * as debug from 'debug';
import App from './App';

debug('ts-express:server');

// get our cone ID
var cone_id = parseInt(process.argv[2]);
console.log('Our cone id is: ' + cone_id);

var port = normalizePort(process.env.PORT || 3100);
App.set('port', port);

var server = http.createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('try connect 3000');

var socket = require('socket.io-client')('http://192.168.1.11:3001');
var monitor = null;

socket.on('connect', (monitor) =>  {
    console.log('Connection to smart-cone-api server');
});




function normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10): val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port: 'Port ' + port;
    switch(error.code) {
        case 'EACCESS':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

App.get('/probe', function(req, res, next) {
    res.end(JSON.stringify({name: "ourName", cone_id: "cone_id", ip_address: "192.168.1.22"}));
});

var rpio = require('rpio');
rpio.open(32, rpio.INPUT);

var myInterval = null;

function tilt(pin) {
    
    if (rpio.read(pin) == rpio.LOW) {
        console.log('TILT!');

        socket.emit('tap', {cone_id: cone_id});

        // turn off polling for a bit
        rpio.poll(pin, null);
        // clear pin state
        rpio.close(pin);

        if (myInterval !== null)
            clearInterval(myInterval);

        myInterval = setInterval(function() {
            try {
                // triggers after timer expires
                rpio.open(32, rpio.INPUT);
                // restart polling
                rpio.poll(32, tilt, rpio.POLL_LOW);
            } catch (e) {

            }
        }, 3000);
    }
    else {
        // no tilt
    }
}

console.log('test');
rpio.poll(32, tilt, rpio.POLL_LOW);