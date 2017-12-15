import Ember from 'ember';

export default Ember.Component.extend({

  visible    : false,

  actions: {
    close() {
      // If there is onClose action, fire the function.
      if (this.get("onClose")) {
        this.get("onClose")();
      }
    }
  }
  
});
