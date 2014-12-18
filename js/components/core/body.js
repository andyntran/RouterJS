define([
	'react'
], function (React) {

	var BodyClass = React.createClass({
			render: function () {
				return React.DOM.div({
					className: 'body'
				}, this.props.children);
			}
		});

	return React.createFactory(BodyClass);
});