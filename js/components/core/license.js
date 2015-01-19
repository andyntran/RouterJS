define([
	'react'
], function (React) {

	var LicenseClass = React.createClass({
			render: function () {
				return React.DOM.a({
					rel: 'license',
					className: 'license',
					href: 'http://creativecommons.org/licenses/by-nd/4.0/',
					target: '_blank'
				}, React.DOM.img({
					key: 'img',
					alt: 'Creative Commons Attribution-NoDerivatives 4.0 International License',
					title: 'Creative Commons Attribution-NoDerivatives 4.0 International License',
					style: {
						borderWidth: 0
					},
					src: 'https://i.creativecommons.org/l/by-nd/4.0/88x31.png'
				}));
			}
		});

	return React.createFactory(LicenseClass);
});