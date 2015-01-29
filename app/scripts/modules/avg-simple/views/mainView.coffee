app = app || {}

( ->
  MainView = Backbone.View.extend

    initialize: ->
      self = this
      $.get '/scripts/app/modules/avg-simple/templates/main.html', (data) ->
        self.template = _.template(data)
        self.render()

    render: ->
      this.$el.append(this.template)
      this



  app.MainView = MainView
)()