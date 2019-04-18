import Component from '@ember/component';
import { inject } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  elementId   : 'dialog',
  dialog      : inject(),
  taskTimeout : '200',

  actions: {
    confirm() {
      this.get('dialog').confirmDialog();
    },
    cancel() {
      this.get('dialog').cancelDialog();
    }
  },
});



