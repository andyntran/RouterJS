define([
	'react',
	'components/home/hero',
	'components/home/marketing',
	'components/core/footer'
], function (React, Hero, Marketing, Footer) {

	var HomeClass = React.createClass({
			render: function () {
				return React.DOM.div({
					className: 'home'
				}, [
					Hero({ key: 'hero' }),
					Marketing({ key: 'marketing' }),
					React.DOM.hr({ key: 'divider' }),
					Footer({ key: 'footer' })
				]);
			}
		});

	return React.createFactory(HomeClass);
});