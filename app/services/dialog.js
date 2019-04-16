/*
Example of use:

    import { inject } from '@ember/service';
    export default Component.extend({
      dialog : inject(),

      actions: {
	confirmAction() {

	  this.get('dialog').confirm({
	      title   : 'Confirm apply',
	      message : 'Apply study template on this study'
	  }).then(() => {
	    console.dir('Confirmed!');
	  }).catch(() => {
	    console.dir('Canceled!');
	  });

	},
      }
    });

*/

import Service from '@ember/service';
import { setProperties } from '@ember/object';
import { defer } from 'rsvp';

export default Service.extend({
  showPrompt : false,
  title      : null,
  message    : null,
  deferred   : null,
  type       : null,

  //Confirm ask function.
  confirm({ title, message }) {
    this.set('deferred', defer());
    this.set('showPrompt', true);
    this.set('title', title);
    this.set('message', message);
    this.set('type', 'confirm');

    return this.deferred.promise;
  },

  //Alert ask function.
  alert({ title, message }) {
    this.set('deferred', defer());
    this.set('showPrompt', true);
    this.set('title', title);
    this.set('message', message);
    this.set('type', 'alert');

    return this.deferred.promise;
  },

  //Confirm function.
  confirmDialog: function () {
    this.deferred.resolve(true);
    this.set('showPrompt', false);
    this.set('deferred', null);
  },

  //Cancel function.
  cancelDialog: function () {
    this.deferred.reject();
    this.set('showPrompt', false);
    this.set('deferred', null);
  },

});
