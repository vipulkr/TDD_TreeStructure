 /*var http = require("http");
var server = http.createServer(function(req,res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World \n');
});
server.listen(8080);*/
// var birds = require('./birds');
var express = require('express');
// console.log(express);
/*

app.use('/birds', birds); */
var app = express();
app.get('/',function(req,res){
  // res.writeHead(200, {'Content-Type': 'text/plain'});
  res.send('Hello world !!!\n');
  console.log(req.url);
  //console.log("Am I first?");
});
app.get('/ab+cd', function(req, res) {
  res.send('ab?cd');
  console.log(req.url);
});
app.get(/a/, function(req, res) {
  res.send('/a/');
});
var server = app.listen(8080,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log(host);
  console.log(port);
  console.log("Hey I have listened");
});
