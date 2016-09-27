define(['jquery'], 
function($){
	return DealModel  = function(_object){
		var object = _object;
		//console.log('value', value);
		this.toJSON = function(){
			return $.extend(true, {}, object);
		};
		
		return this;
	};
});