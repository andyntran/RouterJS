define([
	  'react'
	, 'specs/specs-runner'
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

			getInitialState: function() {
				return {
					navSites: null
				};
			},

			componentWillMount: function () {
				NavManager.routes({
					'/': this.rootRoute,
					'/download': this.downloadRoute,
					'/dev/specs': this.runSpecsRoute,
					'/dev/specs/:reporter': this.runSpecsRoute,
					'/error/:errorCode': this.errorRoute
				}).start({
					root: document.querySelector('meta[name="page-info"]').dataset.root
				});

				this.setState({
					navSites: [
						NavManager.createNavItem('HOME', '/', true),
						NavManager.createNavItem('DOWNLOAD', '/download', true),
						NavManager.createNavItem('TEST', '/dev/specs', true),
						NavManager.createNavItem('GITHUB', '//github.com/andyntran/RouterJS')
					]
				});
			}
		};

	return RoutesMixin;
});