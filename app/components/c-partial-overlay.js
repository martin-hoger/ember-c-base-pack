import Ember from 'ember';

export default Ember.Component.extend({
  classNames : ["content"], 
  visible    : false,

  actions: {
    close() {
      // If there is onClose action,
      // check the return value from the action to find out
      // if we can close the window.
      if (this.attrs.onClose !== undefined && !this.attrs.onClose()) {
        return false;
      }
      // Close the window.
      this.set("visible", false);
    }
  }
  
});
