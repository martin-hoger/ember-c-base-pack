import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  /**
   * Computed property for all models.
   * Expect array as we want to show, the might be more models we are waiting for.
   *
   */
  isPending: computed('models.@each.isPending', function () {
    var models    = this.get('models');
    var isPending = false;
    models.forEach(function (model) {
      if (model.get('isPending')) {
        isPending = true;
      }
    });
    return isPending;
  }),

});



