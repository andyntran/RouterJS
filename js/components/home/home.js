define([
	'react',
	'components/home/hero',
	'components/home/marketing'
], function (React, Hero, Marketing) {

	var HomeClass = React.createClass({
			render: function () {
				return React.DOM.div({
					className: 'home'
				}, [
					Hero({ key: 'hero' }),
					Marketing({ key: 'marketing' })
				]);
			}
		});

	return React.createFactory(HomeClass);
});