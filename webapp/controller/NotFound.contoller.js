sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ApsolutEmployee.controller.NotFound", {
   	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
		},
   
		onInit: function () {
		
		
		},
		onNavBack:function(){
			var sPreviousHash = sap.ui.core.routing.History.getInstance().getPreviousHash();
			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("App", {}, true);
			}
			
			
		}

		// override the parent"s onNavBack (inherited from BaseController)

	});

});