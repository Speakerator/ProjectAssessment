sap.ui.controller("projectassessment.controller.Main", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf projectassessment.Main
*/
	onInit: function() {
		var view = this.getView();
		this.app = view.byId("theApp"); // remember the app
		
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("nav", "to", this.navToHandler, this);
		bus.subscribe("nav", "back", this.navBackHandler, this);
		bus.subscribe("nav","backTo", this.navBackToHandler, this);
		
	},
	
	navToHandler : function(channelId, eventId, data) {
		if (data && data.dest) {
			if (this.app.getPage(data.dest) === null) { // page has not yet been loaded
				jQuery.sap.log.info("now loading page '" + data.dest + "'");
				this.app.addPage(sap.ui.xmlview(data.dest, "projectassessment.view."+ data.dest));
			}
			this.app.to(data.dest, data.context);
		} else {
			jQuery.sap.log.error("Navigation Error: Invalid Data: '" + data + "' or id: '" + data.dest + "'.");
		}
	},
	
			
	//when navigating back from a page, said page is destroyed
	navBackHandler : function(channelId, eventId, data) {
		var page = this.app.getPage(data.source);
		this.app.back();
		page.destroy();
		this.app.removePage(data.caller);
	},
	
	
	navBackToHandler : function(channelId, eventId, data){
		var sourcePage = this.app.getPage(data.source);
		this.app.backToPage(data.dest, data.context);
		sourcePage.destroy();
		this.app.removePage(data.caller);
		
	},
	
	

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf projectassessment.Main
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf projectassessment.Main
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf projectassessment.Main
*/
//	onExit: function() {
//
//	}

});