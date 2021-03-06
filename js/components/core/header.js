define([
	'react',
	'components/core/logo',
	'components/core/nav'
], function (React, Logo, Nav) {

	var HeaderClass = React.createClass({
			render: function () {
				return React.DOM.div({
					className: 'header'
				}, React.DOM.div({
					key: 'content',
					className: 'header-content'
				}, [
					Logo({ 
						key: 'logo',
						link: this.props.homeLink
					}),
					Nav({
						key: 'nav',
						links: this.props.navLinks,
						currentPath: this.props.currentPath
					})
				]));
			}
		});

	return React.createFactory(HeaderClass);
});