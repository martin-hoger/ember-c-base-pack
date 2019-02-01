/*
Possible to create multiple overlay windows. If second overlay is opened from first
overlay, new one has 'maxLeft' position and fist is moved left by computed
property. If third is opened from second, third has again 'maxLeft' position and
1. - 2. are moved to 100 and 200 px left. Nice :-)
  - if (vissible == false) { class="hidden" is added to the element }
  - maxLength is the possition of the last opened overlay, default 300px.

First open of the overlay content is animated from right to left (even if mouse is not on it).
When mouse left the overlay content, it is moved right after 1s waiting.
=> The user see more of the backgroud window and can click it.
When mouse is back on content, it is moved immediately left to the initial position.

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
import { later } from '@ember/runloop';

export default Component.extend({
  classNames : ['modal-window-wrap'],
  classNameBindings: ['visible::hidden', 'focused:focused:blurred', 'initClass:init-class:'],
  visible          : true,
  maxLeft          : 300,
  firstOpen        : true,  // first overlay open => overlay stays left, even if mouse is not on it
  focused          : true,  // first overlay open
  initClass        : true,
  // Create the global array of overlay IDs.
  // scheduleOnce() must be used. Otherwise the order of application style: computed()
  // can be not from parent to child, but from child to parent (in some cases)
  // init() {
  //   this._super(...arguments);
  //   scheduleOnce('afterRender', this, function() {
  //     // Global array already exists?
  //     if (!this.get('session.cPartialoverlayIds') ) {
  //       this.set('session.cPartialoverlayIds', []);
  //     }
  //     var overlayId = this.set('overlayId', Math.random() ); // random id of this new overlay
  //     var overlayIds = this.get('session.cPartialoverlayIds');
  //     overlayIds.pushObject(overlayId); // add actual overlay to the existing array
  //   });
  // },

  // // after inserting element wait and remove init-class => animate move from left to right
  // didInsertElement() {
  //   later(( () => {
  //     this.set('initClass', false);
  //   }), 1);
  // },

  // overlay id must be removed AFTER element was destroyed, otherwise
  // we receive Ember error "Assertion Failed: You modified "style" twice...
  // See https://github.com/emberjs/ember.js/issues/13948 for more details."
  // didDestroyElement() {
  //   this._super(...arguments);
  //   var overlayIds = this.get('session.cPartialoverlayIds');
  //   overlayIds.removeObject(this.get('overlayId') );
  // },

  // Generate style according number of overlays.
  style: computed('session.cPartialoverlayIds.[]', function() {
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

    return htmlSafe(styles.join(';'));
  }),

  actions: {
    // If there is onClose action, fire the function.
    close() {
      if (this.get('onClose')) {
        this.get('onClose')();
      }
    },

    // Overlay content moving right (CSS), when the mouse left the overlay (after 1s waiting).
    // First overlay open => overlay stays left, even if mouse is not on it
    contentFocused(status) {
      if (this.get('firstOpen')) {
        this.set('firstOpen', false);
        return;
      }
      // is the mouse on overlay content? Global variable.
      this.set('mouseOnContent', status);

      // content focused: move window left immediately
      if (status) {
        this.set('focused', status);
      }

      // mouse left the content: wait and if mouse is not on content back, then move window right
      if (!status) {
        later(( () => {
          if (!this.get('mouseOnContent')) {
            this.set('focused', false);
          }
        }), 300);
      }

    }

  }

});
