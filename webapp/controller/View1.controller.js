sap.ui.define([
	"sap/ui/core/mvc/Controller" 
], function(Controller) {
	"use strict";

	return Controller.extend("com.ibm.controller.View1", {


		buttonClicked: function(evt){
		// 	var oMs = sap.ui.getCore().byId("msgStrip");
 
		// if (oMs) {
		// 	oMs.destroy();
		// }
			
		// 	var oMsgStrip = new sap.m.MessageStrip("msgStrip", {
		// 					text: "you clicked on it",
		// 					type: "Error"});
		// 	this.byId("idPanel").addContent(oMsgStrip);
			
			
			
			var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
			
			var myTimeline = this.byId("idTimeline");
		
			
			// myTimeline.destroyContent();
			myTimeline.setAxisOrientation(sap.suite.ui.commons.TimelineAxisOrientation.Horizontal);
			
			var GSPaidDate = "2015-02-02T00:00:00";
			var AppointmentDate = "2016-04-04T00:00:00";
			var RejectionReceiptDate = "2017-03-03T02:00:00";
			var AppointmentRaisedDate = "2014-01-01T00:00:00";

			//
			if (GSPaidDate != "") {
				//find month
				var month= parseInt(GSPaidDate.substring(5, 7))-1;
				var dayYear=" "+GSPaidDate.substring(8, 10) + " "+ GSPaidDate.substring(0, 4);
				
				var item1 = new sap.suite.ui.commons.TimelineItem({
					"id" : "GSPaidDate",
					"dateTime": GSPaidDate,
					"title": months[month]+ dayYear,
					// "icon": "/images/GSPaidDate.png",
					"position" : sap.suite.ui.commons.TimelineItemPosition.Bottom
				});

				myTimeline.addContent(item1);
			}

			if (AppointmentDate != "") {
				var month= parseInt(AppointmentDate.substring(5, 7))-1;
			 	var dayYear=" "+AppointmentDate.substring(8, 10) + " "+ AppointmentDate.substring(0, 4);
				
				var item1 = new sap.suite.ui.commons.TimelineItem({
					"id" : "AppointmentDate",
					"dateTime": AppointmentDate,
					"title": months[month]+ dayYear,
					// "icon": "/images/APDate.png",
						"position" : sap.suite.ui.commons.TimelineItemPosition.Top
				});

				myTimeline.addContent(item1);
			}
			if (RejectionReceiptDate != "") {
				var month= parseInt(RejectionReceiptDate.substring(5, 7))-1;
				var dayYear=" "+RejectionReceiptDate.substring(8, 10) + " "+ RejectionReceiptDate.substring(0, 4);
				
				var item1 = new sap.suite.ui.commons.TimelineItem({
					"id": "RejectionReceiptDate",
					"dateTime": RejectionReceiptDate,
					"title": months[month] + dayYear,
					// "icon": "/images/RRDate.png",
						"position" : sap.suite.ui.commons.TimelineItemPosition.Bottom
						});

				myTimeline.addContent(item1);
			}
			if (AppointmentRaisedDate != "") {
				var month= parseInt(AppointmentRaisedDate.substring(5, 7))-1;
					var dayYear=" "+AppointmentRaisedDate.substring(8, 10) + " "+ AppointmentRaisedDate.substring(0, 4);
				var item1 = new sap.suite.ui.commons.TimelineItem({
					"id": "AppointmentRaisedDate",
					"dateTime": AppointmentRaisedDate,
					"title": months[month]+ dayYear,
					// "icon": "/images/APRaiseDate.png",
						"position" : sap.suite.ui.commons.TimelineItemPosition.Top
				});

				myTimeline.addContent(item1);
			}	
		},
		onInit: function() {
				
		
			
			// myTimeline.destroyContent();
			// myTimeline.setAxisOrientation(sap.suite.ui.commons.TimelineAxisOrientation.Horizontal);
			// var test= true;
			// myTimeline= myTimeline.setEnableDoubleSided(test);
		
//		this.buttonClicked();

			//myTimelineItem.setPosition(sap.suite.ui.commons.TimelineItemPosition.Top);
			//	sap.suite.ui.commons.TimelineItem.TimeLineItem it= new sap.suite.ui.commons.TimelineItem("");

			// 	var d = new Date("2017-04-02T00:00:00");
			// 		var month = new Array();
			// 		month[0] = "January";
			// 		month[1] = "February";
			// 		month[2] = "March";
			// 		month[3] = "April";
			// 		month[4] = "May";
			// 		month[5] = "June";
			// 		month[6] = "July";
			// 		month[7] = "August";
			// 		month[8] = "September";
			// 		month[9] = "October";
			// 		month[10] = "November";
			// 		month[11] = "December";
			// var n = month[d.getMonth()];
			// console.log(n);	 

		}
		// onHover: function(evt){
		// 	sap.m.MessageToast.show("Button"+ evt.getSource().getId()+ "was hovered", {duration: 1000});
		// },

	});

});