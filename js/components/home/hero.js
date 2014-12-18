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
						key: 'subtitle',
						className: 'subtitle'
					}, 'A Simple Yet Powerful Client Router'),
					React.DOM.div({
						key: 'buttons',
						className: 'buttons'
					}, [
						React.DOM.button({
							key: 'getStarted',
							className: 'button'
						}, 'Get Started'),
						React.DOM.a({
							key: 'download',
							className: 'button',
							href: '//github.com/andyntran/RouterJS/releases/tag/0.1.1',
							target: '_blank'
						}, 'Download RouterJS v0.1.1')
					])
				]));
			}
		});

	return React.createFactory(HeroClass);
});