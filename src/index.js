import InlineImport from "inline-import";

/**
 * Registers the inlineImport Grunt task.
 *
 * @param {Object} grunt - The Grunt instance.
 */

export default function registerInlineImportTask(grunt) {

	grunt.registerMultiTask("inlineImport", "Inline file imports.", function() {

		const done = this.async();

		const options = this.options();
		const files = this.files;

		const promise = new Promise((resolve, reject) => {

			let i = 0, j = 0;

			(function proceed() {

				if(i === files.length) {

					resolve();

				} else {

					if(j === files[i].src.length) {

						++i;
						j = 0;
						proceed();

					} else {

						InlineImport.transform(files[i].src[j++], options).then(proceed).catch(reject);

					}

				}

			}());

		});

		promise.then(done).catch(done);

	});

}
