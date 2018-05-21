angular.module('page', []);
angular.module('page').controller('PageController', function ($scope, $http) {

	var api = '/services/v3/js/zeus-templates/api/TemplateContainers.js';
	var containerOptionsApi = '/services/v3/js/zeus-templates/api/Containers.js';

	$scope.containerOptions = [];

	$http.get(containerOptionsApi)
	.success(function(data) {
		$scope.containerOptions = data;
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

	$scope.containerOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.containerOptions.length; i ++) {
			if ($scope.containerOptions[i].Id === optionKey) {
				return $scope.containerOptions[i].Name;
			}
		}
		return null;
	};

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});