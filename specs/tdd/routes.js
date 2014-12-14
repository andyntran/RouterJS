define([
  'mockServices',
  'routes'
], function (mockServices, routes) {

	return {
		register: function () {
			describe('Router BDD Specs', function () {

				describe('instance', function () {

					it('should be defined', function () {
						expect(Router).toBeDefined();
					});

					it('should have runSpecs() route', function () {
						expect(typeof routes.runSpecs).toEqual('function');
					});

					it('should have defaultRoute() route', function () {
						expect(typeof routes.defaultRoute).toEqual('function');
					});

					// TODO: tests other properties/methods of the router
					// END TODO

				});

				describe('specsRunningRoute()', function () {

					describe('GIVEN the page is running in test mode', function () {
						
						it('should have a spec report DOM with class="jasmine_reporter"', function () {
							expect($('.jasmine_reporter').length).toBeGreaterThan(0);
						});
						
					});

				});

				describe('defaultRoute()', function () {

					describe('GIVEN the page call defaultRoute() method', function () {
					
						it('Setup: calls defaultRoute() method', function () {
							routes.defaultRoute();
						});

						it('should have a main DOM with class="main"', function () {
							var $main = $('.main');
							expect($main.length).toEqual(1);
						});

						// TODO: tests other default behavior of the page
						// END TODO

					});

				});

				// TODO: tests other routes
				// END TODO
			});
		}
	};

});