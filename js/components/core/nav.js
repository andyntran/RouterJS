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
				return { activeIndex: 0 };
			},

			componentWillMount: function () {
				if (this.props.links && this.props.links.length) {
					var me = this;
					for (var i = 0; i < this.props.links.length; ++i) {
						var link = this.props.links[i];
						link.index = i;
						link.onSuccess = me.onNavItemExecuteSuccess.bind(null, link);
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

				return this.props.links.map(this.renderNavItem);
			},

			render: function () {
				return React.DOM.ul({
					className: 'nav'
				}, this.renderNavItems());
			}
		});

	return React.createFactory(NavClass);
});