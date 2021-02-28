// Load the express module.
var express = require('express');
var app = express();
var path = require('path');
var step = 1;

// Respond to requests for / with index.html.
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '', 'index.html'));
});

// Respond to requests for /current with current step.
app.get('/current', function(req, res){
    res.send(String(step));
});

// Allow incrementing or decrementing the step via /up or /down.
app.get('/up', function(req, res){
    step++;
    res.send('New value: ' + step);
});
app.get('/down', function(req, res){
    step--;
    res.send('New value: ' + step);
});

// Listen on port 80.
app.listen(80);
console.log('Express server started successfully.');
