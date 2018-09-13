sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";
	var bSubmitMark;
	return Controller.extend("ApsolutEmployee.controller.details", {
		nClick: 1,
		inputId: "",

		onInit: function () {
			//generate http header about upload photo
			// var uploadParameterModel = new sap.ui.model.json.JSONModel();
			// var uploadJSON = {
			// 	Token: this._getUploadToken(),
			// 	//"slug":this.getView().byId("fileUpload").getValue();
			// };
			// uploadParameterModel.setData(uploadJSON);
			// this.getView().setModel(uploadParameterModel, "uploadParameter");

			this.getToken();
			//report Name Mdoel
			this.oModel = new sap.ui.model.json.JSONModel();
			this.oModel.setDefaultBindingMode("OneWay");

			var ReportName = [{
				name: "Bo Su"
			}, {
				name: "Sirui Liu"
			}, {
				name: "Xiaole Wang"
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

			//Country Name Modle
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

			// find Footer control, hidding
			this.hiddingFooter = this.getView().getContent()[0].getFooter();
			this.hiddingFooter.setVisible(true);

			this.getRouter().getRoute("details").attachPatternMatched(this._onRouteMatched, this);

		},
		// onBeforeRendering: function () {

		// },
		// onAfterRendering: function () {

		// },
		// onExit: function () {

		// },

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		_onRouteMatched: function (oEvent) {
			var that = this;
			var Pid = oEvent.getParameter("arguments").employeeid;
			var nPid = Number(Pid);
			var bFlag = isNaN(nPid) ? true : false;
			var sPath = "/EMPInfoSet('" + Pid + "')";
			//var modelLength = this.getView().getModel().getProperty("/ApsolutEmployee").length;

			//var nModelLength = Object.keys(this.oDataModel.oData).length;
			//var sPhotoUrl = "/AZSAP_S4/sap/opu/odata/sap/ZEMP_NEW_SRV/EMPInfoSet('" + Pid + "')/Photo";
			//this.getView().byId("fileUpload").setUploadUrl(sPhotoUrl);

			this.getView().bindElement({
				path: sPath,
				// not Found page
				events: {
					change: function () {
						if (bFlag) {
							that.getRouter().getTargets().display("objectNotFound");
							return;
						}
					}
				}

			});
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
			// 	var defaultTeamValue = this.getView().getBindingContext().getProperty("Team");
			// 	var addTeam = {
			// 		name: defaultTeamValue
			// 	};
			// 	for(var i=0; i<TeamName.length; i++){
			// 		if(addTeam.name !== TeamName[i].name && i === TeamName.length - 1){
			// 		TeamName.unshift(addTeam);
			// 		break;
			// 	}
			// }
			var oTeamName = new sap.ui.model.json.JSONModel();
			oTeamName.setData(TeamName);
			this.getView().setModel(oTeamName, "TeamName");
			var CountryItemText = this.getView().byId("CountryInput").getValue();
			var TeamDialog = this._valueTeamDialog;
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
		_handlePositionCancel: function () {

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

		onChangeCountry: function (oEvent) {

			var oSelectedItem = oEvent.getParameter("selectedItem");
			var oSelectedItemText = oSelectedItem.getText();
			oEvent.getSource().setValue(oSelectedItemText);

		},

		//Dialog

		_handleValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var reportNameInput = this.getView().byId("rinput");
				reportNameInput.setValue(oSelectedItem.getTitle());
			}

		},

		_handleConfirmationMessageBoxPress: function (oEvent) {
			var that = this;
			sap.m.MessageBox.confirm(
				"If you return, the data you modify will be lost, \n Do you want to continue?", {
					actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
					onClose: function (oAction) {
						if (oAction === sap.m.MessageBox.Action.OK) {
							that.showDetailPage();
						}
					}
				}
			);
		},

		// when the value in the input change
		onChangeEnglishName: function (oEvent) {
			var sEngValue = oEvent.getSource().getValue();
			var oSubmitBtn = this.getView().byId("onSubmitBtn");
			if (this._isEnglishChar(sEngValue)) {
				oEvent.getSource().setValueState("None");
				//oEvent.getSource().setValueStateText("Correct input format");
				oSubmitBtn.setEnabled(true);

			} else {
				oEvent.getSource().setValueState("Error");
				oEvent.getSource().setValueStateText("Please input English characters");
				oSubmitBtn.setEnabled(false);
			}
		},

		// Input validation Chinese Name
		onChangeChineseName: function (oEvent) {
			var sValue = oEvent.getSource().getValue();
			var oSubmitBtn = this.getView().byId("onSubmitBtn");
			if (this._isChineseChar(sValue)) {
				oEvent.getSource().setValueState("None");
				//oEvent.getSource().setValueStateText("Correct input format");
				oSubmitBtn.setEnabled(true);
			} else {
				oEvent.getSource().setValueState("Error");
				oEvent.getSource().setValueStateText("Please input Chinese characters");
				oSubmitBtn.setEnabled(false);
			}
		},

		//Input validation Team
		onChangeTeam: function (oEvent) {
			var sTeam = oEvent.getSource().getValue();
			var oSubmitBtn = this.getView().byId("onSubmitBtn");
			if (this._isEnglishCharofTeam(sTeam)) {
				oEvent.getSource().setValueState("None");
				//oEvent.getSource().setValueStateText("Correct input format");
				oSubmitBtn.setEnabled(true);
			} else {
				oEvent.getSource().setValueState("Error");
				oEvent.getSource().setValueStateText("Please input English characters");
				oSubmitBtn.setEnabled(false);
			}
		},
		_isChineseChar: function (sValue) {
			var chineseCharRegex = /^[\u4E00-\u9FA5]{1,5}$/;
			return sValue.match(chineseCharRegex);
		},

		_isEnglishChar: function (sEngValue) {
			var englishCharRegex = /^[A-Za-z ]*$/;
			return sEngValue.match(englishCharRegex);

		},
		_isEnglishCharofTeam: function (sTeam) {
			var englishCharRegex = /^[a-z\d\. \D]+$/i;
			return sTeam.match(englishCharRegex);
		},

		getSelectedItemText: function (oSelect) {
			return oSelect.getSelectedItem() ? oSelect.getSelectedItem().getKey() : "";
		},
		// onEdit: function(oEvent) {
		// 	debugger;
		// 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 	var EditPid = oEvent.getSource().getBindingContext().getProperty("Pid");
		// 	oRouter.navTo("Edit", {
		// 		Pid: EditPid
		// 	});
		// },
		getSelectedController: function (sId) {
			return this.getView().byId(sId);
		},

		onEdit: function () {
			bSubmitMark = false;
			this.getSelectedController("onEditBtn").setVisible(false);
			this.getSelectedController("onSubmitBtn").setVisible(true);
			this.getSelectedController("onCancelBtn").setVisible(true);
			var oForm = this.byId("SimpleForm");
			oForm.setVisible(false);
			var oForm2 = this.byId("SimpleForm2");
			oForm2.setVisible(true);
			this.defaultEnglishName = this.getView().getBindingContext().getProperty("Englishname");
			this.defaultChineseName = this.getView().getBindingContext().getProperty("Chinesename");
			this.defaultCountry = this.getView().getBindingContext().getProperty("Country");
			this.defaultTeam = this.getView().getBindingContext().getProperty("Team");
			this.defaultPosition = this.getView().getBindingContext().getProperty("Zposition");
			this.defaultReport = this.getView().getBindingContext().getProperty("Report");
			this.getView().byId("EnglishNameInput").setValue("").setValue(this.defaultEnglishName).setValueState("None");
			this.getView().byId("ChineseNameInput").setValue("").setValue(this.defaultChineseName).setValueState("None");
			this.getView().byId("CountryInput").setValue("").setValue(this.defaultCountry).setValueState("None");
			this.getView().byId("TeamInput").setValue("").setValue(this.defaultTeam).setValueState("None");
			this.getView().byId("PositionInput").setValue("").setValue(this.defaultPosition).setValueState("None");
			this.getView().byId("rinput").setValue("").setValue(this.defaultReport).setValueState("None");
			this.getView().byId("onSubmitBtn").setEnabled(true);

		},
		onCancel: function () {
			this.showDetailPage();

		},

		onSubmit: function () {
			this.oDataModel = this.getOwnerComponent().getModel();
			var oDataModel = this.oDataModel;
			var empId = this.byId("updateId").getValue();
			var self = this;
			var englishName = this.byId("EnglishNameInput").getValue(),
				chineseName = this.byId("ChineseNameInput").getValue(),
				Country = this.byId("CountryInput").getValue(),
				Team = this.byId("TeamInput").getValue(),
				Position = this.byId("PositionInput").getValue(),
				report = this.byId("rinput").getValue();
			//voice = this.byId("pronuncuationInput").getValue(),
			//image = this.byId("imageInput").getValue();

			var oUpdateModel = {
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
			oDataModel.update("/EMPInfoSet('" + empId + "')", oUpdateModel, {
				success: function (odata) {
					//self.showDetailPage();
					bSubmitMark = true;
					self.onUpload();
					var oFileupload = self.getView().byId("fileUpload");
					self.destroyHeaderParameter();
					oFileupload.clear();

					var oFileuploadMedia = self.getView().byId("fileUpload2");
					self._onUploadMedia();
					oFileuploadMedia.destroyHeaderParameters();
					oFileuploadMedia.clear();
					MessageToast.show("update Information success");
				},
				error: function (odata) {
					MessageToast.show("update Information false");
				}
			});
			//this.onUpload();
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
		// get upload Token
		_getUploadToken: function () {
			this.getOwnerComponent().getModel().refreshSecurityToken();
			var Token = this.getOwnerComponent().getModel().getHeaders()['x-csrf-token'];
			return Token;
		},
		onCloseDialog: function () {
			this.getView().byId("openDialog").close();
		},
		imageUploadNotMatch: function (oEvent) {
			return sap.m.MessageBox.error("Upload fail, Please upload a \'jpg\' or a \'png\' type file");
		},
		mediaUploadNotMatch: function (oEvent) {
			return sap.m.MessageBox.error("Upload fail, Please upload a \'mp3\' type file");
		},

		showDetailPage: function () {
			var oForm = this.byId("SimpleForm");
			var oForm2 = this.byId("SimpleForm2");
			var editBtn = this.byId("onEditBtn");
			var cancelBtn = this.byId("onCancelBtn");
			var submitBtn = this.byId("onSubmitBtn");
			oForm.setVisible(true);
			oForm2.setVisible(false);
			editBtn.setVisible(true);
			cancelBtn.setVisible(false);
			submitBtn.setVisible(false);
		},
		showEditPage: function () {
			var oForm = this.byId("SimpleForm");
			var oForm2 = this.byId("SimpleForm2");
			var editBtn = this.byId("onEditBtn");
			var cancelBtn = this.byId("onCancelBtn");
			var submitBtn = this.byId("onSubmitBtn");
			oForm.setVisible(false);
			oForm2.setVisible(true);
			editBtn.setVisible(false);
			cancelBtn.setVisible(true);
			submitBtn.setVisible(true);
		},
		onUpload: function () {
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
		destroyHeaderParameter: function () {
			var oFileUploader = this.getView().byId("fileUpload");
			oFileUploader.destroyHeaderParameters();
		},
		handleUploadComplete: function (oEvent) {
			var sResponse = oEvent.getParameter("response");

			if (sResponse) {
				sap.m.MessageBox.show("Return Code: " + sResponse, "Response", "Response");
			} else {
				sap.m.MessageBox.show("Error");
			}
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
		},
		onNavBack: function () {
			var oForm = this.byId("SimpleForm");
			var oForm2 = this.byId("SimpleForm2");
			var sPreviousHash = sap.ui.core.routing.History.getInstance().getPreviousHash();
			if (sPreviousHash !== undefined) {
				if (oForm.getVisible()) {
					history.go(-1);
				} else if (oForm2.getVisible() && !bSubmitMark) { // bSubmitMark is mean click submit button state.
					this._handleConfirmationMessageBoxPress();
					return;
				} else if (oForm2.getVisible() && bSubmitMark) {
					this.showDetailPage();
				}
			} else {
				this.getRouter().navTo("App", {}, true);
			}
		}

		// onExit: function () {
		// 	debugger;
		// 	if (this._valueCountryDialog) {
		// 		this._valueCountryDialog.destroy(true);
		// 	}
		// 	if (this._valueTeamDialog) {
		// 		this._valueTeamDialog.destroy(true);
		// 	}
		// 	if (this._PositionvalueHelpDialog) {
		// 		this._PositionvalueHelpDialog.destroy(true);
		// 	}
		// 	if (this._ReportvalueHelpDialog) {
		// 		this._ReportvalueHelpDialog.destroy(true);
		// 	}
		// }

	});
});