# Grunt Inline Import

[![Build status](https://travis-ci.org/vanruesc/grunt-inline-import.svg?branch=master)](https://travis-ci.org/vanruesc/grunt-inline-import)
[![npm version](https://badge.fury.io/js/grunt-inline-import.svg)](https://badge.fury.io/js/grunt-inline-import)
[![Dependencies](https://david-dm.org/vanruesc/grunt-inline-import.svg?branch=master)](https://david-dm.org/vanruesc/grunt-inline-import)

A Grunt plugin that [inlines file imports](https://github.com/vanruesc/inline-import). 


## Getting Started

This plugin requires Grunt >= 0.4.0

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) 
guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. 
Once you're familiar with that process, you may install this plugin with this command:

```sh
npm install grunt-inline-import --save-dev
``` 

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-inline-import");
```


## Usage

The inlining process is __destructive__. Affected files will be changed __permanently__. Create a 
[backup](https://github.com/vanruesc/grunt-inline-import#creating-a-backup) first!  
To inline your file imports, you need to specify the path to the JavaScript 
file that should be modified. Additionally, you need to define the 
```extensions``` of the relevant import statements.

##### text.txt

```
hello world
```

##### index.js

```javascript
import stuff from "garage";
import text from "./text.txt";
```

##### Gruntfile.js

```javascript
inlineImport: {
	options: {
		extensions: {
			".txt": "utf8"
		}
	},
	task: {
		src: "index.js"
	}
}
```

##### index.js (inlined)

```javascript
import stuff from "garage";
const text = "hello world";
```


## Glob

You may use [glob patterns](https://github.com/isaacs/node-glob#glob-primer) to inline a bunch of files at once. 

```js
inlineImport: {
	options: {
		extensions: {
			".html": "utf8",
			".css": "utf8"
		}
	},
	task: {
		src: "src/**/tpl.js"
	}
}
```


## Options

You may provide special ```glob``` options for the [glob](https://github.com/isaacs/node-glob#options) mechanism. 
For more information, check out the options of the [inline-import](https://github.com/vanruesc/inline-import#options) tool. 

```js
inlineImport: {
	options: {
		// Global options.
		extensions: {
			".html": "utf8",
			".png": "base64"
		},
		encoding: "utf8",
		useVar: true,
		glob: { ... },
	},
	task: {
		options: {
			// Local options.
			extensions: {
				".glsl": "utf8"
			}
		},
		src: "index.js"
	}
}
```


## Creating a Backup

In order to create a backup of specific files, you'll need tools for copying and deleting files. The following example uses the basic grunt 
plugins [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy) and [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean).

##### Gruntfile.js (copy setup)

```js
copy: {
	backup: {
		expand: true,
		cwd: "src",
		src: "**/tpl.js",  // Copy all tpl files from src into a 
		dest: "backup",    // backup folder while maintaining directory structures.
		filter: "isFile"
	},
	restore: {
		expand: true,
		cwd: "backup",
		src: "**",         // Copy all backup files back into the 
		dest: "src",       // src folder, overwriting existing files.
		filter: "isFile"
	}
}
```

##### Gruntfile.js (clean setup)

```js
clean: {
	backup: ["backup"]  // Remove the backup files.
}
```

##### Gruntfile.js (tasks)

```js
grunt.registerTask("backup", ["restore", "copy:backup"]);
grunt.registerTask("restore", ["copy:restore", "clean:backup"]);
grunt.registerTask("prepublish", ["backup", "inlineImport"]);
grunt.registerTask("postpublish", ["restore"]);
```


## Contributing

Maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
