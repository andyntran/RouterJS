define([
], function () {
	var NavManagerClass = function () {
			var navPaths = {},
				activeNavItem = null,

				onNav = function (navItem) {
					if (!activeNavItem) {
						activeNavItem = navItem;
						Router.navigate(navItem.path);
					}
				},

				onNavSuccess = function (path) {
					if (navPaths[path]) {
						for (var i = 0; i < navPaths[path].length; ++i) {
							if (navPaths[path][i].onSuccess) {
								navPaths[path][i].onSuccess();
							}
						}
					}
				},

				onNavFail = function (path) {
					if (navPaths[path]) {
						for (var i = 0; i < navPaths[path].length; ++i) {
							if (navPaths[path][i].onFail) {
								navPaths[path][i].onFail();
							}
						}
					}
					Router.navigate('/error/404/', true);
				},

				onNavCompleted = function () {
					if (activeNavItem) {
						activeNavItem = null;
					}
				};

			this.createNavItem = function (text, path, isInternal) {
				if (text && path) {
					var navItem = {
						text: text,
						path: Router.normalizePath(path),
						isInternal: !!isInternal
					};
					navItem.execute = onNav.bind(null, navItem);
					
					if (!navPaths[navItem.path]) {
						navPaths[navItem.path] = [];
					}
					navPaths[navItem.path].push(navItem);
				}

				return navItem;
			};

			this.routes = function (routesObj, callback) {
				Router.routes(routesObj, callback);
				return this;
			};

			this.start = function (config) {
				config.onNavigateSuccess = onNavSuccess;
				config.onNavigateFail = onNavFail;
				config.onNavigateCompleted = onNavCompleted;

				Router.start(config);

				return this;
			};

			this.routes(
				'/error/:errorCode/',
				function (errorCode) {

				});
		},

		NavManagerInstance = new NavManagerClass();

	return NavManagerInstance;
});