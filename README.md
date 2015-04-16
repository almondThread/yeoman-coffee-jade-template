# yeoman-coffee-jade-template
Template for webapp using grunt, coffee, jade, livereload and some other utils


**Tasks**

 ```grunt clean```
  Clean all generated folders

 ```grunt compile```
   Compile app from 'app' folder into 'dev'.
   Jade files are compiled to HTML, Coffee files are compiled to JavaScript.

   'dev' folder is needed for run developer server with livereload,
   in this case all changes in source files (app directory) will be shown in browser.
   Watching changes, increment compilation and coping into 'dev' folder are provided by grunt and done automatically.

 ```grunt build```
   Make complete build from 'app' folder into 'dist'.
   Previously calls 'compile'.
   Does CSS and JavaScript code minification.

 ```grunt server```
   Runs livereload server from 'dev' directory.
   Browser automaticaly refreshes and shows changes made in Jade and Coffee files from 'app' folder

 ```grunt server:build```
   Runs livereload server from 'dist' directory.
   There is not file changes tracking, just shows result from 'dist' folder.


