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
import { defer } from 'rsvp';
import { computed } from '@ember/object';


export default Service.extend({
  showPrompt : false,
  title      : null,
  message    : null,
  deferred   : null,
  type       : null,

  //Confirm ask function.
  confirm({ title, message }) {
    this.set('deferred', defer());
    this.set('title', title);
    this.set('message', message);
    this.set('type', 'confirm');

    if (this.get('isIframe')) {
      //JS confirm in iframe.
      if (confirm(title + ': ' + message)) {
        this.deferred.resolve(true);
        return this.deferred.promise;
      } else {
        this.deferred.reject();
        return this.deferred.promise;
      }
    } else {
      //Ember confirm.
      this.set('showPrompt', true);
      return this.deferred.promise;
    }
  },

  //Alert ask function.
  alert({ title, message }) {
    this.set('deferred', defer());
    this.set('title', title);
    this.set('message', message);
    this.set('type', 'alert');

    if (this.get('isIframe')) {
      //JS alert in iframe.
      alert(title + ': ' + message);
      this.deferred.resolve(true);
      return this.deferred.promise;
    } else {
      //Alert confirm.
      this.set('showPrompt', true);
      return this.deferred.promise;
    }
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
  
  //Returns if we run the app in frame.
  isIframe: computed(function () {
    try {
      //If actual window is different from parent window.
      if (window.self !== window.parent) {
        //If actual windows or parent window is not running with Ember.
        if ((!window.self.Em) || (!window.parent.Em)) {
          return true;
        }
      }
      return false;
    } catch (e) {
      return true;
    }
  }),


});
