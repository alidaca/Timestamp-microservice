var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(process.cwd() + '/public'));

stampRouter = require('./app/timestamp');
app.use('/', stampRouter);

app.listen(port, function(){
  console.log('Listening on port '+ port +'...');
});




