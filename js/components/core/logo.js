define([
	'react'
], function (React) {

	var LogoClass = React.createClass({
			onClicked: function (evt) {
				if (this.props.link) {
					this.props.link.execute();
				}
				evt.preventDefault();
			},

			getDefaultProps: function () {
				return {
					link: null
				};
			},

			render: function () {
				var children = [
					React.DOM.span({ key: 'first' }, 'Router'),
					React.DOM.span({ key: 'last' }, 'JS')];

				return this.props.link ?
					React.DOM.a({ 
						className: 'logo',
						onClick: this.onClicked
					}, children) : 
					React.DOM.span({ 
						className: 'logo' 
					}, children);
			}
		});

	return React.createFactory(LogoClass);
});