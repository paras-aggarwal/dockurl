$(document).ready(function(){
	$('#url_shortner').submit(function(e){
		e.preventDefault();
		var u = $('#url').val();
		var k = $('#key').val();
			$.ajax({
				type: "POST",
				url: "/short",
				data: { url: u,key: k}
				success: function(data)
				{
					console.log('data: '+data);
					if(data){
						$('#result').html('<p class="bg-success">Alas! Here is your short url<br/><div class="form-group"><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-link" aria-hidden="true"></span></div><input type="text" class="form-control input-sm"  id="resultKey" name="resultKey" value=http://vipurl.herokuapp.com/'+data+' readonly></div></div></p>');
					}else{
						$('#result').html('<p class="bg-danger">Some Error Occured!</p>');
					}			
				},
				error: function(data)
				{
					console.log('Custom URL Generate Request Failed! :(');				
				}
			});
	});
});