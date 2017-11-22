var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
 //var errorHandler = require('express-error-handler');
var app = express();

//app.set('view engine', 'ejs');



app.use(express.static(__dirname +'/public'));



//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));




app.set('port', (process.env.PORT || 5000));


app.get('/', function(request, response) {
    //var result = 'App is running'
    response.sendFile(__dirname+'/public/page.html');
     
	
	
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/db/getRecords', function(req,res){
	
   //res.send(dbOperations.getRecords(req,res));
	var pg = require('pg');  
      
        //You can run command "heroku config" to see what is Database URL from Heroku belt
      
        var conString = process.env.DATABASE_URL;
        var client = new pg.Client(conString);
        
        client.connect();
	var string="select a.Name as accountname,c.Id,firstName,LastName,phone,email from salesforce14.contact c INNER JOIN salesforce14.account a ON a.sfid=c.accountId";

        var query = client.query(string);

        query.on("row", function (row, result) { 
            result.addRow(row); 
        });

        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
	
});
