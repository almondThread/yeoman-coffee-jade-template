define (require)->
  class App
    run: ->
      avgsimple = require('modules/avg-simple/main')
      alert('App is started')
#      alert(avgsimple)
