const spawn = require('threads').spawn;

const thread = spawn(function(input, done) {
	var mpu9250 = require('mpu9250')
	var mpu = new mpu9250(
		{
			scaleValues: true,
			ACCEL_FS: 3
		}
	);

	if (mpu.initialize()) {
		while (true) {
			values = mpu.getMotion6();
			//console.log(`X: ${values[0]} Y: ${values[1]} Z: ${values[2]}`);
			let sum = Math.abs(values[0]) + Math.abs(values[1]) + Math.abs(values[2]);
			let avg = sum / 3;
			if (avg > 5) {
				done(avg);
				break;
			}

		}
	} else {
		console.log("Did not initialize");
	}

	console.log("Exited loop...");
});

console.log("Main process is here");

thread.send().on('message', function(response) {
	console.log(response);
}).on('exit', function() {
	console.log('done');
}).on('error', function(err) {
	console.log('error');
});
