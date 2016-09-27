define(['jquery'], 
function($){
	return DealCollection  = function(){
		this.dealData = '';
		this.model    = '';
		this.view     = '';
		this.records  = [];

        this.messages = {
            SYSTEM_ERROR : 'SYSTEM_ERROR'
        }
		
		this.init = function(_object){
			this.model = _object.model; // Function
			this.view  = _object.view;  // instance
            console.log('aaa')
			this.view.model = this.model;
			this.view.collection = this;
		};
		
		this.fetch = function(_ajaxOptions){
			//this.getDealData(_ajaxOptions, 'fetch');
            this.sendAjax(_ajaxOptions, 'fetch');
		};
		
		this.toJSON = function(){
			return $.extend(true, {}, this.records);
		};

        this.sendAjax = function(ajaxOptions, eventType) {
            //console.log(ajaxOptions)
            var self = this;
            $.ajax({
                type : ajaxOptions.type,
                data : '',
                url  : ajaxOptions.url
            })
            .done(function(result){
                if (result.success) {
                    self.makeModelData(result.data);
                    $(self.view).trigger(eventType);
                } else {
                    alert(result.message);
                }
            })
            .fail(function(xhr, status, error) {
                console.log('xhr(',xhr,')  status(', status,') error(', error)
                alert(self.messages.SYSTEM_ERROR);
            });
        };
        
        this.makeModelData = function(dealData){
        	$.each(dealData, $.proxy(function(index, value){
        		this.records.push(new this.model(value));
        	},this));       	
        };
        
        this.getDealModel = function( dealId ){
        	for (var index in this.records){
        		if(this.records[index].toJSON().id === dealId){
        			return this.records[index];
        		}
        	}
        	
        };
	};
});