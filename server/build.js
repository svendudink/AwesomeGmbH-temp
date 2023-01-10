#!/usr/bin/env node

// A BUILD SCRIPT WITH NODE.JS
// ===========================

// Most of the code is blatantly copied from this blog post by @millermedeiros:
// http://blog.millermedeiros.com/node-js-as-a-build-script

// NOTE
// This is a work in progress and I will likely add more functionality in the future.

// FEATURES
// This build script is capable of processing and minifying less files
// and compressing and minifying JavaScript files.

// INSTALL
// 1.	node.js and npm are required to run the script: http://nodejs.org
//
// 2.	Save the the build.js and the package.json files into a subfolder of
// 		the project, e.g: the-project/build
//
// 3.	Before running the script, you'll need to install dependencies.
// 		In the command line, cd into the folder of the script:
// 		$ cd folder/fo/this/script
//
//		and install the dependencies:
// 		$ npm install
//
// 4.	you should now be able to run the script:
//		$ node build
//
// 		for a list of available command line options, run
//		$ node build -h

// SETTINGS
// --------
var settings = {
  // Settings for script compilation and compression
  scripts: {
    // Folder with uncompressed JavaScript files.
    // all javascript files in this folder will be concatenated
    // into one file and compressed, e.g: script.min.js
    src: "../scripts/src",

    // Folder with javascript library files.
    // the content all JavaScript files in this folder will
    // be prepended to the minified script file.
    // library files will not be compressed, all comments,
    // license information, etc. will just be copied.
    lib: "../scripts/src/lib",

    // Folder to store the compressed JavaScript files in.
    // subdirectories will be created if neccessary
    min: "../scripts/min",

    // List of folders with JavaScript files. The build script
    // will scan these folders for JavaScript files, minify them and
    // recreate the folder and file structure in the min folder.
    // This is useful for JavaScript files that need to be loaded
    // conditionally via AJAX later on, for example HTML5 polyfills.
    // e.g: src/ext/my/folders/my-file.js -> min/ext/my/folders/my-file.min.js
    // PLEASE NOTE: this script assumes that these are subfolders of the src folder
    folders: ["../scripts/src/helpers", "../scripts/src/polyfills"],
  },

  // Settings for css preprocessing. This build script can compile and
  // minify LESS files.
  styles: {
    // Folder with uncompressed LESS files. This folder will NOT be scanned
    // recursively. All LESS files in this folder will be compiled into a
    // separate CSS file.
    less: "../styles/less",

    // Folder to compile the LESS files into.
    css: "../styles/css",
  },

  // LESS js parser settings as per http://lesscss.org
  less_parser: {
    // Search paths for @import directives
    paths: ["../styles/less", "../styles/less/import"],
  },

  file_encoding: "utf-8",
};

// T3H C0D3Z
// ---------

var file_system = require("fs");

// command line access to the script
var build_tool = require("commander");

// we're using less to preprocess css files.
var less = require("less");

// we're using uglify.js to minify javascript files.
var uglify_js = require("uglify-js");

// list of terminal commands. minus "node build".
var commandline_arguments = process.argv.slice(2);
var less_parser = new less.Parser(settings.less_parser);

// counter for feedback in terminal
var less_files_counter = 0;
var less_processed_counter = 0;

function init() {
  // add command line options.
  // fyi: you can run multiple options at once by using the
  // shorthands: node build -lj processes LESS AND JavaScript
  // files.
  build_tool
    .version("0.0.1")
    .option("-l, --less", "process less files")
    .option("-c, --minifycss", "minify less output")
    .option("-j, --javascript", "compile and minify JavaScript files")
    .parse(process.argv);
}

function run() {
  // check for command line arguments and execute functions accordingly
  if (build_tool.javascript) {
    processJavaScriptFiles();
  }

  if (build_tool.less) {
    processLessFiles();
  }

  if (!build_tool.less && build_tool.minifycss) {
    console.log("No LESS output to compress");
    console.log(
      "Need to process LESS files in order to compress the output, e.g: $node build -lc"
    );
  }

  if (!commandline_arguments.length) {
    console.log("");
    console.log("Nothing to do.");
    console.log(
      "Call $ node build -help to show a list of available command line options."
    );
    console.log("");
  }

  console.log("DONE.");
}

// file processing functions
// -------------------------
function processLessFiles() {
  // get all LESS files from folder
  var less_folder = getFilesInFolder(settings.styles.less, "less");

  // the Less parsing is asynchronous.
  // we need this as a shared object between the
  // sequences.
  var compilation_options = {
    folder_in: less_folder.path,
    folder_out: settings.styles.css,
    files: less_folder.files,
    index: 0,
    compress: build_tool.minifycss ? true : false,
  };

  console.log(less_folder.files.length + " less files to compile.");

  // start the Less compilaton loop
  lessCompilationLoop(compilation_options);
}

// Less parsing is asynchronous.
// this loops manages sequencing.
function lessCompilationLoop($options) {
  if (
    $options &&
    typeof $options.index === "number" &&
    typeof $options.folder_in === "string" &&
    typeof $options.folder_out === "string"
  ) {
    if ($options.index < $options.files.length) {
      // we want to indicate minified files by renaming them
      // file.min.js
      var file_appendix = $options.compress ? ".min" : "";
      var file_name = $options.files[$options.index];
      var new_name = file_name.replace(".less", file_appendix + ".css");

      var in_path = $options.folder_in + "/" + file_name;
      var out_path = $options.folder_out + "/" + new_name;

      compileLessFile(in_path, out_path, $options, lessCompilationLoop);

      $options.index++;

      console.log(
        $options.index +
          "/" +
          $options.files.length +
          " less files processed. " +
          $options.files[$options.index - 1]
      );
    } else {
      console.log("Less processing done.");
    }
  }
}

