window.Router || (window.Router = (function () {
	'use strict';

	var RouterClass = function () {

			var rootRouteNode = {},
				config = null,

				/**
				 * @private
				 * Indicate whether the Router is configured or not.
				 * @return {Boolean} True if the Router is configured; otherwise, false.
				 */
				isConfigured = function () {
					return !!config;
				},

				/**
				 * @private
				 * Sanitize a given route path to make sure the path is properly formed with a node string enclosed between slashes.
				 * i.e. /node1/node2/node3/
				 * @param  {string} routePath The route path to be sanitized.
				 * @return {string} A sanitized route path.
				 */
				sanitizeRoutePath = function (routePath) {
					return routePath && (routePath = routePath.toString().trim().replace(/^\/+|\/+$|\/[\w\-]+\.\w+$/g, '')) ? '/' + routePath + '/' : '/';
				},

				/**
				 * @private
				 * Normalize a given route path by stripping out the root portion.
				 * @param  {string} routePath The path to be normalized.
				 * @return {string} A normalized route path with root portion stripped out.
				 */
				normalizeRoutePath = function (routePath) {
					return sanitizeRoutePath(routePath).replace(config.root, '/');
				},

				/**
				 * @private
				 * Resolve the full path of a given route path by normalizing it first and then prepending the root path.
				 * @param  {string} routePath The path to be resolved.
				 * @return {string} A fully resolved route path.
				 */
				resolveFullRoutePath = function (routePath) {
					return config.root.source.substr(1) + normalizeRoutePath(routePath).substr(1);
				},

				/**
				 * @private
				 * Tokenize a given sanitized route path into an array of string nodes.
				 * @param  {string} sanitizedRoutePath The sanitized route path to be tokenized.
				 * @return {Array} An array of string nodes.
				 */
				tokenizeRoutePath = function (sanitizedRoutePath) {
					return (sanitizedRoutePath = sanitizedRoutePath.substr(1, sanitizedRoutePath.length - 2)) ? sanitizedRoutePath.split('/') : null;
				},

				/**
				 * @private
				 * Get the current route path from either the URL or the shebang (#!) depending on configuration mode ('history' or 'hash').
				 * @param  {string} isFullPath True should the function return a fully resolved path; otherwise, false.
				 * @return {string} Either a fully resolved or normalized current path.
				 */
				getCurrentRoutePath = function (isFullPath) {
					var routePath = sanitizeRoutePath(decodeURI(config.mode === 'history' ? location.pathname : location.hash.substr(2)));

					if (config.mode === 'history') {
						if (isFullPath) {
							routePath = resolveFullRoutePath(routePath);
						} else {
							routePath = normalizeRoutePath(routePath);							
						}
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
						normalizedRoutePath = getCurrentRoutePath(),
						routeTokens = tokenizeRoutePath(normalizedRoutePath),
						routeNode = searchRouteNode(rootRouteNode, routeTokens, matchVars);

					if (!routeNode || !routeNode.handler) {
						window.setTimeout(function () {
							if (config.onNavigateFail) { config.onNavigateFail(); }
							if (config.onNavigateCompleted) { config.onNavigateCompleted(); }
						}, 0);
					} else {
						window.setTimeout(function () {
							routeNode.handler.apply(null, matchVars);
							if (config.onNavigateSuccess) { config.onNavigateSuccess(); }
							if (config.onNavigateCompleted) { config.onNavigateCompleted(); }
						}, 0);
					}
				},

				navigateRoute = function (routePath, isReplace) {
					if (config.mode === 'history') {
						var funcName = isReplace ? 'replaceState' : 'pushState';
						history[funcName](null, null, resolveFullRoutePath(routePath));
					} else {
						location.hash = '#!' + normalizeRoutePath(routePath);
					}

					executeRoute();
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

			this.config = function (options) {
				if (options) {
					if (!config) { config = {}; }
					
					config.mode = (options.mode === 'hash' || !history.pushState) ? 'hash' : 'history';
					config.root = new RegExp('^' + (options.root ? sanitizeRoutePath(options.root) : '/'), !options.caseSensitive ? 'i' : null);
					config.log = options.log || log;
					config.error = options.error || error;

					if (options.onNavigateSuccess) { config.onNavigateSuccess = options.onNavigateSuccess; }
					if (options.onNavigateFail) { config.onNavigateFail = options.onNavigateFail; }
					if (options.onNavigateCompleted) { config.onNavigateCompleted = options.onNavigateCompleted; }

					window.addEventListener(config.mode === 'history' ? 'popstate' : 'hashchange', executeRoute);
				}

				return this;
			};

			this.start = function (options) {
				this.config(options);

				if (!isConfigured()) {
					log('Unable to start because the Router has not been configured yet.', 'ERROR');
				} else {
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
				if (!isConfigured()) {
					log('Unable to navigate to path "' + routePath + '" because the Router has not been configured yet.', 'ERROR');
				} else {
					navigateRoute(routePath);
				}
				return this;
			};

			/**
			 * Get the current route path from either the URL or the shebang (#!) depending on configuration mode ('history' or 'hash').
			 * @param  {string} isFullPath True should the function return a fully resolved path; otherwise, false.
			 * @return {string} Either a fully resolved or normalized current path.
			 */
			this.getCurrentPath = function (isFullPath) {
				if (!isConfigured()) {
					log('Unable to get the current path because the Router has not been configured yet.', 'ERROR');
					return null;
				}

				return getCurrentRoutePath(isFullPath);
			};

			this.normalizePath = function (routePath) {
				if (!isConfigured()) {
					log('Unable to normalize the path "' + routePath + '" because the Router has not been configured yet.', 'ERROR');
					return null;
				}

				return normalizeRoutePath(routePath)
			};

			this.resolveFullPath = function (routePath) {
				if (!isConfigured()) {
					log('Unable to resolve the full path of "' + routePath + '" because the Router has not been configured yet.', 'ERROR');
					return null;
				}

				return resolveFullRoutePath(routePath);
			};
		},

		RouterInstance = new RouterClass();

	Object.freeze(RouterInstance);
	return RouterInstance;
}()));