define([
	'react'
], function (React) {

	var ClassSet = React.addons.classSet,

		MarketingClass = React.createClass({

			getDefaultProps: function () {
				return {
					items: [
						{
							title: 'WHY ROUTERJS?',
							text: 'Inspired by BackboneJS and AngularJS, RouterJS is an experiment to create a robust Javascript Router that works with React framework or any other framework of your choice.'
						},
						{
							title: 'SIMPLICITY',
							text: 'RouterJS provides simple APIs that can be easily integrated into any framework such as React, EmberJS, AngularJS, Backbone, etc.'
						}, {
							title: 'HISTORY or SHEBANG (#!)',
							text: 'RouterJS supports both. You can choose to work with either history API or "shebang" configuration.',
							tooltip: 'A few years back, Googlebots started to recognize "shebang" (#!) syntax as a valid URL. With the rise of HTML5, browser history API provides a more intuitive approach for dynamic URL.'
						}
					]
				}
			},

			renderItem: function (item, index) {
				return React.DOM.div({
					key: 'marketing-item' + index,
					className: 'marketing-item'
				}, [
					React.DOM.h2({
						key: 'title',
						title: item.tooltip,
						className: ClassSet({
							'info': !!item.tooltip
						})
					}, item.title),
					React.DOM.p({ key: 'text' }, item.text)
				]);
			},

			renderItems: function () {
				var children = [];

				for (var i = 0; i < this.props.items.length; ++i) {
					children.push(this.renderItem(this.props.items[i], i));
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