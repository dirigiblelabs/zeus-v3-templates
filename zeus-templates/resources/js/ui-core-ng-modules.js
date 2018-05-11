/*
 * Copyright (c) 2017 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 */

/**
 * Provides key microservices for constructing and managing the IDE UI
 *
 */
angular.module('ideUiCore', ['ngResource'])
.provider('messageHub', function MessageHubProvider() {
  this.evtNamePrefix = '';
  this.evtNameDelimiter = '.';
  this.$get = [function messageHubFactory() {
    var messageHub = new FramesMessageHub();
	//normalize prefix if any
	this.evtNamePrefix = this.evtNamePrefix || '';
	this.evtNamePrefix = this.evtNamePrefix ? (this.evtNamePrefix+this.evtNameDelimiter): this.evtNamePrefix;
	var send = function(evtName, data, absolute){
		if(!evtName)
			throw Error('evtname argument must be a valid string, identifying an existing event');
		messageHub.post({data: data}, (absolute ? '' : this.evtNamePrefix) + evtName);
	}.bind(this);
	var on = function(evtName, callbackFunc){
		if(typeof callbackFunc !== 'function')
			throw Error('Callback argument must be a function');
		messageHub.subscribe(callbackFunc, evtName);
	};
	return {
		send: send,
		on: on
	};
  }];
})
.factory('Theme', ['$resource', function($resource){
	var themeswitcher = $resource('/services/v3/core/theme?name=:themeName', {themeName: 'default'});
	var themes = {
		"default": "/services/v3/web/resources/themes/default/bootstrap.min.css",
		"wendy" : "/services/v3/web/resources/themes/wendy/bootstrap.min.css",
		"baroness" : "/services/v3/web/resources/themes/baroness/bootstrap.min.css",
		"simone" : "/services/v3/web/resources/themes/simone/bootstrap.min.css"
	};
	return {
		changeTheme: function(themeName){
			return themeswitcher.get({'themeName':themeName});
		},
		themeUrl: function(themeName){
			return themes[themeName];
		},
		reload: function(){
			location.reload();
		}
	}
}])
.service('Perspectives', ['$resource', function($resource){
	return $resource('/services/v3/js/zeus-templates/api/shell/perspectives.js');
}])
.service('Menu', ['$resource', function($resource){
	return $resource('/services/v3/js/zeus-templates/api/shell/menu.js');
}])
.service('User', ['$http', function($http){
	return {
		get: function(){
			var user = {};
			$http({
				url: '/services/v3/js/ide/services/user-name.js',
				method: 'GET'
			}).success(function(data){
				user.name = data;
			});
			return user;
		}
	};
}])
/**
 * Creates a map object associating a view factory function with a name (id)
 */
.provider('ViewFactories', function(){
	var self = this;
	this.factories = {
			"frame": function(container, componentState){
				container.setTitle(componentState.label || 'View');
					$('<iframe>').attr('src', componentState.path).appendTo(container.getElement().empty());
			}
	};
	this.$get = [function viewFactoriesFactory() {
		return this.factories;
	}];
})
/**
 * Wrap the ViewRegistry class in an angular service object for dependency injection
 */
.service('ViewRegistrySvc', ViewRegistry)
/**
 * A view registry instance factory, using remote service for intializing the view definitions
 */
.factory('viewRegistry', ['ViewRegistrySvc', '$resource', 'ViewFactories', function(ViewRegistrySvc, $resource, ViewFactories){
	Object.keys(ViewFactories).forEach(function(factoryName){
		ViewRegistrySvc.factory(factoryName, ViewFactories[factoryName]);
	});		
	var get = function(){
		return $resource('/services/v3/js/zeus-templates/api/shell/views.js').query().$promise
				.then(function(data){
					data = data.map(function(v){
						v.id = v.id || v.name.toLowerCase();
						v.label = v.label || v.name;
						v.factory = v.factory || 'frame';
						v.settings = {
							"path": v.link
						}
						v.region = v.region || 'left-top';
						return v;
					});
					//register views
					data.forEach(function(viewDef){
						ViewRegistrySvc.view(viewDef.id, viewDef.factory, viewDef.region, viewDef.label,  viewDef.settings);
					});
					return ViewRegistrySvc;
				});
	};
	
	return {
		get: get
	};
}])
.factory('Layouts', [function(){
	return {
		manager: undefined
	};
}])
.directive('menu', ['$resource', 'Theme', 'User', 'Layouts', 'messageHub', function($resource, Theme, User, Layouts, messageHub){
	return {
		restrict: 'AE',
		transclude: true,
		replace: 'true',
		scope: {
			url: '@menuDataUrl',
			menu:  '=menuData'
		},
		link: function(scope, el, attrs){
			var url = scope.url;
			function loadMenu(){
				scope.menu = $resource(url).query();
			}
			if(!scope.menu && url)
				loadMenu.call(scope);
			scope.menuClick = function(item) {
				Layouts.manager.openView(item.id);
			};
			scope.selectTheme = function(themeName){
				Theme.changeTheme(themeName);
				var themeUrl = Theme.themeUrl(themeName);
				Theme.reload();
			};
			scope.user = User.get();
		},
		templateUrl: '/services/v3/web/zeus-templates/resources/templates/menu.html'
	}
}])
.directive('sidebar', ['Perspectives', function(Perspectives){
	return {
		restrict: 'AE',
		transclude: true,
		replace: 'true',
		scope: {
			active: '@'
		},
		link: function(scope, el, attrs){
			scope.perspectives = Perspectives.query();
		},
		templateUrl: '/services/v3/web/zeus-templates/resources/templates/sidebar.html'
	}
}])
.directive('statusBar', ['messageHub', function(messageHub){
	return {
		restrict: 'AE',
		scope: {
			statusBarTopic: '@'
		},
		link: function(scope, el, attrs){
			messageHub.on(scope.statusBarTopic || 'status.message', function(msg){
				scope.message = msg.data;
			});
		}
	}
}])
.directive('viewsLayout', ['viewRegistry', 'Layouts', function(viewRegistry, Layouts){
	return {
		restrict: 'AE',
		scope: {
			viewsLayoutModel: '=',
			viewsLayoutViews: '@',
		},
		link: function(scope, el, attrs){
			var views;
			if(scope.layoutViews){
				views = scope.layoutViews.split(',');
			} else {
				views =  scope.viewsLayoutModel.views;
			}
			var eventHandlers = scope.viewsLayoutModel.events;
			
			viewRegistry.get().then(function(registry){
				scope.layoutManager = new LayoutController(registry);
				if(eventHandlers){
					Object.keys(eventHandlers).forEach(function(evtName){
						var handler = eventHandlers[evtName];
						if(typeof handler === 'function')
							scope.layoutManager.addListener(evtName, handler);
					});
				}
				$(window).resize(function(){scope.layoutManager.layout.updateSize()});
				scope.layoutManager.init(el, views);
				Layouts.manager = scope.layoutManager;
			});
		}
	}
}])	;