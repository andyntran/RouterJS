define([
	'react',
	'components/core/logo'
], function (React, Logo) {

	var HeroClass = React.createClass({
			render: function () {
				return React.DOM.div({
					className: 'hero'
				}, React.DOM.div({
					key: 'content',
					className: 'content'
				}, [
					Logo({ key: 'logo' }),
					React.DOM.div({
						key: 'subtitle'
					}, 'A SIMPLE AND POWERFUL CLIENT ROUTER')
				]));
			}
		});

	return React.createFactory(HeroClass);
});