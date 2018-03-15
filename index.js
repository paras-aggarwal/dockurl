var express = require('express');

var app = express();

app.use(express.static(__dirname+'/public'));

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/',function(req, res){
	res.sendFile('shortner.html',{root:__dirname});
});

app.post('/short', function(req, res){
	function makeId(){
		var text = "";
    	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    	for(var i=0; i < 5; i++)
        	text += possible.charAt(Math.floor(Math.random() * possible.length));
    	return text;	
	}
	var u = req.body.url;
	var k = req.body.key;
	if(k == "")
		k = makeId();
	var hits = 0;
	var c = new Date();
	console.log("Url: "+u+'\nKey: '+k+'\nHits: '+hits+'\nCreated at: '+c+'\n');
	res.send(k);
});

app.get('/*',function(req, res){
	res.sendFile('error.html',{root:__dirname});
});

app.listen(process.env.PORT || 3000,function(){
	console.log('Server is up and running');
});
