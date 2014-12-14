define([
	'react'
], function (React) {

	var FooterClass = React.createClass({
			render: function () {
				return React.DOM.div({
					className: 'footer'
				}, 'Footer');
			}
		});

	return React.createFactory(FooterClass);
});