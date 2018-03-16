$(document).ready(function(){
	$('#url_shortner').submit(function(e){
		e.preventDefault();
		var u = $('#url').val();
		var k = $('#key').val();
			$.ajax({
				type: "POST",
				url: "/short",
				data: { url: u,key: k},
				success: function(data)
				{
					console.log('key: '+data);
					if(data){
						$('#result').html('<div class="alert alert-success" role="alert">You have successfully created your short URL, Here is your short URL:</div><div class="form-group"><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-link" aria-hidden="true"></span></div><input type="text" class="form-control input-sm"  id="resultKey" name="resultKey" value=https://dockurl.herokuapp.com/'+data+' readonly></div></div></p>');
					}else{
						$('#result').html('<div class="alert alert-danger" role="alert">Some error Occured !</div>');
					}			
				},
				error: function(data)
				{
					console.log('Custom URL Generate Request Failed! :(');				
				}
			});
	});
});