// Parsing of LESS files is asynchronous. This is why we have to
// run it sequencially.
function compileLessFile($file_in, $file_out, $options, $callback) {
  if (typeof $file_in === "string" && typeof $file_out === "string") {
    // the less parser works with strings. so we have
    // to get the content of the file first
    var file_content = file_system
      .readFileSync($file_in, settings.file_encoding)
      .toString();

    less_parser.parse(file_content, function ($error, $tree) {
      if ($error) {
        throw new Error($error);
      }

      // minify output? Y/N
      var less_options = { compress: !!$options.compress };
      var css_string = $tree.toCSS(less_options);

      // write new css file.
      file_system.writeFileSync($file_out, css_string, settings.file_encoding);

      if (typeof $callback === "function") {
        $callback($options);
      }
    });
  }
}

function processJavaScriptFiles() {
  // get a list of all JavaScript library files.
  // these will concatenated, NOT minified
  var library_files = getFilesInFolder(settings.scripts.lib, "js");

  // get a list of all JavaScript source files.
  // these will concatenated, minified and concatenated with the
  // library files
  var script_files = getFilesInFolder(settings.scripts.src, "js");

  // these are the strings with the concatenated file contents
  var library_content = concatenateFiles(library_files);
  var script_content = concatenateFiles(script_files);

  // use uglify.js to minify the concatenated source scripts
  var script_content_min = uglify(script_content);
  var javascript_content = library_content + script_content_min;

  // save minified script file
  file_system.writeFileSync(
    settings.scripts.min + "/script.min.js",
    javascript_content
  );

  var message = parseInt(
    script_files.files.length + library_files.files.length
  );
  message +=
    ' JavaScript files combined into "' +
    settings.scripts.min +
    '/script.min.js".';

  console.log(message);

  // scan the additional folders for JavaScript files and minify them.
  // No concatenation here.
  for (var i = 0; i < settings.scripts.folders.length; i++) {
    var folder_in = settings.scripts.folders[i];
    var folder_out = folder_in.replace(
      settings.scripts.src,
      settings.scripts.min
    );
    var additional_files = getFilesInFolder(folder_in, "js");

    for (var j = 0; j < additional_files.files.length; j++) {
      compressJSFile(folder_in, folder_out, additional_files.files[j]);

      console.log(
        parseInt(j + 1) +
          "/" +
          additional_files.files.length +
          ' JavaScript files in "' +
          folder_in +
          '" minified.'
      );
    }
  }

  console.log("JavaScript processing done.");
}

// helper functions
// ----------------

// Get files of a specific type in a folder.
// Returns an object with the path and a list with all file names.
function getFilesInFolder($path, $type) {
  var result = {};
  result.path = $path;
  result.files = [];

  try {
    var path_stat = file_system.lstatSync($path);
    var files = file_system.readdirSync($path);

    for (var i = 0; i < files.length; i++) {
      var file_name = files[i];
      var file_path = $path + "/" + file_name;
      var file_extension = getFileExtension(file_name);
      var stat = file_system.lstatSync(file_path);

      // gf:	we're not interested in subfolders, just files.
      if (stat.isFile()) {
        // gf:	check for the correct file extension.
        if (file_extension.indexOf($type) !== -1) {
          result.files.push(file_name);
        }
      }
    }
  } catch ($error) {
    var error_message = "ERROR: \n";
    error_message +=
      'It seems that the directory "' + $path + '" does not exist. \n';
    error_message +=
      "Please create it manually or update the settings\n and run this script again";

    console.log(error_message);
  }

  return result;
}

// Compress a JS file
function compressJSFile($folder_in, $folder_out, $file, $callback) {
  if (
    typeof $folder_in === "string" &&
    typeof $folder_out === "string" &&
    typeof $file === "string"
  ) {
    var file_path = $folder_in + "/" + $file;
    var file_name_new = $file.replace(".js", ".min.js");
    var file_content = file_system
      .readFileSync(file_path, settings.file_encoding)
      .toString();
    var file_content_min = uglify(file_content);

    // make the directory if it doesn't exist in the scripts.min folder
    try {
      var stat = file_system.lstatSync($folder_out);
    } catch ($error) {
      file_system.mkdirSync($folder_out);
    }

    file_system.writeFileSync(
      $folder_out + "/" + file_name_new,
      file_content_min
    );

    if (typeof $callback === "function") {
      $callback($folder_in, $folder_out, $file, file_content, file_content_min);
    }
  }
}

// returns the file extension of a file, like '.js';
function getFileExtension($filename) {
  var i = $filename.lastIndexOf(".");

  return i < 0 ? "" : $filename.substr(i);
}

// Concatenates the content of multiple files into one string.
// returns that string;
function concatenateFiles($folder) {
  var result = "";

  for (var i = 0; i < $folder.files.length; i++) {
    var file_path = $folder.path + "/" + $folder.files[i];
    var file_content = file_system
      .readFileSync(file_path, settings.file_encoding)
      .toString();

    if (typeof file_content !== "undefined") {
      // gf:	add a line break after each file
      result += file_content + "\n";
    }
  }

  return result;
}

// compress a JavaScript string
// using uglify.js
function uglify($string) {
  var jsp = uglify_js.parser;
  var pro = uglify_js.uglify;

  var ast = jsp.parse($string);
  ast = pro.ast_mangle(ast);
  ast = pro.ast_squeeze(ast);

  var result = pro.gen_code(ast);

  return result;
}

init();
run();
