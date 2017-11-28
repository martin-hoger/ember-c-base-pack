import Ember from 'ember';

export default Ember.Component.extend({
  classNames : ["content"], 
  visible    : false,

  actions: {
    close() {
      // If there is onClose action, fire the function.
      if (this.attrs && this.attrs.onClose !== undefined) {
        this.attrs.onClose()
      }
    }
  }
  
});
