define([
	'react'
], function (React) {

	var ClassSet = React.addons.classSet,

		NavClass = React.createClass({

			onNavItemClicked: function (link, isActive, evt) {
				if (!isActive) {
					link.execute();
				}
				evt.preventDefault();
			},

			renderNavItem: function (link, index) {
				var isActive = link.path === this.props.currentPath;

				return React.DOM.li({
						key: 'li_' + index
					}, React.DOM.a({
						key: 'a',
						href: link.fullPath,
						target: !link.isInternal ? '_blank' : null,
						className: ClassSet({
							'active': isActive
						}),
						onClick: link.isInternal ? this.onNavItemClicked.bind(null, link, isActive) : null
					}, link.text));
			},

			renderNavItems: function () {
				if (!this.props.links || !this.props.links.length) { return null; }

				var children = [];
				for (var i = 0; i < this.props.links.length; ++i) {
					children.push(this.renderNavItem(this.props.links[i], i));
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