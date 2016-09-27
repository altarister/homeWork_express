define(['handlebars', 'common/util'], function(Handlebars, util){
	Handlebars.registerHelper('priceValue', function(priceValue) {
		
		return util.price.insertCommaToNumber(priceValue);
	});
});