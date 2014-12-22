define([
	'specs/specs-runner',
	'components/home/home'
], function (SpecsRunner, Home) {
	var RoutesMixin = {
			
			routes: {
				
				home: function () {
					this.setState({
						currentPath: Router.getCurrentPath(),
						bodyContent: Home
					});
				},

				docs: function () {
					this.setState({
						currentPath: Router.getCurrentPath(),
						bodyContent: null
					});
				},

				download: function () {
					this.setState({
						currentPath: Router.getCurrentPath(),
						bodyContent: null
					});
				},

				test: function (reporter) {
					SpecsRunner.execute(reporter);
				},

				error: function (errorCode) {
					this.setState({
						currentPath: Router.getCurrentPath(),
						bodyContent: null
					});
				}
			},

			getInitialState: function () {
				return {
					currentPath: null,
					bodyContent: null
				};
			},

			componentWillMount: function () {
				Router.routes({
					'/': this.routes.home.bind(this),
					'/docs': this.routes.docs.bind(this),
					'/download': this.routes.download.bind(this),
					'/test': this.routes.test.bind(this),
					'/test/:reporter': this.routes.test.bind(this),
					'/error/:errorCode': this.routes.error.bind(this)
				});
			}
		};

	return RoutesMixin;
});