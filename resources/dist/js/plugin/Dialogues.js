define(['jquery'], function($){
	'use strict';

	var Dialogue = function(dialogueWrap, _options){
		this.$dialogue  = $(dialogueWrap);
		this.options   = _options;
	};
	
	Dialogue.DEFAULTS = {
		
	};
	
	Dialogue.prototype.create = function(){
	};
	
	Dialogue.prototype.init = function( options ){
		this.options = options;
		var data = this.options.templateData;
		var contents = this.options.template(data);
		this.$dialogue.addClass(this.options.type).html(contents);
		
		this.displayController(this.$dialogue, this.options);
		this.resisterEventHandlers(this.$dialogue);
	};
	
	Dialogue.prototype.hide = function($escape){
	
	};
	
	Dialogue.prototype.destroy = function($escape){
		this.$element.data('ui.pluginName', null);
		this.removeEventHandlers();
	};
	
	Dialogue.prototype.layerCloss = function( $dialogue ){
		$('body').css({
			overflow: 'inherit',
			width: 'auto',
			height: 'auto'
		});
		$dialogue.off();
		$dialogue.hide();
		$dialogue.remove();
		$dialogue.data('ui.pluginName', null);
		this.removeEventHandlers();
		this.options.collback();
	};
	
	Dialogue.prototype.displayController = function( $dialogue, options ){
		var contentSize = this.getContentSize( $dialogue );
		var windowSize = this.getWindowSize();
		var $layerContent = $dialogue.find('.layer-content');
		var $modalLayerDim = $dialogue.find('.modalLayer-dim');
		
		this.changeCartViewType($dialogue, options.type);
		if( $dialogue.hasClass( 'modal' ) ){
			this.displayModal($dialogue, windowSize, $modalLayerDim);
			this.displayModalContent(windowSize, $layerContent, contentSize);
			this.cropDocument(windowSize);
		}else{
			this.displayModaless(this.options.opener, $dialogue, contentSize, $modalLayerDim);
			this.displayModalessContent($layerContent);
		};
	};
	
	Dialogue.prototype.changeCartViewType = function( $dialogue, cartViewType ){
		if(cartViewType === 'modal'){
			$dialogue.removeClass('modeless').addClass('modal');
		}else{
			$dialogue.removeClass('modal').addClass('modeless');
		}
	};
	
	Dialogue.prototype.getWindowSize = function(){
		var $window = $(window);
		return {w:$window.width(), h:$window.height()};
	};
	
	Dialogue.prototype.getContentSize = function( $dialogue ){
		var $dialogueContent = $dialogue.find('.layer-content');
		$dialogueContent.show();
		return {w:$dialogueContent.width(), h:$dialogueContent.height()};
	};
	
	Dialogue.prototype.cropDocument = function(windowSize){
		$('body').css({
			overflow: 'hidden',
			width: windowSize.w,
			height: windowSize.h
		});
	};
		
	Dialogue.prototype.displayModal = function($dialogue, windowSize, $modalLayerDim){
		$dialogue.css({
			left : 0,
			top : 0,
			width: windowSize.w,
			height: windowSize.h
		});
		$dialogue.show();
		$modalLayerDim.show();
	};
	
	Dialogue.prototype.displayModalContent = function(windowSize, $layerContent, contentSize){
		$layerContent.css({
			left : windowSize.w / 2 - contentSize.w / 2,
			top : windowSize.h / 2 - contentSize.h / 2
		});
	};
	
	Dialogue.prototype.displayModaless = function($opener, $dialogue, contentSize, $modalLayerDim){
		var selecterPosition = $opener.parent().position();
		
		$dialogue.css({
			left : selecterPosition.left,
			top : selecterPosition.top,
			width : contentSize.w,
			height : contentSize.h
		});
		$dialogue.show();
		$modalLayerDim.hide();
	};
		
	Dialogue.prototype.displayModalessContent = function($layerContent){
		$layerContent.css({
			left : 0,
			top : 0
		});
	};
		
	Dialogue.prototype.resisterEventHandlers = function($dialogue){
		var self = this;
		$('body').on('click',function(e){
			self.layerCloss( $dialogue );
		});
		
		$dialogue.on('click',function(e){
			e.stopPropagation();
		});
		
		$dialogue.on('click.dialogue.closing','.layer-closing', function(e){
			e.stopPropagation();
			self.layerCloss( $dialogue );
		});
		
		$dialogue.on('click.dialogue.closing','.modalLayer-dim', function(e){
			e.stopPropagation();
			self.layerCloss( $dialogue );
		});
		
		$(window).resize(function(){
			 if( self.$dialogue.is(':visible') ){
				self.displayController( self.$dialogue );
			}
		});
	};
 	
	Dialogue.prototype.removeEventHandlers = function($dialogue){
		$('body').off('click'); 
	};
	
	$.dialogue = function(options){
		var $dialogueWrap;
		var DialogueID = 'Dialogue_' + (options.isMulti? options.id : options.openWraper);
		
		if( $('#'+DialogueID).length === 0 ){
			$dialogueWrap = $('<div>').prop('id',DialogueID)
				.addClass('dialogue modalLayer-detailDealView');
			$('body').append($dialogueWrap);
		}else{
			$dialogueWrap = $('#'+DialogueID);
		}
		return $dialogueWrap.dialogue(options);
	};
	
	$.fn.dialogue = function(_options){
		return this.each(function(){
			var $this   = $(this);
			var data    = $this.data('ui.dialogue');
			var options = $.extend({}, Dialogue.DEFAULTS, $this.data(), typeof _options == 'object' && _options);

			if(!data) $this.data('ui.dialogue', (data = new Dialogue(this, options)));
			data.init( options );
		});
	};
});;