sap.ui.define([], function () {
	"use strict";
	return {
		formatProgressState: function (applicableQuestions) {
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
		}
	};
});