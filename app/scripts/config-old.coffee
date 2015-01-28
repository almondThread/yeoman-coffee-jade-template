require.config
  shim:
    "backbone":
      deps: ["jquery", "underscore"]
      exports: "Backbone"
    "bootstrap": ["jquery"]

  paths:
    backbone: '../bower_components/backbone/backbone'
    underscore: '../bower_components/underscore/underscore'
    jquery: '../bower_components/jquery/dist/jquery'
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'

  packages: []
