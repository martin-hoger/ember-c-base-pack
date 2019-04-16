/*
  Modal window with close button, dark transparent background.
  Can be closed also by clicking transparent background.
  Default visible, width, max-height - possible to set another.

  Usage:
  {{#c-modal-window}}
    Content of the modal window
  {{/c-modal-window}}

  {{#c-modal-window visible=true width="50%" maxHeigh="50%"}}
    Content of the modal window
  {{/c-modal-window}}

  {{#c-modal-window visible=true width=300}}
    Content of the modal window
  {{/c-modal-window}}

*/

import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { later } from '@ember/runloop';

export default Component.extend({
  classNames : ['modal-window-wrap'],
  classNameBindings: ['initClass:init-class:'],
  initClass        : true,
  visible          : true,
  // default sizes:
  maxHeight        : '80%',
  width            : '600',

  // after inserting element wait and remove init-class => animate move from left to right
  // VA to MH : zatím to nefunguje, respektive funguje remove init-class, ale žádnou animaci neudělá...
  didInsertElement() {
    later(() => {
      this.set('initClass', false);
    }, 1);
  },

  // style = Width: px or %, max-width
  style: computed('width', 'maxHeigh', function() {
    var maxHeigh = this.get('maxHeigh');
    var width = this.get('width').toString();
    if (width.substr(-1) != '%') {      // width: px or %
      width = width + 'px'              // px
    }
    var style = (`width: ${width}; max-height: ${maxHeigh}`);

    return htmlSafe(style);
  }),

  actions: {
    // If there is onClose action, fire the function.
    close() {
      if (this.get('onClose')) {
        this.get('onClose')();
      }
    },

  }

});
