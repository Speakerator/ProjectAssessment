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
		var that = sap.ui.getCore().byId("Assessment").getController();
		var panel = new sap.m.Panel({width:"100%", expandable:true, expanded:false, });
		var header = new sap.m.Toolbar();
		header.addContent(new sap.m.Title({text:oContext.getProperty("headerText"), width:"200px"}));
		var aApplicableQuestions = oContext.getProperty("applicableQuestions");
//		var iAbsoluteNegatives = that.getTotalNegatives(aApplicableQuestions);
		var fRelativeNegatives = that.getRelativeNegatives(aApplicableQuestions);
		var valueState = that.formatValueState(fRelativeNegatives);
		var progress = new sap.m.ProgressIndicator({
			state : valueState,
			displayValue : fRelativeNegatives + "%",
			percentValue : fRelativeNegatives,// float
			height:"30px",
			width:"40%",
			showValue : true
		}, this);
		header.addContent(new sap.m.ToolbarSpacer());
		header.addContent(progress);
		panel.setHeaderToolbar(header);
		var vLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
		var oText = new sap.m.Text({text : oContext.getProperty("longText")}).addStyleClass("sapUiMediumMarginBottom");
		vLayout.addContent(oText);
		vLayout.addContent(new sap.m.Title({text:"Recommended Actions"}));
		var aActions = oContext.getProperty("actions");
		for (var l = 0; l < aActions.length; l++) {
			var actionText = aActions[l].text;
			vLayout.addContent(new sap.m.Text({text:actionText}));
		}
		panel.addContent(vLayout);
		
		
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
		for (var j = 0; j < questions.length; j++) {
			var questId = questions[j].id;//aus dem Fragebogen;
			var questAnswer = questions[j].noSelected; //mit "Nein" beantwortet
			var relevQuest = applicableQuestions[i].toString();
			if(questId ===  relevQuest){
				i++;	// id's match, move to next applicable for next round
				if(questAnswer){ //relevant question was answered "no"
					totalNegative++
				}
			}
		}
		return totalNegative;
	},
	
	getRelativeNegatives : function(applicableQuestions){
		var relativeNegatives = Math.round(this.getTotalNegatives(applicableQuestions)/applicableQuestions.length *1000)/10;
		return relativeNegatives;
	},
	
	formatValueState: function(percent){
		var valueState = null;
		if (percent>=60) {
			valueState = sap.ui.core.ValueState.Error;
		} else if (percent >= 30) {
			valueState = sap.ui.core.ValueState.Warning;
		}else{
			valueState = sap.ui.core.ValueState.Success;
		}
		return valueState;
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