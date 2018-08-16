import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({

  // tagName: 'div',
  // attributeBindings: ['style'],
  // classNameBindings: ['visible::hidden'],
  visible    : true,

  // didInsertElement() {
  init() {
    this._super(...arguments);
    // debugger;
    var overlayId = this.set('overlayId', Math.random() );
    console.log('overlay id:', this.get('overlayId'));
    if (!this.get('session.cPartialoverlayIds') ) {
      this.set('session.cPartialoverlayIds', []);
      console.log('session.cPartialoverlayIds', this.get('session.cPartialoverlayIds') );
    }
    var overlayIds = this.get('session.cPartialoverlayIds');
    overlayIds.pushObject(overlayId);
    console.log('overlayIds', overlayIds);

  },

  willDestroyElement() {
    // má tam tohle být ?????????????????
    this._super(...arguments);
    // debugger;
    console.log('destroy session.cPartialoverlayIds', this.get('session.cPartialoverlayIds') );
    console.log('toto id', this.get('overlayId'));

    var overlayIds = this.get('session.cPartialoverlayIds');
    overlayIds.removeObject(this.get('overlayId') );

    console.log('destroy na konci session.cPartialoverlayIds', this.get('session.cPartialoverlayIds') );

  },

  style: computed('session.cPartialoverlayIds.[]', function() {
    var overlayId = this.get('overlayId');
    // debugger;
    console.log('computed, id:', overlayId);
    var overlayIds = this.get('session.cPartialoverlayIds');
    var index = overlayIds.indexOf(overlayId);
    var left = 300 / (overlayIds.length - index)

    var styleStr = `left: ${left}px`;

    return htmlSafe(styleStr);

  }),

  actions: {
    close() {
      // If there is onClose action, fire the function.
      if (this.get('onClose')) {
        this.get('onClose')();
      }
    }
  }

});
