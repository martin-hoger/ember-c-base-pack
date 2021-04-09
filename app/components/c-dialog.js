import Component from '@ember/component';
import { inject } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  dialog      : inject(),
  taskTimeout : '200',
  
  //After render capture a keyboard and focus component to call keyDown()
  didRender() {
    this._super(...arguments);
    this.$().attr({ tabindex: 1 });
    this.$().focus();
  },

  keyDown(event) {
    //Key code for enter => successful confirmation.
    if (event.keyCode == 13) {
      if (this.dialog.deferred) {
        this.dialog.deferred.resolve(true);
        this.dialog.set('showPrompt', false);
        this.dialog.set('deferred', null);
      }
    }
    //Key code for escape => cancel.
    if (event.keyCode == 27) {
      if (this.dialog.deferred) {
        this.dialog.deferred.reject();
        this.dialog.set('showPrompt', false);
        this.dialog.set('deferred', null);
      }
    }
  },

  actions: {
    confirm() {
      this.get('dialog').confirmDialog();
    },
    cancel() {
      this.get('dialog').cancelDialog();
    }
  },
});



