import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * Computed property for all models.
   * Expect array as we want to show, the might be more models we are waiting for.
   *
   */
  isPending: Ember.computed('models.@each.isPending', function () {
    var models     = this.get("models");
    var allPending = false;
    models.forEach(function (model) {
      if (model.get("isPending")) {
        allPending = true;
      }
      
    });
    return allPending;
  }),

});



