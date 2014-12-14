window.Router || (window.Router = (function () {
	'use strict';

	var RouterClass = function () {

			var rootRouteNode = {},
				config = null,

				isConfigured = function () {
					return !!config;
				},

				sanitizeRoutePath = function (routePath) {
					return routePath && (routePath = routePath.toString().trim().replace(/^\/+|\/+$|\/[\w\-]+\.\w+$/g, '')) ? '/' + routePath + '/' : '/';
				},

				tokenizeRoutePath = function (sanitizedRoutePath) {
					return (sanitizedRoutePath = sanitizedRoutePath.substr(1, sanitizedRoutePath.length - 2)) ? sanitizedRoutePath.split('/') : null;
				},

				getCurrentRoutePath = function () {
					var routePath = sanitizeRoutePath(decodeURI(config.mode === 'history' ? location.pathname : location.hash.substr(2)));

					if (config.mode === 'history') {
						routePath = routePath.replace(config.root, '/');
					}

					return routePath;
				},

				/*  Each route node will have 3 properties:
					- children: a dictionary object contains static child nodes
					- handler: an event handler of the current node
					- param: a variable/dynamic child node 
				*/
				getOrCreateorMatchRouteNode = function (parentRouteNode, routeToken, matchVars) {
					// If is trying to get or create a param route node,
					// then get or create a new param route node.
					if (routeToken[0] === ':') {
						if (!parentRouteNode.param) {
							parentRouteNode.param = {};
						}
						return parentRouteNode.param;
					}

					// If a child route node is found, then return the
					// child route node.
					if (parentRouteNode.children && parentRouteNode.children[routeToken]) {
						return parentRouteNode.children[routeToken];
					}

					// If is not trying to match a route node and
					// a child route node is not found, then create
					// a new child route node.
					if (!matchVars) {
						if (!parentRouteNode.children) {
							parentRouteNode.children = {};
						}
						parentRouteNode.children[routeToken] = {};
						return parentRouteNode.children[routeToken];
					}

					// Is is trying to match a route node and there is
					// a param route node, then push the route token into
					// the array of matching variables (matchVar).
					if (parentRouteNode.param) {
						matchVars.push(routeToken);
						return parentRouteNode.param;
					}

					return null;
				},

				searchRouteNode = function (parentRouteNode, routeTokens, matchVars) {
					if (parentRouteNode && routeTokens && routeTokens.length) {
						var routeToken = routeTokens.shift(),
							routeNode = getOrCreateorMatchRouteNode(parentRouteNode, routeToken, matchVars);
						return searchRouteNode(routeNode, routeTokens, matchVars);
					}

					return parentRouteNode;
				},

				addRoute = function (routePath, handler) {
					if (!handler) { return; }

					var sanitizedRoutePath = sanitizeRoutePath(routePath),
						routeTokens = tokenizeRoutePath(sanitizedRoutePath),
						routeNode = searchRouteNode(rootRouteNode, routeTokens);

					routeNode.handler = handler;
				},

				addRoutes = function (routesObj) {
					var routePath = null;
					for (routePath in routesObj) {
						addRoute(routePath, routesObj[routePath]);
					}
				},

				executeRoute = function () {
					var matchVars = [],
						sanitizedRoutePath = getCurrentRoutePath(),
						routeTokens = tokenizeRoutePath(sanitizedRoutePath),
						routeNode = searchRouteNode(rootRouteNode, routeTokens, matchVars);

					if (!routeNode || !routeNode.handler) {
						window.setTimeout(function () {
							if (config.onNavigateFail) { config.onNavigateFail(sanitizedRoutePath); }
							if (config.onNavigateCompleted) { config.onNavigateCompleted(sanitizedRoutePath); }
						}, 0);
					} else {
						window.setTimeout(function () {
							routeNode.handler.apply(window, matchVars);
							if (config.onNavigateSuccess) { config.onNavigateSuccess(sanitizedRoutePath); }
							if (config.onNavigateCompleted) { config.onNavigateCompleted(sanitizedRoutePath); }
						}, 0);
					}
				},

				navigateRoute = function (routePath, isReplace) {
					if (isConfigured()) {
						var sanitizedRoutePath = sanitizeRoutePath(routePath);

						if (config.mode === 'history') {
							var funcName = isReplace ? 'replaceState' : 'pushState';
							history[funcName](null, null, config.root.source.substr(1) + sanitizedRoutePath.substr(1));
						} else {
							location.hash = '#!' + sanitizedRoutePath;
						}

						executeRoute();
					}
				},

				log = function (message, type) {
					var logType = 'info';
					switch (type.toLowerCase()) {
					case 'warn':
					case 'warning':
						logType = 'warn';
						break;
					case 'err':
					case 'error':
						logType = 'error';
						break;
					}
					console[logType]('[' + (new Date).toLocaleString() + '] ' + message);
				},

				error = function (errorCode, message) {
					config.log(message, 'error');
				};

			this.start = function (options) {
				if (!isConfigured()) {
					if (!config) { config = {}; }
					if (!options) { options = {}; }
					
					config.mode = (options.mode === 'hash' || !history.pushState) ? 'hash' : 'history';
					config.root = new RegExp('^' + (options.root ? sanitizeRoutePath(options.root) : '/'), !options.caseSensitive ? 'i' : null);
					config.log = options.log || log;
					config.error = options.error || error;

					if (options.onNavigateSuccess) { config.onNavigateSuccess = options.onNavigateSuccess; }
					if (options.onNavigateFail) { config.onNavigateFail = options.onNavigateFail; }
					if (options.onNavigateCompleted) { config.onNavigateCompleted = options.onNavigateCompleted; }

					window.addEventListener(config.mode === 'history' ? 'popstate' : 'hashchange', executeRoute);

					executeRoute();
				}

				return this;
			};

			this.routes = function (routesObj, handler) {
				if (routesObj) {
					switch (typeof routesObj) {
					case 'string':
						addRoute(routesObj, handler);
						break;

					case 'object':
						addRoutes(routesObj);
						break;
					}
				}

				return this;
			};

			this.navigate = function (routePath) {
				navigateRoute(routePath);
				return this;
			};

			this.normalizePath = function (routePath) {
				return sanitizeRoutePath(routePath);
			};
		},

		RouterInstance = new RouterClass();

	Object.freeze(RouterInstance);
	return RouterInstance;
}()));