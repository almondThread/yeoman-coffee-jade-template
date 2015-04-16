app = app || {}

( ->
  MainView = Backbone.View.extend

    initialize: ->
      self = this

    render: ->
      this.$el.append(this.template)
      this



  app.MainView = MainView
)()