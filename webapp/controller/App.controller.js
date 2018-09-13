sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function (Controller, Filter, FilterOperator, JSONModel, MessageToast) {
	"use strict";
	var aCountry = [];
	var oCountryItem1 = new sap.ui.core.Item({
		key: "",
		text: "ALL"
	});
	var oCountryItem2 = new sap.ui.core.Item({
		key: "China",
		text: "China"
	});
	var oCountryItem3 = new sap.ui.core.Item({
		key: "Germany",
		text: "Germany"
	});
	var oCountryItem4 = new sap.ui.core.Item({
		key: "India",
		text: "India"
	});
	var oCountryItem5 = new sap.ui.core.Item({
		key: "UK",
		text: "United Kingdom"
	});
	var oCountryItem6 = new sap.ui.core.Item({
		key: "Spain",
		text: "Spain"
	});
	aCountry.push(oCountryItem1, oCountryItem2, oCountryItem3, oCountryItem4, oCountryItem5, oCountryItem6);

	var aTeam = [];
	var oTeamItem1 = new sap.ui.core.Item({
		key: "",
		text: "ALL"
	});
	var oTeamItem2 = new sap.ui.core.Item({
		key: "Ariba Consultancy",
		text: "Ariba Consultancy"
	});
	var oTeamItem3 = new sap.ui.core.Item({
		key: "Daimler China",
		text: "Daimler China"
	});
	var oTeamItem4 = new sap.ui.core.Item({
		key: "Offshore Development",
		text: "Offshore Development"
	});
	aTeam.push(oTeamItem1, oTeamItem2, oTeamItem3, oTeamItem4);
	return Controller.extend("ApsolutEmployee.controller.App", {
		//count for eggs
		clickCount: 0,

		//use multiple filter 
		onSelectChange: function () {
			var aCurrentFilterValues = [];
			var oSelectTeamItem = this.getView().byId("sTeam");
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectCountry));
			if (this.getSelectedItemText(this.oSelectCountry) === "China") {
				oSelectTeamItem.removeAllItems();
				aTeam.splice(0, aTeam.length);
				aTeam.push(oTeamItem1, oTeamItem2, oTeamItem3, oTeamItem4);
				$(function () {
					for (var j = 0; j < aTeam.length; j++) {
						oSelectTeamItem.addItem(aTeam[j]);
					}
				});
			}
			if (this.getSelectedItemText(this.oSelectCountry) === "") {
				oSelectTeamItem.removeAllItems();
				aTeam.splice(0, aTeam.length);
				aTeam.push(oTeamItem1, oTeamItem2, oTeamItem3, oTeamItem4);
				$(function () {
					for (var j = 0; j < aTeam.length; j++) {
						oSelectTeamItem.addItem(aTeam[j]);
					}
				});
			}
			if (this.getSelectedItemText(this.oSelectCountry) === "Germany") {
				oSelectTeamItem.removeAllItems();
				aTeam.splice(0, aTeam.length);
				aTeam.push(oTeamItem1, oTeamItem2);
				$(function () {
					for (var j = 0; j < aTeam.length; j++) {
						oSelectTeamItem.addItem(aTeam[j]);
					}
				});
			}
			if (this.getSelectedItemText(this.oSelectCountry) === "India") {
				oSelectTeamItem.removeAllItems();
				aTeam.splice(0, aTeam.length);
				aTeam.push(oTeamItem1, oTeamItem2);
				$(function () {
					for (var j = 0; j < aTeam.length; j++) {
						oSelectTeamItem.addItem(aTeam[j]);
					}
				});
			}
			if (this.getSelectedItemText(this.oSelectCountry) === "UK") {
				oSelectTeamItem.removeAllItems();
				aTeam.splice(0, aTeam.length);
				aTeam.push(oTeamItem1, oTeamItem2);
				$(function () {
					for (var j = 0; j < aTeam.length; j++) {
						oSelectTeamItem.addItem(aTeam[j]);
					}
				});
			}
			if (this.getSelectedItemText(this.oSelectCountry) === "Spain") {
				oSelectTeamItem.removeAllItems();
				aTeam.splice(0, aTeam.length);
				aTeam.push(oTeamItem1);
				$(function () {
					for (var j = 0; j < aTeam.length; j++) {
						oSelectTeamItem.addItem(aTeam[j]);
					}
				});
			}
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectTeam));
			//aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectSupplierName));
			this.filterTable(aCurrentFilterValues);
		},
		getSelect: function (sId) {
			return this.getView().byId(sId);
		},

		getSelectedItemText: function (oSelect) {
			return oSelect.getSelectedItem() ? oSelect.getSelectedItem().getKey() : "";
		},
		filterTable: function (aCurrentFilterValues) {
			this.getTableItems().filter(this.getFilters(aCurrentFilterValues));
			//this.updateFilterCriterias(this.getFilterCriteria(aCurrentFilterValues));
		},
		getTable: function () {
			return this.getView().byId("table");
		},
		getTableItems: function () {
			return this.getTable().getBinding("items");
		},

		getFilters: function (aCurrentFilterValues) {
			this.aFilters = [];
			this.aFilters = this.aKeys.map(function (sCriteria, i) {
				return new sap.ui.model.Filter(sCriteria, sap.ui.model.FilterOperator.Contains, aCurrentFilterValues[i]);
			});

			return this.aFilters;
		},

		//oninit
		onInit: function () {
			this.getToken();
			this.Filter1 = this.getView().byId("filterItem1");
			this.Filter2 = this.getView().byId("filterItem2");
			this.Filter3 = this.getView().byId("filterItem3");
			//this.Filter2.setVisible(false);
			this.Filter3.setVisible(false);
			this.aKeys = ["Country", "Team"];
			this.oSelectCountry = this.getSelect("sCountry");
			this.oSelectTeam = this.getSelect("sTeam");

			//this.getTable().addStyleClass("myCustomerClass");
			var oSelectCountryItem = this.getView().byId("sCountry");
			var oSelectTeamItem = this.getView().byId("sTeam");
			$(function () {
				for (var i = 0; i < aCountry.length; i++) {
					oSelectCountryItem.addItem(aCountry[i]);
				}
				for (var j = 0; j < aTeam.length; j++) {
					oSelectTeamItem.addItem(aTeam[j]);
				}
			});

		},
		getToken: function () {
			var self = this;
			this.oDataModel = this.getOwnerComponent().getModel();
			this.oDataModel.setHeaders({
				"X-CSRF-TOKEN": "Featch"
			});
			this.oDataModel.refreshSecurityToken(function (data, response) {
				self.token = response.headers['x-csrf-token'];
			}, function (data) {}, true);
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		toCreatePage: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("addObject");
		},
		onpress: function (oEvent) {
			//var busyDialog = new sap.m.BusyDialog({});
			//busyDialog.open();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var selectedPid = oEvent.getSource().getBindingContext().getProperty("Employeeid");
			oRouter.navTo("details", {
				employeeid: selectedPid

			});
			//busyDialog.close();
		},
		// change the Mode to deleteMode

		// deleteMode: function () {

		// 	this.dialog = new sap.m.BusyDialog("delete");
		// 	this.dialog.open();
		// 	var oTable = this.getView().byId("table");
		// 	//oTable.setMode("Delete");

		// 	this.getView().byId("cancelBtn").setVisible(true);
		// 	this.getView().byId("createBtn").setVisible(false);
		// 	this.getView().byId("deleteBtn").setVisible(false);
		// 	var deleteColumn = oTable.getColumns()[4];
		// 	var pronunctionColumn = oTable.getColumns()[3];
		// 	deleteColumn.setVisible(true);
		// 	pronunctionColumn.setVisible(false);
		// 	this.dialog.close();
		// },

		deleteMode2: function () {
			var oTable = this.getView().byId("table");
			oTable.setMode("Delete");
			this.getView().byId("cancelBtn").setVisible(true);
			this.getView().byId("createBtn").setVisible(false);
			this.getView().byId("deleteBtn").setVisible(false);
			var listItem = this.getView().byId("ColumnItem");
			listItem.setType('Active');
		},
		deleteData: function (oEvent) {
			this.oDataModel = this.getOwnerComponent().getModel();
			this.oDataModel.setHeaders({
				"x-csrf-token": self.token
			});
			var sPath = oEvent.getParameter('listItem').getBindingContext().getPath();
			var employeeid = this.oDataModel.getProperty(sPath).Employeeid;
			var odefaultDataModel = this.oDataModel;
			sap.m.MessageBox.confirm(
				"Are you sure you delete this item?", {
					actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
					onClose: function (oAction) {
						if (oAction === sap.m.MessageBox.Action.OK) {
							odefaultDataModel.remove("/EMPInfoSet('" + employeeid + "')", {
								success: function (odata) {
									MessageToast.show("The item has been deleted");
								},
								error: function (odata) {
									MessageToast.show("Data deletion failed");
								}
							});
						}
					}
				}
			);
		},

		//press the delete button 
		deleteEmployeeInfo: function (oEvent) {
			this.oDataModel = this.getOwnerComponent().getModel();
			this.oDataModel.setHeaders({
				"x-csrf-token": self.token
			});
			var sPath = oEvent.getSource().getBindingContext().getPath();
			var employeeid = this.oDataModel.getProperty(sPath).employeeid;
			var odefaultDataModel = this.oDataModel;
			sap.m.MessageBox.confirm(
				"Are you sure you delete this item?", {
					actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
					onClose: function (oAction) {
						if (oAction === sap.m.MessageBox.Action.OK) {
							odefaultDataModel.remove("/EMPInfoSet('" + employeeid + "')", {
								success: function (odata) {
									MessageToast.show("The item has been deleted");
								},
								error: function (odata) {
									MessageToast.show("operation failure");
								}
							});
						}
					}
				}
			);

		},

		onCancel: function () {
			var oTable = this.getView().byId("table");
			//oTable.setMode();

			this.getView().byId("cancelBtn").setVisible(false);
			this.getView().byId("createBtn").setVisible(true);
			this.getView().byId("deleteBtn").setVisible(true);
			oTable.setMode();
			// var deleteColumn = oTable.getColumns()[4];
			// var pronunctionColumn = oTable.getColumns()[3];
			// deleteColumn.setVisible(false);
			// pronunctionColumn.setVisible(true);

		},
		onFilterProducts: function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			// retrieve list control
			var oList = this.getView().byId("table");
			// get binding for aggregation 'items'
			var oBinding = oList.getBinding("items");
			var filter2 = new sap.ui.model.Filter("Englishname", sap.ui.model.FilterOperator.Contains, sQuery);
			if (sQuery && sQuery.length > 0) {
				aFilter.push(filter2);
			}
			oBinding.filter(aFilter);
		},
		onButtonPress: function (oEvent) {
			var sName = oEvent.getSource().data("test");
			var sVoice = oEvent.getSource().data("voice");
			var oAudio = document.getElementById("audio");
			var nEmpID = oEvent.getSource().data("empid");
			oAudio.src = "/AZSAP_S4/sap/opu/odata/SAP/ZEMP_NEW_SRV/EMPmediaSet('" + nEmpID + "')/$value";
			oAudio.play();
		}
	});
});