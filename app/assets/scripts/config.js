( 
	function () {

		alert('teste');

		var paths = {
			lerolero: 'views/lerolero'
		}; 

		var shim = {

		};

		requirejs.config({
			"baseUrl": "/app/assets/scripts/",
			"paths": paths,
			"shim": shim
		});

		console.log(requirejs);
	} 
)();


require(['lerolero'], function(lerolero){
	console.log(lerolero);
});