// Angular Code

var app = angular.module('indexApp', ['ngMaterial', 'ui.codemirror']);

app.config(function ($mdThemingProvider) {

	$mdThemingProvider.theme('default')
		.primaryPalette('orange', {
			'default': '500',
			'hue-1': '300',
			'hue-2': '700',
		})
		.accentPalette('amber', {
			'default': 'A200',
		});

});

app.controller('indexController', function ($scope) {

	$scope.editorOptions = {
		mode: {
			name: "python",
			version: 2,
			singleLineStringErrors: false
		},
		keyMap: "default",
		theme: "mdn-like",
		lineNumbers: true,
		indentWithTabs: true,
		indentUnit: 4,
		tabSize: 4,
		extraKeys: {
			"Ctrl-Q": function (cm) {
				cm.foldCode(cm.getCursor());
			}
		},
		matchBrackets: true,
		foldGutter: true,
		gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
	};


	$scope.sourceCode = "";
	$scope.input = "";
	$scope.output = null;

	console.log($scope.sourceCode);

	// Languages
	$scope.languages = [{
			title: "C",
			name: "c",
			mode: "text/x-csrc"
		},
		{
			title: "C++",
			name: "c++",
			mode: "text/x-c++src"
		},
		{
			title: "Pytohn 2",
			name: "python",
			mode: {
				name: "python",
				version: 2
			}
		},
		{
			title: "Pytohn 3",
			mode: {
				name: "python",
				version: 3
			}
		}
	];

	$scope.selectedLanguage = "";

	// Themes
	$scope.themes = [{
			title: "Default",
			name: "default"
		},
		{
			title: "Light",
			name: "mdn-like"
		}, {
			title: "Sublime",
			name: "monokai"
		}, {
			title: "Dark",
			name: "dracula"
		}
	];

	$scope.selectedTheme = $scope.themes[1];

	// Editor
	$scope.editors = [{
			title: "Default",
			name: "default"
		},
		{
			title: "Emacs",
			name: "emacs"
		}, {
			title: "Sublime",
			name: "sublime"
		}
	];

	$scope.selectedEditor = $scope.editors[0];

	// Tab Sizes
	$scope.tabSizes = [{
			"value": 2
		},
		{
			"value": 4
		},
		{
			"value": 8
		}
	];

	$scope.selectedTabSize = $scope.tabSizes[1];

	$scope.runCode = function () {


		$.ajax({
			type: "POST",
			url: "/runOutput.php",
			data: {
				"sourceCode": $scope.sourceCode,
				"language": $scope.selectedLanguage.name,
				"input": $scope.input
			},
			success: function (data) {
				console.log("Success");
				console.log(data);
				$scope.output = data;
				$scope.$apply();
			}
		});
	}

	$scope.changeLanguage = function () {
		$.ajax({
			type: "GET",
			url: "starter_code/" + $scope.selectedLanguage.name + ".txt",
			success: function (data) {
				$scope.sourceCode = data;
			}
		});
	}


	$scope.changeTheme = function () {
		$scope.editorOptions.theme = $scope.selectedTheme.name;
	}

	$scope.changeEditor = function () {
		$scope.editorOptions.keyMap = $scope.selectedEditor.name;
		if ($scope.selectedEditor.name == "sublime") {
			$scope.selectedTheme = $scope.themes[2];
			$scope.editorOptions.theme = $scope.selectedTheme.name;
		}
	}

	$scope.changeTabSize = function () {
		$scope.editorOptions.indentUnit = $scope.selectedTabSize.value;
		$scope.editorOptions.tabSize = $scope.selectedTabSize.value;
	}

});