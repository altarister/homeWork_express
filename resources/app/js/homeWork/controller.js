define([
	'jquery'
	, 'handlebars'
	, 'homeWork/models/DealModel'
	, 'homeWork/collections/DealCollection'
	, 'homeWork/views/DealListView'
	, 'homeWork/views/DealView'
	, 'plugin/Dialogues'
	, 'text!/dist/templates/DealDetailDialogueTemplate.hbs'
	], 
	function(
		$
		, Handlebars
		, DealModel
		, DealCollection
		, DealListView
		, DealView
		, Dialogues
		, DealDetailDialogueTemplate
		){
	return DealListController  = function( element ){
		console.log('---------sadas--sdfsd---4-666--35')
		var dealListView,
			//상품 리스트를 만드는 view
			dealCollection;
			//상품 데이터를 수집하여 model을 만드는 collection
			
		var init = function(){
			// config
			var htmlAjaxOptions = $(element).find('.mustGetRequestData').attr("data-request");
			// 모듈에서 사용될 ajax Request에 필요한 정보들을 약속된 mustGetRequestData class에서 attr로 정의 된것을 받아 옵니다.

			//console.log('htmlAjaxOptions = ',htmlAjaxOptions)
			var ajaxOptions = $.extend(true, {}, {
				url : '',
				type : 'GET',
				cache : 'true',
				data : '',
				dataType : 'json'
			}, JSON.parse(htmlAjaxOptions));
			//받아온 값을 기본데이터에 넣어 변수로 저장 합니다. 
			//  view
			// console.log('=================================')
			// console.log(ajaxOptions)
			// console.log('=================================')

			var dealListView = new DealListView;
			dealListView.init({
				wrapSelecter : '#dealview-ul'
			});
			//view를 만들고 나서 append될 ID혹은 클레스명을 인자로 넣어서 init을 실행 합니다. 
			$(dealListView).on("fetch", function(){
				changeDealView();
			});
			//deal이 완성되면 "fetch"event로 호출된 event를 등록 합니다.
			// collection
			dealCollection = new DealCollection;
			dealCollection.init({
				model : DealModel,
				view  : dealListView
			});
			//dealCollection instance의 init함수에 model과 view를 인자로 줍니다.
			dealCollection.fetch(ajaxOptions);
			//dealCollection 최초 구동으로 ajaxOptions데이터로 통신후 fetch호
			resisterViewSelecterEventHandlers();
		};
		
		var resisterViewSelecterEventHandlers = function(){
			$('#dealview-selecter').on('click.selectViewType', 'a', $.proxy(function(e){
				e.preventDefault();
				var $element = $(e.currentTarget);
				changeDealView( $element );	
			},this));
		};
		
		var changeDealContentView = function( $targgetElement, viewType ){
			$($targgetElement).attr('class','').addClass('dealview-'+viewType);
		};
		
		var changeDealSelecterView = function( $element ){
			var $dealViewSelecter = $('#dealview-selecter');
			$dealViewSelecter.find('.dealview-selecter-link').removeClass('selected');
			$element.addClass('selected');
		};
		
		var changeDealView = function( $element ){
			$element ? $element : $element = $('#dealview-selecter').find('.selected');
			
			var $targgetElement = $element.attr('href'),
				viewType = $element.attr('data-select-view'),
				cartViewType = $element.attr('data-cart-view-type');
			
			changeDealContentView( $targgetElement, viewType );
			changeDealSelecterView( $element );
			removeDealEventHandlers();
			if(viewType !== 'nonestyle'){
				resisterDealEventHandlers();
			}
		};
		
		var getDialogueType = function(){
			return $('#dealview-selecter').find('.selected').attr('data-cart-view-type');
		};
		
		var resisterDealEventHandlers = function(){
			$('#dealview-content').on('click.selectDeal', 'a', $.proxy(function(e){
				//다이얼로그를 여는이벤트에서는 이벤트 버블링을 막아야 다른 모달리스다이얼로그가 다른 부분을 클릭 하면 닫힌다. 
				e.stopPropagation();
				e.preventDefault();
				var $element = $(e.currentTarget),
					id = $element.closest('.deal-item').prop('id'),
					dealModel = dealCollection.getDealModel(id),
					dealView =  new DealView(),
					dialogueType = getDialogueType();
					
				$.dialogue({
					id : id,
					isMulti : false,
					opener : $element,
					openWraper : 'dealview-content', 
					template : function(json){
						var template = Handlebars.compile(DealDetailDialogueTemplate);
						return template(json);
					},
					templateData : {
						title : "자세히 보기",
						contents : dealView.render(dealModel.toJSON())
					},
					type : dialogueType,
					collback : function(){
						removeDealEventHandlers();
						resisterDealEventHandlers();
					}
				});	
			},this));	
		};
		
		var removeDealEventHandlers = function(){
			$('#dealview-content').off('click.selectDeal');
		};
		
		return {
			init : init
		};
	};
});
