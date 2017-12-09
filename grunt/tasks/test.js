module.exports = function(grunt) {

	grunt.registerTask("test", ["eslint", "backup", "inlineImport", "nodeunit", "restore"]);

};
