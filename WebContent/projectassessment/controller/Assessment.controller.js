sap.ui.controller("projectassessment.controller.Assessment", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf projectassessment.Main
*/
	onInit: function() {
		var scenarioModel = new sap.ui.model.json.JSONModel();
		scenarioModel.loadData("projectassessment/model/scenarios.json",null,false);
		sap.ui.getCore().setModel(scenarioModel, "scenarios");
		
		var vLayout = this.getView().byId("assessment");
		vLayout.bindAggregation("content", "scenarios>/scenarios", this.createContent);
		
	},
	
	createContent: function (sId, oContext) {
var that = this;
var panel = new sap.m.Panel({width:"100%", expandable:true, expanded:false, });
		var header = new sap.m.Toolbar();
		var progress = new sap.m.ProgressIndicator({
			displayValue : {path:"scenarios>/applicableQuestions", formatter: this.getTotalNegatives}, // string
			percentValue : {path:"scenarios>/applicableQuestions", formatter: this.formatRelativeNegatives}, // float
			showValue : true
		}, this);
		header.addContent(new sap.m.Title({text:oContext.getProperty("headerText"), width:"200px"}));
		header.addContent(progress);
		panel.setHeaderToolbar(header);
		
		
		//var oTextField = new c.TextField({value:"{path:'gender', formatter:'.myGenderFormatter'} {firstName}, {lastName}"}, oController);
		
//		
//		var rYes = new sap.m.RadioButton({text:"Yes"}).setGroupName(panel.getId());
//		var rNo = new sap.m.RadioButton({text:"No"}).setGroupName(panel.getId());
//		rNo.bindProperty("selected",oContext.sPath + "/noSelected","TwoWay");
//		var hBox = new sap.m.HBox({items:[rYes, rNo]});
//		var sQuestion = new sap.m.Text({text:oContext.getProperty("text")}).addStyleClass("column1");
//
//		var fixFlex = new sap.ui.layout.FixFlex({fixFirst:false, vertical:false, minFlexSize:"300px",  fixContent:[hBox], flexContent:[sQuestion]});
//		panel.addContent(fixFlex);
		return panel;
		
		
	},
	
	getTotalNegatives: function (applicableQuestions) {
		if(!applicableQuestions){
			return;
		}
		applicableQuestions.sort();
		var totalNegative = 0;
		var questions = sap.ui.getCore().getModel().getProperty("/questions");
		var i = 0;
		for (var j = 0; j < questions.size; j++) {
			var questId = questions[x].id;//aus dem Fragebogen;
			var questAnswer = question[x].noSelected; //mit "Nein" beantwortet
			var relevQuest = applicableQuestions[i]
			if(questId ===  relevQuest && questAnswer){
				totalNegative++;
				i++;
			}
		}
		return totalNegative;
	},
	
	formatRelativeNegatives : function(applicableQuestions){
		var relativeNegatives = applicableQuestions.length / this.getTotalNegatives(applicableQuestions)*100;
		return relativeNegatives;
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