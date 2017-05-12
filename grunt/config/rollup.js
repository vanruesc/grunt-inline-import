const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");

module.exports = function(grunt) {

	return {

		options: {
			external: [
				"async-waterfall",
				"glob",
				"path",
				"fs"
			],
			plugins: [
				resolve({
					jsnext: true
				}),
				babel()
			]
		},

		task: {
			options: {
				format: "cjs",
				moduleName: "<%= package.name.replace(/-/g, \"\").toUpperCase() %>",
				banner: "<%= banner %>"
			},
			src: "src/index.js",
			dest: "tasks/<%= package.name %>.js"
		}

	};

};
