define([
	'jquery'
	, 'handlebars'
	, 'common/helper'
	, 'common/util'
	, 'homeWork/views/DealView'
	], 
	function(
		$
		, Handlebars
		, Helper
		, util
		, DealView
		){
	return DealListView  = function(){
		this.init = function(_object){
			console.log('_object ================= ',_object)
			this.$wraperElement = $(_object.wrapSelecter);
			this.wraperElement  = this.$wraperElement[0];
			$(this).on("fetch", this._renderAll);
		};
		
		this._renderAll = function(){
			var json = this.collection.toJSON();
			var html = []; 
			
			$(json).each($.proxy(function(index, value){
				html.push(this._makeDomDealList(value));
			},this));
			this.$wraperElement.append(html.join(""));
		};
		
		this._makeDomDealList = function( dealModels ){
			var dealviewUl = this.$wraperElement.empty(),
				dealviewLi = '',
				dealView = new DealView( this ),
				dealJson = dealModels;//.deals;
				
			for (var index in dealModels){
				dealviewLi += '<li class="dealview-li">';
				dealviewLi += 	dealView.render( dealJson[index].toJSON() );//this._makeDomDealItem( item );
				dealviewLi += '</li>';
			}
			return dealviewLi;
		};
	};
});