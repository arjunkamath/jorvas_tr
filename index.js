var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser')

app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use( bodyParser.json() );       // to support JSON-encoded bodies

//app.use(express.urlencoded());
//app.use(express.json());      // if needed

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM flexim_data', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
})

app.post('/saveData', function (request, response){
    console.log("Submit form" + request.body);
    response.render('pages/index');
});