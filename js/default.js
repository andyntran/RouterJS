requirejs.config({
	// Defines the base URL for Javascript files
	// The URL is relative to the main index.html page
	baseUrl: '/projects/routerjs/js/'
	
	// Defines aliases for common Javascript files/modules
	, paths: {

		// RequireJS plugins
		  text: '../ext/require-2.1.15/require-text.min'
		, css: '../ext/require-2.1.15/require-css.min'

		// Core libraries
		, modernizr: [
			  '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min'
			, '../ext/modernizr-2.8.3/modernizr.min'
		]
		, jquery: [
			  '//code.jquery.com/jquery-2.1.1.min'
			, '../ext/jquery-2.1.1/jquery.min'
		]
		, jqueryExt: 'ext/jquery-ext'
		, react: '../ext/react-0.12.1/react-with-addons.min'
		, reactJSX: '../ext/react-0.12.1/JSXTransformer.min'
		, router: '../ext/router-0.1.1/router.min'

		// TODO: Uncomments the following to set alias for additional libraries
		// , jqueryui: [
		// 	  '//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min'
		// 	, 'libs/jquery/jqueryui/jquery-ui-1.8.23.min'
		// ]
		// , bootstrap: [
		// 	  '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.1.1/bootstrap.min'
		// 	, 'libs/bootstrap/bootstrap-2.1.1.min'
		// ]
		// , handlebars: [
		// 	  '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0.beta6/handlebars.min'
		// 	, 'libs/handlebars/handlebars-1.0.0.beta.6.min'
		// ]
		// END TODO
	}

	// Defines dependencies (effectively sets the loading orders)
	, shim: {
		  'jqueryExt': ['jquery']
		, 'components/core/app': [
			  'modernizr'
			, 'jquery'
			, 'jqueryExt'
			, 'react'
			, 'reactJSX'
			, 'router'

			// TODO: Uncomments the following to includes loading additional libraries
			// , 'jqueryui'
			// , 'bootstrap'
			// , 'handlebars'
			// END TODO
		]

		// TODO: Uncomments the following to set jQuery dependency for jQuery UI
		// , 'jqueryui': ['jquery']
		// END TODO

	}
});

// Register main app component
require([
	'react', 
	'components/core/app'
], function (React, App) {
	React.render(App(), document.body);
});
