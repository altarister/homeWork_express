define([
	'jquery'
	, 'handlebars'
	, 'common/helper'
	, 'common/util'
	, 'text!/dist/templates/DealTemplate.hbs'],
	function(
		$
		, Handlebars
		, Helper
		, util
		, dealTemplate
		){
	return DealView  = function( viewer ){
		this.init = function( model ){
			$(this).on("fetch", this.render);
		};
		
		this._makeDomDealItem = function( item ){
			item.price.result = util.price.calculateResultPrice( Number(item.price.origin), item.price.discount.unit, Number(item.price.discount.value) );
			console.log(item,'item')
			var template = Handlebars.compile(dealTemplate);
			var dealItem = template(item);
			return dealItem;
		};
		
		this.render = function( model ){
			return this._makeDomDealItem( model );
		};
	};
});