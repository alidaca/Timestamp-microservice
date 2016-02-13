var express = require('express'),
    moment = require('moment');
    //bodyParser = ('body-parser')
    

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(process.cwd() + '/../public'));

app.listen(port, function(){
  console.log('Listening on port '+ port +'...');
});


// app.get('/:timestamp', function(req,res){
//   res.send('received request for timestamp '+ req.params.timestamp);
// });


//use body-parser to get data form POST
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

var stampRouter = express.Router();

stampRouter.route('/:timestamp')
  .get(function(req,res){

    var Timestamp = {natural: "", unix: ""};
    var timestamp = req.params.timestamp;
    console.log(timestamp);

    //IF user request is a natural language date
    if (isNaN(+timestamp)){
      timestamp = moment(timestamp, ['MM-DD-YYYY', 'DD-MM-YYYY','YYYY-MM-DD', 'YYYY-DD-MM',
                         'MMMM-DD-YYYY', 'DD-MMMM-YYYY','YYYY-MMMM-DD', 'YYYY-DD-MMMM',]);
      //IF date is valid
      if(timestamp.isValid()){
        Timestamp.natural = timestamp.format('MMMM DD YYYY');
        Timestamp.unix = timestamp.format('X');

      //IF date is invalid send err msg
      }else{
        res.send('Invalid date format provided');
      }


    //Else user enterd a unix timestamp
    }else{
      Timestamp.unix = timestamp;
      //convert unix timestamp to natural language and set object property
      Timestamp.natural = moment(timestamp, 'X').format('MMMM DD YYYY');
    }

    //send JSON back to user
    res.json(Timestamp);

  });

  app.use('/', stampRouter);
