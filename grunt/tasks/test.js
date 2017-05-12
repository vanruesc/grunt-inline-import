module.exports = function(grunt) {

	grunt.registerTask("test", ["backup", "inlineImport", "nodeunit", "restore"]);

};
