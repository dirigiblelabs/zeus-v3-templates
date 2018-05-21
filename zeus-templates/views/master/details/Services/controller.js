angular.module('page', []);
angular.module('page').controller('PageController', function ($scope, $http) {

	var api = '/services/v3/js/zeus-templates/api/Services.js';
	var protocolOptionsApi = '/services/v3/js/zeus-templates/api/ServiceProtocols.js';

	$scope.protocolOptions = [];

	$http.get(protocolOptionsApi)
	.success(function(data) {
		$scope.protocolOptions = data;
	});

	function load() {
		$http.get(api)
		.success(function(data) {
			$scope.data = data;
		});
	}
	load();

	$scope.openNewDialog = function() {
		$scope.actionType = 'new';
		$scope.entity = {};
		toggleEntityModal();
	};

	$scope.openEditDialog = function(entity) {
		$scope.actionType = 'update';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.openDeleteDialog = function(entity) {
		$scope.actionType = 'delete';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.close = function() {
		load();
		toggleEntityModal();
	};

	$scope.create = function() {
		$http.post(api, JSON.stringify($scope.entity))
		.success(function(data) {
			load();
			toggleEntityModal();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
			
	};

	$scope.update = function() {
		$http.put(api + '/' + $scope.entity.Id, JSON.stringify($scope.entity))

		.success(function(data) {
			load();
			toggleEntityModal();
		}).error(function(data) {
			alert(JSON.stringify(data));
		})
	};

	$scope.delete = function() {
		$http.delete(api + '/' + $scope.entity.Id)
		.success(function(data) {
			load();
			toggleEntityModal();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
	};

	$scope.protocolOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.protocolOptions.length; i ++) {
			if ($scope.protocolOptions[i].Id === optionKey) {
				return $scope.protocolOptions[i].Name;
			}
		}
		return null;
	};

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});