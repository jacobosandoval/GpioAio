/**
 * @file
 * A simple Node.js application to read an analog input.
 *
 * Supported Intel IoT development boards are identified in the code.
 * See the `cfg-app-platform.js` file for board configuration details.
 *
 * <https://software.intel.com/en-us/xdk/docs/using-templates-nodejs-iot>
 *
 * @author Paul Fischer, Intel Corporation
 * @author Elroy Ashtian, Intel Corporation
 * @author Dan Yocom, Intel Corporation
 *
 * @copyright (c) 2016-2017, Intel Corporation
 * @license BSD-3-Clause
 * See LICENSE.md for complete license terms and conditions.
 */

/* spec jslint and jshint lines for desired JavaScript linting */
/* see http://www.jslint.com/help.html and http://jshint.com/docs */
/* jslint node:true */
/* jshint unused:true */

"use strict" ;


var APP_NAME = "IoT Analog Read" ;
//var Cfg = require("./utl/cfg-app-platform.js") ;    // get Cfg() constructor
//var cfg = new Cfg() ;                               // init and config I/O resources

console.log("\n\n\n\n\n\n") ;                       // poor man's clear console
console.log("Initializing " + APP_NAME) ;

process.on("exit", function(code) {                 // define up front, due to no "hoisting"
    clearInterval(intervalID) ;
    console.log(" ") ;
    console.log("Exiting " + APP_NAME + ", with code:", code) ;
    console.log(" ") ;
}) ;


const mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

// confirm that we have a version of libmraa and Node.js that works
// exit this app if we do not

//cfg.identify() ;                // prints some interesting platform details to console

//if( !cfg.test() ) {
//    process.exit(1) ;
//}

//if( !cfg.init() ) {
//    process.exit(2) ;
//}


// configure (initialize) our I/O pins for usage (gives us an I/O object)
// configuration is based on parameters provided by the call to cfg.init()

//cfg.io = new cfg.mraa.Aio(cfg.ioPin) ;          // construct our I/O object
//cfg.io.setBit(cfg.ioBit) ;                      // set preferred read resolution

//console.log("Using analog input pin number: " + cfg.ioPin) ;
//console.log("Analog reads returned as " + cfg.ioBit + " bit integers.") ;


// now we are going to read the analog input at a periodic interval
// connect a jumper wire to the sampled analog input and touch it to
// a +1.8V, +3.3V, +5V or GND input to change the value read by the analog input

var myLed = new mraa.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Galileo Gen1 & Gen2)
myLed.dir(mraa.DIR_OUT); //set the gpio direction to output
var ledState = true; //Boolean to hold the state of Led

var analogPin0 = new mraa.Aio(0); //setup access analog inpuput pin 0
var analogValue = analogPin0.read(); //read the value of the analog pin
//var analogValueFloat = analogPin0.readFloat(); //read the pin value as a float
//console.log(analogValue); //write the value of the analog pin to the console

//var analogIn ;
var periodicActivity = function() {
    analogValue = analogPin0.read() ;                      // get the current value from the analog input
if(analogValue>300){  
    process.stdout.write(analogValue + " ") ;          // write a stream of analog values to the console
    myLed.write(1); 
    console.log("0") ;
}
else{
    myLed.write(0);
    console.log("1") ;   
}
    
} ;
var intervalID = setInterval(periodicActivity, 100) ;  // start the periodic read
