define([
	'react',
	'specs/specs-runner',
	'controllers/navmanager',
	'components/home/home'
], function (React, SpecsRunner, NavManager, Home) {
	var RoutesMixin = {
			rootRoute: function () {
				this.setState({
					body: Home
				});
			},

			downloadRoute: function () {
				this.setState({
					body: null
				});
			},

			docsRoute: function () {
				this.setState({
					body: null
				});
			},

			runSpecsRoute: function (reporter) {
				SpecsRunner.execute(reporter);				
			},

			errorRoute: function (errorCode) {

			},

			getInitialState: function() {
				return {
					homeLink: null,
					navLinks: null,
					activePage: null,
					body: null
				};
			},

			componentWillMount: function () {
				NavManager.routes({
					'/': this.rootRoute,
					'/docs': this.docsRoute,
					'/download': this.downloadRoute,
					'/dev/specs': this.runSpecsRoute,
					'/dev/specs/:reporter': this.runSpecsRoute,
					'/error/:errorCode': this.errorRoute
				}).start({
					root: document.querySelector('meta[name="page-info"]').dataset.root
				});

				this.setState({
					homeLink: NavManager.createNavItem('HOME', '/', true),
					navLinks: [
						NavManager.createNavItem('DOCS', '/docs', true),
						NavManager.createNavItem('DOWNLOAD', '/download', true),
						NavManager.createNavItem('TEST', '/dev/specs', true),
						NavManager.createNavItem('GITHUB', '//github.com/andyntran/RouterJS')
					]
				});
			},

			componentWillUnmount: function () {
				NavManager.disposeNavItem(this.state.homeLink);
				NavManager.disposeNavItems(this.state.navLinks);
			}
		};

	return RoutesMixin;
});