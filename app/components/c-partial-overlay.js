/*
Possible to create multiple overlay windows. If second overlay is opened from first
overlay, new one has 'maxLeft' position and fist is moved left by computed
property. If third is opened from second, third has again 'maxLeft' position and
1. - 2. are moved to 100 and 200 px left. Nice :-)
  - if (vissible == false) { class="hidden" is added to the element }
  - maxLength is the possition of the last opened overlay, default 300px.

Usage:
{{#c-partial-overlay visible=true onClose=(route-action "closeWindow")}}
  This is overlay 2
  {{#link-to 'application.c-form-test.over1.over2.over3'}}
    This is a link to overlay 3
  {{/link-to}}
  {{outlet}}
{{/c-partial-overlay}}

*/

import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { scheduleOnce } from '@ember/runloop';

export default Component.extend({
  classNames : ['partial-overlay-wrap'],
  classNameBindings: ['visible::hidden', 'onmouse:focused:blurred'],
  visible          : true,
  maxLeft          : 300,
  collapsed        : false,

  // Create the global array of overlay IDs.
  // scheduleOnce() must be used. Otherwise the order of application style: computed()
  // can be not from parent to child, but from child to parent (in some cases)
  // and
  init() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, function() {
      // Global array already exists?
      if (!this.get('session.cPartialoverlayIds') ) {
        this.set('session.cPartialoverlayIds', []);
      }
      var overlayId = this.set('overlayId', Math.random() ); // random id of this new overlay
      var overlayIds = this.get('session.cPartialoverlayIds');
      overlayIds.pushObject(overlayId); // add actual overlay to the existing array
    });
  },

  // overlay id must be removed AFTER element was destroyed, otherwise
  // we receive Ember error "Assertion Failed: You modified "style" twice...
  // See https://github.com/emberjs/ember.js/issues/13948 for more details."
  didDestroyElement() {
    this._super(...arguments);
    var overlayIds = this.get('session.cPartialoverlayIds');
    overlayIds.removeObject(this.get('overlayId') );
  },

  // Generate style according number of overlays.
  style: computed('session.cPartialoverlayIds.[]', 'collapsed', function() {
    var styles    = [];
    var overlayId = this.get('overlayId');
    var overlayIds = this.get('session.cPartialoverlayIds');

    // Set width for multiple windows.
    var width = 80;
    if (overlayIds) {
      var index = overlayIds.indexOf(overlayId);
      width = 100 - 20 / overlayIds.length * (index + 1);
    }
    styles.push(`width: ${width}%`);

    if (this.get('collapsed')) {
      // styles.push('transform: perspective(980px) translate(0px, 0px) rotateY(-45deg)');
      // styles.push('transform: perspective(800px) translate(0px, 0px) rotateY(-10deg)');
      // styles.push('transform: translate(0px, 0px)');
      styles.push('right: -40%');
    }
    // styles.push('transform-origin: 100% 50%;');


    return htmlSafe(styles.join(';'));
  }),

  actions: {
    // If there is onClose action, fire the function.
    close() {
      if (this.get('onClose')) {
        this.get('onClose')();
      }
    },

    contentFocused(focused) {
      this.set('onmouse', focused);
    }
  }

});
