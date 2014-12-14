define([
	'react',
	'components/core/logo',
	'components/nav/nav'
], function (React, Logo, Nav) {

	var HeaderClass = React.createClass({
			render: function () {
				return React.DOM.div({
					className: 'header'
				}, React.DOM.div({
					key: 'content',
					className: 'header-content'
				}, [
					Logo({ key: 'logo' }),
					Nav({
						key: 'nav',
						links: this.props.navSites
					})
				]));
			}
		});

	return React.createFactory(HeaderClass);
});