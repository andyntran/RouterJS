define([
	'react'
], function (React) {

	var ClassSet = React.addons.classSet,
		NavClass = React.createClass({
			onNavItemClicked: function (link, evt) {
				if (this.state.activeIndex !== link.index) {
					link.execute();
				}
				evt.preventDefault();
			},

			onNavItemExecuteSuccess: function(link) {
				if (this.state.activeIndex !== link.index) {
					this.setState({ activeIndex: link.index });
				}
			},

			getInitialState: function () {
				return { activeIndex: -1 };
			},

			componentWillMount: function () {
				if (this.props.links && this.props.links.length) {
					for (var i = 0; i < this.props.links.length; ++i) {
						var link = this.props.links[i];
						link.index = i;
						link.onSuccess = this.onNavItemExecuteSuccess.bind(null, link);
					}
				}
			},

			componentWillUnmount: function () {
				if (this.props.links && this.props.links.length) {
					for (var i = 0; i < this.props.links.length; ++i) {
						var link = this.props.links[i];
						link.onSuccess = null;
					}
				}
			},

			renderNavItem: function (link) {
				return React.DOM.li({
						key: 'li' + link.index
					}, React.DOM.a({
						key: 'a',
						href: link.path,
						target: link.isInternal ? null : '_blank',
						className: ClassSet({
							'active': link.index === this.state.activeIndex
						}),
						onClick: link.isInternal ? this.onNavItemClicked.bind(this, link) : null
					}, link.text));
			},

			renderNavItems: function () {
				if (!this.props.links || !this.props.links.length) { return null; }

				var children = [];
				for (var i = 0; i < this.props.links.length; ++i) {
					children.push(this.renderNavItem(this.props.links[i]));
				}
				return children;
			},

			render: function () {
				return React.DOM.ul({
					className: 'nav'
				}, this.renderNavItems());
			}
		});

	return React.createFactory(NavClass);
});