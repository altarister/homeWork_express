require.config({
   paths: {
       jquery: '/vendor/jquery/1.11.3/jquery.min',
       handlebars: '/vendor/handlebars/handlebars-v2.0.0',
       text: '/vendor/requirejs/text'
   },
   shim: {

   }
});

require(['jquery'], function($){
	//ajax로 데이터를 받아와야 하는 모듈을 정의 하는 attr
	var $controllers = $('[data-controller]');
	console.log('$controllers =+=+!!!!=ㄹㄹㄹ=============== ',$controllers);


	var $component = $('[data-component]');
	console.log('$component =+=+!!!!=ㄹㄹㄹ=============== ',$component);
    $controllers.each(function( index, element ){
		var url = $(element).data().controller;
		console.log('url = ',url)
		//상대 경로로 정의 되어 있는 파일의 컨트롤러를 실행 합니다.
		require([url], function(Controller){
			//모듈덩어리 element를 이용하여 생성자를 만듭니다.
			var controller = new Controller( element );
            controller.init();
		});
	});
});
