define([
	'react',
	'components/core/license'
], function (React, License) {

	var FooterClass = React.createClass({
			render: function () {
				return React.DOM.div({
					className: 'footer'
				}, [
					React.DOM.div({ 
						key: 'info',
						className: 'info' 
					}),
					React.DOM.div({
						key: 'copyright',
						className: 'copyright'
					}, [
						License({ key: 'license' }),
						React.DOM.div({ key: 'company-name' }, '© 2014–2015 NDSoft Inc.')
					])
				]);
			}
		});

	return React.createFactory(FooterClass);
});