module.exports = function (grunt) {

	"use strict";

	// ====================
	// ====================

	var jsFilePath = "js/",
		scssFilePath = "scss/",
		mainScssFile = "app.scss",
		scssFilesArray = [scssFilePath + "/**/*.scss"],
		cssDist = "app.min.css";

	// Project configuration.
	grunt.initConfig({
		pkg: require("./package"),

		config : {
			cssDist : "app.min.css",
		},

		requirejs: {
			dist: {
				options: {
					mainConfigFile : "js/config.js",
					optimize : 'uglify2',
					generateSourceMaps : true,
					preserveLicenseComments : false,
					out: "js/dist/app.min.js",
				}
			}
		},

		sass: {
			dev: {
				options: {
					style: "expanded",
					sourcemap : true
				},
				files: {
					"<%= config.cssDist %>": scssFilePath + mainScssFile
				}
			},
			deploy: {
				options: {
					style: "compressed"
				},
				files: {
					"<%= config.cssDist %>": scssFilePath + mainScssFile
				}
			}
		},

		watch: {
			scss: {
				files: [scssFilesArray],
				tasks: "sass:dev"
			},

			js: {
				files: [
					jsFilePath + "libs/**/*.js",
					jsFilePath + "app/**/*.js",
					jsFilePath + "config.js",
				],

				tasks: ["requirejs"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-devtools");

	// =============
	// === Tasks ===
	// =============
	// A task for development
	grunt.registerTask("dev", ["requirejs", "sass:dev"]);

	// A task for deployment
	grunt.registerTask("deploy", ["requirejs", "sass:deploy"]);
};
