// Angular Code

var app = angular.module('indexApp', ['ngMaterial']);

app.config(function ($mdThemingProvider) {

	$mdThemingProvider.theme('default')
		.primaryPalette('deep-orange', {
			'default': '400',
			'hue-1': '200',
			'hue-2': '600',
		})
		.accentPalette('amber', {
			'default': 'A200',
		});

});

app.controller('indexController', function ($scope) {

});



var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
	mode: {
		name: "python",
		version: 2,
		singleLineStringErrors: false
	},
	lineNumbers: true,
	indentUnit: 4,
	extraKeys: {
		"Ctrl-Q": function (cm) {
			cm.foldCode(cm.getCursor());
		}
	},
	matchBrackets: true,
	foldGutter: true,
	gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
});