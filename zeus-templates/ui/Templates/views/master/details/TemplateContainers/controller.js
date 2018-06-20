angular.module('page', ['ngAnimate', 'ui.bootstrap']);
angular.module('page')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'zeus.zeus-templates.TemplateContainers.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onEntityRefresh: function(callback) {
			on('zeus.zeus-templates.TemplateContainers.refresh', callback);
		},
		onContainersModified: function(callback) {
			on('zeus.zeus-templates.Containers.modified', callback);
		},
		onTemplatesSelected: function(callback) {
			on('zeus.zeus-templates.Templates.selected', callback);
		},
		messageEntityModified: function() {
			message('modified');
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/zeus-templates/api/TemplateContainers.js';
	var containerOptionsApi = '/services/v3/js/zeus-templates/api/Containers.js';

	$scope.dateOptions = {
		startingDay: 1
	};
	$scope.dateFormats = ['yyyy/MM/dd', 'dd-MMMM-yyyy', 'dd.MM.yyyy', 'shortDate'];
	$scope.dateFormat = $scope.dateFormats[0];

	$scope.containerOptions = [];

	function containerOptionsLoad() {
		$http.get(containerOptionsApi)
		.success(function(data) {
			$scope.containerOptions = data;
		});
	}
	containerOptionsLoad();

	function load() {
		$http.get(api + '?Template=' + $scope.masterEntityId)
		.success(function(data) {
			$scope.data = data;
		});
	}

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
		$scope.entity.Template = $scope.masterEntityId;
		$http.post(api, JSON.stringify($scope.entity))
		.success(function(data) {
			load();
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
			
	};

	$scope.update = function() {
		$scope.entity.Template = $scope.masterEntityId;

		$http.put(api + '/' + $scope.entity.Id, JSON.stringify($scope.entity))

		.success(function(data) {
			load();
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		})
	};

	$scope.delete = function() {
		$http.delete(api + '/' + $scope.entity.Id)
		.success(function(data) {
			load();
			toggleEntityModal();
			$messageHub.messageEntityModified();
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

	$messageHub.onEntityRefresh(load);
	$messageHub.onContainersModified(containerOptionsLoad);

	$messageHub.onTemplatesSelected(function(event) {
		$scope.masterEntityId = event.data.id
		load();
	});

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});