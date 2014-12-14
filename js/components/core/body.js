define([
	'react',
	'components/core/hero'
], function (React, Hero) {

	var BodyClass = React.createClass({
			render: function () {
				return React.DOM.div({
					className: 'body'
				}, [
					Hero({ key: 'hero' })
				]);
			}
		});

	return React.createFactory(BodyClass);
});