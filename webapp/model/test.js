sap.ui.define([
	"scottish/power/project/controller/BaseController",
	"scottish/power/project/util/Formatter",
	"sap/ui/core/Fragment"
], function(BaseController, Formatter, Fragment) {
	"use strict";

	return BaseController.extend("scottish.power.project.controller.mainView", {

		onInit: function() {
			var myData = {
				"VariousDates": [

					{
						"dateTime": "2017-04-02T00:00:00",
						"id": "GSPaidDate",
						"icon": "/images/GSPaidDate.png"
					}, {
						"dateTime": "2017-04-04T00:00:00",
						"id": "AppointmentDate",
						"icon": "/images/APDate.png"
					}, {
						"dateTime": "2017-04-02T02:00:00",
						"id": "RejectionReceiptDate",
						"icon": "/images/RRDate.png"
					}, {
						"dateTime": "2017-04-01T00:00:00",
						"id": "AppointmentDate",
						"icon": "/images/APRaiseDate.png"
					}

				]

			};

			var oModel = new sap.ui.model.json.JSONModel(myData);
			this.getView().setModel(oModel);

			var myTimeline = this.byId("idTimeline");
			myTimeline.setAxisOrientation(sap.suite.ui.commons.TimelineAxisOrientation.Horizontal);
		},

		onRouteMatched: function(oEvent) {
			if (oEvent.getParameter("name") === "toMainScreen") {
				this.cmReportDeferred = $.Deferred();
				this.getCMReportData();
				$.when(this.cmReportDeferred).then($.proxy(function() {
					var oLayout = this.getView().byId("idMainContent");
					if (!this.customerMeteringFragment) {
						this.customerMeteringFragment = sap.ui.xmlfragment("customerMeteringFragment",
							"scottish.power.project.view.fragments.CustomerMetering", this);
						oLayout.addContent(this.customerMeteringFragment);
					}

					if (this.getMainModel().getProperty("/meterAppointmentReportData/").length === 0) {
						this.hideBusyDialog();
						return;
					}

					var rowIndex = 0;
					var selectedRow = this.getMainModel().getProperty("/meterAppointmentReportData/" + rowIndex);
					this.getMainModel().setProperty("/selectedTableData", selectedRow);
					/*          var detailsString = this.getResourceBundle().getText("customerMeteringTableDetail_Details");
          var appointmentString = this.getResourceBundle().getText("customerMeteringTableDetail_Appointment");
          var concatString = appointmentString + " " + selectedRow.AppointID + " - " + Formatter.convertToTitleCase(selectedRow.JobType) + " - " + Formatter.convertToTitleCase(selectedRow.SubJobType) + " - " +
 Formatter.getDateFormatter(selectedRow.AppointDat+
) + " " + detailsString;
          Fragment.byId("customerMeteringFragment", "idSelectedTableRowText").setText(concatString);

          var idJobStatus = Fragment.byId("customerMeteringFragment", "idJobStatus");
          this.setJobStatusColorFormatter(idJobStatus, selectedRow.status);
          this.customDateTiles(selectedRow);
*/
					this.hideBusyDialog();
				}, this));
			}
		},

		getCMReportData: function() {
			this.getModel("cmReportODataModel").read("/MeterAppointSet", {
				urlParameters: {
					$filter: "PartnerID eq '" + this.getPartnerID() + "' and Premise eq '" + this.getPremiseID() + "'"
				},
				success: $.proxy(function(successData) {
					this.getMainModel().setProperty("/meterAppointmentReportData", successData.results);
					this.cmReportDeferred.resolve();
				}, this),
				error: $.proxy(function(errorData) {
					this.hideBusyDialog();
					this.cmReportDeferred.reject();
				})
			});
		},

		customerMeteringTableRowSelected: function(oEvent) {
			var temp = oEvent.getParameters().listItem;
			var contextPath = temp.getBindingContextPath();
			var rowIndex = parseFloat(contextPath.substr(contextPath.length - 1, contextPath.length));

			var selectedRow = this.getMainModel().getProperty("/meterAppointmentReportData/" + rowIndex);
			this.getMainModel().setProperty("/selectedTableData", selectedRow);
			/*      var detailsString = this.getResourceBundle().getText("customerMeteringTableDetail_Details");
      var appointmentString = this.getResourceBundle().getText("customerMeteringTableDetail_Appointment");
      var concatString = appointmentString + " " + selectedRow.AppointID + " - " + Formatter.convertToTitleCase(selectedRow.JobType) + " - " + Formatter.convertToTitleCase(selectedRow.SubJobType) + " - " +
 Formatter.getDateFormatter(selectedRow.AppointDat) +
+ " " + detailsString;
      Fragment.byId("customerMeteringFragment", "idSelectedTableRowText").setText(concatString);
      var idJobStatus = Fragment.byId("customerMeteringFragment", "idJobStatus");
      this.setJobStatusColorFormatter(idJobStatus, selectedRow.status);
      this.customDateTiles(selectedRow);
*/
		},

		setJobStatusColorFormatter: function(object, inputValue) {
			if (inputValue === null || inputValue === undefined) {
				object.removeStyleClass("redDisplayLabel");
				object.addStyleClass("displayLabel");
				return;
			}
			if (inputValue.toLowerCase() === "Rejected".toLowerCase()) {
				object.removeStyleClass("displayLabel");
				object.addStyleClass("redDisplayLabel");
			} else {
				object.removeStyleClass("redDisplayLabel");
				object.addStyleClass("displayLabel");
			}
		},

		customDateTiles: function(selectedRow) {
			var appointmentRaisedDateMonthName = Formatter.getMonth(selectedRow.AppDate);
			var appointmentRaisedDateDayYear = Formatter.getDayYear(selectedRow.AppDate);

			var gsPaidDateMonthName = Formatter.getMonth(selectedRow.GSPaidDate);
			var gsPaidDateDayYear = Formatter.getDayYear(selectedRow.GSPaidDate);

			var rejectionReceiptDateMonthName = Formatter.getMonth(selectedRow.RejRecDate);
			var rejectionReceiptDateDayYear = Formatter.getDayYear(selectedRow.RejRecDate);

			var appointmentDateMonthName = Formatter.getMonth(selectedRow.AppointDat);
			var appointmentDateDayYear = Formatter.getDayYear(selectedRow.AppointDat);

			var appointmentRaisedDateJson = {
				"title": appointmentRaisedDateMonthName,
				"description": appointmentRaisedDateDayYear,
				"label": this.getResourceBundle().getText("customerMeteringTableDetail_AppointmentRaisedDate")
			};

			var gsPaidDateJson = {
				"title": gsPaidDateMonthName,
				"description": gsPaidDateDayYear,
				"label": this.getResourceBundle().getText("customerMeteringTableDetail_GSPaidDate")
			};

			var rejectionReceiptDateJson = {
				"title": rejectionReceiptDateMonthName,
				"description": rejectionReceiptDateDayYear,
				"label": this.getResourceBundle().getText("customerMeteringTableDetail_RejectionReceiptDate")
			};

			var appointmentDateJson = {
				"title": appointmentDateMonthName,
				"description": appointmentDateDayYear,
				"label": this.getResourceBundle().getText("customerMeteringTableDetail_AppointmentDate")
			};

			var tempJSON = [];
			tempJSON.push(appointmentRaisedDateJson, gsPaidDateJson, rejectionReceiptDateJson, appointmentDateJson);
			this.getMainModel("LocalDataModel").setProperty("/selectedDateDetails", tempJSON);
		}
	});
});