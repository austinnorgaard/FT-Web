var rpio = require('rpio');
// rpio.open(32, rpio.INPUT);

// var myInterval = null;

// function tilt(pin) {
    
//     if (rpio.read(pin) == rpio.LOW) {
//         console.log('TILT!');

//         socket.emit('tap', {cone_id: cone_id});

//         // turn off polling for a bit
//         rpio.poll(pin, null);
//         // clear pin state
//         rpio.close(pin);

//         if (myInterval !== null)
//             clearInterval(myInterval);

//         myInterval = setInterval(function() {
//             try {
//                 // triggers after timer expires
//                 rpio.open(32, rpio.INPUT);
//                 // restart polling
//                 rpio.poll(32, tilt, rpio.POLL_LOW);
//             } catch (e) {

//             }
//         }, 3000);
//     }
//     else {
//         // no tilt
//     }
// }

// console.log('test');
// rpio.poll(32, tilt, rpio.POLL_LOW);

export class TiltSwitchMonitor {
    private interval;
    private socket;
    private cone_id;

    constructor() {
        this.interval = null;
    }

    setOptions(socket, cone_id) {
        this.socket = socket;
        this.cone_id = cone_id;
    }

    start() {
        rpio.open(32, rpio.INPUT);
        rpio.poll(32, this.tilt, rpio.POLL_LOW);
        console.log('Tilt switch started.');
    }

    tilt(pin) {
        if (rpio.read(pin) == rpio.LOW) {
            console.log('TILT!');
    
            this.socket.emit('tap', {cone_id: this.cone_id});
    
            // turn off polling for a bit
            rpio.poll(pin, null);
            // clear pin state
            rpio.close(pin);
    
            if (this.interval !== null)
                clearInterval(this.interval);
    
            this.interval = setInterval(function() {
                try {
                    // triggers after timer expires
                    rpio.open(32, rpio.INPUT);
                    // restart polling
                    rpio.poll(32, this.tilt, rpio.POLL_LOW);
                } catch (e) {
                    console.log('Caught error.');
                }
            }, 3000);
        }
        else {
            // no til
        }
    }
}