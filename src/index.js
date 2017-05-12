import InlineImport from "inline-import";
import waterfall from "async-waterfall";
import glob from "glob";

/**
 * Registers the inlineImport grunt task.
 *
 * @method registerInlineImportTask
 * @param {Object} grunt - The grunt instance.
 */

export default function registerInlineImportTask(grunt) {

	grunt.registerMultiTask("inlineImport", "Inline file imports.", function() {

		const options = this.options({
			extensions: {},
			encoding: "utf8",
			useVar: false,
			glob: null
		});

		const src = this.data.src;

		waterfall([

			/**
			 * Creates a list of affected files using glob.
			 *
			 * @method fetchFiles
			 * @private
			 * @static
			 * @param {Function} next - A callback function.
			 */

			function fetchFiles(next) {

				glob(src, options.glob, function(error, files) {

					if(!error && files.length === 0) {

						error = new Error("No source files found for \"" + src + "\"");

					}

					next(error, files);

				});

			},

			/**
			 * Inlines file imports in the identified files.
			 *
			 * @method inlineFiles
			 * @private
			 * @static
			 * @param {String[]} files - A list of file paths.
			 * @param {Function} next - A callback function.
			 */

			function inlineFiles(files, next) {

				let i = 0;
				let l = files.length;

				(function proceed(error) {

					if(error || i === l) {

						next(error);

					} else {

						InlineImport.transform(files[i++], options, proceed);

					}

				}());

			}

		], this.async());

	});

}
