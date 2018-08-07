import Component from '@ember/component';
import { computed } from '@ember/object';
// import RSVP from 'rsvp';

export default Component.extend({

  // isLoaded : false,
  // init() {
  //   this._super(...arguments);
  //
  //   RSVP.hash(this.get('model')).then((resolvedModel) => {
  //     this.set('model', resolvedModel);
  //     this.set('isLoaded', true);
  //   });
  // },


  isLoaded: computed('models.@each.isPending', function () {
    console.log('c-loading-block.js should not be used, please user RSVP.hash() in the route.');
    var models   = this.get('models');
    var isLoaded = true;
    models.forEach(function (model) {
      if (model.get('isPending')) {
        isLoaded = false;
      }
    });

    return isLoaded;
  }),

});



