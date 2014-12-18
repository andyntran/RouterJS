define(function () {

	var specsRunner = {

		  isRunning: false

		, execute: function (reporter) {

			// Makes sure specs running module only run once in case the test cases navigates
			// to different routes
			if (!this.isRunning) { 

				var me = this;
				me.isRunning = true;

				requirejs.config({
					paths: {
						  mockServices: 'specs/mock-services'
						, sinon: '../ext/sinon-1.12.1/sinon.min'
						, jasmine: '../ext/jasmine-2.1.3/js/jasmine.min'
						, jasmineConsole: '../ext/jasmine-2.1.3/js/jasmine-console.min'
						, jasmineHtml: '../ext/jasmine-2.1.3/js/jasmine-html.min'
						, jasmineTeamcity: '../ext/jasmine-2.1.3/js/jasmine-teamcity.min'
					}

					, shim: {
						// Defines core testing library dependencies
						  'mockServices': ['sinon']
						, 'jasmine': ['mockServices', 'sinon']
						, 'jasmineConsole': ['jasmine']
						, 'jasmineHtml': ['jasmine']
						, 'jasmineTeamcity': ['jasmine']

						// TODO: Defines TDD specs dependencies (all specs should have jasmine 
						//		 or jasmineHtml as one of the dependencies)
						// END TODO

						// TODO: Defines BDD specs dependencies (all specs should have jasmine 
						//		 or jasmineHtml as one of the dependencies)
						// END TODO
					}
				})

				require([

				// Loads JasmineJS, sinon, and services mocking module
				  'css!../ext/jasmine-2.1.3/css/jasmine.css'
				, 'css!../css/jasmine-ext.min.css'
				, 'sinon'
				, 'jasmine'
				, 'jasmineConsole'
				, 'jasmineHtml'
				, 'jasmineTeamcity'
				, 'mockServices'

				// TODO: Includes TDD spec files
				, 'specs/tdd/app'
				// , 'specs/tdd/routes'
				// END TODO

				// TODO: Includes BDD spec files
				// END TODO

				], function () {

					// ## Require Instantiate
					// Require Jasmine's core files. Specifically, this requires and attaches all of Jasmine's code to the `jasmine` reference.
					window.jasmine = jasmineRequire.core(jasmineRequire);

					// Since this is being run in a browser and the results should populate to an HTML page, require the HTML-specific Jasmine code, injecting the same reference.
					jasmineRequire.html(jasmine);
					jasmineRequire.teamcity(jasmine);
					jasmineRequire.console(jasmine);

					// Create the Jasmine environment. This is used to run all specs in a project.
					var env = jasmine.getEnv();

					// Extend helper function.
					var extend = function (destination, source) {
						for (var property in source) destination[property] = source[property];
						return destination;
					}

					// ## The Global Interface
					// Build up the functions that will be exposed as the Jasmine public interface. A project can customize, rename or alias any of these functions as desired, provided the implementation remains unchanged.
					var jasmineInterface = jasmineRequire.interface(jasmine, env);

					// Add all of the Jasmine global/public interface to the proper global, so a project can use the public interface directly. For example, calling `describe` in specs instead of `jasmine.getEnv().describe`.
					if (typeof window == "undefined" && typeof exports == "object") {
						extend(exports, jasmineInterface);
					} else {
						extend(window, jasmineInterface);
					}

					// ## Runner Parameters
					// More browser specific code - wrap the query string in an object and to allow for getting/setting parameters from the runner user interface.
					var queryString = new jasmine.QueryString({
					getWindowLocation: function() { return window.location; }
					});
					var catchingExceptions = queryString.getParam("catch");
					env.catchExceptions(typeof catchingExceptions === "undefined" ? true : catchingExceptions);

					// Filter which specs will be run by matching the start of the full name against the `spec` query param.
					var specFilter = new jasmine.HtmlSpecFilter({
						filterString: function() { return queryString.getParam("spec"); }
					});
					env.specFilter = function(spec) {
						return specFilter.matches(spec.getFullName());
					};

					// Setting up timing functions to be able to be overridden. Certain browsers (Safari, IE 8, phantomjs) require this hack.
					window.setTimeout = window.setTimeout;
					window.setInterval = window.setInterval;
					window.clearTimeout = window.clearTimeout;
					window.clearInterval = window.clearInterval;

					// Registers all the test cases
					var specs = Array.prototype.slice.call(arguments, 8);
					for (var i = 0; i < specs.length; i++) {
						specs[i].register();
					}

					// Decides which reporter to use
					reporter || (reporter = 'html');
					switch (reporter.toLowerCase()) {

						// Trivial Reporter
						case 'console':
							env.addReporter(new jasmine.ConsoleReporter({
								showColors: true,
								timer: new jasmine.Timer
							}));
							env.execute();
							break;
						
						// TeamCity Reporter
						case 'teamcity':
							env.addReporter(new jasmine.TeamcityReporter());
							env.execute();
							break;

						// HTML Reporter
						default:
							// ## Reporters
							// The `HtmlReporter` builds all of the HTML UI for the runner page. This reporter paints the dots, stars, and x's for specs, as well as all spec names and all failures (if any).
							var htmlReporter = new jasmine.HtmlReporter({
								env: env,
								onRaiseExceptionsClick: function() { queryString.setParam("catch", !env.catchingExceptions()); },
								getContainer: function() { return document.body; },
								createElement: function() { return document.createElement.apply(document, arguments); },
								createTextNode: function() { return document.createTextNode.apply(document, arguments); },
								timer: new jasmine.Timer()
							});
							env.addReporter(jasmineInterface.jsApiReporter);
							env.addReporter(htmlReporter);

							htmlReporter.initialize();
							env.execute();

							var $HtmlReporter = $('.jasmine_html-reporter');
							if ($HtmlReporter.length) {
								$HtmlReporter
									.children('.banner')
									.prepend($('<a id="JasmineReporterCloseBtn" href="javascript:void(0)" title="Close tests results">x</a>')
										.click(function() {
											$('.jasmine_html-reporter').remove();
										})
									);
							}

							break;
					}

					me.isRunning = false;
				});
				
			}

		}

	};

	return specsRunner; // Return specs running module as a singleton object
});