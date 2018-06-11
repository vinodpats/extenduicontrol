sap.m.Button.extend("custom.HoverButton", {
	metadata: {
		properties: {
			"allowHover": {
				type: "boolean",
				defaultValue: true
			}
		},
		events: {
			"hover": {}
		}
	},
	onmouseover: function(evt) {
		if (this.getAllowHover()) {
			this.fireHover();
		}
	},
	renderer: {}

});