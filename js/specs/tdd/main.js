define([

'mockServices',
'react',
'components/core/main'

], function (mockServices, React, Main) {


	return {
		register: function () {
			describe('Main component', function () {
				
				describe('Class', function () {

					it('should be defined', function () {
						expect(Main).toBeDefined();
					});

				});

				describe('Render', function () {
					
					var main = null;

					it('Setup: initialize Main component', function () {
						main = Main();
						expect(main).toBeDefined();
					});

					it('should show a single "main" DOM that contains "header", "body", and "footer" DOMs', function () {
						var $main = $(React.renderToStaticMarkup(main)),
							$children = $main.children();
						expect($main.length).toEqual(1);
						expect($children.filter('.header').length).toEqual(1);
						expect($children.filter('.body').length).toEqual(1);
						expect($children.filter('.footer').length).toEqual(1);
					});
					
				});

			});
		}
	};

});