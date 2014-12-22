define([
], function () {
	var NavManagerMixin = {
			
			onNav: function (navItem) {
				if (!this.state.isNavigating) {
					this.setState({ isNavigating: true });
					Router.navigate(navItem.path);
				}
			},

			onNavSuccess: function () {
			},

			onNavFail: function () {
				Router.navigate('/error/404/', true);
			},

			onNavCompleted: function () {
				if (this.state.isNavigating) {
					this.setState({ isNavigating: false });
				}
			},

			createNavItem: function (text, path, isInternal) {
				if (text && path) {
					var navItem = {
						text: text,
						path: isInternal ? Router.normalizePath(path) : path,
						fullPath: isInternal ? Router.resolveFullPath(path) : path,
						isInternal: !!isInternal
					};
					navItem.execute = this.onNav.bind(this, navItem);
				}

				return navItem;
			},

			disposeNavItem: function (navItem) {
				if (navItem) {
					navItem.execute = null;
				}
			},

			disposeNavItems: function (navItems) {
				if (navItems && navItems.length) {
					for (var i = 0; i < navItems.length; ++i) {
						this.disposeNavItem(navItems[i]);
					}
				}
			},

			getInitialState: function () {
				return {
					homeLink: null,
					navLinks: null
				};
			},

			componentWillMount: function () {
				Router.start({
					root: document.querySelector('meta[name="page-info"]').dataset.root,
					mode: 'hash',
					onNavigateSuccess: this.onNavSuccess,
					onNavigateFail: this.onNavFail,
					onNavigateCompleted: this.onNavCompleted
				});

				this.setState({
					homeLink: this.createNavItem('HOME', '/', true),
					navLinks: [
						this.createNavItem('DOCS', '/docs', true),
						this.createNavItem('DOWNLOAD', '/download', true),
						this.createNavItem('TEST', '/test', true),
						this.createNavItem('GITHUB', '//github.com/andyntran/RouterJS')
					]
				});
			},

			componentWillUnmount: function () {
				this.disposeNavItem(this.state.homeLink);
				this.disposeNavItems(this.state.navLinks);
			}
		};

	return NavManagerMixin;
});