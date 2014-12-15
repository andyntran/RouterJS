// NOTE: Use the following command to run this build file in the application folder (js-boilerplate)
// node js/libs/requirejs/r-2.0.6.js -o js/main.build.js

({
	  appDir: "../"
	, baseUrl: "js/"
	
	// TODO: Changes "dir" value to preferred folder
	, dir: "../../RouterJS-retail"
	// END TODO

	, paths: {
		  text: '../ext/require-2.1.15/require-text.min'
		, css: '../ext/require-2.1.15/require-css.min'
		, modernizr: '../ext/modernizr-2.8.3/modernizr.min'
		, jquery: '../ext/jquery-2.1.1/jquery.min'
		, jqueryExt: 'ext/jquery-ext'
		, react: '../ext/react-0.12.1/react.min'
		, reactJSX: '../ext/react-0.12.1/JSXTransformer.min'
		, router: '../ext/router-0.1.1/router.min'

		// TODO: Uncomments the following to set alias for additional libraries
		// , jqueryui: 'libs/jquery/jqueryui/jquery-ui-1.8.23.min'
		// , bootstrap: 'libs/bootstrap/bootstrap-2.1.1.min'
		// , handlebars: 'libs/handlebars/handlebars-1.0.0.beta.6.min'
		// END TODO
	}
	, modules: [{ name: "default" }]
})