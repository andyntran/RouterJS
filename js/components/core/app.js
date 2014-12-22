define([
	'react',
	'controllers/routesmixin',
	'controllers/navmanagermixin',
	'components/core/header',
	'components/core/body'
], function (React, RoutesMixin, NavManagerMixin, Header, Body) {

	var AppClass = React.createClass({

			mixins: [ RoutesMixin, NavManagerMixin ],

			render: function () {
				return React.DOM.div({
					className: 'app'
				}, [
					Header({
						key: 'header',
						currentPath: this.state.currentPath,
						homeLink: this.state.homeLink,
						navLinks: this.state.navLinks
					}),
					Body({ 
						key: 'body' 
					}, this.state.bodyContent ? this.state.bodyContent({ key: 'body_content' }) : null)
				]);
			}
		});

	return React.createFactory(AppClass);
});