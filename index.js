var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
 //var errorHandler = require('express-error-handler');
var app = express();

//app.set('view engine', 'ejs');



app.use('/static',express.static(__dirname +'/style.css'));
app.use('/static',express.static(__dirname +'/page.html'));


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));




app.set('port', (process.env.PORT || 5000));


app.get('/', function(request, response) {
    //var result = 'App is running'
    response.sendFile(__dirname+'/page.html');
     
	
	
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
