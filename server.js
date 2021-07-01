// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


//time stamp route
app.get('/api/:dateparam?',(req,res)=>{
  //get params
  const dateparam = req.params.dateparam;
  let date;

  //check if param exist
  if(!dateparam){
    date = new Date();
  }else{
    //if not a number convert to int and create date
    if(!isNaN(dateparam)){
       date= new Date(parseInt(dateparam));
    }else{
      date = new Date(dateparam); 
    }
  }

  //In Error case
  if(date.toString()=="Invalid Date"){
    res.json({
      error: "Invalid Date"
    });
  }else{
    //Return response in required syntax
    res.json({
       unix: date.getTime(),
       utc: date.toUTCString() 
    });
  }

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
