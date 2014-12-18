define([

'mockServices',
'react',
'components/core/app'

], function (mockServices, React, App) {


	return {
		register: function () {
			describe('App component', function () {
				
				describe('Class', function () {

					it('should be defined', function () {
						expect(App).toBeDefined();
					});

				});

				describe('Render', function () {
					
					var app = null;

					it('Setup: initialize App component', function () {
						app = App();
						expect(app).toBeDefined();
					});

					it('should show a single "app" DOM that contains "header" and "body" DOMs', function () {
						var $app = $(React.renderToStaticMarkup(app)),
							$children = $app.children();
						expect($app.length).toEqual(1);
						expect($children.filter('.header').length).toEqual(1);
						expect($children.filter('.body').length).toEqual(1);
					});
					
				});

			});
		}
	};

});