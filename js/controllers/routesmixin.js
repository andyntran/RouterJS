define([
	  'react'
	, '../../specs/specs-runner'
	, 'controllers/navmanager'
], function (React, SpecsRunner, NavManager) {
	var RoutesMixin = {
			rootRoute: function () {

			},

			downloadRoute: function () {

			},

			runSpecsRoute: function (reporter) {
				SpecsRunner.execute(reporter);
			},

			errorRoute: function () {

			},

			getDefaultProps: function() {
				return { 
					navSites: [
						NavManager.createNavItem('HOME', '/', true),
						NavManager.createNavItem('DOWNLOAD', '/download', true),
						NavManager.createNavItem('TEST', '/dev/specs', true),
						NavManager.createNavItem('GITHUB', 'https://github.com/andyntran/js-boilerplate')
					]
				};
			},

			componentDidMount: function () {
				NavManager.routes({
					'/': this.rootRoute,
					'/download': this.downloadRoute,
					'/dev/specs': this.runSpecsRoute,
					'/dev/specs/:reporter': this.runSpecsRoute,
					'/error/:errorCode': this.errorRoute
				}).start({
					root: '/projects/routerjs/'
				});
			}
		};

	return RoutesMixin;
});