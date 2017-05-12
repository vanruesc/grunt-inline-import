module.exports = {

	task: {
		options: {
			banner: "<%= banner %>"
		},
		files: {
			"tasks/<%= package.name %>.min.js": ["tasks/<%= package.name %>.js"]
		}
	}

};
