define([
	'react',
	'controllers/routesmixin',
	'components/core/header',
	'components/core/body',
	'components/core/footer'
], function (React, RoutesMixin, Header, Body, Footer) {

	var MainClass = React.createClass({

			mixins: [ RoutesMixin ],

			render: function () {
				return React.DOM.div({
					className: 'main'
				}, [
					Header({
						key: 'header',
						navSites: this.state.navSites
					}),
					Body({ key: 'body' }),
					Footer({ key: 'footer' })
				]);
			}
		});

	return React.createFactory(MainClass);
});