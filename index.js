var express = require('express');

var app = express();

app.set('views', __dirname + '/views');
app.use(express.static(__dirname+'/public'));

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// Route for home page
app.get('/',function(req, res){
	res.sendFile('shortner.html',{root:__dirname});
});

// Array to store url and key
var url_arr = [];
var key_arr = [];

// Request from init.js to create a short url
app.post('/short', function(req, res){
	
	// Generating a key
	function makeId(){
		var text = "";
    	var combination = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    	for(var i=0; i < 5; i++)
        	text += combination.charAt(Math.floor(Math.random() * combination.length));
    	return text;
	}

	var u = req.body.url;
	var k = req.body.key;
	
	if(k == "")
		k = makeId();
	var hits = 0;
	var c = new Date();

	// Adding values in array
	url_arr.push(u);
	key_arr.push(k);
	
	console.log("Url: "+u+'\nKey: '+k+'\nHits: '+hits+'\nCreated at: '+c+'\n');
	res.send(k);
});

// To redirect
app.get('/:link', function(req, res){
	var key = req.params.link;
	console.log("redirect request for: "+key);
	// Check if the key exist
	for(var i = 0; i < key_arr.length; i++)
	{
		if(key_arr[i] == key)
        	res.redirect(url_arr[i]);
	}
	// If the url is not available in 
	res.sendFile('error.html',{root:__dirname});
});

app.get('/*',function(req, res){
	res.sendFile('error.html',{root:__dirname});
});

app.listen(process.env.PORT || 3000,function(){
	console.log('Server is up and running');
});
