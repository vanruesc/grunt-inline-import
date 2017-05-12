"use strict";

const grunt = require("grunt");

const EOL = /(?:\\r\\n|\\r|\\n)/g;

module.exports = {

	"Inline Import": {

		"correctly inlines file imports and supports glob": function(test) {

			const actual = grunt.file.read("test/inline/glob/sub-dir/index.js").replace(EOL, "");
			const expected = grunt.file.read("test/expected/glob");

			test.equal(actual, expected);
			test.done();

		}

	}

};
