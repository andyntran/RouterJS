define([
	'react',
	'controllers/routesmixin',
	'components/core/header',
	'components/core/body'
], function (React, RoutesMixin, Header, Body) {

	var AppClass = React.createClass({

			mixins: [ RoutesMixin ],

			render: function () {
				return React.DOM.div({
					className: 'app'
				}, [
					Header({
						key: 'header',
						homeLink: this.state.homeLink,
						navLinks: this.state.navLinks
					}),
					Body({ 
						key: 'body' 
					}, this.state.body ? this.state.body({ key: 'body_content' }) : null)
				]);
			}
		});

	return React.createFactory(AppClass);
});