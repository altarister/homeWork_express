define(['jquery'], function($){
	return {
		'price' : {
			//가격에 3자리다 콤마를 넣어주는 함수. 
			insertCommaToNumber: function( number ) {
	            if(isNaN(number)){return 0;}
	            var reg = /(^[+-]?\d+)(\d{3})/;
	            number += '';
	            while (reg.test(number)){
	                number = number.replace(reg, '$1' + ',' + '$2');
	            }
	            return number;
	       },
			//할인율/액 을 받아서 원래 가격을 가지고 할인액을 개산하는 함수 
	        calculateResultPrice: function( origin, unit, discount ){
	            var resultPrice = 0;
	            if(unit === '%'){
	            	resultPrice = origin - (origin * discount / 100);	
	            }else{
	            	resultPrice = origin - discount;
	            }
	            return resultPrice;
	        }
        },
        //0을 무료로 text넣기 
        
        
	};	
});