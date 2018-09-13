sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"ApsolutEmployee/model/formatter",
	"sap/m/MessageToast"
], function (Controller, formatter, MessageToast) {
	"use strict";
	return Controller.extend("ApsolutEmployee.controller.addObject", {
		formatter: formatter,
		onInit: function () {
			var ReportName = [{
				name: "Sirui Liu"
			}, {
				name: "Xiaole Wang"
			}, {
				name: "Bo Su"
			}, {
				name: "Yang Liu"
			}, {
				name: "Jingxin Cao"
			}, {
				name: ""
			}];
			var oReportModel = new sap.ui.model.json.JSONModel();
			oReportModel.setData(ReportName);
			this.getView().setModel(oReportModel, "ReportName");
			var CountryName = [{
				name: "China"
			}, {
				name: "Germany"
			}, {
				name: "India"
			}, {
				name: "United Kingdom"
			}, {
				name: "Spain"
			}];
			var oCountryModel = new sap.ui.model.json.JSONModel();
			oCountryModel.setData(CountryName);
			this.getView().setModel(oCountryModel, "CountryName");

			var Position = [{
				name: "Managing Director"
			}, {
				name: "Manager"
			}, {
				name: "Consultant"
			}, {
				name: "Controlling Assistant"
			}, {
				name: "Student"
			}];

			var oPositionModel = new sap.ui.model.json.JSONModel();
			oPositionModel.setData(Position);
			this.getView().setModel(oPositionModel, "Position");

			this.oDataModel = this.getOwnerComponent().getModel();
			this.getToken();
			//this.idFormat();
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		handleCountryValueHelp: function () {
			if (!this._valueCountryDialog) {
				this._valueCountryDialog = sap.ui.xmlfragment("ApsolutEmployee.view.CountryDialog", this);
				this.getView().addDependent(this._valueCountryDialog);
			}
			this._valueCountryDialog.open();
		},
		_handleCountryText: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			var oSelectCountryText = oSelectedItem.getTitle();
			this.getView().byId("CountryInput").setValue(oSelectCountryText);

		},

		handleTeamValueHelp: function () {
			if (!this._valueTeamDialog) {
				this._valueTeamDialog = sap.ui.xmlfragment("ApsolutEmployee.view.TeamDialog", this);
				this.getView().addDependent(this._valueTeamDialog);
			}
			this._valueTeamDialog.open();
			var TeamName = [{
				name: "Ariba Consultancy"
			}, {
				name: "Daimler China"
			}, {
				name: "Offshore Development"
			}, {
				name: "Internal Management"
			}];
			var oTeamName = new sap.ui.model.json.JSONModel();
			oTeamName.setData(TeamName);
			this.getView().setModel(oTeamName, "TeamName");
			var CountryItemText = this.getView().byId("CountryInput").getValue();
			var TeamDialog = sap.ui.getCore().byId("TeamDialog");
			switch (CountryItemText) {
			case "China":
				break;
			case "Germany":
				TeamDialog.removeItem(3);
				TeamDialog.removeItem(3);
				break;
			case "India":
				TeamDialog.removeItem(3);
				TeamDialog.removeItem(3);
				break;
			case "United Kingdom":
				TeamDialog.removeItem(3);
				TeamDialog.removeItem(3);
				TeamDialog.removeItem(3);
				break;
			case "Spain":
				TeamDialog.removeItem(3);
				TeamDialog.removeItem(3);
				TeamDialog.removeItem(3);
				break;
			default:
				break;
			}

		},
		_handleTeamText: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var TeamNameInput = this.getView().byId("TeamInput");
				TeamNameInput.setValue(oSelectedItem.getTitle());
			}

		},
		handlePositionValueHelp: function () {
			if (!this._PositionvalueHelpDialog) {
				this._PositionvalueHelpDialog = sap.ui.xmlfragment("ApsolutEmployee.view.PositionDialog", this);
				this.getView().addDependent(this._PositionvalueHelpDialog);
			}
			this._PositionvalueHelpDialog.open();

		},
		_handlePositionText: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var PositionInput = this.getView().byId("PositionInput");
				PositionInput.setValue(oSelectedItem.getTitle());
			}

		},
		handleReportValueHelp: function () {
			if (!this._ReportvalueHelpDialog) {
				this._ReportvalueHelpDialog = sap.ui.xmlfragment("ApsolutEmployee.view.ReportDialog", this);
				this.getView().addDependent(this._ReportvalueHelpDialog);
			}
			this._ReportvalueHelpDialog.open();
		},
		_handleReportText: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var oReportInput = this.getView().byId("rinput");
				oReportInput.setValue(oSelectedItem.getTitle());
			}

		},
		onCancel: function () {
			this.getView().byId("EnglishNameInput").setValue("").setValueState("None");
			this.getView().byId("ChineseNameInput").setValue("").setValueState("None");
			this.getView().byId("CountryInput").setValue("").setValueState("None");
			this.getView().byId("TeamInput").setValue("").setValueState("None");
			this.getView().byId("PositionInput").setValue("").setValueState("None");
			this.getView().byId("rinput").setValue("").setValueState("None");
			//this.getView().byId("imageInput").setValue("").setValueState("None");
			//this.getView().byId("pronuncuationInput").setValue("").setValueState("None");
			history.go(-1);

		},
		getToken: function () {
			var self = this;
			this.oDataModel.setHeaders({
				"X-CSRF-TOKEN": "Featch"
			});
			this.oDataModel.refreshSecurityToken(
				function (data, response) {
					self.token = response.headers['x-csrf-token'];
				},
				function (data) {}, false
			);
		},

		addEmployeeInfo: function () {
			//var empId = this.byId("empId").getValue();
			//var addId = Object.keys(this.oDataModel.oData).length + 1;
			var self = this;
			var englishName = this.byId("EnglishNameInput").getValue(),
				chineseName = this.byId("ChineseNameInput").getValue(),
				Country = this.byId("CountryInput").getValue(),
				Team = this.byId("TeamInput").getValue(),
				Position = this.byId("PositionInput").getValue(),
				report = this.byId("rinput").getValue();
			//imageUrl = this.byId("imageInput").getValue(),
			//pronuncuationUrl = this.byId("pronuncuationInput").getValue();
			var oAddModel = {
				"Englishname": englishName,
				"Chinesename": chineseName,
				"Team": Team,
				"City": "",
				"Country": Country,
				"Address": "",
				"Report": report,
				"Zposition": Position
			};
			this.oDataModel.setHeaders({
				"x-csrf-token": self.token
			});

			this.oDataModel.create("/EMPInfoSet", oAddModel, {
				success: function (odata) {

					var createEmpID = odata.Employeeid;
					self.getView().byId("EnglishNameInput").setValue("");
					self.getView().byId("ChineseNameInput").setValue("");
					self.getView().byId("CountryInput").setValue("");
					self.getView().byId("TeamInput").setValue("");
					self.getView().byId("PositionInput").setValue("");
					self.getView().byId("rinput").setValue("");
					//self.getView().byId("imageInput").setValue("");
					//self.getView().byId("pronuncuationInput").setValue("");

					var oFileupload = self.getView().byId("fileUpload");
					oFileupload.setUploadUrl("/AZSAP_S4/sap/opu/odata/sap/ZEMP_NEW_SRV/EMPInfoSet('" + createEmpID + "')/Photo");
					self.onupload();
					oFileupload.destroyHeaderParameters();
					oFileupload.clear();

					var oFileuploadMedia = self.getView().byId("fileUpload2");
					oFileuploadMedia.setUploadUrl("/AZSAP_S4/sap/opu/odata/SAP/ZEMP_NEW_SRV/EMPInfoSet('" + createEmpID + "')/Media");
					self._onUploadMedia();
					oFileuploadMedia.destroyHeaderParameters();
					oFileuploadMedia.clear();
					MessageToast.show("Create Information success");
				},
				error: function (odata) {
					MessageToast.show("Create Information false");
				}
			});
		},
		_getUploadToken: function () {
			this.getOwnerComponent().getModel().refreshSecurityToken();
			var Token = this.getOwnerComponent().getModel().getHeaders()['x-csrf-token'];
			return Token;
		},

		_onUploadMedia: function () {

			var oFileUploaderMedia = this.getView().byId("fileUpload2");
			this.sToken = this._getUploadToken();
			//oFileUploader.insertHeaderParameter();
			oFileUploaderMedia.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({
				name: "x-csrf-token",
				value: this.sToken
			}));
			oFileUploaderMedia.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({
				name: "slug",
				value: oFileUploaderMedia.getValue()
			}));
			oFileUploaderMedia.upload();
		},
		onupload: function () {
			var oFileUploader = this.getView().byId("fileUpload");
			this.sToken = this._getUploadToken();
			//oFileUploader.insertHeaderParameter();
			oFileUploader.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({
				name: "x-csrf-token",
				value: this.sToken
			}));
			oFileUploader.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({
				name: "slug",
				value: oFileUploader.getValue()
			}));
			oFileUploader.upload();
		},
		handleUploadComplete: function (oEvent) {
			var sResponse = oEvent.getParameter("response");
			if (sResponse) {
				sap.m.MessageBox.show("The file has been uploaded");
			} else {
				sap.m.MessageBox.show("File upload failed");
			}
		},

		onNavBack: function () {
			// var sPreviousHash = sap.ui.core.routing.History.getInstance().getPreviousHash();
			// if (sPreviousHash !== undefined) {
			// 	this.onCancel();
			// 	history.go(-1);
			// } else {
			// 	this.getRouter().navTo("App", {}, true);
			// }
			this.onCancel();
		},
		// dialog search

		CountryDialogSearch: function (oEvent) {
			var query = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, query);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(oFilter);
		},
		teamDialogSearch: function (oEvent) {
			var query = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, query);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(oFilter);
		},
		PositionDialogSearch: function (oEvent) {
			var query = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, query);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(oFilter);
		},
		ReportDialogSearch: function (oEvent) {
			var query = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, query);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(oFilter);
		}

		// _handleCoutryCancel: function () {
		// 	this._valueCountryDialog.destroy(true);
		// },
		// _handleTemaCancel:function(){
		// 	this._valueTeamDialog.destroy(true);
		// },
		// _handlePositionCancel:function(){
		// 	this._PositionvalueHelpDialog.destroy(true);
		// },
		// _handleReportDialog:function(){
		// 	this._ReportvalueHelpDialog.destroy(true);
		// },
		// onExit:function(){
		// 	if(this._valueCountryDialog){
		// 		this._valueCountryDialog.destroy(true);
		// 	}
		// 	if(	this._valueTeamDialog){
		// 		this._valueTeamDialog.destroy(true);
		// 	}
		// 	if(this._PositionvalueHelpDialog){
		// 		this._PositionvalueHelpDialog.destroy(true);
		// 	}
		// 	if(this._ReportvalueHelpDialog){
		// 		this._ReportvalueHelpDialog.destroy(true);
		// 	}
		// }

	});
});