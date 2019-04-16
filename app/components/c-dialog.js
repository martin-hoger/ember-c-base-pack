import Component from '@ember/component';
import { inject } from '@ember/service';
import $ from 'jquery';

export default Component.extend({
  elementId : 'dialog',
  dialog    : inject(),

  actions: {
    confirm() {
      this.get('dialog').confirmDialog();
    },
    cancel() {
      this.get('dialog').cancelDialog();
    }
  }
});



