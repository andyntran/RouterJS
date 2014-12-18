define([
	'react'
], function (React) {

	var MarketingClass = React.createClass({

			items: [
				{
					title: 'SIMPLICITY',
					text: 'RouterJS has 4 public APIs that is easily integrated into any framework such as React, AngularJS, Backbone, etc.'
				}, {
					title: 'HISTORY vs SHEBANG (#!)',
					text: 'RouterJS supports both and allows you to work with either history API or "shebang" configuration.',
					tooltip: 'A few years back, Googlebots started to recognize "shebang" (#!) syntax as a valid URL. With the rise of HTML5, browser history API provides a more intuitive approach for dynamic URL.'
				}
			],

			renderItems: function () {
				var children = [];

				for (var i = 0; i < this.items.length; ++i) {
					children.push(React.DOM.div({
						key: 'marketing-item' + i,
						className: 'marketing-item'
					}, [
						React.DOM.h2({ key: 'title' }, this.items[i].title),
						React.DOM.p({ key: 'text' }, this.items[i].text)
					]));
				}

				return children;
			},

			render: function () {
				return React.DOM.div({
					className: 'marketing'
				}, this.renderItems());
			}
		});

	return React.createFactory(MarketingClass);
});