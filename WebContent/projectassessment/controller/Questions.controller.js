sap.ui.controller("projectassessment.controller.Questions", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf projectassessment.Main
*/
	onInit: function() {
		var questionModel = new sap.ui.model.json.JSONModel();
		questionModel.loadData("projectassessment/model/questions.json",null,false);
		sap.ui.getCore().setModel(questionModel);
		
		var vLayout = this.getView().byId("questionnaire");
		vLayout.bindAggregation("content", "/questions", this.createContent);
		
	},
	
	createContent: function (sId, oContext) {
		
		var panel = new sap.m.Panel({width:"100%", height:"100px"});
		
		var rYes = new sap.m.RadioButton({text:"Yes"}).setGroupName(panel.getId());
		var rNo = new sap.m.RadioButton({text:"No"}).setGroupName(panel.getId());
		rNo.bindProperty("selected",oContext.sPath + "/noSelected","TwoWay");
		var hBox = new sap.m.HBox({items:[rYes, rNo]});
		var sQuestion = new sap.m.Text({text:oContext.getProperty("text")}).addStyleClass("column1");

		var fixFlex = new sap.ui.layout.FixFlex({fixFirst:false, vertical:false, minFlexSize:"300px",  fixContent:[hBox], flexContent:[sQuestion]});
		panel.addContent(fixFlex);
		return panel;
		
		
	},
	
	onSubmit:function(evt){
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			dest : "Assessment",
			context : undefined
		});
	}
	
	

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