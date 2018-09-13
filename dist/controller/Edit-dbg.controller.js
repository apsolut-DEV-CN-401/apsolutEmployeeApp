sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"ApsolutEmployee/model/formatter"
], function(Controller, formatter) {
	"use strict";
	// 	var oMessageTemplate = new sap.m.MessagePopoverItem({
	// 	type: '{type}',
	// 	title: '{title}',
	// 	description: '{description}',
	// 	subtitle: '{subtitle}',
	// 	counter: '{counter}'
	// });

	// var oMessagePopover = new sap.m.MessagePopover({
	// 	items: {
	// 		path: '/',
	// 		template: oMessageTemplate
	// 	}
	// });
	return Controller.extend("ApsolutEmployee.controller.Edit", {
	 formatter : formatter,
	 
   	 onInit: function() {
   	 	   
			this.getRouter().getRoute("Edit").attachPatternMatched(this._onRouteMatched, this);
		},
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		_onRouteMatched: function(oEvent) {
			debugger;
			var Pid = oEvent.getParameter("arguments").Pid - 1;
			var sPath = "/ApsolutEmployee/" + Pid;
			this.getView().bindElement({
				path: sPath
			});
		},
		onNavBack: function() {
			debugger;
			var sPreviousHash = sap.ui.core.routing.History.getInstance().getPreviousHash();
			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("details", {}, true);
			}
		},
		

		
		
		//Dialog
		onSubmit:function(){
			var oView = this.getView();
			var openDialog = oView.byId("openDialog");
			if(!openDialog){
		    openDialog = sap.ui.xmlfragment(oView.getId(), "ApsolutEmployee.view.openDialog", this);
            oView.addDependent(openDialog);
			}
			openDialog.open();
		},
		 
		onCloseDialog : function () {
			this.getView().byId("openDialog").close();
		},
		
// 	_handleError : function(oEvent) {
// 	oEvent.getSource().setValueState("Error");
//     oEvent.getSource().setValueStateText("Please input the right format of Chinese");
//     oEvent.getSource().focus();
// },


// Input validation English Name
onChangeEnglishName: function(oEvent){
	debugger;
	var sEngValue = oEvent.getSource().getValue();
	var oSubmitBtn = this.getView().byId("oSubmitBtn");
    if(this._isEnglishChar(sEngValue)){
    	oEvent.getSource().setValueState("Success");
    	oEvent.getSource().setValueStateText("Correct input format");
    	oSubmitBtn.setEnabled(true);
    }else{
    	oEvent.getSource().setValueState("Error");
    	oEvent.getSource().setValueStateText("Please input English characters");
    	oSubmitBtn.setEnabled(false);
    }
},


// Input validation Chinese Name
onChangeChineseName: function(oEvent){
	debugger;
	var sValue = oEvent.getSource().getValue();
	var oSubmitBtn = this.getView().byId("oSubmitBtn");
	if(this._isChineseChar(sValue)){
  		oEvent.getSource().setValueState("Success");
    	oEvent.getSource().setValueStateText("Correct input format");
    	oSubmitBtn.setEnabled(true);
  	}else{
  	oEvent.getSource().setValueState("Error");
  	oEvent.getSource().setValueStateText("Please input Chinese characters");
  	oSubmitBtn.setEnabled(false);
  	}
} ,

//Input validation Team
onChangeTeam : function(oEvent){
	var sTeam = oEvent.getSource().getValue();
	var oSubmitBtn = this.getView().byId("oSubmitBtn");
	if(this._isEnglishCharofTeam(sTeam)){
		oEvent.getSource().setValueState("Success");
		oEvent.getSource().setValueStateText("Correct input format");
		oSubmitBtn.setEnabled(true);
	}else{
		oEvent.getSource().setValueState("Error");
		oEvent.getSource().setValueStateText("Please input English characters");
		oSubmitBtn.setEnabled(false);
	}
},






_isChineseChar : function (sValue) {
  var chineseCharRegex = /^[\u4E00-\u9FA5]{1,5}$/;
  return sValue.match(chineseCharRegex);
},

_isEnglishChar : function(sEngValue){
	var englishCharRegex = /^[A-Za-z ]*$/;
	return sEngValue.match(englishCharRegex);
	
},
_isEnglishCharofTeam:function(sTeam){
  var englishCharRegex = /^[a-z\d\. ]+$/i;
  return sTeam.match(englishCharRegex);	
}

// handleMessagePopoverPress: function(oEvent){
//   oMessagePopover.toggle(oEvent.getSource());	
// } 










	});
});